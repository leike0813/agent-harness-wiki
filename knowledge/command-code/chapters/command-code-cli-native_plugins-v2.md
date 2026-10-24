---
schema_version: 3
record_kind: production
edition_id: command-code-cli-native_plugins-v2
harness_id: command-code
topic: native_plugins
title: "Command Code CLI 的原生插件（Mods）：ModApi、Hooks 与 ModContext、安装发现、热重载"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-cc-mods-rule-v2, ref-cc-mods-builtin-v2, ref-cc-mods-limits-v2, ref-cc-mods-quick-v2, ref-cc-mods-register-v2, ref-cc-mods-trust-v2]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-cc-mods-package-v2, ref-cc-mods-quick-v2, ref-cc-mods-fields-v2]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-cc-mods-cli-v2, ref-cc-mods-sources-v2, ref-cc-mods-filter-v2, ref-cc-mods-toggle-v2, ref-cc-mods-trust-v2, ref-cc-mods-package-v2]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-cc-mods-load-v2, ref-cc-mods-builtin-v2, ref-cc-mods-trust-v2, ref-cc-mods-reload-v2, ref-cc-mods-limits-v2]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-cc-mods-fields-v2, ref-cc-mods-register-v2, ref-cc-mods-hooks-v2, ref-cc-mods-context-v2, ref-cc-mods-modstate-v2, ref-cc-mods-ordering-v2, ref-cc-mods-events-v2, ref-cc-mods-ui-v2, ref-cc-mods-headless-v2]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-cc-mods-verify-v2, ref-cc-mods-reload-v2, ref-cc-mods-load-v2, ref-cc-mods-toggle-v2, ref-cc-mods-cli-v2, ref-cc-mods-sources-v2, ref-cc-mods-builtin-v2, ref-cc-mods-trust-v2]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-cc-mods-rule-v2, ref-cc-mods-builtin-v2, ref-cc-mods-limits-v2, ref-cc-mods-quick-v2]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-cc-mods-package-v2, ref-cc-mods-quick-v2]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-cc-mods-cli-v2, ref-cc-mods-sources-v2, ref-cc-mods-filter-v2, ref-cc-mods-toggle-v2, ref-cc-mods-trust-v2]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-cc-mods-load-v2, ref-cc-mods-builtin-v2, ref-cc-mods-trust-v2, ref-cc-mods-reload-v2, ref-cc-mods-limits-v2]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-cc-mods-fields-v2, ref-cc-mods-register-v2, ref-cc-mods-hooks-v2, ref-cc-mods-context-v2, ref-cc-mods-modstate-v2, ref-cc-mods-ordering-v2, ref-cc-mods-events-v2, ref-cc-mods-ui-v2, ref-cc-mods-headless-v2]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-cc-mods-reload-v2, ref-cc-mods-cli-v2, ref-cc-mods-toggle-v2, ref-cc-mods-sources-v2]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-cc-mods-verify-v2, ref-cc-mods-cli-v2, ref-cc-mods-builtin-v2, ref-cc-mods-trust-v2]
---

本章的固定来源是 Command Code 官方文档站的页面快照（`/docs/mods`、`/docs/reference/cli`），`/docs/mods` 于 2026-10-22 重新抓取（snapshot `snapshot-source-command-code-docs-mods-14e4c167d85f`，`source_fetched_at` 2026-10-22T12:53:28.655Z），其余页面沿用 2026-10-01 的抓取；文档站只提供 HTML，引用按文档小节标题定位、摘录取自页面正文。Command Code 闭源，整章为来源级知识；Mods 页自身标注为 **Experimental**，`ModApi` 的接口与签名仍会变化。

Command Code 的“原生插件”就是 **Mod**：一个针对 `ModApi` 编写的 TypeScript 文件或包。宿主在磁盘上发现它、启动时加载、用 jiti 现场编译成 agent 循环上的扩展；一行文件就能注册工具、斜杠命令、可变生命周期钩子、事件观察者、输入拦截、权限回答、transcript 改写、模型 provider、子代理类型、快捷键、pane/widget 与渲染器。

