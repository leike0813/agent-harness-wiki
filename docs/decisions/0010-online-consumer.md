# ADR 0010：在线消费者 CLI／MCP 包

- 状态：accepted
- 依据：`docs/PRD.md`；[ADR 0009](0009-online-knowledge-distribution.md)；OpenSpec change `online-consumer-cli-mcp`。

## 背景

`data/v1/` 静态投影与只读字节读取（`queryOnlineSearch`）已经归档，但读者仍需克隆仓库并准备本地发布才能查询。消费者需要可直接安装的轻量 CLI／MCP，按需读取已发布知识，并准确区分缓存缺口、网络失败和有限历史。当前根工作区整体加载 SQLite、编译校验和本机 Ollama，不能直接作为轻量在线包发布；但选版、界面答案和比较语义必须与本地共享，不能形成第二套领域实现。

## 决定

### 包身份与入口

- 公开包 `agent-harness-wiki@1.0.0`，命令 `ahw`，入口 `dist/consumer/index.js`（源码 `src/consumer/index.ts`）。
- 根工作区改名 `agent-harness-wiki-maintainer`，保持 private，继续提供本地全历史与混合检索入口；公开包名只绑定消费者入口。
- 消费者只提供在线只读五查询、MCP stdio、`--help` 与 `--version`，不导出 JS 库 API，不携带维护命令、SQLite、完整知识、模型、上游制品或维护者配置。

### 共享领域与 DTO

- `src/domain/consumer.ts` 定义消费者结果元数据与结构化技术错误 schema；`src/query/online-error.ts` 定义 `OnlineError(code, reason, { retryable, releaseId?, httpStatus? })` 及序列化。
- 产品解析、选版、章节／小节界面答案投影、比较共同问题与分页抽成纯逻辑，本地 `QueryService` 与在线服务共用；本地 DTO 不变。
- 消费者结果统一带 `release_id`、`knowledge_published_at`、`access_mode`（`online`／`offline`）；版本结果声明 `history_scope: current_and_previous`。按既有选版规则选中裁剪章节时返回正常 `history_not_available`，带上请求目标、edition 与解析结果以及本地全历史提示，不改选另一章、不翻译成 `unsupported` 或 `unknown`。
- 技术错误码固定为 `online-error.ts` 所列：`offline_cache_miss`、`invalid_cached_data`、`network_error`、`request_timeout`、`operation_timeout`、`rate_limited`、`http_error`、`release_resource_missing`、`invalid_release_data`、`unsupported_protocol`、`protocol_retired`、`query_too_broad`、`invalid_cursor`、`invalid_input`、`operation_cancelled`。CLI JSON 与 MCP `isError` 输出同一结构。

### 固定发布与预算

- 在线启动在一个 30 秒操作上下文中确认 `current`、校验其清单与产品目录，成功后绑定该发布；进程与单次 CLI 查询不再切换发布。
- 每进程最多 4 个并行 HTTP；每次 HTTP 含完整正文 10 秒；每次调用最多 64 个不同资源（缓存命中计入，重复引用只算一次）。网络中断、单次超时或 HTTP 408／429／502／503／504 最多重试一次并尊重 `Retry-After`，总期限不重置。

### 缓存

- 内存内容 32 MiB LRU；文件内容目标 128 MiB、按最近最少使用回收；不引入缓存数据库。
- 以规范化入口、协议、发布和相对路径为键，同目录临时文件加 rename 原子安装完整校验字节；读取时重校验。
- 在线命中仍是 `access_mode: online`；显式 `--offline` 只读同一入口／协议下最近一次成功初始化的必需缓存；`--no-file-cache` 关闭文件缓存读写。
- 默认目录：Linux 有效绝对 `$XDG_CACHE_HOME/agent-harness-wiki`（无效时 `~/.cache/agent-harness-wiki`）；macOS `~/Library/Caches/agent-harness-wiki`；Windows 有效绝对 `%LOCALAPPDATA%\agent-harness-wiki\Cache`（无效时 `%USERPROFILE%\AppData\Local\agent-harness-wiki\Cache`）。显式 `--cache-dir` 按调用工作目录解析并优先。

### 检索能力与许可

- 消费者只用词法检索，结果不含 `semantic_status`，不提供语义开关或模型下载；仓库本地混合检索字段保持独立。
- 代码 MIT（`LICENSE`），原创知识与文档 CC BY 4.0（`LICENSE-knowledge`），第三方来源摘录保留原权利（`NOTICE`）。

## 后果

- 磁盘目标是进程间软上限，不声称严格配额；容量回收后离线可能缺资源，这是按需缓存边界，不派生为 `unknown`。
- 取消是协作式的；进程关闭终止未完成工作，一个调用取消不影响独立调用。
- 默认入口 `https://leike0813.github.io/agent-harness-wiki/data/v1/` 在规划时尚未部署，文档与构建必须区分「可构建」与「已上线」。
- 公开 CI、npm 发布、OIDC、30／90 天保留与手动恢复属于第三个 change，不在本决定内。

