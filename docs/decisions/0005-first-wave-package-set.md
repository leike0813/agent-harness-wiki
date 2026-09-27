# 0005 — 首批精确包与本机保留策略

状态：accepted  
日期：2026-09-27  
对应：PRD §8、§12、§21.3，OpenSpec `m1-five-harness-knowledge`

首批 Linux/x64/glibc 调查分别固定 `@openai/codex@0.157.1`、`@anthropic-ai/claude-code@2.1.283`、`opencode-ai@1.18.32`、`@mariozechner/pi-coding-agent@0.73.1`、`@oh-my-pi/pi-coding-agent@18.3.4`。包名、版本及各自的 registry integrity 由 `research/package-set/pnpm-lock.yaml` 固定；安装用 pnpm 11.10.0 的独立项目、项目专属 store、冻结锁文件和 `--ignore-scripts`。所选版本是 2026-09-27 人工固定的基线，后续不会自动跟随 registry 更新。pnpm 在本机只安装当前 Linux/x64/glibc 的可用依赖闭包；锁文件仍保留其他平台的解析元数据。

包快照与 Git commit、未注明版本的官方文档分别建身份。OpenCode、Pi、OMP 的官方源码 submodule 分别固定在 `545f51d26cc39a907d2867492d498d9607ea5fa4`、`781152fc24841dc54b22284514604048ebe5e2c9`、`dff728c572a8c4c29016549b6e407c4550fcdac6`；现有 Codex 源码 commit 不移动。源码标签与 npm 版本相近并不构成已验证的构建映射。

本机受管可执行包只保留每个 harness 最近一次人工选定的稳定版本。刷新时先固定新锁文件、安装并审计新包，然后只清理项目专属 store 中的旧包字节。旧 KnowledgeRelease 的元数据与经审阅摘录保留可查；旧包原件缺失时，显式离线审计报告不可用，重新审计需按锁定身份重新取得。文档原件和模型保留规则不受包清理影响。该取舍避免本地包字节随版本数无限增长，也使历史原件的离线复核依赖重新获取。
