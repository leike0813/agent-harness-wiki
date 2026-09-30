---
schema_version: 3
record_kind: production
edition_id: lingma-jetbrains-configuration-v1
harness_id: lingma
topic: configuration
title: "Lingma（Qoder CN）JetBrains 插件的配置：来源、优先级、运行期覆盖与诊断"
sections:
  - section_id: config-sources
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-hooks-config-files, ref-lingma-rules-limits, ref-lingma-config-proxy, ref-lingma-config-faq-plugin, ref-lingma-changelog-agentsmd, ref-lingma-extensions-overview, ref-lingma-commands-scope, ref-lingma-skills-roots]
  - section_id: config-overrides
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-hooks-config-files, ref-lingma-rules-setup, ref-lingma-rules-types, ref-lingma-skills-roots]
  - section_id: config-runtime-trust
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-config-proxy, ref-lingma-config-jetbrains, ref-lingma-config-faq-plugin, ref-lingma-config-faq-network, ref-lingma-changelog-mcp-policy, ref-lingma-extensions-overview, ref-lingma-login-options]
  - section_id: config-defaults-migration
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-hooks-config-format, ref-lingma-models-manage, ref-lingma-config-jetbrains, ref-lingma-agentmode-terminal, ref-lingma-compat-jetbrains, ref-lingma-changelog-migration, ref-lingma-changelog-byok, ref-lingma-login-migration]
  - section_id: config-diagnostics
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-diag-script, ref-lingma-diag-results, ref-lingma-config-faq-network, ref-lingma-hooks-config-files, ref-lingma-config-faq-plugin]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [jetbrains]
        section_id: config-sources
        status: partial
        source_refs: [ref-lingma-hooks-config-files, ref-lingma-rules-limits, ref-lingma-config-faq-plugin, ref-lingma-changelog-agentsmd]
  - question_id: config.overrides
    answers:
      - surface_ids: [jetbrains]
        section_id: config-overrides
        status: partial
        source_refs: [ref-lingma-hooks-config-files, ref-lingma-rules-types, ref-lingma-rules-setup]
  - question_id: config.runtime
    answers:
      - surface_ids: [jetbrains]
        section_id: config-runtime-trust
        status: partial
        source_refs: [ref-lingma-config-proxy, ref-lingma-config-jetbrains, ref-lingma-config-faq-network]
  - question_id: config.trust
    answers:
      - surface_ids: [jetbrains]
        section_id: config-runtime-trust
        status: partial
        source_refs: [ref-lingma-changelog-mcp-policy, ref-lingma-extensions-overview]
  - question_id: config.defaults
    answers:
      - surface_ids: [jetbrains]
        section_id: config-defaults-migration
        status: partial
        source_refs: [ref-lingma-hooks-config-format, ref-lingma-models-manage, ref-lingma-config-jetbrains]
  - question_id: config.migration
    answers:
      - surface_ids: [jetbrains]
        section_id: config-defaults-migration
        status: partial
        source_refs: [ref-lingma-changelog-migration, ref-lingma-changelog-byok, ref-lingma-login-migration]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-lingma-diag-script, ref-lingma-diag-results, ref-lingma-config-faq-network, ref-lingma-hooks-config-files]
---

## 配置来源与作用域 {#config-sources}

本章依据官方文档站点 docs.qoder.cn 的 Qoder CN（原通义灵码，2026-05-20 更名）用户指南与支持文档，界面口径为 catalog 唯一登记的 `jetbrains`（JetBrains IDE 插件，kind `ide`）；相关进程与目录仍为 `.lingma` / `Lingma.exe`。[@ref-lingma-config-faq-plugin]

Lingma 的配置来自多个入口，按作用域分层：

| 入口 | 作用域 | 说明 |
| :-- | :-- | :-- |
| 个人设置（插件内 UI） | 账号级 | 规则、MCP 服务、模型、高级（网络代理、本地存储路径、通信连接方式）等 |
| `~/.lingma/settings.json` | 用户级 | 对所有项目生效，官方以 Hooks 配置说明该文件 |
| `.lingma/settings.json` | 项目级 | 可提交到 Git，团队共享 |
| `.lingma/settings.local.json` | 项目级（本地） | 建议加入 .gitignore |
| `.lingma/rules/` | 项目级 | 项目专属规则（Rules），注入上下文的指令 |
| `.lingma/skills/`、`~/.lingma/skills/` | 项目级 / 用户级 | 技能（Skills） |
| `.lingma/agents/`、`~/.lingma/agents/` | 项目级 / 用户级 | 自定义智能体 |
| `AGENTS.md` | 项目根目录 | 智能体自动识别并加载该文件内容 |

