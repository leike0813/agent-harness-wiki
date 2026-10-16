---
schema_version: 3
record_kind: production
edition_id: opencode-configuration-v5
harness_id: opencode
topic: configuration
title: OpenCode 的配置机制
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-load-order
      - ref-opencode-config-discovery
      - ref-opencode-config-api-shape
      - ref-opencode-config-merge
      - ref-opencode-config-runtime
      - ref-opencode-config-vars
      - ref-opencode-config-entry-order
      - ref-opencode-config-managed-order-note
      - ref-opencode-config-file-reference
  - section_id: config-policies
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-load-order
      - ref-opencode-config-api-shape
      - ref-opencode-config-policies-key
      - ref-opencode-config-policies-deprecated
      - ref-opencode-config-policy-fields
      - ref-opencode-config-policies-merge
      - ref-opencode-config-policies-merge-note
      - ref-opencode-config-policy-statements
      - ref-opencode-config-policy-decision
      - ref-opencode-config-policies-doc-precedence
      - ref-opencode-config-policies-doc-order
      - ref-opencode-config-policies-doc-key
  - section_id: config-trust
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-trust
      - ref-opencode-config-managed-order-note
      - ref-opencode-config-managed-split
      - ref-opencode-config-managed-doc-locations
      - ref-opencode-config-managed-doc-precedence
      - ref-opencode-config-policies-doc-precedence
      - ref-opencode-config-redact-code
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-schema-keys
      - ref-opencode-config-defaults
      - ref-opencode-config-update-key
      - ref-opencode-config-migration-normalize
      - ref-opencode-config-migration-cli
      - ref-opencode-config-skills-key
      - ref-opencode-config-policies-deprecated
      - ref-opencode-config-policies-key
      - ref-opencode-config-policies-merge
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-debug-entries
      - ref-opencode-config-api-shape
      - ref-opencode-config-cli-debug-commands
      - ref-opencode-config-redact-code
      - ref-opencode-config-entry-order
      - ref-opencode-config-managed-split
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-load-order
          - ref-opencode-config-discovery
          - ref-opencode-config-entry-order
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-policies
        status: partial
        source_refs:
          - ref-opencode-config-load-order
          - ref-opencode-config-api-shape
          - ref-opencode-config-policies-merge
          - ref-opencode-config-policy-statements
          - ref-opencode-config-policy-decision
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-runtime
          - ref-opencode-config-vars
          - ref-opencode-config-discovery
          - ref-opencode-config-file-reference
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs:
          - ref-opencode-config-managed-doc-locations
          - ref-opencode-config-managed-doc-precedence
          - ref-opencode-config-managed-order-note
          - ref-opencode-config-managed-split
          - ref-opencode-config-policies-doc-precedence
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs:
          - ref-opencode-config-schema-keys
          - ref-opencode-config-defaults
          - ref-opencode-config-update-key
          - ref-opencode-config-policies-key
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs:
          - ref-opencode-config-migration-cli
          - ref-opencode-config-migration-normalize
          - ref-opencode-config-update-key
          - ref-opencode-config-skills-key
          - ref-opencode-config-policies-merge
          - ref-opencode-config-policies-deprecated
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs:
          - ref-opencode-config-debug-entries
          - ref-opencode-config-api-shape
          - ref-opencode-config-cli-debug-commands
          - ref-opencode-config-redact-code
          - ref-opencode-config-entry-order
---
本章依据固定源码提交 8ffbcc2c 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.19.0 的运行时行为；以下路径、优先级与合并规则属于固定源码知识，对 1.19.0 二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。相对上一版的实质变化是：配置 schema 新增顶层 `policies` 键，受管层改到加载序列末端，`{file:}` 引用缺失时不再报错。

## 配置来源与优先级 {#config-sources}

