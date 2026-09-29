---
schema_version: 1
record_kind: production
guide_id: guide-omp-hooks
coverage_ref: coverage-omp-hooks
claim_refs: []
title: OMP 的 Hook 发现与执行
---

OMP 的 hook 调查应沿三段代码走：`src/capability/hook.ts` 定义能力与来源，`src/extensibility/hooks/loader.ts` 负责装载，`runner.ts` 负责执行，`types.ts` 描述事件形状。这比看见一个名为“hook”的设置更具体，也暴露了几个可能卡点：文件被发现、通过校验、满足事件条件、回调被运行，缺一环都不能说生效。

当前没有任何隔离 hook 的事件输出，既不能确认某个 event 名称在会话中的实际触发时机，也不能给失败处理配方。下一轮应选一次工具调用前后事件，用无副作用记录器检查发现结果、调用顺序和抛错时的行为；同时区分信任/启用状态。源码来自 18.3.4 包快照（`snapshot-omp-npm`），Coverage `partial`。