settings.json 的三级路径与优先级来自 Hooks 文档，文档明确“多级配置会被合并执行” [@ref-lingma-hooks-config-files]。项目规则存于 `.lingma/rules`，仅对当前工程生效，单文件最大 10000 字符、超出自动截断，且不支持图片或链接解析 [@ref-lingma-rules-limits]。技能目录与同名覆盖规则见技能章节 [@ref-lingma-skills-roots]。

`AGENTS.md` 是代码仓库的指令文件：JetBrains 插件从 2.8.0 起“支持兼容 AGENTS.md：当前项目根目录下存在 AGENTS.md 时，智能体将自动识别并加载文件内容” [@ref-lingma-changelog-agentsmd]。索引排除通过项目根目录的 `.tongyiignore`（格式与 `.gitignore` 相同）控制 [@ref-lingma-config-faq-plugin]。

网络代理既可在插件设置中配置，也可落到 `config.json` 的 `http_proxy` 字段（路径 `C:\Users\{用户名}\AppData\Local\.lingma\config.json`）[@ref-lingma-config-proxy][@ref-lingma-config-faq-plugin]。

企业侧配置来自 Qoder CN 控制台的**扩展管理**：企业标准版、企业专属版的管理员在控制台创建自定义指令，JetBrains IDE 插件在授权范围内可用（该功能不适用于 Qoder CN IDE）[@ref-lingma-extensions-overview]。

缺口：文档以 Hooks 为例说明 settings.json 存在，但没有给出该文件的完整键表；个人设置各页面与 `.lingma` 目录之间的对应关系、是否存在设备级配置、以及是否支持组织级配置文件下发（除扩展管理与登录域名外）均未记录。个人版自定义指令（`.lingma/commands/`）文档明确“目前仅适用于 Qoder CN IDE”，因此对 JetBrains 插件不适用 [@ref-lingma-commands-scope]。

## 作用域选择与优先级 {#config-overrides}

**已证实的选择规则**：

- Hooks：多级配置合并执行，优先级从低到高为 `~/.lingma/settings.json` → `.lingma/settings.json` → `.lingma/settings.local.json`；同一事件下按配置声明顺序执行 [@ref-lingma-hooks-config-files]。
- 技能：同名时项目级 Skill 覆盖用户级 Skill [@ref-lingma-skills-roots]。
- 规则与记忆冲突：当规则和记忆存在冲突时，优先遵循规则执行 [@ref-lingma-rules-setup]。
- 规则四类型决定其生效范围：手动引入（`@rule` 唤起才生效）、模型决策（模型按描述自决）、始终生效（所有请求）、指定文件生效（按通配符匹配文件）[@ref-lingma-rules-types]。

缺口：settings.json 内**对象、数组、空值与删除标记**的合并/替换语义未记录；“项目级覆盖用户级”在技能上有明文，但智能体、规则等同名冲突的规则未写；也没有列出特例键。

## 运行期覆盖与信任边界 {#config-runtime-trust}

**运行期入口**：

- 网络代理（个人设置 - 高级 - 网络代理）：默认“使用系统全局配置”（读取操作系统全局环境变量中的网络代理），可改为“手动配置网络代理”（支持 HTTP、HTTPS、Socks5，需填写完整 URL）或“无需网络代理” [@ref-lingma-config-proxy]。JetBrains IDEs 的插件设置中另有 **HTTP Proxy Settings** 区域，选择 **Manual proxy configuration** 后在 **Proxy Configuration URL** 填写代理地址 [@ref-lingma-config-proxy]。
- 高级设置还提供“自定义本地存储路径”与“通信连接方式”（可选 **stdio** 或 **websocket**，JetBrains 插件 v2.1.4 及以上）[@ref-lingma-config-faq-plugin]。
- IDE 内偏好：快捷键重绑、行间生成启用/禁用、函数的行间快捷入口开关、IDE 原生补全与行间生成展示规则均在插件设置页调整 [@ref-lingma-config-jetbrains]。
- 环境连通性可通过 `curl https://lingma-api.tongyi.aliyun.com/algo/api/v1/ping`（返回 pong）与 `curl -I https://qoder.console.aliyun.com`（返回 302）验证；企业内网需把这些域名加入白名单或配置代理 [@ref-lingma-config-faq-network]。

**信任与策略**：