## 什么是原生插件，与其它机制的关系 {#plugins-model}

一个 mod 的工厂函数收到绑定为 `cmd` 的 API，可以注册的扩展点包括 `cmd.hooks`、`cmd.addTool`、`cmd.addCommand`、`cmd.addProvider`、`cmd.addRenderer`、`cmd.addAgent` 等；装载后的 mod 本身就是一个 `AgentMod`，宿主只是改用工厂文件而非代码 import 来构建它。工厂可以是 async，jiti 在加载时编译 TypeScript，因此**没有构建步骤**。[@ref-cc-mods-quick-v2][@ref-cc-mods-register-v2]

文档把边界写成一条规则：**`cmd.hooks` 改行为，`cmd.on` 只观察**。Hook 能拦/改/答工具调用、增改系统提示、改写 transcript 与流式输出、把单个请求发给另一个模型、回答权限提示、改写输入、强制继续一个本会结束的运行、响应会话起止；`cmd.on` 的事件处理器不能拦截或改写，只能观察，且抛错会变成 `mod_error` 事件而不是崩溃。[@ref-cc-mods-rule-v2]

与其它机制的分工：**Hook**（settings 里的 shell 脚本）是“模型之外的确定性执行”；**Mod** 用于扩展 Command Code 本身（新工具、命令、flag、UI 面、更广的生命周期行为）；**Skill** 给模型一个可选工作流；**slash command** 让用户触发固定提示或动作；MCP server 提供外部工具；`AGENTS.md` 描述默认遵循但可偏离的项目规范。Mod 现在还能注册子代理类型（`cmd.addAgent`）和附加 Skill 目录（`cmd.addSkillsPath`），因此它与 Agent、Skill 能力面可以互相供给，而不是互斥。[@ref-cc-mods-rule-v2][@ref-cc-mods-register-v2]

Command Code 自己的内置功能——provider（`provider-anthropic`/`provider-copilot`/`provider-openai`）、更新提示、标题生成与 taste 学习触发——**就是**用同一套 API 实现的内置 mod，与普通 mod 一样出现在 `cmd mods list` 里（`source` 为 `builtin`）。部分内置 mod 是 **opt-in**、默认禁用（如 `todos`），`cmd mods list --builtin` 会把它们标成 `disabled by default`。内置 mod 永远在发现的同名 mod 之前注册并遮蔽它（给警告），且编译进产品、从不从可写路径 jiti 加载，因此不属于供应链攻击面；结构性 harness mod（workspace、compaction、checkpoints）承载正确性，保持无条件启用。[@ref-cc-mods-builtin-v2]

边界与限制（官方明确列出）：无沙箱，mod 是以你的权限运行的代码，只装你信任的包——包安装用 `npm --ignore-scripts`；项目 mod 与项目 Skill 一样受信任门控，用户级与 `--mod` 的 mod 总是加载；**print 模式只加载用户级与 `--mod` 的 mod**，UI 桥降级为无头默认（confirm → false，select/input → undefined，绝不自动批准），要跑仓库自带 mod 需显式 `--dangerously-skip-permissions`；渲染是数据而不是组件（widget/pane/renderer 返回字符串或小元素树，mod 从不挂载 React 组件）；`cmd.ui.override` 能改 spinner、工具行、用户消息与命令输出行，但**永远不能改权限提示**；`onPermissionRequest` 只能回答引擎本来要问人的提示，`deny` 规则、plan 模式与 dont-ask 已先决定的范围不受影响；`cmd.sessions` 只覆盖 live harness 拥有的会话操作，创建/切换/分叉会话属于宿主生命周期。此外 `{"mods": {"disableAll": true}}` 与 `cmd --safe-mode` 可在需要时把已安装 mod 全部关掉（内置仍加载，safe mode 还跳过 `--mod` 路径）。[@ref-cc-mods-limits-v2][@ref-cc-mods-trust-v2]

## 包格式、入口与元数据 {#plugins-package}

