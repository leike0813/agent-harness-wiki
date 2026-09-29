# 首批五个产品的阅读指南：审阅说明

> 本文记录旧 Claim/Coverage 指南及 r6 发布的审阅历史。当前 change 已改为章节版本、逐题来源与新五工具契约；本文中的旧检查结果和建议不构成新任务的完成证明。

维护者指出第一版的 35 篇指南几乎只有“材料不足，下一步核查”的两段话。我复读全部正文后确认：文件齐全、构建通过，并不等于给读者解释了产品。原先把 change 标成完成是错误的；已撤回内容任务和最终验收的完成勾选。旧 release `five-harness-guides-20260928-r3` 保留历史身份，不能作为内容验收依据。

现已依据归档网页、精确 npm 包内文档及源码重写 35 篇，并构建 `five-harness-guides-20260928-r6`。每章现在指出具体文件或章节、字段或命令、它能回答什么、不能回答什么，以及可核对的后续步骤。不过这里只存在 **3 条维护者已接受的精确 Target Claim**；其余 32 个主题没有可发布的配置事实，现有文字仍是**调查解读**，尚达不到完整使用手册。请勿仅因这次重写再次把 change 关闭。

**Codex CLI 0.157.1**：Skills 页的仓库/用户搜索范围、MCP 页的 `codex mcp` 与 server 表、配置参考的 `agents.{name}`、`model_providers.{id}`、hooks 与插件开关已写入对应章节。它们是网页线索；包内 README 无法把网页规则固定到这个版本，七章均无已接受 Claim。

**Claude Code 2.1.283**：章节现在区分 Skills 的个人/项目/插件位置、MCP 的 local/project/user 范围与连接健康，以及设置文件、列表合并、信任和重载。网页混有不同版本的行为；隔离包因禁用安装脚本留下提示桩，没有本版加载观察。七章均无已接受 Claim。

**OpenCode 1.18.32**：固定源码分别给出 `.opencode` Skills、local/remote MCP、JSON/Markdown agent、provider、插件事件和配置层级的定位。所选 npm 包是二进制包装包，源码 commit `545f51d…` 与二进制构建对应关系未核实。七章不能由源码直接变成此包的使用教程。

**Pi 0.73.1**：用户 Skills 目录与**核心内置** MCP client 缺失是两条已接受事实。章节进一步区分设置层、`models.json` 与 `registerProvider`、扩展事件及 package 管理；这些都是精确包内文档的具体线索。项目 Skills 搜索、具体键合并、扩展装载及外部 MCP 连接尚无逐项接受或运行观察。

**OMP 18.3.4**：用户 agent 发现路径有已接受 Claim。章节进一步解释精确包中的 Skills 来源开关、MCP config/manager/transport、provider 校验、hook loader/runner、plugin 命令及设置 provenance。除 agent 目录外，这些字段、优先级和运行结果尚未形成已接受事实；无 server 握手、插件健康或 hook 执行观察。

新发布 `five-harness-guides-20260928-r6` 含 **35 篇主题调查章节、42 条 Coverage、3 条已接受 Claim**。42 条 Coverage 包括 35 条首批 npm Target 调查及 7 条独立的 Codex source-tree 调查；页面没有把两种 Target 混成一个版本。`partial` 指调查未覆盖完所有问题，不表示能力只支持一部分；没有 Claim 也不表示功能不支持。当前本地发布指针已从 r3 改为 r6，避免继续展示第一版空泛正文。

重写后 `pnpm verify` 与 production 数据校验通过。随后将已复核事实卡移至正文前、删去正文中的重复路径；这次版式调整后重新运行 `pnpm typecheck`、39 项集成测试、`openspec validate m1-reader-guides --strict`，并完成 r6 编译与站点构建。真实 MCP stdio 客户端对 r6 中五个产品的 Skills 各调用一次 `get_capability`，均返回一篇新版正文且状态为 `partial`。这些检查只证明数据、接口和构建一致，**不能证明文字已经足够帮助读者完成配置**。

建议维护者从 [Codex CLI](../../../knowledge/codex-cli/guides/skills.md)、[Claude Code](../../../knowledge/claude-code/guides/skills.md)、[OpenCode](../../../knowledge/opencode/guides/skills.md)、[Pi](../../../knowledge/pi/guides/skills.md)、[OMP](../../../knowledge/omp/guides/skills.md) 进入同目录另外六章，判断调查解读是否足够清楚，以及哪些主题应优先补 Claim。要成为完整配置指南，仍需解决版本映射或精确包观察，提出可复核的 Claim/Evidence/Assessment，事实接受后再补最小示例、重载与诊断。这里没有自动接受新事实，也没有宣布 change 完成。