实现中的加载顺序是一个显式数组，从低到高依次为：受管层中**只含 policies 的文档**、远端 well-known 配置、全局配置目录的补充条目、由 OPENCODE_CONFIG 指定的显式文件、项目直接命中的配置文件、项目配置目录的补充条目、OPENCODE_CONFIG_CONTENT 提供的内容，最后是受管层中**去掉 policies 的其余设置**。 [@ref-opencode-config-managed-order-note] [@ref-opencode-config-entry-order]

```ts
return [
  ...managedPolicies,
  ...(yield* loadWellknown().pipe(Effect.orDie)),
  ...globalSupplementary,
  ...explicit,
  ...direct,
  ...projectSupplementary,
  ...content,
  ...managedSettings,
]
```

受管层在数组两端各出现一次，是本提交刻意的安排：普通设置放在末尾因而覆盖全部其它来源，而 policies 被单独拆出放到最前，因为策略求值是反序的（见下一节）。 [@ref-opencode-config-managed-split]

配置文件名固定为 opencode.json 与 opencode.jsonc，两者都被识别；项目侧按当前目录向上查找，同时收集 .claude、.agents、.opencode 三类目录与这两个文件名，并确保全局根不会通过项目遍历重复进入。 [@ref-opencode-config-discovery]

一个可放入项目根 opencode.json 的最小完整配置如下（用户级版本放在 ~/.config/opencode/opencode.json，结构相同）：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true
}
```

前提是文件位于上述某个来源位置、JSON 或 JSONC 语法合法。生效结果是该文件与其它来源合并后参与运行时。

多文件是合并而非替换，只有冲突键由后者覆盖，非冲突项保留：全局配置设 autoupdate、项目配置设一个 model 时，最终配置同时包含这两项。 [@ref-opencode-config-merge]

本提交把解析结果暴露为一组带来源的条目，而不是单一合并对象。文档条目记录 path 与解析后的字段，目录条目只记录 path；接口声明为返回所请求位置的配置文档与发现来源、从最低到最高优先级排列。 [@ref-opencode-config-api-shape] 条目之间的字段级合并规则（普通对象与数组如何跨文件拼接、空值与删除标记的语义）在本提交的固定范围内仍未找到对应实现说明；已能确证的例外只有 policies，见下一节。因此 config.overrides 对“哪些键例外”保持 partial。 [@ref-opencode-config-load-order] [@ref-opencode-config-api-shape]

运行时还可用环境变量介入。OPENCODE_CONFIG 指定自定义配置文件，插在全局与项目之间；OPENCODE_CONFIG_DIR 指定额外配置目录，在全局与 .opencode 之后加载，可覆盖它们；OPENCODE_CONFIG_CONTENT 提供内联配置，位于项目之后：

```sh
export OPENCODE_CONFIG=/path/to/my/custom-config.json
export OPENCODE_CONFIG_DIR=/path/to/my/config-directory
opencode run "Hello world"
```

前提是这些变量在启动进程前已导出。生效结果是相应文件或目录进入上面的优先级序列，自定义目录按与 .opencode 相同的结构被搜索。本提交还新增了 OPENCODE_CONFIG_PROJECT_DISABLE，用于关闭项目配置发现；CLI 与服务端进程各自读取这组变量。 [@ref-opencode-config-runtime] [@ref-opencode-config-discovery]

配置值支持两类替换，可写在配置任意字段位置：{env:VAR} 取环境变量，缺失时替换为空串；{file:path} 取文件内容，路径相对配置文件目录或为绝对路径。 [@ref-opencode-config-vars]

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": { "apiKey": "{env:ANTHROPIC_API_KEY}" }
    }
  }
}
```

{file:} 引用的失败处理本提交有实质变化：读取使用不会抛错的接口，文件缺失或不可读时替换为空串，并记录一条 “config file reference is missing or unreadable” 警告（含来源、引用与解析后的路径）；只有读取本身出错才抛出 bad file reference 错误。源码注释写明理由：与缺失的 {env:VAR} 一样，一个失效的密钥引用不应让加载该配置的每个 Location 整体失败。 [@ref-opencode-config-file-reference]