包用 `package.json` 的 `commandcode` 字段声明内容，值是相对包根的确切路径、目录或 glob，越出包根的条目被忽略：[@ref-cc-mods-package-v2]

```json
{
  "name": "@team/review-mod",
  "commandcode": {
    "mods": ["./src/review.ts", "src/checks/*.ts"],
    "skills": ["./skills"]
  }
}
```

没有 `commandcode.mods` 时，宿主按 `mods/` 目录 → 根 `index.ts` 的顺序找入口。`commandcode.skills` 让一个包同时携带 Skill 目录（每个条目是一个 skill 目录或一组 skill 目录），一次 `cmd mods add` 就同时装上 mod 与其 Skill；代码里也可用 `cmd.addSkillsPath` 追加。[@ref-cc-mods-package-v2]

mod 文件本身是默认导出的工厂：`export default function (cmd: ModApi)`，签名 `ModFactory = (cmd: ModApi) => void 或 Promise`（工厂可为 async），每次 `add*`/`on`/`hooks` 调用返回 `Disposable`（`.dispose()` 精确撤销该次注册，幂等）。`cmd.name` 来自文件名或 manifest，是 `modState` 与注册命名空间的键。[@ref-cc-mods-fields-v2][@ref-cc-mods-quick-v2]

## 安装、固定版本、启用与卸载 {#plugins-install}

安装源与命令：[@ref-cc-mods-cli-v2]

```bash
cmd mods add cmd-mod-hi               # 裸名 = npm 包
cmd mods add @team/review-mod@1.2.0   # scoped npm，固定版本
cmd mods add owner/repo@v1            # GitHub 简写（git:{host}/… 可指定任意 git 主机）
cmd mods add ./tools/local-mod        # 本地目录，原地引用
cmd mods add -g owner/repo            # 装到用户作用域
cmd mods list                         # 安装列表，别名 mods ls
cmd mods update                       # 补装缺失、对账已固定的 ref，别名 up
cmd mods remove owner/repo            # 按来源移除，别名 mods rm
cmd mods inspect ./some-mod           # 静态读源码：列出它注册的 hook 与可达面
cmd mods open                         # 打开项目的 mods 目录（--user 指向用户级）
```

`cmd mods remove` 也接受 `cmd mods list` 打印的名字，并自动找对作用域：拖入的文件/目录从 mods 目录删除，包来源移除整个包并列出随之移除的 mod，`mods.paths` 条目删除对应设置项。[@ref-cc-mods-cli-v2]

来源判定与持久化：不含斜杠的名字或 `@scope/name` 是 npm 包（`npm:` 前缀可省），`git:` 前缀总是 git；来源写在 `mods.sources` 设置键（项目级 `.commandcode/settings.json`，`-g` 写 `~/.commandcode/settings.json`）；版本/ref 不改变来源身份（`owner/repo@v1` 与 `https://github.com/owner/repo` 是同一个包），项目条目优先于用户级的同包条目。安装物落在 `{scope}/.commandcode/mods/.registry/{npm,git}/`，**启动时绝不自己跑 npm/git**：配置了但缺失的包只给警告并指向 `cmd mods update`。[@ref-cc-mods-sources-v2]

部分加载：`mods.sources` 条目可写成对象形式加过滤，四种模式按顺序应用：① `-path` 强制排除该确切路径（最高）；② `+path` 强制包含；③ `!glob` 排除匹配；④ 纯 glob 包含（存在 include 时 mod 必须命中其一）。`cmd mods add`/`remove` 保留手写条目及其过滤规则。[@ref-cc-mods-filter-v2]

启用/禁用：`cmd mods disable {name}` / `enable {name}` 默认写项目 settings，`-g` 写用户级；`disable` 把名字加入 `mods.disabled`，`enable` 从该键移除，对 opt-in 内置还会加入 `mods.enabled`。**任何** settings 文件里的禁用都生效——宿主读用户、项目与 `settings.local.json` 三层，任一层的 `mods.disabled` 都让 mod 保持关闭；因此 `cmd mods enable` 在另一文件仍禁用时不报告成功，而是点名该文件、给出修复并以退出码 1 结束。没有任何命令写 `settings.local.json`，那里的禁用只能手工删除。在尚未打开过的项目里改开关仍会保存，但要等项目里启动 Command Code 才生效（`-g` 可立即作用于用户级）。[@ref-cc-mods-toggle-v2]

