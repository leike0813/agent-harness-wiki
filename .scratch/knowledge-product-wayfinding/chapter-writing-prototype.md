# 知识章节成稿短样（讨论稿）

讨论对象：[Codex CLI / Skills 当前章节](../../knowledge/codex-cli/chapters/codex-cli-skills-v1.md)。这里只重写一小段，不代表已核验的 npm 包行为，也不替换已发布知识。

## 现状与要决定的边界

当前「格式、扩展与加载」一节连续回答 `skills.format`、`skills.extensions`、`skills.loading`。答案与来源都在，但正文用问题编号起句，字段集中列举，读者要自行把“文件放在哪里、怎样写、何时生效”连起来。

用户已确认：正文以能说明用法、处理链和条件的深度为基准；可独立查找或使用的机制拆成带稳定 ID 的小节。当前发布的站点和 MCP 都以二级标题（`##`）作为可单独读取的小节；三级标题只辅助节内阅读。以下按这个方向展示局部改写。

## `SKILL.md` 的格式与资源 {#skills-format}

一个本地 Skill 是含 `SKILL.md` 的目录。Codex 先读取文件开头的 YAML frontmatter，其中 `name` 和 `description` 必填；正文才是 Skill 的指令。辅助脚本、参考资料和图片可以放在同一目录，由正文按需引用。写好文件后，还需要把目录放在 Codex 能发现的 Skill 根目录下，位置见本页「发现位置」。[@ref-codex-cli-skills-format-doc][@ref-codex-cli-skills-source-parser]

```text
.agents/skills/review-changes/
└── SKILL.md
```

```md
---
name: review-changes
description: Review local changes when asked for a code review.
---

Review the changed files and report concrete findings.
```

## `agents/openai.yaml` 的专有配置 {#skills-openai-yaml}

一个 Skill 的主要指令写在 `SKILL.md`。Codex 还会读取同目录下的 `agents/openai.yaml`，用于补充界面信息、调用策略和工具依赖。这个文件与 `SKILL.md` 分开；把配置字段写进 `SKILL.md` 的正文，不能替代附加配置文件。[@ref-codex-cli-skills-source-metadata][@ref-codex-cli-skills-metadata-doc]

如果希望读者仍能手动选用 Skill，但不让 Codex 根据任务描述自动调用，可以在该 Skill 目录下添加：

```yaml
policy:
  allow_implicit_invocation: false
```

此设置只改变隐式调用。读者仍可用 `$skill-name` 显式选用它；默认值是 `true`。因此排查“Skill 已出现却没有自动调用”时，应先区分发现与调用，再检查这项策略。[@ref-codex-cli-skills-metadata-doc]

同一文件还包含 `interface` 与 `dependencies.tools`。正式成稿应分别说明已核实的字段、用途及适用入口；与 MCP 连接有关的细节链接到该产品的 MCP 主题，不在这里复制一遍。

## 上下文加载时机 {#skills-loading}

Codex 起初把可用 Skill 的名称与描述交给模型，选中某个 Skill 后才读取完整 `SKILL.md`。因此，Skill 已被发现不等于其正文已加载；描述承担了帮助模型选择的作用。初始清单有长度预算，超限会压缩描述，仍超限则省略部分 Skill 并发出警告。若某个 Skill 没有自动被选中，要先区分目录未被发现、描述不足以匹配任务，以及清单预算裁剪这几种情况。[@ref-codex-cli-skills-progressive-doc][@ref-codex-cli-skills-budget-doc]

## 继续讨论的边界

这三个小节分别对应文件格式、专有配置和加载时机；字段列表及例子留在所属节内。问题编号保留在索引中，正文用自然标题和段落；第一方字段逐项解释，来源提示贴近结论。下面继续讨论示例的具体形态。

## 配置文件示例：Codex CLI 的 MCP server

用户指出，写到配置文件时，正文需要展示文件内容并解释。下面是[已捕获的 Codex 官方 MCP 文档](../../archive/codex-cli/artifact-codex-cli-mcp-doc/raw.md)所给的 stdio 示例的最小片段，仍只代表这份固定文档的语法；未映射到某个安装包版本。

把下列内容加入 `~/.codex/config.toml`；如果只希望受信任的某个项目读取，可放在该项目的 `.codex/config.toml`：

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
```

`[mcp_servers.context7]` 定义名为 `context7` 的 server；`command` 是启动程序，`args` 是传给它的参数。这里使用官方文档选取的第三方 server 作语法示意，读者需要有 `npx` 和该 server 所需的运行条件。项目配置文件只对受信任项目加载。保存后，`codex mcp list` 可查看 server 是否进入配置列表；在 Codex TUI 中，`/mcp` 可查看活动 server。列表出现并不证明工具调用成功。[@ref-codex-cli-mcp-host-doc][@ref-codex-cli-mcp-cli-doc]

同一个文件中，HTTP server 的写法不同。官方文档另给了下面的例子：

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
```

这里的 `url` 是远端 endpoint，`bearer_token_env_var` 指向运行 Codex 的环境中已有的 token 变量名；它不是把 token 值写进文件。这一例需要相应服务和凭据可用，不能把“配置能被读取”说成“已认证并能调用工具”。两例分别展示 stdio 与 HTTP 的配置形状，字段及检查方法随传输方式解释；正式章节还应在来源允许的范围内说明 OAuth、header 等其他认证路径。[@ref-codex-cli-mcp-http-doc][@ref-codex-cli-mcp-cli-doc]
