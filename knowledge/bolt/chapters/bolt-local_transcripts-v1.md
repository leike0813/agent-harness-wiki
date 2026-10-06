---
schema_version: 3
record_kind: production
edition_id: bolt-local_transcripts-v1
harness_id: bolt
topic: local_transcripts
title: "Bolt 的本地会话记录：浏览器 IndexedDB 中的对话记录、写入生命周期与删除边界"
sections:
  - section_id: transcripts-scope
    surface_ids: [web]
    source_refs: [ref-bolt-lt-history-record-type, ref-bolt-lt-db-open-store, ref-bolt-lt-db-set-messages, ref-bolt-lt-chat-append-diff, ref-bolt-lt-llm-message-shape, ref-bolt-lt-chat-continuation, ref-bolt-lt-workbench-files-store, ref-bolt-docs-project-settings-backups, ref-bolt-docs-faq-version-history, ref-bolt-docs-index-backups-page]
  - section_id: transcripts-storage-layout
    surface_ids: [web]
    source_refs: [ref-bolt-lt-db-open-store, ref-bolt-lt-db-next-id, ref-bolt-lt-db-url-id, ref-bolt-lt-db-lookup, ref-bolt-lt-db-set-messages, ref-bolt-lt-workbench-files-store, ref-bolt-lt-history-record-type, ref-bolt-lt-history-item-link, ref-bolt-lt-chat-route-id]
  - section_id: transcripts-record-schema
    surface_ids: [web]
    source_refs: [ref-bolt-lt-history-record-type, ref-bolt-lt-db-set-messages, ref-bolt-lt-deps-ai-sdk, ref-bolt-lt-llm-message-shape, ref-bolt-lt-chat-append-diff, ref-bolt-lt-db-open-store]
  - section_id: transcripts-write-lifecycle
    surface_ids: [web]
    source_refs: [ref-bolt-lt-chat-store-trigger, ref-bolt-lt-history-store-write, ref-bolt-lt-history-load-resume, ref-bolt-lt-chat-continuation]
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [web]
    source_refs: [ref-bolt-lt-menu-history-list, ref-bolt-lt-menu-delete-chat, ref-bolt-lt-db-delete-by-id, ref-bolt-lt-db-open-store, ref-bolt-lt-db-next-id, ref-bolt-lt-db-lookup, ref-bolt-lt-db-set-messages, ref-bolt-lt-chat-append-diff, ref-bolt-lt-chat-store-trigger, ref-bolt-lt-history-record-type, ref-bolt-docs-faq-how, ref-bolt-docs-project-settings-backups, ref-bolt-docs-faq-version-history, ref-bolt-docs-index-backups-page, ref-bolt-docs-faq-account-delete, ref-bolt-docs-faq-tab-close]
  - section_id: transcripts-diagnostics
    surface_ids: [web]
    source_refs: [ref-bolt-lt-db-open-store, ref-bolt-lt-db-open-error, ref-bolt-lt-db-set-messages, ref-bolt-lt-history-load-resume, ref-bolt-lt-history-record-type, ref-bolt-lt-workbench-files-store, ref-bolt-lt-chat-store-trigger, ref-bolt-lt-menu-history-list, ref-bolt-lt-menu-empty-state, ref-bolt-lt-logger-level]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [web]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-bolt-lt-history-record-type, ref-bolt-lt-db-set-messages, ref-bolt-lt-chat-append-diff, ref-bolt-lt-llm-message-shape, ref-bolt-lt-chat-continuation, ref-bolt-lt-workbench-files-store, ref-bolt-docs-project-settings-backups, ref-bolt-docs-faq-version-history]
  - question_id: transcripts.location
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-bolt-lt-db-open-store, ref-bolt-lt-db-next-id, ref-bolt-lt-db-url-id, ref-bolt-lt-chat-route-id]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-bolt-lt-db-next-id, ref-bolt-lt-db-url-id, ref-bolt-lt-db-lookup, ref-bolt-lt-history-item-link, ref-bolt-lt-chat-route-id, ref-bolt-lt-db-set-messages]
  - question_id: transcripts.format
    answers:
      - surface_ids: [web]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-bolt-lt-db-set-messages, ref-bolt-lt-history-record-type, ref-bolt-lt-db-open-store]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [web]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-bolt-lt-history-record-type, ref-bolt-lt-db-set-messages, ref-bolt-lt-deps-ai-sdk, ref-bolt-lt-llm-message-shape]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [web]
        section_id: transcripts-write-lifecycle
        status: partial
        source_refs: [ref-bolt-lt-chat-store-trigger, ref-bolt-lt-history-store-write, ref-bolt-lt-history-load-resume, ref-bolt-lt-chat-continuation]
  - question_id: transcripts.database
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-bolt-lt-db-open-store, ref-bolt-lt-db-set-messages, ref-bolt-lt-workbench-files-store]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [web]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-bolt-lt-db-set-messages, ref-bolt-lt-db-lookup, ref-bolt-docs-faq-how, ref-bolt-docs-project-settings-backups, ref-bolt-docs-faq-version-history, ref-bolt-docs-index-backups-page]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [web]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-bolt-lt-menu-history-list, ref-bolt-lt-menu-delete-chat, ref-bolt-lt-db-delete-by-id, ref-bolt-lt-db-open-store, ref-bolt-lt-db-next-id, ref-bolt-lt-chat-store-trigger, ref-bolt-docs-faq-account-delete, ref-bolt-docs-faq-tab-close]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [web]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-bolt-lt-db-open-store, ref-bolt-lt-db-open-error, ref-bolt-lt-history-load-resume, ref-bolt-lt-history-record-type, ref-bolt-lt-chat-store-trigger, ref-bolt-lt-menu-history-list, ref-bolt-lt-menu-empty-state, ref-bolt-lt-logger-level]
---

