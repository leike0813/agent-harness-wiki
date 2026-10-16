# opencode 维护报告：policies 提升为顶层配置键与受管层加载顺序反转

- 产品：`opencode`；主题：`configuration`（本轮唯一范围）
- 来源：`source-opencode-repo`，baseline `0af756b30fa12764cec7affc52c400043d24ffa2` → observed `8ffbcc2c81d1ff558618137204c36954797d7a6f`（refs/heads/dev）
- `source-opencode-npm` 本轮 unchanged：`opencode-ai@1.19.0`，integrity 与上一轮相同
- 固定工作区（只读）：`ws-8ffbcc2c81d1-2c550bff-22f2-4536-bfee-7c4f2750ea5b`
- 新增章节：`knowledge/opencode/chapters/opencode-configuration-v5.md`（v4 及更早版本保留未删）
- 自检：`pnpm maintenance:candidates check --candidate <root>` 通过

## 观察到变化的来源与定位

`0af756b3..8ffbcc2c` 命中本主题已引用文件的四个 hunk，全部逐字读过：

| 文件 | 定位 | 变化 |
|---|---|---|
| `packages/schema/src/config.ts` | 58-61 | `Config.Info` 新增顶层 `policies` 键（`ConfigPolicy.Info` 数组） |
| `packages/schema/src/config/experimental.ts` | 14-16 | `experimental.policies` 描述改为 “Deprecated: use top-level policies” |
| `packages/core/src/config/normalize.ts` | 192-195、382-427 | 新增独立 `normalizePolicies`，合并 V1 provider 列表、`experimental.policies`、原生 `policies` |
| `packages/core/src/managed-policy.ts` | 55 | 由 `entry.info.experimental?.policies` 改读 `entry.info.policies` |
| `packages/core/src/config.ts` | 244-288 | 受管层拆成 `managedPolicies`（置于数组最前）与 `managedSettings`（置于最末） |
| `packages/core/src/config/variable.ts` | 58-75 | 缺失/不可读的 `{file:}` 引用替换为空串并记警告，不再抛 `bad file reference` |

另经本范围核对但**逐字未变**：`packages/core/src/config/discovery.ts`、`packages/cli/src/commands/commands.ts`、`packages/cli/src/commands/handlers/debug/config.ts`、`packages/cli/src/commands/handlers/debug/redact.ts`、`packages/cli/src/config/migrate.ts`、`packages/protocol/src/groups/config.ts`。

## 语义判断与章节影响

1. **config.defaults / config.migration（answered，已改写）**：新增顶层 `policies`；V1 `enabled_providers`/`disabled_providers` 改为直接生成顶层 `policies` 的 provider.use 语句，不再生成 `experimental.policies`；旧键合并后解析结果只在顶层持有 `policies`。
2. **config.sources（answered，已改写）**：优先级序列新增首尾两段——只含 `policies` 的受管文档在最前、受管其余设置在最末（baseline 的返回字面量有 7 个 spread，本提交为 8 个，第 9 段是分组用的 `managed` 变量而非数组元素）。上一版正文所述“受管目录为最低优先级来源”不再成立。
3. **config.overrides（partial，仍未完成）**：本轮能确证的例外键只有 `policies`（数组按 generated → experimental → native 拼接，`statements()` 反转条目后 `findLast` 判定，Console 组织语句最终生效）。该证据不依赖受管层内部的层序结论，故 config.trust 的更正如第 5 条所述并不改变本项推理。普通对象/数组跨文件拼接、空值与删除标记语义在固定范围内仍无实现说明，未把 `Config.latest` 的单键 `findLast` 推广为全部键的规则。
4. **config.runtime（answered，已改写）**：`{file:}` 引用失败处理改变，缺失或不可读时替换为空串并记录警告，理由写在源码注释里（一个失效密钥引用不应让加载该配置的每个 Location 整体失败）。环境变量入口本身未变。
5. **config.trust（answered，来源分歧消除）**：受管目录与 MDM 偏好两条读取通道存在，且对普通设置具最高优先级，实现与文档一致；受管层内部的策略层序也与文档权威表第 2、3 行一致——macOS 偏好 plist 的策略权威高于系统目录。推导链条是两次反转叠加：`config.ts:248-251` 的 `managed` 先系统目录后偏好，`config.ts:252-264` 的 `managedPolicies` 在 flatMap 之后整体 `toReversed()`，使数组最前一段变为偏好在前；`managed-policy.ts:52-55` 的 `statements()` 再把整个条目数组 `toReversed()`，分组内次序回摆为系统目录在前；`managed-policy.ts:72` 的 `findLast` 因此取到偏好 plist 的语句。`config.ts:244-245` 的注释针对整个受管层而非仅普通设置，那个 `.toReversed()` 正是为让该注释对策略成立而存在。
6. **config.diagnostics（answered，已补充）**：`opencode debug config` 语义不变（脱敏后的条目数组），新增读者可见影响：受管目录同一文件在输出中出现两次，最前一条只含 `policies`，最末一条为其余设置。

## 排除项与理由

- `packages/core/src/config/plugin/provider.ts`（`??` 改 `||`）与 `packages/core/src/v1/config/migrate.ts`（新增 `packageSpecifier()`）属 custom_providers 的 provider 语义，不改变配置来源、优先级或合并规则。
- `packages/tui/**`、`packages/cli/src/ui/**` 属 TUI 呈现层；`packages/core/test/**` 为测试夹具。
- 两棵官方文档树并存：`services/www/src/docs/content/{config,pololicies}.mdx` 在本范围内实质改写（新增 policies 章节、权威表、Console 通道），`packages/web/src/content/docs/config.mdx` 逐字未变且仍只写 `experimental.policies`。本轮官方文档记述只取 `services/www` 一侧，未把旧树内容当作现行文档。

## 待办与复核

- `pending_question_ids`：`config.overrides`（唯一一项）。
- `review_status: pending`：本轮已按独立复核意见改正 config.trust（受管层内部层序此前推导反了，已按两次反转叠加重新推导），但 `config.sources` 的加载顺序改写仍触发高影响条件（新证据推翻已发布配置步骤、跨主题关键加载机制变化），退回同一独立 reviewer 复核。
- 上游审计 `0f16a4f4`、`2aa143e4`、`12691d48`、`52ea2a76`、`1a190643` 的 review_status 仍为 pending，本审计不通过标 reviewed 间接关闭其待办。
- `registry/chapter-current.yaml` 的 configuration 选择保持 `opencode-configuration-v4`；v5 为未发布草稿，复核批准前不切选择。

## 交付方式

`delivery=pr`：未运行 `pnpm ahw publish`、`pnpm chapters:update`、`pnpm managed:packages`，未修改 `registry/chapter-current.yaml`，未切换本地发布指针。