## 策略键与合并规则 {#config-policies}

运行时配置的 schema 顶层新增 `policies` 键，类型是有序的策略语句数组，描述为“控制对 provider、工具与集成的访问”。 [@ref-opencode-config-policies-key] 每条语句三个字段：`action` 取 `provider.use`、`tool.use` 或 `integration.use`，`resource` 是字符串（支持通配），`effect` 只有 `allow` 与 `deny` 两值——与 permissions 的三值 `effect` 不同，策略不会询问。 [@ref-opencode-config-policy-fields] 原位置 `experimental.policies` 仍在 schema 中保留，描述已改为 “Deprecated: use top-level policies”。 [@ref-opencode-config-policies-deprecated]

写入新键的最小完整示例：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "policies": [{ "action": "provider.use", "resource": "openai", "effect": "deny" }]
}
```

前提是键名与 schema 一致。生效结果是 `openai` 不再可用于模型选择与模型调用，官方文档另说明被拒的 provider 会从目录中移除，即便它有可用凭据。 [@ref-opencode-config-policies-doc-key]

归一化阶段把三个来源合并进同一个顶层 `policies` 数组，顺序固定：先是由 V1 `enabled_providers`/`disabled_providers` 生成的 provider.use 语句，再是 `experimental.policies`，最后是原生 `policies`。 [@ref-opencode-config-policies-merge] 源码注释把这套兼容规则直接写在归一化函数上方：V1 provider 列表与 `experimental.policies` 继续受支持并合并进顶层 `policies`，同一文档内后出现者胜出。 [@ref-opencode-config-policies-merge-note] 归一化只写顶层键：`experimental` 里不会再带出 policies，即使输入文档只有这一个实验键，`experimental` 也不会被保留。

跨文件的求值与普通设置相反。策略语句的收集先把文档条目数组整体反转，再按文档拼接各自的 `policies`，最后连接所连接 Console 的组织语句；判定用 `findLast`，即最后一条匹配语句生效，无匹配时默认放行。 [@ref-opencode-config-policy-statements] [@ref-opencode-config-policy-decision] 这里反转的对象正是本主题「配置来源与优先级」一节给出的那条按优先级排列的条目数组 [@ref-opencode-config-load-order]，条目数组本身由配置查询接口按从低到高优先级返回 [@ref-opencode-config-api-shape]。两个后果：

- 同一个文档内，`policies` 数组里靠后的语句覆盖靠前的；官方文档同样说明没有特例化规则，应把宽规则写在前面、例外写在后面。 [@ref-opencode-config-policies-doc-order]
- 跨文档时，加载顺序里位置靠**前**的来源（更宽、更外层）反而胜出。受管层 policies 之所以被拆出放到数组最前，就是为了拿到最终的文件内权威。

官方文档给出的权威顺序表与实现一致：连接的 Console 工作区最高，其次 macOS 受管偏好域，再到系统 opencode.json(c)、全局配置、直接命中的 opencode.json(c)（外层目录胜过内层），`.opencode/opencode.json(c)` 最低；文档同时声明普通设置由最近的配置胜出，而策略相反，受管配置与所连接 Console 始终有最终决定权。 [@ref-opencode-config-policies-doc-precedence]

受管层内部同样如此，两次反转叠加的结果与官方表格一致。加载时 `managed` 数组先放系统目录、后放偏好 plist；抽出 policies 时该分组整体 `toReversed()`，于是数组最前的一段变成偏好在前、系统目录在后；策略求值再把整个条目数组反转一次，分组内的相对次序随之回摆，最终在语句列表中系统目录排在偏好之前，`findLast` 取到的是偏好 plist 的语句——macOS 受管偏好域的策略权威高于系统目录。 [@ref-opencode-config-managed-split] [@ref-opencode-config-policy-statements] [@ref-opencode-config-policies-doc-precedence] 普通设置一侧也由 preferences 在 managedSettings 中位于系统目录之后而同样占优。 [@ref-opencode-config-managed-doc-precedence] 两处反转不是偶然：源码注释说明策略按加载反序求值，所以把受管 policies 拆出来放到最前正是为了让受管层拿到最终的文件内权威，同一段注释也直接写明“MDM preferences outrank the system directory as in V1”。 [@ref-opencode-config-managed-order-note]

## 受管配置与信任 {#config-trust}

本提交的实现与已文档化的受管设置行为完全一致，这一题不再有来源分歧。相对上一版的变化在于：上一版正文记载“按这些路径与偏好域名检索源码未再找到读取入口”，而本提交在 discovery 与加载实现中确认了两条读取通道，并让受管层在普通设置上取得最高优先级。

官方文档描述文件式受管设置：在系统受管配置目录放置 opencode.json 或 opencode.jsonc，macOS 是 /Library/Application Support/opencode/，Linux 是 /etc/opencode/，Windows 是 %ProgramData%\opencode；macOS 上还读取 ai.opencode.managed 偏好域，由 MDM 下发 .mobileconfig，用户专属的配置描述文件优先于机器级的；这些键与 opencode.json 字段一一对应，PayloadUUID、PayloadType 等 MDM 元数据会被自动剥离。 [@ref-opencode-config-managed-doc-locations] 仓库里另一棵文档树对受管设置给出同样的三个平台路径与偏好域名，只是把受管层排进优先级列表的第 7、8 位。 [@ref-opencode-config-trust]

本提交的实现侧确实存在这两条读取通道，而且普通设置的优先级已与文档一致：受管目录与偏好 plist 合并成一个 managed 数组（系统目录在前、偏好在后），policies 被抽出成只含策略的文档放到加载序列最前，其余受管设置去掉 policies 后放到最末，于是覆盖全部其它来源，偏好 plist 又排在系统目录之上。 [@ref-opencode-config-managed-order-note] [@ref-opencode-config-managed-split] 文档同段也确认受管设置具有最高优先级，用户与项目无法覆盖，偏好优先于系统目录。 [@ref-opencode-config-managed-doc-precedence]

策略一侧的层序与文档也一致：受管层内部两次反转叠加后，macOS 偏好 plist 的策略权威高于系统目录，与官方权威表第 2、3 行的次序相符。 [@ref-opencode-config-policies-doc-precedence] [@ref-opencode-config-managed-split] 受管目录与 MDM 路径被读取、对普通设置具最高优先级、且偏好优先于系统目录，这三点两侧一致，本提交的实现已完全兑现已文档化的受管设置行为。

用诊断命令核对受管键时要留意一处副作用：它打印的是经过脱敏的副本，凭据类取值显示为 ***，所以“键在不在”可以核对，“键的值对不对”不能靠它确认。脱敏只作用于调试输出，解析后的配置本身仍持有真实取值供 provider 使用。 [@ref-opencode-config-redact-code]

## 默认值与迁移 {#config-defaults}

运行时配置的 schema 在 opencode.ai/config.json。本提交的字段表相对上一版只有一处增补：新增顶层 `policies`；自动更新的键不是布尔或 notify，而是 update，取值为 disable、notify、auto 三选一；permissions 是一个有序规则数组，每条规则由 action、resource 与 effect（allow、deny 或 ask）组成。 [@ref-opencode-config-schema-keys] [@ref-opencode-config-policies-key]

下面这个可放入 ~/.config/opencode/opencode.json 或项目 opencode.json 的示例关掉自动更新：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "update": "disable"
}
```

