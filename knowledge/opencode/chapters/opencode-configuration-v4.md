---
schema_version: 3
record_kind: production
edition_id: opencode-configuration-v4
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
  - section_id: config-trust
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-trust
      - ref-opencode-config-managed-policy
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
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-config-debug-entries
      - ref-opencode-config-api-shape
      - ref-opencode-config-cli-debug-commands
      - ref-opencode-config-redact-code
      - ref-opencode-config-load-order
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-load-order
          - ref-opencode-config-discovery
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: partial
        source_refs:
          - ref-opencode-config-load-order
          - ref-opencode-config-api-shape
          - ref-opencode-config-merge
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-opencode-config-runtime
          - ref-opencode-config-vars
          - ref-opencode-config-discovery
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: conflict
        source_refs:
          - ref-opencode-config-trust
          - ref-opencode-config-managed-policy
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs:
          - ref-opencode-config-schema-keys
          - ref-opencode-config-defaults
          - ref-opencode-config-update-key
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
          - ref-opencode-config-load-order
---
本章依据固定源码提交 0d61729b 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.19.0 的运行时行为；以下路径与优先级属于固定源码知识，对 1.19.0 二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。

## 配置来源与优先级 {#config-sources}

实现中的加载顺序是一个显式数组，从低到高依次为：远端 well-known 配置、全局配置目录的补充条目、由 OPENCODE_CONFIG 指定的显式文件、项目直接命中的配置文件、项目配置目录的补充条目，最后是 OPENCODE_CONFIG_CONTENT 提供的内容。源码注释明确写着全局条目位于显式文件与直接命中文件之下、项目目录排在其上。 [@ref-opencode-config-load-order]

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

本提交把解析结果暴露为一组带来源的条目，而不是单一合并对象。文档条目记录 path 与解析后的字段，目录条目只记录 path；接口声明为返回所请求位置的配置文档与发现来源、从最低到最高优先级排列。 [@ref-opencode-config-api-shape] 这让“某个键最终来自哪一个文件”可以由条目本身回答，但条目之间的字段级合并规则（数组如何拼接、哪些键例外、空值与删除标记的语义）在本提交的固定范围内未找到对应实现说明，因此本项对“哪些键例外”保持 partial。 [@ref-opencode-config-load-order] [@ref-opencode-config-api-shape]

运行时还可用环境变量介入。OPENCODE_CONFIG 指定自定义配置文件，插在全局与项目之间；OPENCODE_CONFIG_DIR 指定额外配置目录，在全局与 .opencode 之后加载，可覆盖它们；OPENCODE_CONFIG_CONTENT 提供内联配置，位于项目之后：

```sh
export OPENCODE_CONFIG=/path/to/my/custom-config.json
export OPENCODE_CONFIG_DIR=/path/to/my/config-directory
opencode run "Hello world"
```

前提是这些变量在启动进程前已导出。生效结果是相应文件或目录进入上面的优先级序列，自定义目录按与 .opencode 相同的结构被搜索。本提交还新增了 OPENCODE_CONFIG_PROJECT_DISABLE，用于关闭项目配置发现；CLI 与服务端进程各自读取这组变量。 [@ref-opencode-config-runtime] [@ref-opencode-config-discovery]

配置值支持两类替换，可写在配置任意字段位置：{env:VAR} 取环境变量，缺失时替换为空串；{file:path} 取文件内容，路径相对配置文件目录或为绝对路径：

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

固定来源在这一题上出现分歧，两边都要说明。文档仍描述文件式受管设置：在系统受管配置目录放置 opencode.json 或 opencode.jsonc，macOS 是 /Library/Application Support/opencode/，Linux 是 /etc/opencode/，Windows 是 %ProgramData%\opencode；macOS 上还读取 ai.opencode.managed 偏好域，可由 MDM 下发 .mobileconfig。 [@ref-opencode-config-trust]

但在固定提交的实现侧，按这些路径与偏好域名检索源码未再找到对应的读取入口：旧提交中的受管配置加载文件在本提交已不存在，取而代之的是一套策略机制。组织策略由两部分组成——连接的控制台为登录用户编译出的策略语句，以及配置文档里 experimental.policies 字段的条目；两者都被折成带拒绝消息的语句列表，后者在配置文档里按从高到低顺序收集。 [@ref-opencode-config-managed-policy]

```json
{
  "$schema": "https://opencode.ai/config.json",
  "experimental": {
    "policies": []
  }
}
```

固定来源没有给出策略语句的完整字段清单，上面这个空数组示例只说明字段位置，不是可用配方的替代。适用边界是：文档描述的受管目录与 MDM 路径属于已文档化行为，本提交的实现只证实了策略语句这一条通道；两者是否仍同时生效，固定来源未说明，因此本项记为来源冲突。 [@ref-opencode-config-managed-policy]

用诊断命令核对受管键时要留意一处副作用：它打印的是经过脱敏的副本，凭据类取值显示为 ***，所以“键在不在”可以核对，“键的值对不对”不能靠它确认。脱敏只作用于调试输出，解析后的配置本身仍持有真实取值供 provider 使用。 [@ref-opencode-config-redact-code]

## 默认值与迁移 {#config-defaults}

运行时配置的 schema 在 opencode.ai/config.json。本提交的字段表有一处实质变化：自动更新的键不再是布尔或 notify，而是 update，取值为 disable、notify、auto 三选一。同一字段表里 permissions 是一个有序规则数组，每条规则由 action、resource 与 effect（allow、deny 或 ask）组成。 [@ref-opencode-config-schema-keys]

下面这个可放入 ~/.config/opencode/opencode.json 或项目 opencode.json 的示例关掉自动更新：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "update": "disable"
}
```

前提是键名与 schema 一致。生效结果是原本开启的自动更新被关闭。检查方式是诊断命令看解析结果。 [@ref-opencode-config-schema-keys] formatter 与 lsp 仍是默认关闭、需显式开启的选项。 [@ref-opencode-config-defaults]

迁移方面，旧键仍被接受并被改写。autoupdate 被解码为对应的 update 取值：false 映射 disable、true 映射 auto、字符串 notify 映射 notify；新写的 update 键则直接按 schema 解码。 [@ref-opencode-config-update-key] 旧的 permission 与 tools 规则连同新的 permissions 列表合并成一个有序数组；旧的 plugin 字符串或二元组被改写为带 package 与 options 的条目形式后，与新的 plugins 条目拼接。 [@ref-opencode-config-migration-normalize] 文档另说明 theme、keybinds、tui 等旧键已弃用并会尽可能自动迁移。

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
