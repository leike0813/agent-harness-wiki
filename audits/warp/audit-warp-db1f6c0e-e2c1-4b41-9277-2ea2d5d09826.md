# warp — 2026-11-25 来源观察与 custom_providers 维护

- 审计：`audit-warp-db1f6c0e-e2c1-4b41-9277-2ea2d5d09826`
- 观察时间：2026-11-25T00:29:27.482Z
- 基线：上一审计 `audit-warp-a8e8554c` 的 observed 身份（2026-11-23）
- 状态：`changed`，`reviewed`

## 窗口与比较方法

逐源对比共享观察文档 `documents/<obs>.txt` 与基线文档，先按
`archive/warp/artifact-<source>-<sha>/source.md` 复核原件；只比较可见 Markdown
文本，忽略 `_astro/*.webp?dpl=` 的 CDN 部署标识、空白与纯格式。13 个 changed
来源中 9 个仅图片 CDN 噪声；4 个有真实文本差异：

| 来源 | 去噪后差异 | 结论 |
| --- | --- | --- |
| source-warp-docs-byok | 12 行 | Related pages 列表格式/两个标签改名（导航噪声）；但对照本章固定的 2026-10-12 快照，正文还含计划/eligibility 按产品线、platform charges、Claude linked billing、ZDR 重写、CLI 凭据分开配置 |
| source-warp-docs-custom-endpoint | 8 行 | Related pages 列表格式（导航噪声）；对照固定快照另有计划/eligibility、Warp Factories scope、本地 platform charges 细分、ZDR 重写 |
| source-warp-docs-custom-routers | 12 行 | Related pages 标题/格式、team-managed 行去掉计划限定、示例 YAML 默认 model_id 更新；无路由机制变化 |
| source-warp-docs-model-choice | 8 行正文 | 新增 GPT-6.2 Astra/Sol、Gemini 4 Neon/Hydrogen/Carbon、Kimi K3.1 Pro；表头改为 Supported `model_id` values |

其余 9 个 changed 来源（agent-notifications、agent-profiles、env-vars、
integrations、mcp、rules、slash-commands、ssh-extension、warp-drive）的差异逐行
核对后全部是同名图片的 `dpl=` 部署标识变化，无知识影响。

## 影响与选择

维护主题：仅 `custom_providers`（assignment 范围）。新建完整 edition
`warp-desktop-custom_providers-v6`，保留 v5 字节不动；`chapter-current.yaml`
把 custom_providers 指向 v6。

- `providers.entry` / `providers.auth`：计划与 eligibility 改为按产品线
  （Warp Terminal/local agents vs Warp Factories Scale/Enterprise）、BYOLLM
  Enterprise agreement、Warp credit/platform charges 口径、Claude linked
  billing（未登记来源）、CLI provider key 与应用分开配置；旧快照中
  「Warp 安全保存共享 key」不再作为当前结论，标为缺口。
- `providers.protocol`：本地 endpoint 的 platform charges 细分（Business/
  Enterprise 收，Free/Build/Max 不收）与 Factories 的 platform+hosted-compute。
- `providers.models` / `providers.metadata`：OpenAI 增 GPT-6.2 Astra/Sol 与
  GPT-6.1 Terra（无 `-max`）；Google 增 Gemini 4 Neon/Hydrogen/Carbon/Argon
  及无后缀别名档位；Fireworks 增 Kimi K3.1 Pro；Claude Fable 5.2 无固定默认
  ID。-max 覆盖范围与滚动清单说明同步。
- `providers.privacy`：ZDR 协议覆盖 Warp-managed provider 账号的受支持模型；
  保留清单为 Fable 5/5.1/5.2；BYOK/custom endpoint 不在覆盖内，需向 provider
  验证，隐私开关为 Help improve Warp 与 Store AI conversations in the cloud。
- `providers.diagnostics`：模型新增/下线示例、数据保留条件、计划与费用归属。

新增 4 个 artifact + 4 个 snapshot（`*-20261125`）与 25 条 `ref-warp-*-20261125`
引用；旧引用与快照保持不变。

## 历史 pending

`audit-warp-e8a44348` 的 providers.models/metadata/diagnostics 待办已由 v6 覆盖，
但该历史审计保持未关闭；本轮 `pending_audit_refs` 清空只表示不再作为阻塞引用。

## 校验

`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-10/candidates/warp`
通过。Warp 仍为 source-level 知识，`version_applicability=unknown`，未新增版本映射。
