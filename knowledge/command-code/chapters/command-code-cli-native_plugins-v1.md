---
schema_version: 3
record_kind: production
edition_id: command-code-cli-native_plugins-v1
harness_id: command-code
topic: native_plugins
title: "Command Code CLI 的原生插件（Mods）：模型定义、包格式、加载、ModApi 与诊断"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-cc-mods-rule, ref-cc-hooks-when, ref-cc-mods-builtin, ref-cc-mods-boundaries]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-cc-mods-package, ref-cc-mods-modapi]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-cc-mods-install, ref-cc-mods-filter, ref-cc-mods-toggle, ref-cc-cli-flags]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-cc-mods-where, ref-cc-mods-trust, ref-cc-mods-builtin]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-cc-mods-registration, ref-cc-mods-modapi, ref-cc-mods-live, ref-cc-mods-events]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-cc-mods-verify, ref-cc-mods-boundaries, ref-cc-mods-examples]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-cc-mods-rule, ref-cc-hooks-when, ref-cc-mods-builtin]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-cc-mods-package, ref-cc-mods-modapi]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-cc-mods-install, ref-cc-mods-filter, ref-cc-mods-toggle, ref-cc-cli-flags]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-cc-mods-where, ref-cc-mods-trust, ref-cc-mods-builtin]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-cc-mods-registration, ref-cc-mods-modapi, ref-cc-mods-live, ref-cc-mods-events]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-cc-mods-verify, ref-cc-mods-boundaries]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-cc-mods-verify, ref-cc-mods-examples]
---

本章的固定来源是 Command Code 官方文档站的页面快照（`/docs/mods`、`/docs/hooks`、`/docs/reference/cli`），抓取于 2026-10-01（各 snapshot 的 `source_fetched_at` 记录 UTC 时间戳 2026-09-30T17:08Z）；文档站只提供 HTML，引用按文档小节标题定位、摘录取自页面正文。Command Code 闭源，整章为来源级知识；Mods 页自身标注为 **Experimental**，`ModApi` 的接口与签名仍会变化。

Command Code 的“原生插件”就是 **Mod**：一个 TypeScript 包，导出工厂函数并针对 `ModApi` 编程；宿主在磁盘上发现它、启动时加载、用 jiti 现场编译成 agent 循环上的扩展。一个文件就能加工具、斜杠命令、可变生命周期钩子、事件观察者、输入拦截、feed 渲染、flag 与模型 provider。

## 什么是原生插件，与其它机制的关系 {#plugins-model}

文档把边界写得很直白：Mod **改行为**，`cmd.on(event, …)` 只**观察**——事件处理器不能阻止工具或改写上下文，要阻止就得用 `cmd.hooks`。Mod 与其它机制的分工：Hook 用于“模型之外的确定性执行”（拦破坏性操作、审计、注入必看上下文、暂停会话）；Mod 用于扩展 Command Code 本身（新工具、命令、flag、更广的生命周期行为）；Skill 给模型一个可选的工作流；slash command 让用户触发固定提示或动作；`AGENTS.md` 描述默认遵循但可偏离的项目规范。[@ref-cc-mods-rule][@ref-cc-hooks-when]

Mod 与 Skill、MCP server、Hook 脚本的关系是能力面不同而非替代：Mod 可以注册工具（模型可调用）、注册 provider、注册渲染器；Command Code 自己的内置功能——provider（`provider-anthropic`/`provider-copilot`/`provider-openai`）、更新提示、标题生成与 taste 学习触发——**就是**用同一套 API 实现的内置 mod，它们与任何 mod 一样出现在 `cmd mods list` 里（`source` 为 `builtin`），并可用同一个 `disabled` 键关闭。内置 mod 在名字冲突中永远胜过发现的同名 mod。[@ref-cc-mods-builtin]

边界（官方明确列出）：无沙箱（mod 是任意代码，只装你信任的包）；项目 mod 与项目 Skill 一样受信任门控，用户级与 `--mod` 的 mod 总是加载；**print 模式只加载用户级与 `--mod` 的 mod**，UI 桥降级为无头默认（confirm → false，select/input → undefined，绝不自动批准）；渲染是基于行的文本而不是组件。[@ref-cc-mods-boundaries]

## 包格式、入口与元数据 {#plugins-package}

包通过 `package.json` 声明它提供哪些 mod 文件，值是相对包根的精确路径、目录或 glob（越出包根的条目被丢弃）：[@ref-cc-mods-package]

```json
{ "name": "@team/review-mod", "commandcode": { "mods": ["./src/review.ts", "src/checks/*.ts"] } }
```

没有 manifest 时按 `mods/` 约定目录，再退到根 `index.ts`，即这个顺序决定入口。mod 文件本身是一个默认导出的工厂 `export default function (cmd: ModApi)`，可以是 async；**没有构建步骤**，jiti 在加载时编译 TypeScript。[@ref-cc-mods-package][@ref-cc-mods-modapi]

## 安装、固定版本、启用与卸载 {#plugins-install}

安装源与命令：[@ref-cc-mods-install]

