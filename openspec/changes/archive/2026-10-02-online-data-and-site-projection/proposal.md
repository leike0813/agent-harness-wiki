# Proposal

## Why

当前生产发布依赖完整 JSON、SQLite、生成文档及本机语义模型，无法从干净 checkout 生成可供轻量消费者按需读取的静态知识。已结案的[确定 GitHub Pages 与 npm 在线知识分发规格](../../../.scratch/npm-pages-distribution/map.md)要求先交付独立在线投影，再接入消费者包及公开发布流水线。

## What Changes

- 从完整、已校验的结构化真源生成 `data/v1/`：精简指针与清单、带派生覆盖的产品目录、主题索引、逐章节 JSON、逐来源 JSON 及分片来源存在性目录。
- 在线发布使用 `web-v1-<完整 Git 提交 SHA>`，页面与数据共用身份；固定参数可重复构建，同名产物不可覆盖，不依赖本地发布目录、原件、SQLite 或语义模型。
- 提供当前小节的 JSON 精确／词法倒排、约 64 KiB 分片及范围导航；共享 Node 原生分词、规范化、排序、分页和预算规则，避免全库正文或全局定位表成为查询前置下载。
- **BREAKING（新增在线契约）**：在线只收录每个产品 × 主题的当前章与最近一个历史版，其他章节保留轻量裁剪标记；词法入口不承诺任意字符子串或语义召回。本地完整历史与离线混合检索继续独立验收。
- 生成同发布的读者页面，支持站点子路径；对含指定保留旧资源的完整部署目录检查引用、文件完整性及 512 MiB 实际字节预算。
- 实施时同步 PRD、工程边界及文档，明确本地与在线两条能力线及后续两个 change 的依赖。

## Capabilities

### New Capabilities

- `online-knowledge-release`: 静态协议资源、独立不可变身份、有限章节历史与裁剪标记、来源目录、完整投影校验及部署目录容量边界。
- `online-lexical-search`: 当前小节的按需 JSON 倒排、范围剪枝、共享词法规则、确定性分页、真实预览与有界处理契约。

### Modified Capabilities

- `knowledge-release`: 将现有整库 JSON／SQLite、完整历史和本地发布门禁明确限定在本地能力线，增加独立在线构建边界。
- `knowledge-site`: 从本地完整发布或在线有限历史投影构建同源页面，增加在线数据与页面联合验证及项目子路径支持。

## Impact

复用 `src/domain/chapter.ts`、`src/domain/catalog.ts`、`src/validation/chapters.ts`、`projectChapters`、`renderChapterDocs`、`buildSearchSections` 与现有章节／站点测试；新增在线 DTO/schema、编译器与共享词法规则，接入 `scripts/build-site.ts`、schema 导出及独立构建命令。不新增运行服务、搜索库或向量依赖。

本 change 只交付可离线构建、校验的在线产物。后续“消费者 CLI／MCP 包”负责异步按需查询、公共结果、缓存、网络故障与真实包验收；再后的“公开发布流水线与交付”负责 CI、归档、30／90 天保留与恢复、Pages、npm OIDC 及上线验收。两者以本 change 同步后的主规格为基线；本轮不创建远程资源、不部署、不发包。