包还可以顺带提供 Skill 目录，安装后随包在每次会话加载。[@ref-cc-mods-package-v2] 安全侧：`cmd mods inspect` 只读文本、不 import，列出 hook 与可达面（进程、网络、文件系统、环境、权限回答、transcript 改写），并声明运行时 import/构建的代码可能更远；`--safe-mode` 与 `mods.disableAll` 是两级 kill switch。[@ref-cc-mods-trust-v2]

## 发现、加载与热重载 {#plugins-discovery}

加载位置与作用域：[@ref-cc-mods-load-v2]

| 位置 | 作用域 | 说明 |
| :-- | :-- | :-- |
| built-in | 随产品编译 | 第一方 mod，最先注册 |
| `~/.commandcode/mods/*.ts` | 用户 | 松散文件，一个文件一个 mod |
| `~/.commandcode/mods/{dir}/` | 用户 | `package.json` manifest → `mods/` 目录 → `index.ts` |
| `{project}/.commandcode/mods/…` | 项目 | 同样布局；**工作区信任后才加载** |
| settings `mods.paths` | 用户/项目 | 显式文件/目录，相对该 settings 作用域 |
| settings `mods.sources` | 用户/项目 | 已安装的包 |
| `--mod {path}` | 会话 | 可重复；先于已安装项加载，并在同名冲突中获胜 |

点目录与 `node_modules` 从不扫描（包注册表放在 `mods/.registry/` 正是为了让发现跳过它）；同名 mod 保留第一个并给警告。[@ref-cc-mods-load-v2]

内置 mod 在任何发现的 mod 之前注册，名字冲突时遮蔽文件并给警告；它们编译进产品、不从可写路径加载。[@ref-cc-mods-builtin-v2] 项目 mod 走与项目 Skill 相同的信任门控：工作区信任提示通过后才加载，用户级与 `--mod` 的 mod 总是加载；print 模式不显示信任提示，因此只加载用户级与 `--mod` 的 mod。[@ref-cc-mods-trust-v2][@ref-cc-mods-limits-v2]

**热重载**：在交互式 TUI 里，每个文件型 mod 都被监视，保存即重新 import 并原地替换——旧代码收到 `onSessionEnd`（`reason: 'reload'`），它做过的每次注册被 dispose，但 `cmd.addTool` 添加的工具除外（工具集按会话固定，旧代码保留到下一个会话）；`cmd.state` 保留，新代码的 `onSessionStart` 以 `source: 'reload'` 触发。加载时报错的保存会保留旧代码继续运行，并在 feed 里说明原因。`/mods reload [name]` 按需重载；`COMMANDCODE_MODS_HOT_RELOAD=0` 关掉监视器；新增 mod 文件仍需 `/reload` 重新发现；内置 mod 从不重载。[@ref-cc-mods-reload-v2]

## 扩展点与宿主 API 边界 {#plugins-api}

工厂收到的 `cmd` 表面（节选）：`cmd.name`、`cmd.cwd`、`cmd.session`（持久化接缝，绑定前为 undefined）、`cmd.events`（跨 mod pub/sub）、`cmd.ui`、`cmd.sessions`、`cmd.state`（会话值，热重载后保留）、`cmd.store`（跨会话值，`~/.commandcode/mods/.store/{mod}.json`）、`cmd.clock`、`cmd.model`、`cmd.prompt`、`cmd.process`、`cmd.audio`。[@ref-cc-mods-fields-v2]