前提是键名与 schema 一致。生效结果是原本开启的自动更新被关闭。检查方式是诊断命令看解析结果。 [@ref-opencode-config-schema-keys] formatter 与 lsp 仍是默认关闭、需显式开启的选项。 [@ref-opencode-config-defaults]

迁移方面，旧键仍被接受并被改写。autoupdate 被解码为对应的 update 取值：false 映射 disable、true 映射 auto、字符串 notify 映射 notify；新写的 update 键则直接按 schema 解码。 [@ref-opencode-config-update-key] 旧的 permission 与 tools 规则连同新的 permissions 列表合并成一个有序数组；旧的 plugin 字符串或二元组被改写为带 package 与 options 的条目形式后，与新的 plugins 条目拼接。 [@ref-opencode-config-migration-normalize] 文档另说明 theme、keybinds、tui 等旧键已弃用并会尽可能自动迁移。

策略键的迁移规则本提交新增：V1 的 `enabled_providers` 与 `disabled_providers` 不再生成 `experimental.policies`，而是直接生成顶层 `policies` 里的 provider.use 语句；写在 `experimental.policies` 的语句会被合并进顶层 `policies`，位置在 V1 生成语句之后、原生 `policies` 之前。 [@ref-opencode-config-policies-merge] [@ref-opencode-config-policies-deprecated] 前提是这些旧键仍出现在被加载的文档里；生效结果是最终配置只在顶层持有 `policies`，旧键在解析结果中不再单独存在。

