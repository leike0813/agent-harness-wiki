# codebuff 上游巡检维护报告

- 审计：`audit-codebuff-d8c97acc-bd10-4208-b191-091fbae8bbcd`
- 巡检观察时间：2026-10-13T18:01:45.044Z（只读）
- 固定来源工作区：`ws-ebdf7ec0dff2-7351a614-83fa-4bfd-a9fa-5938dee778af`
  （`source-codebuff-repo` @ `ebdf7ec0dff254037b9830a8bad42e36a4f2afa4`）
- 本轮范围：triage 分类 `narrow_investigation`；只处理 skills 与 custom_providers 两主题的固定问题
  `skills.format`、`skills.extensions`、`skills.loading`、`providers.entry`、`providers.models`
- 交付方式：`pr`；本报告不进入发布数据。

## 1. 来源身份变化

| 来源 | 基线 | 观察值 | 处置 |
| --- | --- | --- | --- |
| source-codebuff-repo | `86e5fd356845357952cd85616446b60167da0944` | `ebdf7ec0dff254037b9830a8bad42e36a4f2afa4` | 单个 snapshot-sync 提交，116 个文件变化，已定点 diff |
| source-codebuff-npm | `1.0.688@sha512-lPbNFl8D…` | 同 | unchanged，不作为机制证据 |
| 10 个官方文档来源 | 见审计 checks | 各自变化 | 正文逐行相同，按无知识影响排除（见第 3 节） |

## 2. 仓库 diff 的逐文件结论

只 diff 本产品章节已引用为证据的文件（由协调者指定）。基线
`86e5fd356845357952cd85616446b60167da0944` → 观察 `ebdf7ec0dff254037b9830a8bad42e36a4f2afa4`。

| 文件 | 差异 | 与固定问题的关系 | 处置 |
| --- | --- | --- | --- |
| `common/src/util/parse-skill.ts` | +10 −1：`MATTER_OPTIONS.engines` 新增 `yaml: (source) => parseYaml(source)`，frontmatter 从 gray-matter 自带的 js-yaml 3 改为 `yaml` 包（YAML 1.2、默认关闭 merge key） | 直接改变 `skills.format` 的解析规则，并改变 `skills.extensions` 中"能否用锚点+merge key 补字段" | 已更新章节，出新 edition `codebuff-cli-skills-v3` |
| `common/src/util/__tests__/parse-skill-yaml.test.ts` | 新文件：merge-key 载荷不抛错且不触及 `Object.prototype`；普通 frontmatter 仍可解析 | `skills.format` 的回归证据（源码注释标 AB827V0 #288） | 新引用 `ref-codebuff-skills-parse-yaml-test-20261013` |
| `sdk/src/byok.ts` | +23 −5：新增导出 `byokListingHeaders`（OpenRouter 返回空头；其余带 bearer；`api.anthropic.com` 补 `anthropic-version: 2023-06-01`），上下文窗口发现与连接存储 `validate` 改为共用该函数 | 改变 `providers.models` 的清单请求机制，并在 `providers.diagnostics` 的校验探测上留下可见效果 | 已更新章节，出新 edition `codebuff-cli-custom-providers-v4` |
| `common/src/tools/constants.ts` | −3：`toolNames` 移除 `...COMPOSIO_META_TOOL_NAMES` 及其 import | 广告/外部应用工具名，与 skills/providers 固定问题无关 | 排除 |
| `agents/base2/base2.ts` | −8：删除 `ENABLE_COMPOSIO_TOOLS` 常量、工具名展开与提示分支 | 同上 | 排除 |
| `common/src/types/session-state.ts` | +3：`contextTokenBaseline` 锚点新增可选 `scale` | 本地 transcript 主题的计费缩放，不在 skills/providers 范围 | 排除 |
| `common/src/util/runtime-app-url.ts` | ±1：注释里删掉 "composio" 一词 | 纯注释 | 排除 |
| `sdk/src/impl/llm.ts` | +3：`promptAiSdkStream` / `promptAiSdk` / `promptAiSdkStructured` 透传 `costMode` | 计费模式透传，不改变本轮固定问题的机制 | 排除 |
| `sdk/src/impl/model-provider.ts` | +37 −4：新增 `isOpenRouterSettingsRejection` 与 OpenRouter 404 归因文案；`getModelForRequest` 在 free 模式下不继承 OpenRouter 环境变量密钥 | 属错误归因与密钥继承口径，落在 `providers.diagnostics`/`providers.forwarding` 的既有表述之外，未改变 `providers.entry`/`providers.models` 的机制 | 排除（记录在审计 notes） |
| `sdk/src/run.ts` | +171 −47：新增默认关闭的 `confineFileToolsToProject` 与 `refuseNonTextFileReads` 两个 SDK 选项、文件围栏与拒绝非文本读取；删除 Composio 分发分支 | 文件工具策略，属 configuration/custom_agents 入口，不在 skills/providers 范围 | 排除 |

