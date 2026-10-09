# prime-agent 巡检维护报告（audit-prime-agent-fe998a91-5291-4f0c-8bbc-45887d1f607b）

## 观察到的来源变化

`source-prime-agent-repo`（`https://github.com/PrimeIntellect-ai/prime-agent.git`）由基线 `672085e883c25a8a5f10c77ad8e5d3fb38dd6584` 变为观察提交 `967eb13fd488507af5f590e9c6ea8b2672f1fc05`，提交标题为 `repair a torn session tail before the first append (#3376)`，共 1124 个文件变更。

工作区：`ws-967eb13fd488-befdb99b-7e88-498a-ab75-cb920e811cf1`（项目外 pinned checkout，仅本轮读取，不进入数据集）。

## 语义 triage 与范围

本轮范围限定为 `local_transcripts` 与 `configuration` 两个主题，以及它们各自的固定问题。先按任务给出的重点文件清单逐个 diff，再按"非注释行差异"筛出真正的行为变更。

### 实质变更（写入章节）

1. **会话尾部修复（`crates/pa-core/src/session/manager/repair.rs`）**
   - 尾部扫描 `tail_looks_damaged` 不再只读文件末尾固定的一兆字节窗口，改为从文件尾向前按一兆字节窗口反复回退，定位到换行边界后才确定"最后一行"起点，并用流式 JSON 解析判断该行是否合法。三个损坏信号（NUL 字节、末尾缺换行、末行非法 JSON）本身未变。
   - **新增首行闸** `first_line_is_session_header`：首行必须能解析为合法 `session` header，否则整个文件被跳过、不重写。这与加载阶段"第一行不是合法 header 则整份 entries 作废"是两处独立检查。
   - 重写方式从"整文件读入内存再拼字符串交给 `atomic_write`"改为逐行流式写入 `{path}.tmp{pid}`（私有权限）、`sync_all` 后 `rename_onto` 覆盖原文件。
   - `repair_jsonl_damage` 由 `pub(super)` 提升为 `pub`，并由 `pa_core::session::manager` 再导出。
2. **新的修复调用面（`crates/pa-daemon/src/worker/create.rs`、`crates/pa-daemon/src/session_navigation.rs`）**
   - worker 续接已存在的会话文件时：先取运行时会话租约 → 修复 → 再 `open_windowed`。
   - 替换会话的共用入口（`switch_session` / `import_jsonl` / `fork` 共用 `open_replacement`）**只在持有租约时**修复，无租约则只读打开。
   这决定了"哪一次打开会顺带修复"，是本轮对读者最直接可观察的行为变化。
3. **打包目录解析（`crates/pa-cli/src/config.rs`、`crates/pa-core/src/packages/mod.rs`）**
   - `package_dir()` 的可执行文件目录由 `current_exe().parent()` 改为经 `exe_dir_of` 解析启动器符号链接后再取父目录（源码注释点名 Homebrew formula 的 `bin` 链接）。`PI_PACKAGE_DIR` 优先级不变。

### 排除项与依据

以下重点文件的**非注释差异为空**，本轮结案、不改章节：

| 文件 | 差异性质 |
| :-- | :-- |
| `crates/pa-core/src/session/manager/append.rs` | 仅 doc comment 压缩 |
| `crates/pa-core/src/session/manager/header.rs` | 仅 doc comment 压缩 |
| `crates/pa-core/src/session/manager/persist.rs` | 仅 doc comment 压缩（`atomic_write` 函数体逐字保留） |
| `crates/pa-core/src/session/manager/git.rs`、`tests.rs` | 仅 doc comment 压缩 |
| `crates/pa-core/src/session/mod.rs` | 仅 doc comment 压缩 |
| `crates/pa-core/src/settings/manager.rs` | 227 行差异全部为 doc comment 压缩，代码零变更 |
| `crates/pa-core/src/settings/interactive_settings.rs` | 仅 doc comment |
| `crates/pa-cli/src/command_registry.rs`、`args.rs`、`global_flags.rs`、`config_command.rs`、`client_settings.rs` | 仅 doc comment |
| `crates/pa-daemon/src/paths.rs` | 仅 doc comment（会话目录/agent 目录解析链不变） |
| `crates/pa-types/src/session.rs`、`ai/mod.rs` | 仅 doc comment 与空行（entry 枚举与字段未变） |

