---
schema_version: 1
record_kind: production
guide_id: guide-opencode-native-plugins
coverage_ref: coverage-opencode-native-plugins
claim_refs: []
title: OpenCode 的本地与 npm 插件
---

`plugins.mdx:12–64` 在固定源码中区分项目 `.opencode/plugins/`、用户插件目录与 `plugin` 配置中的 npm 包，并列出加载顺序；`packages/core/src/config/config.ts:474–479` 是查发现入口的代码位置。这些线索能回答“应查哪个来源”，但不能由某个包已下载推出插件函数已经运行。

该源码 revision 与 `opencode-ai@1.18.32` 二进制尚无构建对应，且未观察一个插件的 loaded、active 或 healthy 状态。下一轮先确立对应关系，再用本地无副作用插件检查发现、加载、工具/事件注册和实际调用，并将 npm 自动安装与插件执行分别记录。来源见 源码快照（`snapshot-opencode-repo`）；本章不给未验证的安装配方。