## 固定来源与机制边界 {#transcripts-scope}

本章针对界面 `web`（Bolt web），固定来源有两组。源码组是官方开源仓库提交
`eda10b121221b30825a4c16eec5da1fd3eb1eb99` 的 11 个文件，每个文件一个 `source_revision`
快照（`snapshot-bolt-lt-*`，`source_fetched_at` 2026-10-06T04:33:01.201Z，`version_identity`
为该 commit）；文档组是官方帮助站已归档原件 `snapshot-bolt-docs-faq`、
`snapshot-bolt-docs-project-settings`、`snapshot-bolt-docs-index`
[@ref-bolt-lt-db-open-store][@ref-bolt-docs-faq-version-history][@ref-bolt-docs-index-backups-page]。

这个界面必须先分清三层东西，后面所有结论都只针对第一层：

| 层 | 是什么 | 落盘形态 |
| :-- | :-- | :-- |
| 本地会话记录 | 一次对话的消息数组 + 描述 + 时间戳 | 浏览器 IndexedDB（`boltHistory`） [@ref-bolt-lt-db-open-store] |
| 项目文件 | WebContainer 里生成/修改的代码文件 | 浏览器内的内存文件树，不在本主题记录里 [@ref-bolt-lt-workbench-files-store] |
| 托管侧项目版本 | 官方文档里的 Backups / Version History | 官方未描述其存储位置 [@ref-bolt-docs-project-settings-backups] |

`version_applicability` 边界：以上全部结论只证明**这个开源修订在该 commit 的 web 构建**的行为。
它不证明托管的 bolt.new 站点如何保存对话（catalog 中 `web` 界面到运行时的绑定仍是 `unknown`），
也不证明任何 npm 发行包的行为，因此本章不写 `mappings/`。

**transcripts.scope**：一条记录是"一次对话"的消息数组，加上 `description`、`urlId` 和写入时刻
`timestamp` [@ref-bolt-lt-history-record-type]。落盘内容与不落盘内容可由源码直接判定：