```bash
cmd mods add cmd-mod-hi                  # 裸名 = npm 包
cmd mods add @team/review-mod@1.2.0      # scoped npm，固定版本
cmd mods add owner/repo@v1               # GitHub 简写（`git:` 前缀加主机路径可指定任意 git 主机）
cmd mods add ./tools/local-mod           # 本地路径，原地引用
cmd mods add -g owner/repo               # 用户作用域而非项目
cmd mods list                            # 别名 mods ls
cmd mods update                          # 重装缺失、对账已固定的 ref（别名 up）
cmd mods remove owner/repo               # 别名 mods rm
cmd mods open                            # 打开 mods 目录（--user 指向用户级）
```

- **来源判定**：不含斜杠的名字是 npm 包名，`@scope/name` 也是；git 简写一定带 `owner/repo` 斜杠，因此 `npm:` 前缀可省（显式 `git:` 前缀总是优先）。[@ref-cc-mods-install]
- **持久化**：来源存在 `mods.sources` 设置键里（项目作用域写 `.commandcode/settings.json`，`-g` 写 `~/.commandcode/settings.json`）；身份与版本/ref 无关——`owner/repo@v1` 与 `https://github.com/owner/repo` 是同一个包，项目条目遮蔽用户作用域的同身份条目。安装物落在各作用域下的 `.commandcode/mods/.registry/{npm,git}/` 目录里，**启动时绝不自己跑 npm/git**：配置了但缺失的包只给警告并指向 `cmd mods update`。[@ref-cc-mods-install]
- **部分加载**：`mods.sources` 条目可用对象形式加过滤，四种模式按优先级应用：`-path` 强制排除（精确，最高）→ `+path` 强制包含（精确）→ `!glob` 排除 → 纯 glob 包含。`cmd mods add`/`remove` 保留手写的对象条目，不会摊平过滤规则。[@ref-cc-mods-filter]
- **启用/禁用**：`cmd mods disable` 把名字加入 `mods.disabled`，`cmd mods enable` 从中移除（对 opt-in 内置 mod 还会加入 `mods.enabled`）；默认写项目级 `.commandcode/settings.json`，`-g` 写用户级。**任何**设置文件里的 `mods.disabled` 都会让 mod 保持禁用，即使另一个文件启用了它——此时 `cmd mods enable` 不会报告成功，而是点名那个文件、给出唯一修复办法并以退出码 1 结束。`settings.local.json` 里的禁用只能手工删除。[@ref-cc-mods-toggle]
- **CLI 侧开关**：`--mod` 为本次会话加载文件或目录（可重复），`--mod-option name=value` 设置 mod 声明的 flag。[@ref-cc-cli-flags]

## 发现、校验与加载顺序 {#plugins-discovery}

加载位置与作用域：[@ref-cc-mods-where]

| 位置 | 作用域 | 说明 |
| :-- | :-- | :-- |
| built-in | 随产品编译 | 第一方 mod，最先注册 |
| `~/.commandcode/mods/*.ts` | 用户 | 松散文件，一个文件一个 mod |
| `~/.commandcode/mods/` 下的子目录 | 用户 | `package.json` manifest → `mods/` 目录 → `index.ts` |
| `.commandcode/mods/`（项目内） | 项目 | 同样的布局；**通过工作区信任提示后才加载** |
| settings `mods.paths` | 用户/项目 | 显式文件/目录，相对该 settings 作用域 |
| settings `mods.sources` | 用户/项目 | 已安装的包 |
| `--mod` 加路径 | 会话 | 可重复；先于已安装项加载，且在同名冲突中获胜 |

点目录与 `node_modules` 从不扫描（包注册表放在 `mods/.registry/` 正是为了让发现跳过它）；**同名 mod 保留第一个并给警告**。[@ref-cc-mods-where]

信任与安全：没有沙箱，mod 是任意代码；项目 mod 通过工作区信任提示后才加载；用户级与 `--mod` 的 mod 总是加载；包安装用 `npm --ignore-scripts` 运行——mod 是 jiti 加载的 TypeScript，不需要构建步骤，因此生命周期脚本纯属攻击面。[@ref-cc-mods-trust]

内置 mod 用同一个主机、在任何发现的 mod 之前注册；名字冲突时内置胜出（加载器遮蔽该文件并给警告），且它们编译进产品、从不从可写路径 jiti 加载，因此不属于供应链攻击面。结构性 harness mod（workspace、compaction、checkpoints）承载正确性、保持无条件启用；只有观察型内置 mod 可禁用。[@ref-cc-mods-builtin]

## 扩展点与宿主 API 边界 {#plugins-api}

工厂收到的 API 绑定为 `cmd`。注册动词都是 `add*` 或 `hooks`/`on`，各自返回 `Disposable`（`.dispose()` 精确撤销该次注册，幂等）：[@ref-cc-mods-registration]