注册动词都在工厂运行时调用并返回 `Disposable`：`cmd.hooks`、`cmd.addTool`、`cmd.addCommand`、`cmd.addFlag`、`cmd.addProvider`、`cmd.addRenderer`、`cmd.addShortcut`、`cmd.addSkillsPath`、`cmd.on`、`cmd.addAgent`、`cmd.expose`（配 `cmd.use` 让 mod 之间共享函数，`use` 在该 mod 暴露前返回 undefined）。[@ref-cc-mods-register-v2]

`cmd.hooks` 接受的可变钩子：`transformContext`、`appendSystemPrompt`、`transformSystemPrompt`、`transformMessage`、`transformTextDelta`、`beforeModelRequest`、`beforeToolCall`、`afterToolCall`、`onTurnStart`/`onTurnEnd`、`shouldStopAfterTurn`、`prepareNextTurn`、`onRunEnd`、`onStop`，以及宿主级 `transformInput`、`onPermissionRequest`、`onSessionStart`/`onSessionEnd`；多次 `hooks()` 按注册顺序组合。返回值语义是接口边界：`beforeToolCall` 可返回 `{block?, input?, additionalContext?, terminate?, result?}`（`result` 直接作为成功输出而不执行工具）；`transformTextDelta` 同步返回要显示的片段，返回 `''` 丢弃；`onStop` 返回 `{continue?, reason?}` 强制继续（只由自然结束触发，连续上限 8 次）；`onPermissionRequest` 返回 `allow`/`deny`，且 **deny 胜**——在安全强制提示上 `allow` 被忽略、仍会问人；`transformInput` 返回 `continue`/`transform`/`handled`（handler 链式，只拦真实键入的提示，斜杠命令与自动回合不经过它）。[@ref-cc-mods-hooks-v2]

**ModContext 与会话数据**：每个钩子都在最后一个参数收到 `ModContext`（`{emit, signal, cwd, session?}`），因此 mod 可以自抛事件并在无需额外管线的情况下持久化状态。`ctx.session` 与 `cmd.session` 是同一持久化接缝，写在与 transcript 相同的 append-only 会话文件里，有两种条目：`appendCustomEntry`（`custom`，mod 私有、**绝不**发给 LLM、不渲染）与 `appendCustomMessageEntry`（`custom_message`，下一回合作为普通 `user` 消息投影给模型；调用返回 `{entryId, message}`，mod **必须**把 `message` 折进该钩子返回的 `AgentState` 才能让模型当回合看到）；`getCustomEntries` 读回该 mod 自己写过的条目（过滤 `customType`，覆盖活动分支）。`session` 只在无持久存储的裸单元测试配置里缺失；`--no-session` 运行仍会填充它——条目照常追加、进程内可读，只是不落盘。[@ref-cc-mods-context-v2]

**持久状态约定**：`AgentState.modState` 是每个 mod 一个槽的只读记录（`string → unknown`），按 `id` 命名空间（按约定只写自己的槽），值必须可 JSON 序列化并随会话持久化；运行期易失数据（预算、锁、未决 promise）应放在工厂闭包里。`onTurnStart`/`onTurnEnd` 返回整个 `AgentState`，`afterToolCall` 可用 `modState` 字段持久化，`beforeToolCall` 没有状态通道；自定义数据绝不写进 `state.messages`。[@ref-cc-mods-modstate-v2]

**顺序与失败语义**：钩子按注册顺序执行（内置在前、调用方在后）；`beforeToolCall` 在 `tool_running` 之前完成且 `input` 改写跨 mod 链式，而 `tool_queued` 事件用的是模型原始输入；`afterToolCall` 在终止事件之前完成，其 `modState` 在工具结果消息之后、`onTurnEnd` 之前提交；`shouldStopAfterTurn` 在回合提交后求值，`prepareNextTurn` 仅在循环继续时运行，`onRunEnd` 在 `run_end` 前被 await。钩子从不向上抛错：运行器逐 mod、逐钩子捕获，并在回落到无崩溃默认值前发出 `mod_error {modId, hook, error}`。[@ref-cc-mods-ordering-v2]