| 内容 | 是否落盘 | 依据 |
| :-- | :-- | :-- |
| 用户提示词正文 | 是 | 客户端把 `{role:'user', content}` 追加进消息数组 [@ref-bolt-lt-chat-append-diff] |
| 用户在编辑器里手改的文件 | 是，但以文本形式并入同一条用户消息 | 发送前把 diff 前缀拼到用户输入上 [@ref-bolt-lt-chat-append-diff] |
| 助手回复的流式文本 | 是 | 消息数组整体写入记录 [@ref-bolt-lt-db-set-messages] |
| 模型工具调用的参数与结果 | 否 | 记录的是客户端消息数组，而 `toolInvocations` 只出现在服务端请求结构里；工具循环与 token 续写都在 API 路由内完成 [@ref-bolt-lt-llm-message-shape][@ref-bolt-lt-chat-continuation] |
| 项目文件内容、终端输出、编辑器/预览状态 | 否 | 文件树是内存 `MapStore`，只有热更新数据跨刷新 [@ref-bolt-lt-workbench-files-store] |

记录开关只有一个：构建期环境变量 `VITE_DISABLE_PERSISTENCE`。设置后模块不会打开数据库，
`db` 为 `undefined`，之后任何写入都直接返回；没有按会话开关、没有保留期设置、也没有对提示词里
凭据的脱敏逻辑 [@ref-bolt-lt-history-record-type]。环境变量本身的加载与其他运行期常量见
`config.runtime`。

**缺口**：托管站点是否另有服务端对话副本，本轮固定来源没有任何说明；官方文档里的
"每次提示后自动保存版本"讲的是项目版本而不是会话记录 [@ref-bolt-docs-faq-version-history]。
因此 scope 记为 partial：客户端侧可证实，托管侧不可证实。

## 存储位置、标识与数据库布局 {#transcripts-storage-layout}

**transcripts.location**：会话记录只有一个落点——浏览器 IndexedDB 里的数据库 `boltHistory`，
版本号 1，只有一个对象仓库 `chats`，主键 `id`，另建 `id` 与 `urlId` 两个唯一索引
[@ref-bolt-lt-db-open-store]。这里没有文件系统路径可写：物理文件位置由浏览器和用户配置文件
（profile）决定，固定来源不描述它，也不随操作系统给出不同路径。作用域是"源（origin）+ 浏览器
配置文件"，不是"项目目录"——项目维度只作为记录里的一个字段存在，不体现在路径上。

路径相关变量的实际影响面很小：

| 变量 | 影响 | 依据 |
| :-- | :-- | :-- |
| `VITE_DISABLE_PERSISTENCE` | 完全不落盘（不打开数据库） | [@ref-bolt-lt-history-record-type] |
| 浏览器 / 源 / 用户配置文件 | 决定这份记录归属哪个存储空间 | [@ref-bolt-lt-db-open-store] |
| 操作系统 | 固定来源未描述差异 | — |

**transcripts.database**：用的确实是数据库，但只有一个浏览器内数据库、只有一个对象仓库，没有本地
文件、没有独立索引文件，也没有配套的辅助状态文件：索引就是 `chats` 上的 `id` 与 `urlId` 两个唯一
索引 [@ref-bolt-lt-db-open-store]。仓库里存的是**会话正文加元数据**（消息数组、`description`、
`urlId`、写入时间），不是指向别处的引用。恢复一条会话的必要条件就是 `chats` 仓库中那一条完整
记录；项目文件树本身是内存 `MapStore` [@ref-bolt-lt-workbench-files-store]，所以记录无法从工作区
文件重建。

**缺口**：托管站点是否另有服务端记录库，本轮固定来源无说明（见上一节与归档一节）；因此这一题
只能确认客户端这一侧的分工，记 partial。

**transcripts.naming**：这一题在固定 commit 上可完整回答。三个标识的生成规则是确定的：

| 标识 | 取值 | 生成规则 | 依据 |
| :-- | :-- | :-- | :-- |
| `id` | 十进制字符串 | 取当前最大主键数值加一（无记录时为 `"1"`） | [@ref-bolt-lt-db-next-id] |
| `urlId` | 首个 artifact 的 id | 与已有 `urlId` 冲突时追加 `-2`、`-3`…… 直到不冲突 | [@ref-bolt-lt-db-url-id] |
| `timestamp` | ISO 8601 字符串 | 每次写入时用 `new Date().toISOString()` 刷新，因此它是**最后写入时间**，不是创建时间 | [@ref-bolt-lt-db-set-messages] |