**会话 id 生成路径**：任务提示"会话 id 生成路径变化"，逐行核对后确认不成立。`crates/pa-core/src/session/manager/ids.rs` 仍为 `Uuid::now_v7()`，非注释差异只有模块 doc comment；`lifecycle.rs` 的 `new_session` 把 `if options.id.is_some()` 改写为 `if let Some(id) = &options.id`，panic 文案由插值 `session_id` 改为 `id`，语义等价。因此 `transcripts.naming` 的既有答案不改写。

**已记录但未改写的事实**：`crates/pa-core/src/session_engine/compact_session.rs` 的 `commit_attempt` 新增 `compaction_prefix_intact` 前缀校验（结构冲突时返回 `Ok(false)` 让调用方重新 prepare）。它影响上下文压缩的**提交时机**，不改变 JSONL 的记录类型、字段或版本阶梯，因此不进入 `transcripts.schema`（该题仍为 partial），只在本报告与审计 notes 中留证。

## 章节变更

| 文件 | 主题/问题 | 实质变化 |
| :-- | :-- | :-- |
| `knowledge/prime-agent/chapters/prime-agent-local_transcripts-v2.md`（新版本） | local_transcripts / transcripts.format、transcripts.lifecycle、transcripts.diagnostics | 改写尾部扫描、新增首行闸、流式重写、公开导出与两处 daemon 调用点；其余小节沿用原证据 |
| `knowledge/prime-agent/chapters/prime-agent-cli-configuration-v3.md`（新版本） | configuration / config.defaults | 在平台差异段落补入打包目录的符号链接解析 |
| `registry/chapter-current.yaml` | — | 两个主题的当前版本切到 v2 / v3 |

旧版本 `prime-agent-local_transcripts-v1.md` 与 `prime-agent-cli-configuration-v2.md` 字节未动。

**上一版章节已经记录了尾部修复机制**（`ref-prime-agent-lt-repair-load`、`-damage-signals`、`-header-required`）。本轮不是新增机制，而是同一机制的实现与调用面变化，因此按新证据改写既有小节，不追加投机结论。

## 新增证据

全部为 `git_source_file` / `source_revision`，固定在观察提交 `967eb13`，无临时路径：

- `ref-prime-agent-lt-r967-repair-tail-scan`（repair.rs 16–52）
- `ref-prime-agent-lt-r967-repair-entry-gate`（repair.rs 68–98）
- `ref-prime-agent-lt-r967-repair-streaming-rewrite`（repair.rs 99–147）
- `ref-prime-agent-lt-r967-repair-public-export`（session/manager.rs 42–44）
- `ref-prime-agent-lt-r967-create-repair-before-open`（worker/create.rs 205–211）
- `ref-prime-agent-lt-r967-open-replacement-repair-gate`（session_navigation.rs 239–250）
- `ref-prime-agent-cfg-r967-package-dir-symlink`（pa-cli/src/config.rs 59–72）
- `ref-prime-agent-cfg-r967-exe-dir-of-symlink`（packages/mod.rs 60–75）

## 候选校验

`pnpm maintenance:candidates check --candidate <candidate-root>` 通过，详见交付 payload 的 `check` 字段。

## 未决与复核

`review_status` 保持 `pending`：本轮改动的是两个已发布章节的正文（新增一节机制说明），按 Skill 的高影响判定属"已发布内容被新证据改写"，尚未取得独立 reviewer 结论。历史遗留（TypeScript 源码树引用、custom_agents 的 factory 能力面）不在本轮范围，仍在旧审计中保持未解决。