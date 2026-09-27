# 0001 — M0 工具链与输入契约

状态：accepted  
日期：2026-09-27  
对应：PRD §6–§7、§15、§23；OpenSpec `m0-domain-and-fixtures`

M0 首个 change 锁定 Node 24.12.0（24.x LTS）与 pnpm 11.10.0。使用 TypeScript 6.0.3、NodeNext ESM、Zod 4.6.5、YAML 2.9.1、Vitest 5.0.2 与 Vite 8.3.1、tsx 4.23.15、ESLint 10.11.0、typescript-eslint 8.70.1、Prettier 3.9.9。CLI、数据库及站点的已选依赖分别为 Commander 15.0.0、better-sqlite3 13.0.3、VitePress 1.6.4；这些产品能力尚未实现。MCP SDK 使用分别发布的 `@modelcontextprotocol/server` 与 `@modelcontextprotocol/client` 2.1.0，先通过真实 stdio ping 测试确认连接。依赖由 pnpm 生成锁文件，`allowBuilds` 只允许 better-sqlite3 和 esbuild 的构建脚本；本机已加载 better-sqlite3 原生模块。

持久记录以严格 Zod 对象为唯一 schema，TypeScript 类型与 JSON Schema 从中生成。版本适用性暂限单个精确 `release` 或 `commit` 身份，条件限声明式枚举；后续扩展需经过 schema 变更。Fixture 与 production 均在记录中强制标识，校验时与所选 profile 对照。YAML 加载只扫描已知目录，拒绝重复键、未知字段、不安全路径和超限输入。来源文件摘要来自实际字节。跨记录引用、Target、证据和复核状态由数据集校验器处理。

核验依据：[Node 发布状态](https://nodejs.org/en/about/previous-releases)、[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/README.md)、[Zod JSON Schema](https://zod.dev/json-schema)、[pnpm 构建脚本设置](https://pnpm.io/settings/build)。此 ADR 只记录已实施的输入与工具链选择；发布布局、SQLite 查询策略和搜索留给后续 change。
