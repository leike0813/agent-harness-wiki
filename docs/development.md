# 开发指南

使用 `package.json` 与 `.node-version` 指定的 Node.js 24.x、pnpm 11.10.0；安装依赖使用 `pnpm install --frozen-lockfile`。不执行上游来源中的命令。虚构章节数据位于 `tests/fixtures/datasets/chapters/`，与正式知识隔离。

产品与界面身份先写在 `catalog/harnesses.yaml`；registry 只登记产品 id 与来源引用。新增章节时，按 [固定问题清单](topic-questions.md)为每个问题记录 `answers`：每条答案带 `surface_ids`、状态、主要小节、具体说明和本问题来源引用。章节放在 `knowledge/<harness-id>/chapters/<edition-id>.md`；小节标题用 `{#section-id}`，引用用 `[@reference-id]`。来源引用和软件版本映射分别放在同产品的 `references/` 与 `mappings/`。另在 `registry/chapter-current.yaml` 选择当前章节。改写正文须创建新 `edition_id`，保留旧文件；新增版本映射无需修改章节。

运行 `pnpm chapters:validate` 校验虚构数据。运行 `pnpm chapters:build` 在隔离的 `var/chapter-release-fixture/releases/` 构建固定 ID `fixture-chapters`；该 ID 不可覆盖，重复构建前应改用显式命令和新 ID，例如：

```bash
pnpm exec tsx scripts/compile-chapters.ts --dataset-root tests/fixtures/datasets/chapters --profile fixture --release-id fixture-chapters-next --published-at 2026-09-29T00:00:00Z --releases-root var/chapter-release-fixture/releases
```

`pnpm exec vitest run tests/integration/chapter-release.test.ts tests/integration/query.test.ts tests/integration/mcp.test.ts tests/integration/site.test.ts` 检查章节发布、版本选择、来源、真实 MCP stdio 和站点。修改 schema 后运行 `pnpm schema:export`、`pnpm schema:check`、`pnpm typecheck`、`pnpm lint`、`pnpm format:check`。正式来源原件另以 `pnpm sources:audit` 显式离线核对；普通章节校验和构建不依赖忽略的原件。审计输出逐条给出 `verified` 或 `not_retained`：后者表示该记录只保留身份元数据，不能读作原件校验通过；原件缺失或 hash 不符仍然是错误。

`pnpm verify` 验证章节读取链并以 `consumer:verify` 收尾，`pnpm fixtures:build` 生成虚构章节发布。公共查询、MCP 与站点只读取 schema 3 发布，不适配旧 release；发布内嵌 catalog。生产章节运行 `pnpm knowledge:validate`，用 `pnpm ahw compile --dataset-root . --profile production --release-id <new-id> --published-at <fixed-time> --stage` 先构建。验收该 release 的 CLI、MCP 与站点之后，运行 `pnpm ahw publish --release-id <new-id>` 原子切换当前指针。CLI 的 `query list/topic/search/compare/source` 与 MCP 的五个工具读取同一 release；`get_topic` 用 `section_id` 定位搜索结果。Windows 尚未实测。

文档站沿用 VitePress 1.6.4，配置在 `site/.vitepress/config.mts`，主题与产品目录组件在 `site/.vitepress/theme/`。`src/compiler/site.ts` 从已验证的结构化知识生成首页、产品概览、导航和页面数据，并把配置及主题复制到临时构建目录；这些展示变化不修改不可变发布内的 Markdown。名称、别名、界面和主题入口都来自同一发布。站内搜索使用浏览器本地索引，覆盖当前章节、产品概览和阅读指南；历史版和来源页由章节链接访问。

运行 `pnpm docs:build --release-id <id>` 构建正式章节站点，或运行 `pnpm docs:build` 构建虚构测试站点。产物默认在 `site/.vitepress/dist/`，可用 `pnpm --dir site exec vitepress preview . --port 4173` 静态预览。检查部署子路径时，构建和预览都添加 `--base /agent-harness-wiki/`，并从预览的同名路径进入。改版验收应检查产品名称／别名筛选、中文搜索、章节导航、来源与历史链接，以及桌面／手机和浅色／深色阅读效果。在线构建将配置与主题文件计入输入摘要，修改主题后应生成新的发布产物。