范围外差异文件一并排除：`common/src/ads/**`（广告与赞助 Skill 机制，含
`sponsored-skill*.ts`、`agentic-ad-lab*.ts` 等）、`sdk/src/tools/sponsored-sandbox.ts`、
`sponsored-linux-runtime.ts`、`common/src/types/freebuff-byok.ts` 与
`common/src/constants/freebuff-models.ts` 等 freebuff 账户 BYOK 类型、评测基准文件与无关 UI 文件。

## 3. 文档正文同一性（十处来源全部排除）

在原项目 archive 的原件上逐对比对：`artifact-source-codebuff-docs-skills-872f06e8014a`
对 `…-e82054bb0e97`、`docs-mcp` `b0d1fd8f53b5` 对 `bc197965fa03`、`docs-agent-reference`
`e33c17af492c` 对 `413ce6455ae0`、`docs-agents` `94d85aa955d0` 对 `d9e619956dc5`、
`docs-knowledge` `beaf8e80485f` 对 `94268b8781e6`、`docs-troubleshooting` `1175832759b3`
对 `75c608bf4500`、`docs-agent-troubleshooting` `adbb05ba793c` 对 `b064d93db947`、
`docs-how` `96f19322b822` 对 `6092d350b60b`、`docs-quickstart` `4232918cfa75` 对
`1c5c346af05f`、`docs-sdk` `87b6b892f1c6` 对 `b9dbb0ef700c`。剥离站点构建指纹
（`buildId`、`_next` 脚本与 chunk 路径、长哈希与长数字）后，十对的正文逐行相同；
十个来源的变化只是站点重建指纹，不产生知识影响。

## 4. 固定问题结论

| 固定问题 | 结论 | 证据 |
| --- | --- | --- |
| skills.format | 变化，已更新 | `common/src/util/parse-skill.ts:82-93` 的 `MATTER_OPTIONS` 改用 `yaml` 包；`common/src/util/__tests__/parse-skill-yaml.test.ts:10-28` 只钉住 merge key 载荷不抛错且不触及 `Object.prototype` |
| skills.extensions | 变化，已更新 | 同一处引擎变更：merge key 不再展开，不能再用锚点补 `metadata`；宿主识别字段集合（`license`、`disable-model-invocation`、`metadata`）本身未变 |
| skills.loading | 不受影响，结案 | `sdk/src/skills/load-skills.ts`、skill 工具处理与 `available_skills` 注入在本提交无差异；加载与调用机制不变 |
| providers.entry | 不受影响，结案 | 连接记录字段（`id`/`revision`/`provider`/`model`/`baseUrl`/上限/`credentialRef`）与 `/byok` 命令面在本提交无差异；`byok.ts` 的改动只在清单请求头 |
| providers.models | 变化，已更新 | `sdk/src/byok.ts:235-252` 的 `byokListingHeaders`；`:453-457` 上下文窗口发现；`:1069-1078` 连接校验 |

## 5. 交付内容

新增记录（均在候选内）：

- `knowledge/codebuff/artifacts/artifact-codebuff-parse-skill-20261013.yaml`、
  `artifact-codebuff-parse-skill-yaml-test-20261013.yaml`、`artifact-codebuff-byok-20261013.yaml`
- 对应 `snapshots/snapshot-codebuff-parse-skill-20261013.yaml`、
  `snapshot-codebuff-parse-skill-yaml-test-20261013.yaml`、`snapshot-codebuff-byok-20261013.yaml`
- `references/ref-codebuff-skills-parse-yaml-20261013.yaml`、
  `ref-codebuff-skills-parse-yaml-test-20261013.yaml`、`ref-codebuff-byok-listing-headers-20261013.yaml`、
  `ref-codebuff-byok-listing-discovery-20261013.yaml`、`ref-codebuff-byok-listing-validate-20261013.yaml`
- `chapters/codebuff-cli-skills-v3.md`、`chapters/codebuff-cli-custom-providers-v4.md`
  （旧 edition `codebuff-cli-skills-v2.md`、`codebuff-cli-custom-providers-v3.md` 原样保留）

未改动：`registry/chapter-current.yaml`（选章切换由协调者在复核通过后处理）、catalog、
其他产品候选与原项目真源。

## 6. 复核

本轮两处结论改变已发布机制——SKILL.md frontmatter 的 YAML 引擎与 `/models` 清单请求头。
新 edition 保留 `review_status: pending`，需要独立 reviewer 复核以下各点：

1. `yaml` 包的 YAML 1.2 语义相对 js-yaml 3 的其他可观察差异（如布尔/八进制等标量解析）
   是否需要在 `skills.format` 之外单列一条限制说明；
2. `byokListingHeaders` 对 `openrouter` 返回空对象，因此连接校验侧的
   `Authorization: Bearer {apiKey}` 完整保留（不再随本轮覆盖成空头）；旧行为下该 bearer
   是否本来就出现在 `/key` 请求上，以及 base 主机名为 `api.anthropic.com` 时校验侧多出的
   `anthropic-version` 是否需要在 `providers.diagnostics` 口径中单列；
3. `providers.diagnostics` 中 `/byok validate` 对 `api.anthropic.com` 端点的 404/400 文案
   是否需要随本版一并修订。

## 7. 阻塞

无来源失败，无未决分歧。skills 与 custom_providers 的五个固定问题已全部结案；其余主题的
pending 问题保持原状，未重开。