URL 侧用 `urlId`：`/chat/{urlId}` 是历史列表的链接目标，列表标题取记录的 `description`
[@ref-bolt-lt-history-item-link]；路由把路径段原样交给客户端作为查询键
[@ref-bolt-lt-chat-route-id]，查询先按 `id` 索引找，找不到再按 `urlId` 索引找
[@ref-bolt-lt-db-lookup]。

关于父子与分支：**记录里没有任何父子或分支字段**。`urlId` 的 `-2` 后缀是"不同会话撞上同一个
artifact id"时的命名去重，不是分支关系 [@ref-bolt-lt-db-url-id]。这个修订也没有子代理交接记录
的机制。删除后主键可被复用（`getNextId` 只看当前最大值），所以 `id` 也不是稳定身份，`urlId`
才是 URL 意义上的身份。

## 记录格式与 schema {#transcripts-record-schema}

**transcripts.format**：格式是 IndexedDB 的结构化克隆值（浏览器内部的二进制编码），不是
JSON/JSONL 文件，也没有分片、压缩或追加日志。写入方式是 `store.put(...)` **整条覆盖**，
每次都提交完整消息数组 [@ref-bolt-lt-db-set-messages]。因此：没有增量日志可回放，最后一次写入
覆盖此前全部内容，损坏时无法从事务日志恢复；时间戳随每次写入刷新。

**transcripts.schema**：第一方记录类型就是全部字段，源码里以接口形式给出
[@ref-bolt-lt-history-record-type]，写入时构造的对象字面量与之对应
[@ref-bolt-lt-db-set-messages]：

```jsonc
// 脱敏的最小结构，值为占位内容，不是真实记录
{
  "id": "7",                                  // 主键，递增十进制字符串
  "urlId": "k3f9x2",                          // 首个 artifact 的 id，冲突时追加 -2
  "description": "首个 artifact 的标题占位",     // 列表显示名；缺失时记录不会出现在侧栏
  "messages": [                               // 完整消息数组，每次写入整体覆盖
    { "role": "user", "content": "提示词正文占位" },
    { "role": "assistant", "content": "流式返回文本占位" }
  ],
  "timestamp": "2026-01-01T00:00:00.000Z"    // ISO 8601，最后一次写入时刻
}
```

这个示例是脱敏的最小结构，不是真实会话。`messages` 元素的类型来自第三方 `ai` 包
（依赖声明为 `ai@^3.3.4`）[@ref-bolt-lt-deps-ai-sdk]，本仓库只在追加时构造
`{role:'user', content}` [@ref-bolt-lt-chat-append-diff]。

版本与迁移：记录里**没有 schema 版本字段**，数据库版本被钉死在 1，升级回调只在 `chats` 仓库
不存在时创建它和两个索引 [@ref-bolt-lt-db-open-store]。也就是说固定来源里没有任何记录级迁移
逻辑——将来若记录结构变化，产品内没有升级路径可循。

**缺口**（照实列出，不归纳通用 schema）：

- 单条消息的完整字段集（消息 id、创建时间、附加文件、注解等）不在本仓库源码内，固定来源只
  能证实 `role` 与 `content` 被写入；
- 服务端消息结构里的 `toolInvocations` 属于请求体，不是记录字段 [@ref-bolt-lt-llm-message-shape]；
- 结构化克隆的**具体字节编码**由浏览器决定，固定来源无从证实，因此 format 只能给到"整条覆盖写
  + 浏览器内部编码"这一层。

## 写入、恢复与延续 {#transcripts-write-lifecycle}

**transcripts.lifecycle**：写入时机是"客户端消息数组每次变化且长度超过已加载基线"时触发一次全量
写入 [@ref-bolt-lt-chat-store-trigger]。由此可以逐阶段确认：