- 企业策略可拦截 MCP 服务，被拦截的服务在插件中展示为禁用状态 [@ref-lingma-changelog-mcp-policy]。
- 企业自定义指令由管理员在控制台按“公开（企业内已授权开发者）/ 私有（仅可见成员）”控制可见范围，指令启用或修改后预计需 5～10 分钟生效 [@ref-lingma-extensions-overview]。
- 登录入口区分权限体系：原灵码登录（阿里云账号）、Qoder 中国站登录（Qoder CN 账号，全家桶）、企业专属域名登录 [@ref-lingma-login-options]。

缺口：文档未描述 CLI 参数或 profile 覆盖文件配置、项目信任（首次打开是否信任）弹窗、以及组织策略对本地 `.lingma` 文件读取的限制；这些在本界面没有对应文档。

## 默认值、平台差异与迁移 {#config-defaults-migration}

**默认值与开关**：

- Hook 的 `timeout` 默认 30 秒 [@ref-lingma-hooks-config-format]。
- 模型显示状态：在“模型管理 - 默认”中用“显示状态”开关控制模型是否出现在选择器；可用模型“以客户端为准” [@ref-lingma-models-manage]。
- 行间生成：状态栏 Qoder CN 图标或设置页可启用/禁用，并设置生成长度；可分别控制本地离线模型与云端大模型，两者同时开启时优先推荐云端建议；IDE 原生下拉补全与行间生成“同时展示”默认不勾选 [@ref-lingma-config-jetbrains]。
- 终端命令自动执行：默认每次执行前需开发者确认；可在插件 **Chat** 设置页的 **Auto-Run - Terminal in Agent Mode** 中配置允许免确认自动执行的命令（多条用英文逗号分隔）[@ref-lingma-agentmode-terminal]。

**平台差异**：JetBrains 插件支持 Windows 7 及以上、macOS、Linux，IDE 版本 2020.3 及以上；Remote SSH、WSL 等远程开发与 VS Code WebIDE 也在兼容范围 [@ref-lingma-compat-jetbrains]。

**迁移** [@ref-lingma-changelog-migration][@ref-lingma-changelog-byok][@ref-lingma-login-migration]：

- 账号升级：由原灵码账号升级为 Qoder CN 账号后，原阿里云登录入口不再可用；登录后 AI 对话记录、个人配置等数据已自动迁移。
- 凭据迁移：更新日志记录“修复 BYOK 自定义模型凭据保存与迁移的问题，升级后自动迁移旧版凭据，并优化凭据异常提示与恢复指引”。
- 企业与模型：3.3.0 起支持企业自定义内置模型、专属模型、BYOK provider。

缺口：没有配置键的弃用/兼容策略文档，也没有“旧格式导入”说明；各版本默认值是否随版本变化只能逐条读更新日志，无集中迁移指南。

## 诊断：文件已写却没生效 {#config-diagnostics}

[@ref-lingma-diag-script][@ref-lingma-diag-results]

- **重启优先**：Hooks 明确“当前版本暂不支持热加载，修改 settings.json 后需要重启 IDE”；技能同样需要重启 IDE 才能在 `/` 列表中出现。改动 `.lingma` 下的配置文件后先重启 IDE。[@ref-lingma-hooks-config-files]
- **诊断脚本**：官方提供诊断脚本（Windows 为 `windows_lingma.bat`，Linux/macOS 为 `linuxormac_lingma_cn.sh`），自动收集系统环境、网络配置、Qoder CN 服务状态与日志 [@ref-lingma-diag-script]。
- **读诊断结果**：脚本输出包含网络连接测试、Qoder CN 进程存在性（Windows 为 `Lingma.exe`，macOS/Linux 为 `lingma`）、`[Lingma 版本信息]`、系统信息、安装目录结构与 `lingma.log` 末尾若干行（通常 80 行），据此定位错误与警告 [@ref-lingma-diag-results]。
- **重置本地缓存**：结束 Qoder CN 进程并删除 `.lingma` 目录后重启 IDE，可重新生成配置目录 [@ref-lingma-diag-results]。
- **查看生效来源**：文档未提供“打印当前生效配置”的命令；实际生效入口是个人设置 UI 与配置文件的组合，配合网络诊断面板（Qoder CN 设置 - 网络 - 运行诊断）核对连通性 [@ref-lingma-config-faq-network]。
- **代理不生效**：若域名保存未生效，可手动修改 `config.json` 的 `http_proxy` 字段后结束 Qoder CN 进程并重启 [@ref-lingma-config-faq-plugin]。

缺口：没有列出“配置被哪一层覆盖”的解析工具，也没有 settings.json 的校验错误提示入口；`.lingma` 目录下各文件是否被读取只能通过行为与日志间接判断。
