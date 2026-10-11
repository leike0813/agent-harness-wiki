# 在线来源页构建优化验收

2026-10-11，在 Linux x64、Node.js 24.12.0 和仓库已安装的锁定工具链上，使用 PR #15 首次提交 `43e3bab1837251a289a75a315c333e8d871e3f37` 的同一份生产输入比较构建结果。该快照包含 673 个章节版本。旧实现从该提交运行，新实现从当前工作区读取同一快照；两次均保留完整 Git 历史用于在线历史选择，没有安装依赖。

在线引用现在进入 `sources/#<reference-id>`，由一个共享页面读取站点固定发布中的单条来源 JSON。现有 `data/v1/` 协议和本地静态来源 Markdown 保持各自的输出契约。实现与边界见 [开发指南](../development.md) 和 [在线分发 ADR](../decisions/0009-online-knowledge-distribution.md)。

| 指标                     |        旧实现 |    共享来源页 |
| ------------------------ | ------------: | ------------: |
| 来源 HTML                |        10,406 |             1 |
| 全部 HTML                |        11,433 |         1,028 |
| `assets/` 文件           |        22,885 |         2,075 |
| 部署文件（含完整性记录） |        48,385 |        17,170 |
| 部署字节                 |   414,476,933 |   224,698,141 |
| 最大 RSS（KiB）          |     6,611,684 |     2,992,668 |
| VitePress 构建耗时       |     373.59 秒 |      89.17 秒 |
| 完整在线构建耗时         | 7 分 46.57 秒 | 2 分 38.78 秒 |
| Node 堆上限              |     8,192 MiB |     3,900 MiB |

两次完整在线构建均退出成功。新实现使用 3,900 MiB 堆上限完成生产构建，并通过独立 `pnpm online:verify` 校验。峰值 RSS 下降约 55%，部署字节下降约 46%。这些耗时来自本机的一次运行，期间有其他验证任务并行运行；它们不代表隔离环境中的稳定性能保证。

两份部署的 10,406 条来源详情 JSON 和 18 份来源目录 JSON，逐路径 SHA-256 全部一致。减少的是 VitePress 为每条来源生成的页面和模块，来源内容仍完整保留。

## 复现方式

准备该提交的独立快照，并保留可读取的 Git 历史与锁定工具链。旧实现从该快照目录运行；新实现从包含本次修改的工作区运行，以 `--dataset-root` 指向同一快照。输出目录各自独立且此前不存在。两次都固定以下参数：

```sh
NODE_OPTIONS=--max-old-space-size=8192 /usr/bin/time -v \
  node --import tsx scripts/build-online.ts \
  --dataset-root . --profile production \
  --commit 43e3bab1837251a289a75a315c333e8d871e3f37 \
  --published-at 2026-10-02T00:00:00Z \
  --base /agent-harness-wiki/ --out-dir /tmp/ahw-source-before
```

```sh
NODE_OPTIONS=--max-old-space-size=3900 /usr/bin/time -v \
  node --import tsx scripts/build-online.ts \
  --dataset-root /path/to/pr15-snapshot --profile production \
  --commit 43e3bab1837251a289a75a315c333e8d871e3f37 \
  --published-at 2026-10-02T00:00:00Z \
  --base /agent-harness-wiki/ --out-dir /tmp/ahw-source-after
pnpm online:verify /tmp/ahw-source-after
```

以部署的 `integrity.json` 统计 HTML、来源页及 assets 数量，并比较两份部署的来源 JSON 路径及 hash。完整文件数和字节以构建／独立校验返回值为准。

## 浏览器验收

对生成的生产部署启动临时静态 HTTP 服务，通过 Playwright 验证项目子路径下的章节引用、产品身份引用、刷新、hash 切换、浏览器前进／后退。一次普通来源导航只请求选中的来源 JSON，没有读取 current 指针或来源目录。

延迟旧来源请求后立即切换引用，旧请求被取消，页面保持新引用的结果。非法 ID 不发请求；不存在的 ID 显示未保留状态，重试再次读取该资源。替换测试响应的摘录为 script／img 字符串后，页面按纯文本展示，没有生成子元素或执行脚本。390 像素视口下没有页面横向溢出。

`pnpm verify` 通过类型、lint、格式、schema、审计与知识校验、单元及集成测试、TypeScript／文档站构建和消费者包验收。集成测试 251 项通过，3 项既有 opt-in 测试未运行。来源读取模块最后的 HTTPS 边界检查另经 19 项单元测试以及类型、lint、格式检查通过。非 HTTPS 官方链接的拒绝行为由读取模块测试覆盖。

此验收没有部署 Pages 或发布 npm，也未验证 Windows、真实 Linux 沙箱及 NFS 环境。来源详情需要 JavaScript，旧的逐条来源 URL 没有重定向；公开回读通过归档章节的实际链接验证恢复页面。