Skill 相关的配置键也有同类改写：skills 的对象形式（paths 与 urls 两个子键）被展开合并成字符串数组，新的数组形式直接采用。 [@ref-opencode-config-skills-key]

此外 CLI 侧还有一层独立的迁移：读取旧版 tui.json 与 kv.json，把其中的 theme、keybinds、plugin 等设置改写进新的 CLI 配置文件后再落盘。 [@ref-opencode-config-migration-cli]

## 诊断 {#config-diagnostics}

诊断入口的命令名仍是 opencode debug config，但语义变了：它不再打印一份合并后的最终配置，而是打印一组配置条目（文档与目录），也就是解析结果按优先级从低到高排列的来源列表。CLI 处理函数通过服务端配置查询接口取回条目数组，脱敏后以 JSON 写到标准输出。 [@ref-opencode-config-debug-entries] [@ref-opencode-config-api-shape]

这条命令的另一个变化是可用的兄弟子命令变少了。CLI 的 debug 分组在本提交只剩 agents、config、paths 三项；旧提交里的 lsp、ripgrep、file、scrap、skill、snapshot、startup、v2、info、wait 等子命令均不再注册，因此旧文档引用的部分诊断命令在本提交已不可用。 [@ref-opencode-config-cli-debug-commands]

脱敏规则按键名和取值形态判定，命中即把整个字符串替换成 ***：

| 命中条件 | 例子 |
|---|---|
| 键名匹配 api.?key、secret、password、以 token 结尾、authorization 结尾、cookie 结尾、credential、private.?key | options.apiKey、provider.anthropic.options.secretKey |
| 键名为 headers 时，其下所有字符串取值一律替换 | mcp.my-server.headers.Authorization |
| 取值是 http 或 https 地址且带用户名或密码 | https://user:pass@proxy.example.com/v1 |
| 取值是 http 或 https 地址且查询参数名命中上述敏感词 | https://api.example.com/v1?apiKey=… |

无法解析的 http 或 https 字符串也直接替换，避免原样外泄。数组逐项递归，嵌套对象同样处理。 [@ref-opencode-config-redact-code]

由于输出是按优先级排列的条目列表，排查“文件写了但没生效”时应先确认目标键出现在哪一条目里，再对照该条目的 path 判断它来自哪一层；若同一键出现在多条目中，靠后的条目优先级更高。 [@ref-opencode-config-api-shape] [@ref-opencode-config-load-order]

排查受管来源时要多看两处：受管目录里的同一个文件会在输出中出现两次——最前面是一条只含 `policies` 的条目，最末尾是一条去掉了 `policies` 的其余设置。看 `policies` 是否被拒要读最前面那条，看普通设置是否被覆盖要读最末尾那条。 [@ref-opencode-config-entry-order] [@ref-opencode-config-managed-split]
