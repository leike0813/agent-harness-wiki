# 0011 — 公开知识与程序发布

状态：accepted
日期：2026-10-02
对应：OpenSpec `online-publication-and-delivery`，PRD §7、§9

## 决定

在线投影与消费者的公共契约沿用 [ADR 0009](0009-online-knowledge-distribution.md) 与 [ADR 0010](0010-online-consumer.md)。公开交付采用同仓库 GitHub Pages、不可变 GitHub Release 和 npm，不增加服务或依赖。

发布状态以独立 `publication-state` 分支的 `state.json` 为事实源。它保存发布预约和固定时间、协议 current／恢复目标、每次确认退出 current 的时间、未结束部署、转换记录及独立 npm 候选状态。GitHub Contents API 更新携带旧 SHA；冲突报错，由下一次读取重新判断，不覆盖并发状态。Actions cache、短期 artifact、归档创建日期和客户端缓存都不能代替台账。

全部生产写操作共用 `publication-production` 并发组，保留排队任务且不取消进行中的部署。正常候选开始部署前仍需核对 main 最新 SHA；手动恢复允许历史提交。实际开始前写入部署意图，中断或结果无法确定时阻止后续发布及清理。人工核对平台部署状态与公开指针后才能结案；确认旧目标退出的时间采用观察时间，保守地延长保留窗口。

不可变发布先生成只含自己的页面与 `data/v1/releases/<id>/` 数据的工件。每个 `web-v1-<SHA>` Release 的 `site.tar.gz` 保存完整工件及文件 inventory；上传并取回校验草稿后再封存。已保存工件直接复用，恢复不重新构建正文。部署目录另行组装：目标归档提供页面和指针，其余受保护归档只提供数据。重新生成部署 inventory 并执行既有完整性、链接、身份和容量验证；归档字节保持不变。

旧发布确认退出 current 后至少保留 30 天；支持中的协议保护 current 和最近独立验证的恢复候选。恢复后再次退出重新计时。已部署但回读失败的目标同样保护其退出窗口；未知结果保护相关目标并阻止发布。将来旧协议冻结时公告至少 90 天后的退役日期，只有全部窗口满足后才能留下机器可读退役入口。首版仍只构建 v1，协议生命周期以受控时间验证。

完整部署目录的解包字节上限仍为 512 MiB，包括页面、静态资源和所有保留数据。超限保留现站并报告主要占用，不缩短承诺、不删来源。首版仅在下一次发布或恢复组装时排除已过期数据，不安排定时任务，也不自动删除 Release 归档。归档存储增长是明确接受的限制。

Pages 正常发布由 main push 触发，PR 只验证；手动入口提供重跑、恢复和状态核对。部署后在同一个 120 秒预算内最多三次读回指针、导航、代表性章节、词法查询、来源及同发布页面，间隔五秒，全部通过才记为可用。回读失败提供归档恢复入口，不因网络故障自动回滚。人工核对使用独立的 Pages 部署成功状态及完整公开回读；环境 job 可能因先前回读失败而显示 failure，不能用它替代 Pages 状态。公开回读与整库构建校验承担不同责任。

程序仅由 `npm-vX.Y.Z` 发版。包版本与 tag 一致，提交属于通过验收的 main；先验收真实 tgz，再发布 next，六组平台从公开 npm 安装精确版本读取真实 Pages，成功才推进 latest。已发布版本不能复写，重跑核对候选 integrity；较旧候选不能推进比它更新的稳定渠道。知识 current 与 npm latest 独立。

发布工具锁定 Node 24.12.0、npm 11.21.0、pnpm 11.10.0。OIDC dist-tag 操作要求 npm ≥11.21.0，并需单独启用授权，依据 [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)。首个 `1.0.0` 的已验收工件由维护者交互发布至 next 建包，再配置 `npm-publication.yml` 的 Trusted Publisher（publish 与 dist-tag）；随后工作流继续验收和 OIDC 推广。后续版本直接通过 OIDC 发布。不读取用户已有 npm 凭据，不保存长期发布 token。

## 验收记录

实现、受控验证、真实 Pages、恢复演练、npm next、公开安装和 latest 分别记录；尚未运行的检查保持未完成。真实未来 30／90 天窗口使用受控时间验收，不声称已经等待满期限。交付记录见 [公开发布操作指南](../publication.md)。
