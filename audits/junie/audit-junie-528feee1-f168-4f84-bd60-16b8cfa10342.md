# junie 上游审阅报告 · 2026-11-25

## 结论

本轮 `audit-junie-528feee1` 的 22 个登记来源中，Git 来源、20 个官方文档来源报 `changed`，npm 来源
`unchanged`。逐页比对可见文本后，18 个文档页只有页脚 `Last modified` 日期变化；实质内容变化集中在
`junie-cli-mcp-configuration.html` 与 `custom-proxies.html`，分别维护 `mcp` 与 `custom_providers`
两个当前章节，新建 `junie-cli-mcp-v2` 与 `junie-cli-custom_providers-v3`，旧 edition 原样保留。
Git 来源只改发布元数据，无章节影响。

## 来源核查记录

| 来源 | 基线 → 观察 | 结论 |
| --- | --- | --- |
| `source-junie-repo` | `31019581999d` → `ff678f1a239d` | 仅 `registry-nightly.json`（nightly 归档 4203.1→4217.1）、`update-info-nightly.jsonl` 与 `update-info.jsonl`（新增 4171.6 / marketing 26.11.3 平台 zip 与 sha256）；已发布引用只定位 `README.md`、`install.sh`，两者未变，无影响 |
| `source-junie-npm` | `3110.7.0@sha512-2Oik…` 未变 | 无影响 |
| `source-junie-docs-mcp` | `86e6ca74…` → `90e02bb1…` | `Add an MCP server` 的 Local 分支新增受信任/未受信任项目中本地 server 的启动目录与相对路径解析规则 |
| `source-junie-docs-proxies` | `523b3846…` → `790bd535…` | `Select a proxy as the active provider` 的默认模型回退顺序补入“第一个未弃用模型”一级 |
| 其余 18 个文档来源 | 各自 changed | 去 script/style、去标签、压缩空白后的可见文本仅差页脚日期 2026-11-23→2026-11-24，不建 artifact/snapshot/reference |

Git 来源的 diff 按协调者固定的补丁核对，`git diff` 只涉及上述三个发布元数据 JSON/JSONL 文件；
仓库内 `README.md` 与 `install.sh` 未改，因此 `ref-junie-repo-*` 四条引用不受影响。

## 章节与证据变更

- **mcp v2**（`mcp-entry-definition`、`mcp-lifecycle`；`mcp.entry`、`mcp.definition`、
  `mcp.lifecycle`）：受信任项目里配置的本地 server 从项目根启动；未受信任项目里项目作用域配置不被
  隐式加载，但用户作用域的 server 仍可启动，并从项目之外的隔离目录或 Junie Home 运行；本地 server
  命令中的相对路径以 server 自身的工作目录为基准解析。`mcp.definition` 原先“文档未描述工作目录”
  的说法据此改为部分回答，变量展开规则、显式 `cwd` 字段与字段默认值仍缺，状态保持 `partial`；
  `mcp.lifecycle` 补入启动目录条件，重连/重试/超时/缓存仍缺，保持 `partial`。证据固定为
  `artifact-junie-docs-mcp-20261125` / `snapshot-junie-docs-mcp-20261125` /
  `ref-junie-mcp-local-working-dir`（文档章节 `Add an MCP server`）。
- **custom_providers v3**（`providers-entry`；`providers.models`）：活动提供方是代理且
  `config.json`、`--model`、`/model` 都未指定模型时，Junie 从该代理提供的模型里挑默认值——代理提供
  全局默认模型就用它，否则对 `Anthropic`/`OpenAI`/`Google` 代理取 `opus`/`gpt`/`gemini-flash`
  别名背后的模型，否则取第一个未弃用的模型，再否则取列表第一个；配合 `available-models`，网关可声明
  服务的模型而无需自己指定默认。证据固定为 `artifact-junie-docs-proxies-20261125` /
  `snapshot-junie-docs-proxies-20261125` / `ref-junie-proxies-default-model`（文档章节
  `Select a proxy as the active provider`）。
- 两份新原件写入原项目忽略归档：`archive/junie/<artifact-id>/raw.md`，sha256 与观察 hash 一致。

## 问题 triage

- 完成：`mcp.entry`、`mcp.definition`、`mcp.lifecycle` 按新证据更新；
  `providers.models` 补入代理默认模型回退顺序。
- 已检查并排除：`providers.metadata`、`providers.diagnostics`、`providers.protocol`、
  `providers.forwarding`、`providers.auth` 与代理合并规则段落未变。configuration 的
  `config.sources`/`config.overrides`/`config.runtime`/`config.trust`/`config.defaults`/
  `config.migration`/`config.diagnostics` 所引 config/env/params/quickstart 段落仅差日期；
  custom_agents 的 subagents 页、hooks 的 hooks 页、native_plugins 的 extensions 页、skills 的
  agent-skills 页、local_transcripts 的 junie-cli 与配置页同为日期噪声；mcp 其余引用页（config、
  env、params、allowlist、quickstart）与 custom_providers 其余引用页（custom-models、
  model-selection、byok、litellm、ollama）也未变。
- 18 个只变日期的页面不产生新 snapshot/reference，相关主题无本轮待办。

## 验证与复核

- `pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-9/candidates/junie` 通过，
  含新增章节、引用、快照、选章与审计关系校验。
- 变更属普通增量维护（补充机制说明与细化回退顺序），不涉及来源冲突、推翻已发布配置步骤或跨主题
  加载机制变化，无需独立复核；由维护流程自检后标记 `review_status: reviewed`。

## 待处理

无 blocked，无遗留 pending。历史 pending 审计 `audit-junie-1072e035` 与其引用的
`audit-junie-1a267d65` 保持各自原状态，本审计不引用也不关闭它们。
