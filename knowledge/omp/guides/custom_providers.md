---
schema_version: 1
record_kind: production
guide_id: guide-omp-custom-providers
coverage_ref: coverage-omp-custom-providers
claim_refs: []
title: OMP 的自定义 provider 和模型
---

`18.3.4` 精确包内 `src/config/models-config.ts:38–105` 有 `validateProviderConfiguration`：它把“覆盖现有 provider 的少数字段”和“定义新的 models”分开。后者在代码中检查 `baseUrl`、鉴权方式、provider 或 model 级 `api`，并拒绝空 `id` 或非正数的窗口上限。`src/config/custom-models.ts:66–103` 再处理模型条目。因此只填一个端点地址未必构成完整新 provider；认证也不能由字段存在推断成功。

这些是**包内校验路径观察**，尚未被整理为覆盖全部配置层的已接受 Claim。要形成实例，先固定一个本地兼容端点与模型，记录配置通过/失败、模型是否列出及一次请求；再测试凭据缺失的诊断。不要把 schema 通过写成连接健康。来源为 npm 包快照（`snapshot-omp-npm`），Coverage `partial`。