生产编译前确认本机 Ollama 已有 `qwen3-embedding:4b`，且 `/api/tags` 报告的 digest 与 `registry/search-model.json` 一致；编译器会再核对 GGUF blob digest，不会自动下载模型。默认端点 `127.0.0.1:11434` 可用 `OLLAMA_ENDPOINT` 覆盖，便于改用另一个本机实例（例如把嵌入模型放到 GPU 上的实例）。新发布的 `search.json` 和 SQLite FTS5 收录当前小节，`semantic.jsonl` 收录固定模型生成的有界片段向量。搜索返回命中方式、正文片段、来源范围和 `semantic_status`；模型暂时不可用时可继续词法检索，但不能据此宣称语义验收通过。模型与索引的选择依据见 [ADR 0007](decisions/0007-offline-hybrid-search.md)。

修订已发布章节时新增 edition 文件，保留旧版及不可变 release；审阅完成后更新 `registry/chapter-current.yaml`。写作按 [固定问题和成稿规则](topic-questions.md)：机制分节，问题在索引中定位；配置文件按不同形态给带来源的最小完整片段，解释路径、字段、前提、结果与检查方式。校验器检查章节结构和引用关系；正文能否让读者找到入口、理解示例与条件、追溯来源，由调查 Agent 按真实读者视角自检，高影响变更再请另一 Agent 独立复核。

## 在线构建与校验

在线发布是与本地发布独立的能力线，只产出静态 `data/v1/` 资源与同发布站点页面，不读取本地 `releases/`、`archive/` 原件、SQLite 或语义模型。构建输入是干净 checkout 的 catalog、registry、结构化知识、固定问题和指定 Git commit 的完整 first-parent 历史；先做完整章节校验，再选择在线历史（当前版加最近一个历史版，其余退为裁剪标记）。需要排序多个非 current 历史版本时才要求 Git 历史：隔离 fixture 且至多一个非 current 版本可不用；输入不干净仍会失败。

```sh
pnpm online:build --dataset-root . --profile production --commit <完整 SHA> --published-at <固定 ISO 时间> --base /agent-harness-wiki/ --out-dir <输出目录>
pnpm online:verify <输出目录>
```

`pnpm online:build`（`scripts/build-online.ts`）必须给定 `--dataset-root`、`--profile`、`--commit`、`--published-at`、`--base`、`--out-dir`，`--retain <已验证旧部署目录...>` 可选地把这些旧部署目录的 `data/` 并入新部署（旧页面由旧归档单独保存，不随新站点重建）；`pnpm online:verify`（`scripts/verify-online.ts`）接收一个部署目录，不需要额外的 `--`。`pnpm docs:build --online`（`scripts/build-site.ts`）接受同一组在线参数，等价于 `pnpm online:build`。输出目录不可变：已存在且校验一致的同名产物复用，内容不同则拒绝，新 release 必须用新目录。构建先写 staging，联合验证页面与数据 release 身份、引用、来源、fixture 隔离和部署目录容量（解包后的实际文件字节 ≤512 MiB）后再接受候选，失败保留既有已接受输出。身份为 `web-v1-<完整 SHA>`，协议分区为 `data/v1/`；公开清单保持精简，构建侧另写 inventory 与 hash 记录。依据见 [ADR 0009](decisions/0009-online-knowledge-distribution.md)。

在线构建与校验属于第一个 change；消费者 CLI／MCP 包、在线 DTO、HTTP／缓存／取消／离线读取与网络失败政策由 `online-consumer-cli-mcp` 交付，消费者包 1.1.0 的 `init` 配置命令由 `consumer-mcp-init` 交付。`online-publication-and-delivery` 实现公开发布 CI、持久台账、不可变归档、Pages 恢复及独立 npm 发版，入口为 `pnpm publication`、`pnpm npm:publish` 和 `pnpm consumer:verify-public`，实际状态见 [发布指南](publication.md)。最低 Node 版本为 24.12.0；本机在线构建受测环境为 Linux x64、Node 24.12.0（ICU 77.1），消费者六组平台矩阵已在验证 CI 中通过。