| 方法 | 作用 |
| :-- | :-- |
| `cmd.hooks(hooks)` | 可变生命周期钩子（见下） |
| `cmd.addTool(toolModule)` | 模型可调用的工具；`run` 返回 `{ok:true, content:[{type:'text', text}]}` 或 `{ok:false, error}`；`readOnly: true` 的工具在 plan 模式仍可用 |
| `cmd.addCommand({name, description?, argumentHint?, handler})` | `/name` 斜杠命令；handler 返回 `{prompt}`（发起自动回合）、`{message}`（信息行）或什么都不返回（纯副作用）；同名首次注册获胜 |
| `cmd.addFlag(name, {type, default?})` / `cmd.getFlag(name)` | 命名选项，值来自可重复的 `--mod-option name=value` |
| `cmd.addProvider(module)` | 通过内置 provider 用的同一 `ProviderModule` 接缝注册模型 provider；mod 只**扩展** provider 集合，从不替换 |
| `cmd.addRenderer(customType, data => lines)` | 自定义条目类型的渲染器；同名类型首次注册获胜 |
| `cmd.on(event, handler)` | 观察任意 `AgentEvent` 加宿主生命周期事件 `session_start`/`session_shutdown` |

`cmd.hooks` 接受的可变钩子包括 `transformContext`、`appendSystemPrompt`、`beforeToolCall`、`afterToolCall`、`onTurnStart`/`onTurnEnd`、`shouldStopAfterTurn`、`prepareNextTurn`、`onRunEnd`、`onStop`，以及宿主级的 `transformInput`、`onSessionStart`、`onSessionEnd`；多次 `hooks()` 调用按注册顺序组合。运行期方法包括 `cmd.showEntry`、`cmd.queueMessage`、`cmd.exec`、`cmd.setSessionName`/`setModel`/`setEffort`、`cmd.getAllTools`/`getActiveTools`/`setActiveTools` 与 `cmd.sessions`（compact/tree/navigate/label）。[@ref-cc-mods-modapi][@ref-cc-mods-live]

`cmd.on` 的事件类型覆盖 run/turn 边界、`model_request_start/end`、`tool_running`/`tool_completed`/`tool_errored`、`subagent_start`/`subagent_stop`/`subagent_progress`、`compaction_start`/`compaction_done`、`notice`、`session_titled`、`permission_mode_changed`、`config_setting_changed`、`mod_error` 等。事件处理器是隔离的：抛错会变成 `mod_error` 事件而不会崩溃。[@ref-cc-mods-events][@ref-cc-mods-modapi]

**API 边界**：`beforeToolCall` 在权限检查通过之后、执行之前触发，可返回 `{block?, input?, additionalContext?, terminate?}`；`afterToolCall` 收到 `isError` 并可返回 `{content?, isError?, additionalContext?, terminate?, modState?}`；`onTurnStart`/`onTurnEnd` 是唯一能无条件持久化状态变化的钩子（返回新的 `AgentState`）；钩子从不向抛错——运行器按 mod、按钩子捕获，并总是先发出 `mod_error {modId, hook, error}` 再回落到无崩溃默认值。[@ref-cc-mods-registration][@ref-cc-mods-live]

## 生命周期状态与诊断 {#plugins-lifecycle}

要区分的状态与观察入口：[@ref-cc-mods-verify][@ref-cc-mods-boundaries]

- **已配置（installed）**：来源写在 `mods.sources`；启动时绝不自动跑 npm/git，配置了但缺失的包只警告并指向 `cmd mods update`。
- **已发现并加载**：`cmd mods list` 每个 mod 一行（名字、作用域、来源），项目在前、用户在后、包提供的在最后；内置 mod 是 Command Code 内部件，**从不列出**。配置了但没有贡献任何 mod 的来源也不会出现在输出里，除非需要关注。
- **未加载（可诊断）**：导入失败、没有默认导出的工厂、工厂抛错、重名——都会变成**警告而不是崩溃的会话**，`cmd mods list` 打印的警告会说明原因。
- **启用/禁用**：`mods.disabled` / `mods.enabled` 设置键；禁用在任何设置文件里都生效。
- **验证循环**：① `cmd --mod ./your-mod.ts` 不安装直接试；② `cmd mods list` 确认注册；③ 逐个演练它注册的面（斜杠命令出现在补全里并产生行为、工具能被模型按名调用、hook 触发被守护的行为、`transformInput` 的改写/消费发生、`cmd.ui.setStatus` 出现在输入框下方的段落里）；④ 改文件后用 `/reload`——mods 每个进程只加载一次，`/reload` 重启进程并重新发现、重新导入所有 mod（jiti 不在两次加载间缓存）；⑤ 无头检查 `cmd -p "exercise the mod" --mod ./your-mod.ts`。
- **UI 的已知缺口**：`cmd.ui.widget` 与 `cmd.ui.refreshWidgets` 目前在 TUI 里**不渲染任何东西**（接口存在且安全可调），`setStatus` 已接线并正常渲染。
- **内置示例**：Command Code 自带可运行的单文件示例 mod（`slash-command.ts`、`custom-tool.ts`、`block-dangerous-commands.ts`、`input-shortcuts.ts`、`observe-events.ts`、`custom-entry-renderer.ts`、`flags-and-options.ts`、`lifecycle-hooks.ts`、`kitchen-sink.ts`），每个都在 CI 里通过真实 mod 加载器，直接问 Command Code 就能拿到对应示例。[@ref-cc-mods-examples]