`cmd.on` 覆盖任意 `AgentEvent` 类型（`run_start`/`run_end`、`turn_start`/`turn_end`、`model_request_start`/`model_request_end`、`tool_running`/`tool_completed`/`tool_errored`、`subagent_*`、`compaction_*`、`notice`、`session_titled`、`permission_mode_changed`、`config_setting_changed`、`mod_error` 等）加宿主生命周期事件 `session_start`/`session_shutdown`。[@ref-cc-mods-events-v2]

**UI 面**：`cmd.ui.setStatus(text|null)` 在状态行放每 mod 一个段（新调用替换、`null` 清除、晚到的 `Disposable` 不会擦掉新状态；多 mod 按加载顺序排在内置项之后），`cmd.ui.capabilities.status`/`surface` 告知该宿主是否渲染状态行、widget、pane 与 toast，可据此选择通知方式而不是永久降级。widget、pane、toast、renderer 与 `override`（只覆盖 spinner、tool_row、user_message、command_output 四个组件，首个返回节点的 mod 获胜、`next()` 拿到后续链）都是数据驱动。无头运行时它们被存储但不绘制，`confirm` 解析为 `false`，`select`/`input` 为 `undefined`，`notify` 打一行 notice，`addShortcut` 从不触发。[@ref-cc-mods-ui-v2][@ref-cc-mods-headless-v2]

## 生命周期状态、验证与诊断 {#plugins-lifecycle}

要区分的状态与观察入口：[@ref-cc-mods-verify-v2][@ref-cc-mods-reload-v2][@ref-cc-mods-cli-v2][@ref-cc-mods-sources-v2]

- **已配置（installed）**：来源写在 `mods.sources`；启动时绝不自动跑 npm/git，配置了但缺失的包只警告并指向 `cmd mods update`。[@ref-cc-mods-sources-v2]
- **已发现并加载**：`cmd mods list` 每个 mod 一行（名字、作用域、来源），项目在前、用户在中、包提供的在后；内置 mod 不列出，包来源只在“尚未安装”或“装了但没贡献任何 mod”时出现。[@ref-cc-mods-cli-v2]
- **启用/禁用**：`mods.disabled`/`mods.enabled`；任何 settings 文件里的禁用都生效，`mods list --builtin` 显示内置 mod 的禁用状态。[@ref-cc-mods-toggle-v2][@ref-cc-mods-builtin-v2]
- **已加载但未生效/失败**：导入失败、无默认导出工厂、工厂抛错、重名都变成警告而不是崩溃；`cmd mods list` 的警告说明原因。[@ref-cc-mods-verify-v2]
- **热重载（active）**：保存文件即重载；旧注册被 dispose（`addTool` 工具除外）、`cmd.state` 保留、`onSessionStart` 以 `source: 'reload'` 重启；`/mods reload [name]` 按需；新增文件需 `/reload`；`COMMANDCODE_MODS_HOT_RELOAD=0` 关闭监视。[@ref-cc-mods-reload-v2]
- **未加载（整体）**：`cmd --safe-mode` 或 `mods.disableAll` 只加载内置 mod（`--mod` 也被 safe mode 跳过），用于隔离一个坏 mod 或不可信仓库。[@ref-cc-mods-trust-v2]

验证循环：① `cmd --mod ./your-mod.ts` 不安装直接试；② `cmd mods list` 确认注册且无警告；③ 逐个演练注册面（斜杠命令出现在补全、工具被模型按名调用、hook 触发被守护的行为、`transformInput` 的改写/消费、状态段替换、widget 重绘、pane 的按钮与焦点、toast、override 生效、权限提示被回答）；④ 保存文件观察热重载或 `/mods reload`；⑤ 无头检查 `cmd -p "exercise the mod" --mod ./your-mod.ts`，并按无头默认值（confirm=false 等）设计行为；⑥ 需要发布时按 mods hub 的 `mods/registry.json` 条目提交 PR。`cmd mods inspect` 可直接给出 hook 与可达面清单。[@ref-cc-mods-verify-v2][@ref-cc-mods-trust-v2]
