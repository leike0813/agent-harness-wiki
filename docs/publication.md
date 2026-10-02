# 公开发布与恢复

知识网页和消费者程序分别发布。消费者的正常查询入口始终是 Pages；GitHub Release 用于维护者取回、重跑和恢复，不是查询故障时的备用数据源。

## 知识发布

`knowledge-publication.yml` 在 main push 时发布，在 PR 中只验证。生产输入是干净 checkout 与完整 Git 历史，不需要本机已发布数据、原件或语义模型。`publication-state/state.json` 持久化实际状态；Release 保存不可变页面和数据，短期 CI artifact 只保存本次诊断。

正常流程是预约固定时间、取得或生成归档、按台账组装保护数据、联合验证、上传 Pages、再次核对 main、写部署意图、部署和公开回读。过期候选跳过；进行中的部署正常结束。完整部署超过 512 MiB 则停止，不自动缩短保留期限。

手动重跑使用 Actions 的 **Knowledge publication** 工作流，选择 main 与 `publish`。恢复选择 `recover`，`release_id` 填台账中已验证的 `web-v1-<完整 SHA>`；历史 commit 无需等于 main。它从已保存页面与数据重组，继续保留故障目标的适用数据，经过同一套完整性、容量、部署和回读检查。首次没有可用旧站时不能声称可恢复。

若台账存在 pending／uncertain，先检查 workflow 日志、github-pages 部署状态和公开 current。手动 `reconcile` 填 GitHub environment deployment ID；只有平台成功且公开目标一致才能记可用。如果平台终态失败且公开指针仍是原目标，可选择 abort 结案，不伪造切换或退出时间。状态无法证明时继续阻塞，不通过删除台账绕过。

旧发布从确认退出 current 后至少保留 30 天；恢复后重新退出会重算。current 和最近已验证恢复目标持续保护。旧协议将来冻结时公告至少 90 天后退役，当前 v1 不执行协议升级。历史窗口与整章裁剪是两回事；客户端缓存也不能替代服务端保留。首次不自动删除归档，数据只在后续经校验的部署中按政策排除。

维护者脚本入口：

```sh
pnpm publication --help
pnpm publication state
pnpm publication prepare --commit <main-SHA> --run-id <唯一操作ID>
pnpm publication begin
pnpm publication finish --deployment-result success
pnpm publication reconcile --deployment-id <平台部署ID>
```

生产写命令需要本次操作的 `GH_TOKEN`／`GITHUB_TOKEN`，默认 CLI 不主动读取用户配置。部署上传与执行由官方 Pages Actions 完成；不要将 prepare／begin 的成功解释为已上线。

## 程序发版

更新消费者包元数据和使用说明，提交并通过检查后，维护者选定 main 上的提交并推送 `npm-vX.Y.Z`。普通知识更新不发布 npm。`npm-publication.yml` 先验收真实 tgz，保存候选 manifest／工件，然后发 next；三个 OS × 最低／最新 Node 24.x 从公开 registry 安装精确版本、运行 CLI 和真实 SDK stdio、读取实际 Pages，全部成功后才推广 latest。

若该 npm 版本已存在，重跑核对实际 integrity 后继续验收，不复写版本。失败候选保持公开 next 状态或失败记录，latest 保留旧值；第一次失败则尚无稳定渠道。修正公开程序使用新版本，不在已发布版本上替换字节。

### 一次性建包

首个 1.0.0 由维护者交互建包。工作流提供已通过受控验证的真实 tgz 和 manifest；先核对文件、版本与 integrity，再使用临时隔离 npm 配置登录并发布同一文件到 next。不要把 token 或验证码发送到聊天、日志或仓库。

配置 npm Trusted Publisher：owner `leike0813`，repository `agent-harness-wiki`，workflow `npm-publication.yml`，environment `npm-publication`；允许直接 publish 和 dist-tag。发布工作流使用 npm 11.21.0 和 GitHub-hosted OIDC。包尚不存在、账户或信任未准备时，步骤明确失败并保留工件。

完成配置后重跑 tag 工作流；已有 next 候选必须与验收工件一致，随后真实公开安装和 latest 推广继续通过 OIDC。以后直接用 tag 触发，不保存长期发布 token。

## 交付状态

2026-10-02 已实现台账、归档／组装、知识与程序工作流、公开回读和精确包验收。`pnpm verify` 通过（74 个单元测试、204 个集成测试，3 个既有 opt-in 环境测试跳过），OpenSpec strict、类型、lint、格式与两个工作流 YAML 解析通过。随后补充的真实 tgz 公共验收脚本测试也通过，实际执行 CLI 与 SDK stdio；下载安装另由受控 registry 用例验证。

从干净提交 `7132722b0dbe80b398d9abbbd844aa4dabc59180` 的生产输入完成 `/agent-harness-wiki/` 子路径构建与独立校验：35,681 个文件，共 243,600,217 字节。使用 Node 24.12.0、pnpm 11.10.0 与仓库既有锁定依赖，未新增依赖。

远程 Pages（workflow 模式）、不可变 Release 设置、`npm-publication` environment 和独立 `publication-state` 分支已初始化；初始 current／恢复目标／npm latest 均为 null。真实部署、恢复与公开 npm 平台验收继续按 tasks 记录，准备成功不视为上线。
