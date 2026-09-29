# Design

## Context

见 proposal.md。现有 Skill 同时承担新收录与上游维护，且描述里仍写 publisher 会触发受管刷新；受管二进制没有独立的模型调用入口。新 CLI 的 `pnpm sources:scan` 依赖已发布的当前章节，因此首次接入必须直接固定来源，不能用增量扫描或审计台账。

## Goals / Non-Goals

**Goals:** 把技能职责拆成新 CLI 接入、上游维护、受管二进制三块；每块有清晰入口、调用方与发布边界；publisher 与二进制彻底分开。

**Non-Goals:** 自动轮询上游、查询时调用模型、把二进制启动当知识发布门槛、首次接入时生成软件版本映射。

## Decisions

1. `harness-investigation` 只做新 CLI 接入：登记身份与来源，直接固定 Git/文档/npm 身份，采写七章，全七章与当前选择写入后运行 `pnpm knowledge:validate`。首次接入不运行 `pnpm sources:scan`、不写审计 YAML；审计台账属于维护阶段。
2. 官方 npm 来源在 onboarding 时只登记渠道与包名身份，不造 npm snapshot、artifact 或版本映射，除非实际检查过包字节。
3. 发布用 `pnpm chapters:update ... --stage --blocked '[]'` 生成不可变 release，验收后 `pnpm ahw publish --release-id <same-id>` 切换；同一 release ID 不用不带 `--stage` 的命令重跑。
4. `harness-maintenance` 承接原维护说明与报告模板；ID 模式对每个请求 ID 调用一次 `harness-binary`，即使来源未变化；定向模式只在明确要求时调用。
5. `harness-binary` 由模型调用，便于其它 Skill 触达；首次接入与更新统一 `pnpm managed:packages update <id>`，缺已核对官方 npm 来源或非 npm 分发报告 unsupported。

## Risks / Trade-offs

- 首次接入直接固定来源可能漏掉后续上游变化 → 发布后由 `harness-maintenance` 通过扫描接管。
- 二进制与知识分离可能让二进制落后 → ID 模式每轮强制核对最新，并单独报告。
- 同一 release ID 重复构建会失败 → 用 `--stage` 一次构建、`ahw publish` 一次切换。

## Migration Plan

把原 `harness-investigation` 的维护说明与 `assets/review-report.md` 迁到 `harness-maintenance`，`harness-investigation` 改写为接入流程，新增 `harness-binary`。更新 `.gitignore` 使三个 Skill 目录受跟踪，同步 AGENTS.md 与 docs。用 fixture 演练接入的七章校验与分段发布，不接入真实产品。
