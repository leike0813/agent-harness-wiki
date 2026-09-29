# 受管 CLI 包集

`package.json` 和 `pnpm-lock.yaml` 记录当前选中版本及依赖闭包；`node_modules/` 是其 Git 忽略的实际字节。首批五个官方 npm latest 渠道、后续新登记产品、Linux/x64/glibc 直接入口和运行时登记在 `src/sources/managed.ts`。不要通过 `.bin` 占位命令判断 Claude Code 或 OpenCode 是否可运行。

从仓库根目录执行：

```bash
pnpm managed:packages observe
pnpm managed:packages check-current
pnpm managed:packages update opencode
pnpm managed:packages update opencode <candidate-id>
```

`observe` 只读取官方 registry 元数据并记录 latest 的精确版本、integrity、观察时间、回退或同版漂移。`check-current` 用锁定的当前包在 Linux bwrap 中运行离线版本命令。`update <harness-id>` 在 `var/managed-packages/candidates/<id>/` 复制清单和锁文件，使用项目 `.pnpm-store/`、`--ignore-scripts` 安装，核对主包及平台依赖与官方 integrity，再对所有已选中 CLI（含本次候选）启动检查；全部成功才替换当前清单、锁文件和 `node_modules/`。失败候选和审计位于 `var/managed-packages/`，已有选中包集保持原状；成功切换的旧包字节保留为 `candidates/previous-<id>/`，可人工检查后按留存策略清理。

审计 JSON 记录实际入口、运行时、bwrap 参数、退出状态及有界输出。启动只证明对应二进制在此隔离条件下能响应版本命令，不是任何知识主题的证据，也不参与知识发布。当前实现仅支持 Linux/x64/glibc；其他平台需单独登记入口与隔离方案。

首次接入与后续更新由 [harness-binary](../../.agents/skills/harness-binary/SKILL.md) Skill 统一执行：先确认 `registry/sources/` 已有该产品的官方 `npm_registry` 来源，并在 `src/sources/managed.ts` 的 `managedPackages` 登记包名、直接入口、运行时、`identity` 与平台依赖，再运行 `pnpm managed:packages update <harness-id>`。非 npm 分发的产品报告 unsupported。