2026-10-02 已从无本地原件、发布或模型的干净生产输入完成子路径联合构建、独立校验与固定参数重跑：35,681 个文件，共 243,601,057 字节。`pnpm verify` 通过，38 个单元测试与 110 个集成测试通过，3 个既有环境测试跳过。实际提交、命令和分类体积见 [ADR 0009 验收记录](decisions/0009-online-knowledge-distribution.md#联合构建验收)。

## 消费者包构建与验收

消费者 1.2.0 支持 `local_transcripts`。旧消费者校验闭合主题枚举，不能读取含新主题的在线发布；发布该主题前须先交付升级的消费者。在线协议和资源布局仍为 `data/v1/`，本次未发布 npm 或真实产品的新主题知识。

消费者包位于 `packages/consumer/`，公开名 `agent-harness-wiki`、版本 `1.2.0`、命令 `ahw`，入口由 `src/consumer/index.ts` 编译到 `dist/consumer/index.js`；1.1.0 起提供 `init` 配置命令，其提示、适配器与计划／写入服务位于 `src/consumer/init/`。根工作区改名 `agent-harness-wiki-maintainer`，保持 private。消费者只打包运行所需编译代码、元数据、说明与许可，不打包工作区、测试、SQLite、模型或完整知识；安装不需要 pnpm、TypeScript 或本机编译工具，也不安装任何 harness。

```sh
pnpm consumer:build
pnpm consumer:pack
pnpm consumer:verify
```

- `consumer:build` 编译消费者入口的依赖闭包到包内 `dist/`。
- `consumer:pack` 生成真实 tgz 并核对文件清单与运行时依赖闭包，确认不含维护者代码、数据库、模型或知识。
- `consumer:verify` 在源码树外安装 tgz，验证五类 CLI 查询、MCP stdio、`--version` 与依赖解析，并写出 `var/consumer-package/verification.json`（Node、ICU、arch、OS、npm）证据；默认不访问公网、真实 HOME 或全局安装。

`init` 只编辑宿主 MCP 配置文件，入口已核实时可创建缺失的已知有效文件：产品身份来自 catalog，产品到配置入口的适配器按已核实路径实现，JSONC／TOML／YAML 用保留格式的编辑器修改，同名配置相同不写、不同才在确认后更新，其他服务器与设置保留。确认前完成解析与可写性预检，任一目标异常则整轮不写；确认后核对基线、备份并替换，失败尽力恢复。搜索多选界面移植自 ResearchSpec（改编自 OpenSpec 1.5.0，均为 MIT），归属见 [NOTICE](../NOTICE)。`init` 不联网、不执行 harness、不初始化知识查询；生成的启动为不带版本标签的 `npx -y agent-harness-wiki mcp`，显式传入的消费者运行选项随配置保留。

仅验证 CI 工作流 [`consumer-validation.yml`](../.github/workflows/consumer-validation.yml) 覆盖 Linux x64、macOS arm64（`macos-15`）、Windows native x64 × Node 最低 24.12.0 与最新 24.x，只做校验、`contents: read`、无发布权限；由 `main`／`dev` 推送、PR 或手动调度触发。先断言 `runner.arch` 与矩阵 arch 一致，再由 `pnpm consumer:verify` 写出并上传 `var/consumer-package/verification.json` 与 `var/consumer-package/manifest.json`。2026-10-02 六个 CI runner 组合均通过，每组 25 项；实际 Node 为 24.12.0／24.21.0。包清单、本机检查与 CI 链接见 [ADR 0010 验收记录](decisions/0010-online-consumer.md#本机验收)。构建与真实 tgz 准备不等于 npm 发布或 Pages 部署，使用说明见 [消费者包说明](../packages/consumer/README.md)。

## 新收录产品接入

新 CLI 由维护者调用 `$harness-investigation <harness-id>`：在 `catalog/harnesses.yaml` 固定产品与界面身份，登记 `registry/harnesses/`、`registry/sources/` 的官方来源（有 npm 包时登记 `npm_registry` 身份），直接固定 Git commit/文档 sha256 并写入 `snapshots/`、`artifacts/`、`references/`，按 [固定问题清单](topic-questions.md) 采写八章（含 `local_transcripts` 的十个固定问题，共 63 问），在 `registry/chapter-current.yaml` 为八个主题选入新版本后运行 `pnpm knowledge:validate`。发布用 `pnpm chapters:update ... --stage --blocked '[]'` 构建不可变 release，验收后 `pnpm ahw publish --release-id <new-id>` 切换；首次接入不运行 `pnpm sources:scan`，也不写审计 YAML。知识发布成功后，Skill 会明确询问是否继续接入受管二进制；同意后由 `harness-binary` 先在 `src/sources/managed.ts` 登记官方包信息，再运行 `pnpm managed:packages update <harness-id>`。

## 手动增量更新流程

已有任意当前章节的登记产品可通过此流程补写缺失主题，在隔离候选中新增完整章节和当前选择，保留无关章节。

手动更新由维护者调用 `harness-maintenance` 启动：`$harness-maintenance pi` 是 ID 模式，给出固定来源与具体问题则走定向模式。ID 模式每一轮还会调用 `harness-binary` 核对受管二进制最新版本；定向模式只在明确要求时核对。流程没有逐条人工接受门禁，普通更新由调查 Agent 自检后直接采纳。

先运行 `pnpm sources:scan <harness-id>...` 观察登记来源并把变化映射到受影响问题和章节，写出审计；它只读元数据、不下载包字节、不切换发布，字段含义与恢复方式见 [知识怎样进入读者章节](knowledge-workflow.md) 的“手动观察与审计”一节。Agent 随后读取本次 `changed`、`blocked` 与 `pending_audit_refs` 指出的旧审计，沿固定来源定位到问题 ID 和小节，为受影响主题起草完整的新 `edition_id`（保留未受影响小节的引用范围），再检查实际 diff、运行 `pnpm knowledge:validate` 并确认正文按读者任务可读。普通更新到此即可采纳。只有来源冲突、推翻已发布配置步骤或跨主题关键加载机制变化才请另一 Agent 独立复核；复核未完成的问题留在待处理状态，其他已完成章节仍可发布。结论写进同目录 Markdown 报告，格式见 [报告模板](../.agents/skills/harness-maintenance/assets/review-report.md)。

完成的 edition 进入分阶段发布：先在 `registry/chapter-current.yaml` 选入新版本，再用 `--stage` 构建不可变 release。发布器只接受 `--stage` 与 `--blocked`；受阻产品主题传给 `--blocked`（JSON 数组）。

```bash
pnpm chapters:update --dataset-root . --profile production --release-id <new-id> --published-at <fixed-time> --releases-root releases --stage --blocked '[]'
```

命令在 staging 核对 hash、引用、SQLite 完整性和共享查询服务可读性，生成不可变 release 但不切换指针。核对后运行 `pnpm ahw publish --release-id <new-id>` 切换 `releases/current.json`；同一 release ID 不要再用不带 `--stage` 的 `chapters:update` 重跑，否则会因 `Release already exists` 失败。没有读者可见的章节、来源定位或版本映射变化时只结案审计，不新建发布；构建或验收失败保留原 current 指针。受阻章节保留其旧 edition 与审计阻塞，其他章节照常进入新发布。结果只报告知识 `status`、`retained` 与 `knowledge_error`；生产发布后的真实 MCP stdio 和站点可按上文集成命令复核。

同一次观察发现新的包候选时，由 `harness-binary` Skill 另行处理；`chapters:update` 只发布知识，不触发受管刷新。二进制是独立结果：成功或失败都记入同一份报告，但不能否决或阻断上面的知识发布，失败时旧的可运行包集保持不变，细节见下节。

首批五个 npm CLI 的受管启动流程见 [包集说明](../research/package-set/README.md)。首次接入与后续更新都由 `harness-binary` Skill 统一调用 `pnpm managed:packages update <harness-id>`；新产品先在 `src/sources/managed.ts` 的 `managedPackages` 登记官方包信息，并在 `registry/sources/` 登记官方 npm 来源，非 npm 分发报告 unsupported。`pnpm managed:packages observe` 记录官方 latest；`pnpm managed:packages check-current` 检查当前入口；`pnpm managed:packages update <harness-id>` 在忽略的候选目录安装并验证后才切换包集。网络中断后可用 `update <harness-id> <candidate-id>` 复核已完整安装的候选，仍会重新核对官方 latest、锁文件和启动。审计记录位于 `var/managed-packages/audits/`，候选和失败原因可由记录中的 `candidate` 定位。Linux bwrap 检查使用临时 HOME、配置根和工作区，候选包只读挂载、`--unshare-all` 禁网，以非 root UID 65534 运行，并限制 20 秒、64 KiB 输出缓冲、64 个进程和 128 个文件描述符；运行时可执行文件从当前 Node/Bun 安装只读绑定。`AHW_SANDBOX_TEST=1 pnpm exec vitest run tests/integration/managed-packages.test.ts` 运行本机隔离测试。该测试只覆盖当前 Linux 主机；Windows、其他架构、内核命名空间策略及进程限制的不同实现仍需分别验收。

受管包 NFS 布局与本机迁移验收见 [ADR 0008](decisions/0008-managed-package-storage.md)。该文档定义 `storage.json` 的三个必填字段与本次部署值、远端完整快照和 `current` 原子替换，以及本地四处链接，并记录 Btrfs 快照仍可能持有旧包字节导致 `df` 暂无净释放。pnpm 的 `index.db`、WAL、`projects/` 登记和包集清单、锁文件、操作锁、审计、备份与恢复记录留在本地。仅配置文件不存在时使用本地布局；无效配置、挂载身份、权限或路径边界不符时报阻塞，不回退。

NFSv4 权限检查使用本机 `getfattr`，拒绝所有者之外的有效或继承写授权。NAS 的 ACL 继承可能覆盖创建模式，须配置整个专属目录树的 ACL；`0755` 与 `umask 022` 本身不证明只有维护者可写。迁移修正 ACL 使用本机 `setfattr`，不安装项目依赖。

修改包集状态的 update 持本地操作锁；`check-current` 遇恢复记录时报阻塞，`observe` 只观察元数据，两者不持 update 锁。晋升前恢复记录保存旧指针，以及本地 `package.json`、`pnpm-lock.yaml` 的旧内容；远端指针与本地文件的更新不构成跨文件系统原子事务。Git 本地固定的 `pnpm-workspace.yaml` 在创建候选时复制进快照，晋升不替换；晋升校验清单、锁文件和 `node_modules`。失败恢复到上一个一致包集，中断后下一次更新先恢复再继续。完整历史快照和失败候选保留，不自动清理。hard NFS 断连时文件操作及恢复可能持续等待，子进程超时不证明已结束或回滚。上面的本机隔离测试及下面的历史启动记录均不构成 NFS 迁移验收；实施侧须另行确认实际挂载、完整快照、真实快照 bwrap 绑定、晋升故障与中断恢复。

2026-09-29 在本机 Linux/x64/glibc 的 `check-current` 实测记录：

| 产品        | 选中版本 | 直接入口与运行时                                     | 离线版本命令 |
| ----------- | -------- | ---------------------------------------------------- | ------------ |
| Codex CLI   | 0.157.1  | 主包 `bin/codex.js`，Node；锁定平台包提供原生二进制  | 成功，退出 0 |
| Claude Code | 2.1.283  | `@anthropic-ai/claude-code-linux-x64/claude`，原生   | 成功，退出 0 |
| OpenCode    | 1.18.33  | `opencode-linux-x64/bin/opencode`，原生              | 成功，退出 0 |
| Pi          | 0.73.1   | 主包 `dist/cli.js`，Node                             | 成功，退出 0 |
| OMP         | 18.3.4   | 主包 `dist/cli.js`，Bun；核对 `pi-natives-linux-x64` | 成功，退出 0 |

OpenCode 1.18.33 曾因候选锁文件生成阶段的 registry 超时被阻塞；失败候选未切换选中环境。已完整安装的候选重新核对并通过五项启动后才晋升。以上只记录启动状态，不能推断 Skills、MCP 等主题能力。

## 每日巡检与来源工作区

调度参数、专用 worktree 约束、模型选择、锁语义和启用顺序见 [ADR 0012](decisions/0012-daily-harness-monitor.md) 与 [自动化](automations.md)。这里只记实际命令和本机核对点。

```sh
pnpm sources:check                                            # 只读观察，与 sources:scan 共享基线
pnpm sources:workspace open --source-id <id> --commit <40 位 SHA> --owner-pid <pid>
pnpm sources:workspace close <workspace-id>
pnpm sources:workspace list --owner-pid <pid>
pnpm sources:workspace recover
pnpm monitor:run start --owner-pid <pid>                      # 巡检前置：工作树、分支、整轮锁与本轮唯一一次观察
pnpm monitor:run finish <session-id>
```

`monitor:run` 必须在专用 worktree 内运行，它已包含 `monitor:session` 的锁语义和一次 `sources:check`。

- 读 Git 源码走 `sources:workspace`，官方文档读取归档候选。`open` 固定到观察到的精确提交；给 `--baseline` 时可返回 changed_paths，缺少差异时先限定相关入口。工作区以原项目根目录与长期存活 owner PID 登记，候选目录不是归属项目。调查与独立复核全部完成后按唯一 workspace ID 关闭；`recover` 只回收本项目死亡 owner 的条目。临时路径不写进知识记录。
- 引用原件用 `git_source_file`（`commit`、`file`、`content_sha256`），不写 checkout 路径。`archive_path` 只指向长期保留位置：Git catalog 引用必须带精确 revision，归档路径可选；官方文档快照必须带它。
- `sources:check` 与 `sources:scan` 读同一基线，前者不写审计、不下载包字节、不创建 clone。核对方式是跑一次前后 `git status` 相同。
- 巡检轮次是 `delivery=pr`：不运行 `pnpm ahw publish`，不调用 `harness-binary`。PR 合并到 `main` 后的对外发布由既有发布 CI 处理，不需要补做本地发布；受管二进制是独立流程，合并也不会触发它。
- 互斥通过 `var/harness-monitor/session.sqlite` 中的事务记录 owner PID。`start` 拒绝活跃 owner，接管死亡 owner 时释放其临时输出并回收本项目死亡 owner 的源码工作区。正常收尾先关闭本轮源码工作区、保存最近一次报告，再用 `finish` 释放运行锁与构建临时目录。
- 收尾先确认所有 worker/reviewer 已停止，超时不代表停止；只清理本轮登记的来源工作区与验证输出，在 `finish` 时完成。官方文档原件按既有策略留在忽略归档；章节文档、来源元数据、审计与报告永久保留；巡检不接管二进制与完整日志。不承诺固定峰值占用。
- 交付单位是一个持续到合并的滚动 PR：PR 合并前每日切回同一分支、普通合并 `origin/main` 后继续提交。PR 内同一产品 × 主题只有一个候选，新变化修订它，不追加第二个 edition，也不顺延或丢弃。
- 主会话模型由 `.omp/config.yml` 决定；子代理模型必须作为显式参数传入 `minimax-code-cn/MiniMax-M3.1-Flash-Preview`，不由配置隐式继承，也不继承编排协调方的模型。启用前确认上述命令已在 `main` 可用、两个模型都能被原生 subagent 工具选中，再手动触发一次整链验证后打开每日调度。

### 并行维护候选

父进程完成观察与必要性判断后，为需要维护的产品准备新的临时 batch，输出目录必须在项目外或忽略的 `var/` 内，不能覆盖已有输出：

```sh
pnpm maintenance:candidates prepare --root . --out <新的临时 batch 目录> <harness-id>...
pnpm maintenance:candidates check --candidate <产品候选根目录>
pnpm maintenance:candidates plan --batch <batch> --out <新的临时合并目录> <已完成的产品 id>...
```

`prepare` 返回 `batch` 与 `candidates: [{harness_id, root}]`；每个 root 是完整、独立的单产品 dataset，不包含归档原件或源码。主 Agent 自行决定 worker/reviewer 的并行规模，每产品一个 writer。worker 只编辑自己的候选，用 `check` 检查路径归属、知识引用和审计；不重新扫描、不操作发布指针或受管包集。原件仍按原项目与 owner PID 管理。

全部使用者确认停止后，`plan` 合并指定完成产品，返回 `root`、`accepted`、`rejected: [{harness_id, reason}]`、`changes: [{path, before, after}]`。它只新建临时合并 dataset，不改真源；按产品合并 catalog 与产品 × 主题选章，保留其他产品及当前未提交变化。相关基线变化、范围越界或全局 ID 冲突拒绝该产品，其余完成内容继续。父进程读完整改动，核对实际文件仍等于 `before`，再用内置编辑工具集成；有变化则重做计划。之后统一校验，手动 local 一次 staging/publish，PR 只交付 Git 改动。

业务回归验证使用 `pnpm exec vitest run tests/integration/maintenance-candidates.test.ts`，覆盖并行产品、共享文件、半成品隔离、冲突保留、无变化和范围边界。MCP 宿主接入示例见 [配置指南](mcp-configuration.md)。
