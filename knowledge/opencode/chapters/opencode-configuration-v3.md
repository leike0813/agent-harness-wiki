---
schema_version: 3
record_kind: production
edition_id: opencode-configuration-v3
harness_id: opencode
topic: configuration
title: OpenCode 的配置机制
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-sources
      - ref-opencode-config-merge
      - ref-opencode-config-runtime
      - ref-opencode-config-vars
  - section_id: config-trust
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-trust
      - ref-opencode-config-diagnostics
      - ref-opencode-config-redact
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-schema
      - ref-opencode-config-defaults
      - ref-opencode-config-migration
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-diagnostics
      - ref-opencode-config-sources
      - ref-opencode-config-redact
      - ref-opencode-config-debug-cmd
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-sources
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs:
          - ref-opencode-config-merge
          - ref-opencode-config-sources
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-runtime
          - ref-opencode-config-vars
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs:
          - ref-opencode-config-trust
          - ref-opencode-config-redact
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs:
          - ref-opencode-config-schema
          - ref-opencode-config-defaults
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs:
          - ref-opencode-config-migration
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs:
          - ref-opencode-config-diagnostics
          - ref-opencode-config-sources
          - ref-opencode-config-redact
          - ref-opencode-config-debug-cmd
---
本章依据固定源码提交 907b3bc 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.34 的运行时行为；以下路径与优先级属于固定源码知识，对 1.18.34 二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。

## 配置来源与优先级 {#config-sources}

配置按固定顺序加载并合并：远程 .well-known/opencode、全局 ~/.config/opencode/opencode.json、自定义 OPENCODE_CONFIG、项目 opencode.json、.opencode 目录、内联 OPENCODE_CONFIG_CONTENT、受管文件，最后是 macOS 受管偏好。项目配置放在项目根，启动时从当前目录向上找最近的 Git 目录。.opencode 与 ~/.config/opencode 下的子目录用复数名（agents、commands、modes、plugins、skills、tools、themes），单数名向后兼容。 [@ref-opencode-config-sources]

一个可放入项目根 opencode.json 的最小完整配置如下（用户级版本放在 ~/.config/opencode/opencode.json，结构相同）：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true
}
```

前提是文件位于上述某个来源位置、JSON 或 JSONC 语法合法。生效结果是该文件与其它来源合并后参与运行时。检查方式见诊断一节。

多文件是合并而非替换，只有冲突键由后者覆盖，非冲突项保留。把两份实际文件放一起看更清楚。全局 ~/.config/opencode/opencode.json 写：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "autoupdate": true,
  "model": "anthropic/claude-sonnet-4-5"
}
```