| 阶段 | 行为 | 依据 |
| :-- | :-- | :-- |
| 创建 | 惰性创建：首次满足触发条件时，先看 workbench 的首个 artifact，有 id 就用 `getUrlId` 生成 `urlId`，否则取 `getNextId` 的下一个主键 | [@ref-bolt-lt-history-store-write] |
| 地址栏 | 分配到标识后用 `history.replaceState` 改写为 `/chat/{urlId}`，不走 Remix 导航（源码注释说明这是为了不触发 `Chat` 组件重渲染） | [@ref-bolt-lt-history-store-write] |
| 追加 | 没有追加语义：每次都是整条 `put` 覆盖，事务提交即落盘，没有显式 flush 或防抖 | [@ref-bolt-lt-db-set-messages] |
| 关闭 | 卸载时不做任何写入；最后一次消息变化的结果就是最终状态，生成中途的半截输出不单独记录 | [@ref-bolt-lt-chat-store-trigger] |
| 恢复 | 打开 `/chat/{id}` 时按该键读记录，把 `messages` 作为 `initialMessages` 回填，并同步 `urlId`、`description`、`chatId`；**记录不存在或消息数为 0 时直接 `navigate('/', {replace:true})` 跳回首页** | [@ref-bolt-lt-history-load-resume] |
| 分支 / 子代理 | 无此机制（见命名一节） | [@ref-bolt-lt-db-url-id] |
| 上下文压缩后延续 | 固定源码里没有任何摘要或压缩写入路径；长对话只是让同一条记录持续变大 | [@ref-bolt-lt-db-set-messages] |

一个容易踩的边界：达到单次响应 token 上限时，服务端会自己续写多段（追加 assistant 内容与一条
继续提示），但这些段落**不回传客户端**，因此不在记录里 [@ref-bolt-lt-chat-continuation]。也就是说
"助手实际生成的完整内容"与"记录里的内容"在这条路径上并不等价。

## 归档、备份、移动与删除 {#transcripts-archive-and-cleanup}

**transcripts.archive**：固定来源里没有针对会话记录的原生存档开关、导出按钮或脚本；官方也说明
Bolt 没有对外的 API、CLI 或 SDK [@ref-bolt-docs-faq-how]。容易被误认成"会话归档"的是官方文档里的
**Backups 与 Version History**，但它们的作用域是项目版本：每条处理完的提示后自动保存一个版本，
恢复的方式是选中某个备份后 **Create Fork**，生成项目副本而不影响当前版本
[@ref-bolt-docs-project-settings-backups][@ref-bolt-docs-faq-version-history]。

在缺少官方归档机制的情况下，实际可行的"归档"只有浏览器层级的整份站点数据复制。就源码能证实的
部分说清它的边界：记录本身就是完整消息数组，复制它不会丢字段
[@ref-bolt-lt-db-set-messages]；恢复读取完全依赖 `id`/`urlId` 两个索引
[@ref-bolt-lt-db-lookup]，因此换源、换浏览器或换用户配置文件后能否继续命中，固定来源没有给出
任何保证。此外消息里以 diff 形式记录的用户手改内容，只保留文本，**对应的文件状态不在记录里**
[@ref-bolt-lt-chat-append-diff]。

**缺口**：官方文档索引里存在独立页面《Backups, restore, and version history》
[@ref-bolt-docs-index-backups-page]，但本轮归档集里没有它的原件，因此"版本历史是否回放或保存
对话文本""托管侧记录存在哪里、保留多久"都无从证实。这一题记 partial。

**transcripts.cleanup**：产品提供的删除路径只有一条——侧栏悬停条目点垃圾桶，走
`deleteById(db, item.id)` 按主键删除单条，删除后重新拉列表；若删掉的正是当前会话，代码用
`window.location.pathname = '/'` 做一次硬跳转以清空内存状态
[@ref-bolt-lt-menu-delete-chat][@ref-bolt-lt-db-delete-by-id]。需要注意两个可观察后果：

