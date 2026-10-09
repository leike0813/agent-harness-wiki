# Codex 上游审阅报告 · 2026-10-09

## 给维护者的结论

配置参考新增了 `[application]` 表（`application.network`、`application.network.enabled`、`application.network.domains`、`application.network.domains.<domain>`），源码在 ad54b755 又补了 `windows.allow_mxc`、`windows.require_mxc`、`include_environment_context_time` 与 `thread_unload_delay_secs` 的新默认值。这些都是"新增键"而非"改写既有机制"：已发布的 config 层优先级、合并语义、项目信任门槛与迁移/弃用规则在新文档字节里逐字仍在，新提交也没有改动 `config_layer_source.rs` 与 `merge.rs`。因此本轮只新建 `codex-cli-configuration-v4`，改写集中在 `{#config-defaults-migration}` 一个小节，其余四个小节原样沿用。

值得单独说明的一点：`application.network` 这套机制在源码里并不是本轮才出现的——`codex-rs/config/src/application_requirements.rs` 在基线 c0c230e 就已存在且本轮未被修改。本轮的变化是官方文档第一次把它写进 config-reference，所以之前"managed 桌面应用网络策略"在章节里没有任何证据可引。v4 用归档文档原件加 pinned 源码两条独立证据把它补进 `config.defaults`。

## 变化的意义与证据边界

### `requirements.toml` 的 `[application]` 表

文档条目明确三件事：它与命令网络（`experimental_network`）和浏览器来源规则是分开的规则；它不对原生模块或派生进程施加目的地限制；`enabled` 在表出现时默认为 `true`，空域名表等于不允许任何外部目的地。源码侧的对应物是 `ApplicationNetworkRequirementsToml` 的自定义 `Deserialize`：域名去尾点、转小写归一化，长度/标签/字符集不合规时报 `application.network.domains requires exact ASCII domain names without URLs, ports, or wildcards`，归一化后重复域名另报一条，`enabled` 缺省补 `true`。影响 `config.defaults`（仍 partial）。 [@ref-codex-cli-config-application-network-doc][@ref-codex-cli-config-application-network-source][@ref-codex-cli-config-application-network-domains-source]

### `windows.allow_mxc` / `windows.require_mxc`

`config.toml` 的 `[windows]` 新增 `allow_mxc`，注释写明 `false` 同时阻止显式 MXC 配置与自动选择；`requirements.toml` 的 `[windows]` 新增 `require_mxc`，注释写明要求 MXC 成为选中的本地 Windows 后头，且它一旦出现该 `[windows]` 段就不再算空段。运行时后果在 `Config::load` 里写死：`allow_mxc` 解析为 `false` 且模式解析结果是 `Mxc` 时直接返回 `InvalidInput`，错误文本为 `windows.sandbox = "mxc" is not allowed when windows.allow_mxc = false`——是失败而不是降级。影响 `config.defaults`、`config.overrides`。

### 两个默认值

`include_environment_context_time` 控制 `<environment_context>` 是否带当前日期与时区，未写出按 `true`；`thread_unload_delay_secs` 的默认从 60 改成 1800 秒，源码常量与 `config_toml.rs` 的注释两处一致。这是本轮唯一一条"默认值真的变了"的既有键。影响 `config.defaults`。

### 已复核但不改写的入口

`core/src/hook_runtime.rs` 的 `additional_contexts` 从 `Vec<String>` 变成 `Vec<HookContext>`（多带一段 `ContentItemMetadata::command_hook()`），`core-plugins/src/loader.rs` 的 `disabled_skill_paths` 从 `AbsolutePathBuf` 变成 `PathUri`，`rollout/recorder.rs` 把续读 rollout 改为 `compression::read_rollout_lines` 回调式并把空 `cwd_filters` 的早退移到 state DB 查询之后，`rollout/policy.rs` 新增 `ElicitationAbandoned` 持久化分支，`history/src/lib.rs` 新增 `TurnAttribution` 重导出。这些属于 hooks、native_plugins 与 local_transcripts 的机制，不是配置层；本轮 scope 只含 configuration，不据此改写那三章。

另有一处结构性变化未进章节：`ConfigBuilder::without_project_context()` 让 app-server 的 `load_non_project_config` 改为不把 `cwd` 交给 `load_config_layers_state`，取代原先的 `loader_overrides.ignore_project_config = true`。它影响的是 app-server 侧项目层发现，而 catalog 里 app-server 只绑定 vscode/desktop 两个 surface，本章的答案全部限定在 `surface_id: cli`，因此不在本轮写进 configuration 章节；如需记录应在 vscode/desktop surface 单独立题。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | codex-cli-configuration-v4 | config.defaults：partial（新增 `[application]`、`windows.allow_mxc`／`require_mxc`、两个默认值）；config.sources／overrides／trust／runtime：answered 不变 | 建议选为当前版本 |
| skills / mcp / custom_agents / custom_providers / hooks / native_plugins / local_transcripts | 不变 | 不在本轮 scope；命中的入口文件改动均属其它主题 | 保留旧版本 |

**发布：** `delivery=pr`，未运行 `pnpm ahw publish`、未切换原项目指针，交回父进程聚合处理。**受管二进制：** pr 模式不做。

## 待处理与独立复核

**审计记录：** [audit-codex-46a260f2-4b07-4a05-ade0-2cfbd83770f9.yaml](audit-codex-46a260f2-4b07-4a05-ade0-2cfbd83770f9.yaml)，`review_status: pending`，`pending_audit_refs` 仍指向 5 份 `review_status: pending` 的旧审计，因此本轮不写 `reviewed_by`／`reviewed_at`。

**独立复核：** 不需要。没有来源互相冲突，没有新证据推翻已发布的配置步骤，没有跨主题关键加载机制变化——本轮全部是新增键，优先级、合并与信任机制原样。

**待处理问题：** 无。五道 scoped 问题的答案都在 v4 里落地，`pending_question_ids` 为空。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-codex-repo | c0c230e6730b3b3c9101b8aff4b9aea4027cea5b → ad54b75574dca8b24f09ab3c0ca4106529afed04 | changed；1045 个路径变更，逐个复核列出的入口文件，仅 types.rs／config_toml.rs／config_requirements.rs／core config mod.rs 影响 configuration 主题 |
| source-codex-cli-configuration-doc-learn | 73242945d789… → d347f6bf16af… | changed；纯新增 29 行 `[application]` 条目，无删改，既有摘录逐字仍在 |
| source-codex-cli-npm | 0.160.1 → 0.161.0 | changed；仅发布身份，不构成章节变化或版本映射 |
| source-codex-cli-doc-learn / skills-doc-learn / mcp-doc-learn | unchanged | unchanged |

## 验证与差异入口

候选自检：`pnpm maintenance:candidates check --candidate <batch>/candidates/codex`。

```sh
git status --short --untracked-files=all -- knowledge/codex audits/codex registry
git diff -- knowledge/codex audits/codex registry
```

来源工作区 `ws-ad54b75574dc-b5d2ba83-e698-434b-95ce-54f77f1da982`（ad54b755，基线 c0c230e）由父进程持有，worker 未关闭；临时路径未写入任何知识记录——`git_source_file` 引用只记 commit、仓库相对 file 与 `content_sha256`，文档引用只记原项目 `archive/` 下的 `archive_path`。