项目根 opencode.json 写：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-haiku-4-5"
}
```

由于项目配置在全局之后加载，冲突键 model 取项目的值，未冲突的 autoupdate 保留全局的值，最终得到：

```json
{
  "autoupdate": true,
  "model": "anthropic/claude-haiku-4-5"
}
```

这段最终结果是按上面已确认规则推演的示例，文档原文给的是等价说法：全局设 autoupdate 为 true、项目设一个 model 时，最终配置同时包含这两项。 [@ref-opencode-config-merge] [@ref-opencode-config-sources]

源码用深合并，并对 instructions 这类数组字段拼接去重；disabled_providers 优先于 enabled_providers。文档没有穷举哪些键例外，空值与删除标记的语义也未说明，故本项对“哪些键例外”标 partial。

运行时还可用环境变量介入。OPENCODE_CONFIG 指定自定义配置文件，插在全局与项目之间；OPENCODE_CONFIG_DIR 指定额外配置目录，在全局与 .opencode 之后加载，可覆盖它们；OPENCODE_CONFIG_CONTENT 提供内联配置，位于项目之后：

```sh
export OPENCODE_CONFIG=/path/to/my/custom-config.json
export OPENCODE_CONFIG_DIR=/path/to/my/config-directory
opencode run "Hello world"
```

前提是这些变量在启动进程前已导出。生效结果是相应文件或目录进入上面的优先级序列，自定义目录按与 .opencode 相同的结构被搜索。CLI 参数与 profile 的介入方式未在本页说明，此项留缺口。 [@ref-opencode-config-runtime]

配置值支持两类替换，可写在 opencode.json 任意字段位置：{env:VAR} 取环境变量，缺失时替换为空串；{file:path} 取文件内容，路径相对配置文件目录或为绝对路径：

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

前提是变量或文件在解析配置时可读。生效结果是引用处被替换为实际取值，凭据因此可以留在配置文件之外。 [@ref-opencode-config-vars]

## 受管配置与信任 {#config-trust}

组织可通过受管设置强制配置，放在最高优先级层且用户不可覆盖。在系统受管配置目录放一个 opencode.json 或 opencode.jsonc：macOS 是 /Library/Application Support/opencode/，Linux 是 /etc/opencode/，Windows 是 %ProgramData%\opencode。这些目录需要管理员权限才能写入。macOS 上还可通过 MDM 下发 ai.opencode.managed 偏好域，plist 键直接映射到配置字段。 [@ref-opencode-config-trust]

前提是有管理员权限写入上述目录。生效结果是这些键出现在解析后的配置中且无法被用户或项目覆盖。固定来源没有单独的项目信任开关，信任相关限制体现在受管层，本项据此作答。检查方式是 opencode debug config，受管键也会出现在其中。 [@ref-opencode-config-diagnostics]

用这个命令核对受管键时要留意一处副作用：它打印的是经过脱敏的副本，凭据类取值显示为 ***，所以“键在不在”可以核对，“键的值对不对”不能靠它确认。脱敏只作用于调试输出，解析后的配置本身仍持有真实取值供 provider 使用。 [@ref-opencode-config-redact]

## 默认值与迁移 {#config-defaults}

运行时配置的 schema 在 opencode.ai/config.json，TUI 在 opencode.ai/tui.json，编辑器据此校验补全。默认行为上，autoupdate 默认开启，可设 false 或 notify；formatter 与 lsp 默认关闭，需显式开启或配置。平台差异由具体选项决定，例如 shell 未指定时按操作系统自动选择。 [@ref-opencode-config-schema] [@ref-opencode-config-defaults]

下面这个可放入 ~/.config/opencode/opencode.json 或项目 opencode.json 的示例关掉自动更新：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "autoupdate": false
}
```

前提是键名与 schema 一致。生效结果是原本开启的自动更新被关闭，改为 notify 时只在有新版本时提示。检查方式是 opencode debug config 看解析结果。这里选用 autoupdate 而非 formatter 或 lsp，是因为引用摘录只保留了后两者“默认关闭”的文字说明；它们在文档原文里既可写布尔量也可写对象，但具体形态需要以 opencode.ai/config.json 的 schema 为准，本节不复述摘录之外的语法。

迁移方面，opencode.json 中旧的 theme、keybinds、tui 键已弃用并会尽可能自动迁移；TUI 专属设置迁到 tui.json。Agent 的旧字段 maxSteps 也已弃用，改用 steps。文档未给出迁移失败时的替代路径或版本边界，故本项标 partial。 [@ref-opencode-config-migration]

## 诊断 {#config-diagnostics}

opencode debug config 打印解析后的最终配置，可核对实际生效的键；受管键也会出现在其中且不可被用户或项目覆盖。打印前会先对整棵配置做一次脱敏，命令把脱敏后的结果以 JSON 写到标准输出。 [@ref-opencode-config-diagnostics] [@ref-opencode-config-debug-cmd]

脱敏规则按键名和取值形态判定，命中即把整个字符串替换成 ***：

| 命中条件 | 例子 |
|---|---|
| 键名匹配 api.?key、secret、password、以 token 结尾、authorization 结尾、cookie 结尾、credential、private.?key | `options.apiKey`、`provider.anthropic.options.secretKey` |
| 键名为 headers 时，其下所有字符串取值一律替换 | `mcp.my-server.headers.Authorization` |
| 取值是 http/https URL 且带用户名或密码 | `https://user:pass@proxy.example.com/v1` |
| 取值是 http/https URL 且查询参数名命中上述敏感词 | `https://api.example.com/v1?apiKey=…` |

无法解析的 http/https 字符串也直接替换，避免原样外泄。数组逐项递归，嵌套对象同样处理。 [@ref-opencode-config-redact]

这条命令的定位因此要分清两件事：它适合回答“某个键最终生效了吗、来自哪一层”，不适合回答“凭据填对了吗”——凡是被脱敏的取值一律显示为 ***，看不出是写错、过期还是留空。核对凭据要改用实际调用结果或各 provider 的认证入口。文档也没有显示每个键来自哪个文件的命令，因此来源溯源仍是缺口，本项保持 partial。

排查“文件写了但没生效”时，按优先级检查是否有更高优先级的来源覆盖同一键，并确认配置目录正确、是否需要重启进程。 [@ref-opencode-config-sources]
