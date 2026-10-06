# amazon-q local_transcripts 首采复核说明

## 来源身份

- 固定来源：`source-amazon-q-repo`（`https://github.com/aws/amazon-q-developer-cli`），commit `15cc8f3cd18c4272925ce1c7053268eedff1ea0a`。
- 本轮 scan 观察：baseline 与 observed 同为该 commit，五个 check 全部 `unchanged`，因此审计 `status` 保持 `no_change`。
- 证据形态：本轮全部为 `git_source_file`，共 20 个 artifact、20 个 snapshot、51 个 reference。本产品在项目根 `archive/amazon-q/` 下没有已保留的官方文档原件，因此没有创建任何 `archived_document`，十题都不含文档来源引用。
- 界面范围：只写 `cli`。VS Code 扩展与 JetBrains 插件本轮没有对应固定来源，不给答案。

## triage 理由

`local_transcripts` 是本产品的首采主题，属于增量覆盖而非上游变化维护：上游源码本轮没有变化，但该主题此前没有任何章节，因此仍需新增 impact。

## 实施位置判定

工作区根 `Cargo.toml` 的 `default-members` 只有 `crates/chat-cli`；`crates/agent` 的 `main.rs` 是占位实现（`println!("Hello, world!")`，`cli` 模块整段注释）。会话记录的实现全部在 `crates/chat-cli` 下，本章只引用该 crate 与工作区根清单。

## 未解决分歧（需要配置主题复核）

既有章节 `amazon-q-cli-configuration-v1`（`config.sources`、`config.runtime`）称环境变量 `Q_CLI_DATA_DIR` 覆盖数据目录、从而改写 settings 与数据库位置，依据是 `crates/agent/src/agent/util/directories.rs`。

本轮核实结果：该文件确实定义了 `data_dir()`、`database_path()`、`settings_path()` 并读取 `Q_CLI_DATA_DIR`，但在本提交的工作区内 `database_path()` 没有调用方；`chat-cli` 的 `Database::new()` 走的是 `GlobalPaths::database_path_static()`，函数体内没有读取任何环境变量的分支。两者不是同一个路径实现。

处理方式：本轮按 `crates/chat-cli` 的源码陈述会话数据库路径，并在新章节 `lt-storage-layout` 一节显式写出该差异与各自出处；未改动既有 configuration 章节。是否修正 `Q_CLI_DATA_DIR` 的表述留待该主题的维护轮次决定。

## 受影响与排除的题

- 十题全部给出可用答案，状态为：`naming` / `format` / `lifecycle` / `archive` 为 `answered`；`scope` / `location` / `schema` / `database` / `cleanup` / `diagnostics` 为 `partial`。
- `partial` 的具体缺口（均已在对应小节写出已查入口）：
  - `scope`：没有正面证据证明不存在关闭落盘的开关。已查设置键枚举与环境变量常量表，二者未生成本章引用。
  - `location`：`dirs::data_local_dir()` 与 `dirs::home_dir()` 的各平台取值来自外部 crate，Windows 与 macOS 无法在本轮核实。
  - `schema`：无官方 JSON Schema；会话值无版本号与值级迁移脚本；部分枚举取值集合与 `context_manager` 内部形状未逐一核实。
  - `database`：删库后没有重建 `conversations.value` 的来源；无 WAL/索引设置。
  - `cleanup`：无官方删除或保留期机制，`conversations` 行只增不减；没有证据支持“删掉安全”或“应当定期删”。
  - `diagnostics`：`q diagnostic` 不含数据库或会话检查项；没有校验 `value` 可反序列化的命令。
- 排除：同库的 `history` 表记录 shell 命令历史而非会话正文，仅在正文中标明边界；遥测、`qlog` 日志、知识库目录不在本主题范围。

## 复核结果

- `pnpm maintenance:candidates check --candidate <本 candidate>` 通过。
- 51 条 reference 逐条独立复核：`locator.file` 等于其 snapshot 绑定 artifact 的 `file`；`excerpt` 在 pinned 源码对应行区间内逐字命中；artifact 与 snapshot 的 `content_sha256` 等于该文件真实字节 sha256。
- 无孤儿 artifact、无孤儿 snapshot；本轮 51 条 reference 全部在正文出现；十题齐备；selection 唯一。

## blocker

无。没有来源失败，没有需要新证据才能定稿的题。