- 侧栏列表只显示**同时**具备 `urlId` 与 `description` 的记录 [@ref-bolt-lt-menu-history-list]，
  所以缺任一字段的记录仍在数据库里，但界面无法列出、也就无法通过界面删除；
- 只有对象仓库 `chats`，删除单条不产生级联，也没有孤儿索引项需要清理
  [@ref-bolt-lt-db-open-store]；主键会在下次写入时被复用 [@ref-bolt-lt-db-next-id]。

没有保留期、没有 TTL、没有批量清空，也没有官方的"清除本地数据"入口。文档侧只说删除账号会连带
删除账号下的项目，对浏览器里这份本地记录没有任何表述 [@ref-bolt-docs-faq-account-delete]；官方唯一
"关掉标签页不会丢东西"的说明，其对象是侧栏 **Projects** 列表里的项目
[@ref-bolt-docs-faq-tab-close]，不能当作本地会话记录持久性的依据。

手动删除数据库或整份站点数据前必须先关掉应用页面：写路径由模块级 `db` 句柄在每次消息变化时触发
[@ref-bolt-lt-chat-store-trigger]，产品自身的删除流程也用同一次硬跳转清空内存状态
[@ref-bolt-lt-menu-delete-chat]。这一条是由写入路径推出的操作建议，官方文档没有对应说明。
**"没找到官方删除机制"不等于"可以安全删除"**——浏览器对源存储的配额与清理策略不在固定来源
覆盖范围内，回收后的可恢复性也无法从这些来源判断。

## 定位、读取与排错 {#transcripts-diagnostics}

**transcripts.diagnostics**：读取入口由源码确定——在应用源的浏览器开发者工具里打开
**Application → IndexedDB → `boltHistory`（version 1）→ `chats`**，字段结构见 schema 一节
[@ref-bolt-lt-db-open-store]。这是从源码推出的定位方式，不是官方文档化的操作手册。

可观察的失败信号与对应入口：

| 现象 | 含义与入口 | 依据 |
| :-- | :-- | :-- |
| 提示 `Chat persistence is unavailable` | 持久化未被关闭，但打开数据库失败（句柄为 `undefined`） | [@ref-bolt-lt-history-load-resume][@ref-bolt-lt-db-open-error] |
| 控制台 `ChatHistory` 作用域的 error 日志 | `openDatabase()` 失败时以 `undefined` 兜底并打日志，不会抛出 | [@ref-bolt-lt-db-open-error] |
| 打开 `/chat/{id}` 后跳回首页 | 该键在 `id`/`urlId` 索引里没有记录，或记录消息数为 0 | [@ref-bolt-lt-history-load-resume] |
| 侧栏显示 `No previous conversations` | 拉取成功但过滤后为空——可能确实没有记录，也可能记录缺 `urlId` 或 `description` | [@ref-bolt-lt-menu-history-list][@ref-bolt-lt-menu-empty-state] |
| 写入失败 toast | 存储事务失败，`storeMessageHistory` 的异常在调用侧以 toast 报错 | [@ref-bolt-lt-chat-store-trigger] |

排错时把日志级别调高即可看到存储层的错误：`VITE_LOG_LEVEL` 控制级别，持久化层用
`createScopedLogger('ChatHistory')` 打点 [@ref-bolt-lt-logger-level]。

完整性检查没有官方工具：记录里没有校验和、schema 版本或自检字段
[@ref-bolt-lt-history-record-type]，能间接判断的只有 `timestamp` 是否等于你预期的最后写入时刻
[@ref-bolt-lt-db-set-messages]。恢复一条记录的必要条件就是 `chats` 仓库中那一条完整消息数组，
没有可重建的派生来源 [@ref-bolt-lt-workbench-files-store]。

**缺口**：已检索 `app/` 与 `functions/` 全量查找 `navigator.storage`、`storage.persist`、
`estimate(`、`quota`，无命中——即固定来源从未申请持久化存储配额，也从不查询用量。因此
"记录在存储压力下会被怎样回收""申请持久化存储能否避免"这两个问题，固定来源给不出答案，本节
结论限于"未申请、未查询"这一事实本身。
