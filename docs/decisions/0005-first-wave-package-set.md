# 0005 — 首批精确包与本机保留策略

状态：accepted  
日期：2026-09-27  
对应：PRD §8、§12、§21.3，OpenSpec `m1-five-harness-knowledge`

2026-09-27 的首批 Linux/x64/glibc 调查基线分别是 `@openai/codex@0.157.1`、`@anthropic-ai/claude-code@2.1.283`、`opencode-ai@1.18.32`、`@mariozechner/pi-coding-agent@0.73.1`、`@oh-my-pi/pi-coding-agent@18.3.4`。当前选中版本以 `research/package-set/package.json` 和 `pnpm-lock.yaml` 为准；安装使用 pnpm 11.10.0 的独立项目、项目专属 store、冻结锁文件和 `--ignore-scripts`。pnpm 在本机只安装当前 Linux/x64/glibc 的可用依赖闭包；锁文件仍保留其他平台的解析元数据。

包快照与 Git commit、未注明版本的官方文档分别建身份。OpenCode、Pi、OMP 的官方源码 submodule 分别固定在 `545f51d26cc39a907d2867492d498d9607ea5fa4`、`781152fc24841dc54b22284514604048ebe5e2c9`、`dff728c572a8c4c29016549b6e407c4550fcdac6`；现有 Codex 源码 commit 不移动。源码标签与 npm 版本相近并不构成已验证的构建映射。

当前包集的 `package.json`、`pnpm-lock.yaml` 与 `node_modules/` 共同标识本机选中环境。维护者通过 `pnpm managed:packages observe` 查询官方 latest，通过 `update <harness-id>` 在忽略的候选目录安装、核对 registry integrity，并在 Linux bwrap 中检查五个直接入口；只有全部成功才切换包集。Claude Code 和 OpenCode 的入口指向已锁定的平台依赖，OMP 使用 Bun。失败保留当前包集和候选审计；成功切换的旧字节先移到忽略的备份目录，待人工检查后清理。旧 KnowledgeRelease 的元数据与经审阅摘录保留可查；旧包原件缺失时，显式离线审计报告不可用，重新审计需按锁定身份重新取得。文档原件和模型保留规则不受包清理影响。
