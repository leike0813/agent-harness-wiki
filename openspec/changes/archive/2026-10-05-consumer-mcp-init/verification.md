# 实施验收

验收日期：2026-10-05。实际环境为 Linux x64、Node.js v24.12.0、pnpm 11.10.0；本次未在 Windows 或 macOS 执行。

`pnpm verify` 通过类型检查、ESLint、Prettier、Schema 校验、49 份审计记录校验、15 个 fixture 章节和 534 个生产章节校验，以及以下验证：

- 单元测试：13 个文件，157 个测试通过。新增覆盖产品选择、作用域、确认、配置保留、幂等、共享入口、损坏文件、并发变更与失败恢复。
- 集成测试：22 个文件，237 个测试通过，3 个既有 opt-in 测试跳过（两个隔离沙箱测试和一个真实 NFS 测试）。
- TypeScript 编译与文档站构建通过。文档站检查包含不带版本标签的配置示例和 init 入口。
- 真实 `agent-harness-wiki-1.1.0.tgz` 在项目外、隔离 HOME、含空格路径和受控本地 npm registry 下完成 28 项验收，包括 init、CLI 五类查询与 SDK stdio MCP。运行依赖闭包 19 个包，无原生模块。结果工件为 `var/consumer-package/verification.json`。

真实 PTY 验证了 ResearchSpec 风格的搜索栏、多选标记、快捷键与完成摘要。先选择 Codex，再过滤选择 Cline，原选择仍保留；项目级计划列出 Cline 跳过理由，默认拒绝确认后未创建文件。单选 Cline 时，项目选项显示为禁用且不能提交，全局选项可提交；确认前 Ctrl+C 正确退出为 130，临时项目和 HOME 均无文件。

参数模式的 readline 确认同样在真实 PTY 中验证了 Ctrl+C：修正接口 SIGINT 处理后，退出码为 130，无配置写入。修正后的源码再次通过 `pnpm typecheck`、针对命令文件的 ESLint 和 Prettier 检查，随后完整验收链构建并验证了包含该修正的消费者 tarball。

`openspec validate consumer-mcp-init --strict` 和 `git diff --check` 通过。生产章节校验仍报告已有的覆盖不完整警告；本次未改变知识覆盖状态。未提交、发布或归档本 change。
