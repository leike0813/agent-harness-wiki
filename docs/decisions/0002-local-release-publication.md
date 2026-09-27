# 0002 — 本地 KnowledgeRelease 发布

状态：accepted  
日期：2026-09-27  
对应：PRD §12、OpenSpec `m0-reproducible-release`

已校验的结构化数据先投影成一份发布数据。只有经接受或标为争议的 Claim 及其复核证据进入查询发布；draft 和 rejected 留在知识维护侧。Coverage 全量保留，避免把未调查误写为不支持。JSON、SQLite 和 Markdown 都从该投影生成。

发布输入显式固定 release ID、profile 与发布时间。编译器在发布根目录下写 staging，生成后校验 manifest hash、SQLite 完整性与外键、JSON/数据库行及页面一致性，再把 staging 移到不可变的 `<release-id>/`。成功后才替换仅含 release ID 的 `current.json`。失败不更换指针，也不覆盖旧发布。manifest 包含 schema、构建器版本、规范化输入摘要和各产物 hash，不包含自身 hash。

SQLite 使用已安装的 better-sqlite3 与 FTS5；M0 不引入 ORM 或向量数据库。JSON/Markdown 字节以及 SQLite 逻辑行要求同参数可重复，SQLite 文件字节跨引擎版本不作承诺。测试机上的 SQLite 为 3.53.4，支持 FTS5；Windows 未实测。
