---
schema_version: 1
record_kind: production
guide_id: guide-pi-mcp
coverage_ref: coverage-pi-mcp
claim_refs: [claim-pi-core-mcp]
title: Pi 核心与 MCP 扩展
---

### 先看能力属于谁

这个精确包的 `README.md:470` 明说核心没有内置 MCP，并把需要 MCP 的读者指向扩展路线。上方已复核事实卡的 `unsupported` **只修饰核心内置 MCP client**。它没有否定外部扩展，也没有证明任何扩展已成功连接。这是本章目前最有用的结论：寻找核心自带的 server 配置入口会找错对象。

包内 `docs/extensions.md:108–136` 描述扩展发现位置和额外路径，`docs/packages.md:18–45` 描述包的安装与设置范围；这些只能帮助定位候选扩展的装载流程。若要写 MCP 配方，先固定某个扩展的名称与版本，分别留下安装、扩展发现、server 握手和工具调用证据。现在没有这四步的完整记录，传输类型、配置语法和诊断命令均属未知。证据入口：README 快照（`snapshot-pi-readme-npm`）及上方事实卡的 Evidence；Coverage 仍为 `partial`。