## 本机验收

2026-10-02 在 Linux x64、Node v24.12.0、ICU 77.1、npm 11.6.2、pnpm 11.10.0 完成 `pnpm verify`。51 个单元测试、157 个集成测试通过；3 个既有受管包环境测试未启用，分别需要显式 sandbox 开关或 NFS 测试挂载，不属于消费者验收。类型、lint、格式、schema、审计与章节校验、本地编译、文档站构建和消费者验收均通过；`openspec validate online-consumer-cli-mcp --strict` 通过。

实际工件 `var/consumer-package/agent-harness-wiki-1.0.0.tgz` 为 36,915 字节，解包 154,162 字节，共 19 个文件，包含 14 个运行模块及说明、元数据和三份许可文件。运行依赖固定为 Commander 15.0.0、Zod 4.6.5、MCP server 2.1.0；传递依赖 MCP core 2.1.0。受控 npm 源从已有锁定依赖生成，源码树外的安装与依赖闭包没有原生模块、SQLite、语义模型、知识或维护者模块。

`consumer:verify` 的 25 项检查通过，使用含空格的临时目录和隔离 npm／HOME，实际运行 npm 安装、已安装 bin 与 npm exec，以及 npm 自带 `npx-cli.js` 从新目录安装 tgz。五类 CLI 与真实 SDK stdio 结果一致；启动参数可放在子命令前后，非法输入在读取知识前被拒绝，文件缓存可离线回读且没有 HTTP 请求。工具恰好五个、只读、无 Resources／Prompts，错误后仍可查询，取消和断连使在途 HTTP 结束。网络与缓存测试另外覆盖固定发布、身份错误、裁剪历史、离线缺口、缓存重校验和回收、请求预算、重试与合作取消。默认验收不读真实用户配置，不访问公开 npm 或知识入口。

可重跑命令：`pnpm verify`、`pnpm consumer:verify`、`openspec validate online-consumer-cli-mcp --strict`。每次消费者验收更新 `var/consumer-package/verification.json` 和 `manifest.json`；这些工件留在忽略目录，本文记录本次结果。

| 环境 | 实际 Node／ICU | 状态 |
|---|---|---|
| 本机 Linux x64 | 24.12.0／77.1 | passed |
| CI ubuntu-24.04 x64，最低 24.12.0 | 24.12.0／77.1 | passed，25 项 |
| CI ubuntu-24.04 x64，最新 24.x | 24.21.0／78.3 | passed，25 项 |
| CI macos-15 arm64，最低 24.12.0 | 24.12.0／77.1 | passed，25 项 |
| CI macos-15 arm64，最新 24.x | 24.21.0／78.3 | passed，25 项 |
| CI windows-2025 x64，最低 24.12.0 | 24.12.0／77.1 | passed，25 项 |
| CI windows-2025 x64，最新 24.x | 24.21.0／78.3 | passed，25 项 |

2026-10-02 按维护者授权推送 `dev` 并触发仅验证 CI。[首轮 36970051824](https://github.com/leike0813/agent-harness-wiki/actions/runs/36970051824) 中 macOS 两组通过，Linux／Windows 失败。最小 npm 安装复现确认 pnpm 共享 inode 导致依赖 tar 含硬链接，安装时缺文件；`packDependencies` 改为先复制到临时目录再打包。Windows 的 Git 换行转换改变了 hash 绑定 fixture 的原件字节，`.gitattributes` 保留提交字节。

修复提交 `d67487166bbcac930fbdf242cf4d792ad3001476` 的 [CI 36970819489](https://github.com/leike0813/agent-harness-wiki/actions/runs/36970819489) 六组全部通过，共 150 项检查。最低组 npm 11.6.2，最新组 npm 11.19.0；六组 tgz 均为 36,915 字节，解包 154,162 字节、19 个文件。各 runner 上传 `verification.json` 与 `manifest.json`，已下载到忽略目录 `var/consumer-ci/36970819489/all/`，报告确认实际架构、含空格路径、真实安装／npx／CLI／SDK stdio 和零失败。任务 5.3 已勾选，本 change 未归档。

## 第三个 change 的交接

2026-10-02 消费者 change 交付时已实现并打包消费者，六组远端验证 CI 通过，尚未部署 Pages 或发布 npm。当时的公开发布交接要求包含跨 CI 持久发布台账、旧发布 30 天／旧协议 90 天保留、容量失败保护与手动恢复，以及 npm OIDC、next 候选到 latest 的真实验收。2026-10-03 维护者将在线保留改为 current 与已验证 recovery，完整归档继续保留；当前政策见 [ADR 0011](0011-public-publication.md)，实际上线状态见 [发布指南](../publication.md)。程序版本、在线知识发布与部署状态分别记录；消费者缓存或 tgz 构建时间不代表服务端保留。
