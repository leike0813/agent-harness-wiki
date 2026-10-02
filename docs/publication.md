# 公开发布与恢复

知识网页和消费者程序分别发布。消费者的正常查询入口始终是 Pages；GitHub Release 用于维护者取回、重跑和恢复，不是查询故障时的备用数据源。

## 知识发布

`knowledge-publication.yml` 在 main push 时发布，在 PR 中只验证。生产输入是干净 checkout 与完整 Git 历史，不需要本机已发布数据、原件或语义模型。`publication-state/state.json` 持久化实际状态；Release 保存不可变页面和数据，短期 CI artifact 只保存本次诊断。

正常流程是预约固定时间、取得或生成归档、按台账组装保护数据、联合验证、上传 Pages、再次核对 main、写部署意图、部署和公开回读。过期候选跳过；进行中的部署正常结束。完整部署超过 768 MiB 则停止，不自动缩短保留期限。

手动重跑使用 Actions 的 **Knowledge publication** 工作流，选择 main 与 `publish`。恢复选择 `recover`，`release_id` 填台账中已验证的 `web-v1-<完整 SHA>`；历史 commit 无需等于 main。它从已保存页面与数据重组，继续保留故障目标的适用数据，经过同一套完整性、容量、部署和回读检查。首次没有可用旧站时不能声称可恢复。

若台账存在 pending／uncertain，先检查 workflow 日志、Pages 部署状态和公开 current。手动 `reconcile` 填 GitHub environment deployment ID；只有 Pages 平台成功、公开目标一致且完整回读通过才能记可用。环境 job 可因先前回读失败而显示 failure，核对仍以 Pages 状态为准。只有环境 job 终态失败、Pages 未成功且公开指针仍是原目标时，才可选择 abort 结案，不伪造切换或退出时间。状态无法证明时继续阻塞，不通过删除台账绕过。

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

2026-10-02 已实现台账、归档／组装、知识与程序工作流、公开回读和精确包验收。最新完整 `pnpm verify` 已通过：74 项单元测试、210 项集成测试、真实 tgz 的 25 项消费者验收，3 个既有 opt-in 环境测试跳过；类型、lint、格式和文档构建检查通过。OpenSpec strict 与两个工作流 YAML 解析通过。

从干净提交 `7132722b0dbe80b398d9abbbd844aa4dabc59180` 的生产输入完成 `/agent-harness-wiki/` 子路径构建与独立校验：35,681 个文件，共 243,600,217 字节。使用 Node 24.12.0、pnpm 11.10.0 与仓库既有锁定依赖，未新增依赖。

远程 Pages（workflow 模式）、不可变 Release 设置、`npm-publication` environment 和独立 `publication-state` 分支已初始化。真实部署、恢复与公开 npm 平台验收分别记录，准备成功不视为上线。

[PR #1](https://github.com/leike0813/agent-harness-wiki/pull/1) 的完整离线检查、生产构建与独立校验，以及六组消费者平台检查通过后已合入 main。首次发布在归档上传处收到 HTTP 415，尚未部署 Pages；台账仅保留候选预约，current 未切换。上传现区分二进制请求体与 JSON 响应类型，并能从 Release 列表找回没有发布 tag 的草稿；回归测试覆盖上传与重试。

[修复 PR #2](https://github.com/leike0813/agent-harness-wiki/pull/2) 通过全部检查后合入 main。[首次成功发布](https://github.com/leike0813/agent-harness-wiki/actions/runs/36991847168) 部署 `web-v1-012e08b1c5521f4c273b315f70db4651cb52d2dc`，知识时间固定为 `2026-10-02T09:48:33.112Z`，于 `09:53:13.793Z` 验证通过；平台 deployment ID 为 `6805754735`，台账 pending 已清空。公开回读覆盖 current、清单、20 个产品的目录、五查询及三张读者／来源页面，本机独立回读也通过。[不可变归档](https://github.com/leike0813/agent-harness-wiki/releases/tag/web-v1-012e08b1c5521f4c273b315f70db4651cb52d2dc) 已实际取回并解包校验：35,681 个文件，243,602,615 字节。归档压缩文件 25,635,331 字节，SHA-256 为 `c3b22da86b07dfc84272e5cea5f1845bc256c9362b745cfb91619798ae9b21b2`。

[第二次发布](https://github.com/leike0813/agent-harness-wiki/actions/runs/36993233124) 已验证 `web-v1-716cf8f14a05c20d21867f3de753789936d85f58`，并保留首版数据；首版在线清单与已下载归档字节一致。[恢复首版](https://github.com/leike0813/agent-harness-wiki/actions/runs/36994135132) 和[切回第二版](https://github.com/leike0813/agent-harness-wiki/actions/runs/36995222194) 的 Pages 部署均成功，但即时回读仍看到旧指针，因此原工作流如实失败并保留 uncertain。修复后的 `reconcile` 分别于 `2026-10-02T10:23:19.693Z`、`10:31:07.304Z` 确认 Pages 平台状态、目标和完整公开回读，记录已验证转换并清空 pending。首版再次退出时间重置为后者；current 为第二版，恢复目标为首版，两个数据发布均受保护。核对使用修复后的本地维护者命令，保留原失败记录；不把原 workflow 改写为成功。

`npm-v1.0.0` 固定 main 提交 `716cf8f14a05c20d21867f3de753789936d85f58`。[首次程序工作流](https://github.com/leike0813/agent-harness-wiki/actions/runs/36993312841) 首次完成完整仓库检查、tgz 25 项消费者验收和真实 Pages 回读，于 `bootstrap_required` 停止。维护者完成建包与信任配置后，第二次运行核对公开包与候选一致，并通过 Linux x64／macOS arm64／Windows native x64 × Node 24.12.0／24.21.0 六组真实公开安装、五类 CLI、五个 SDK stdio 工具及 Pages 验收。推广器把两个通用错误 DTO 误计为查询命令，报告契约核对失败；修复只要求实际五类操作，仍核对完整平台、程序和知识身份。

候选 tgz 共 36,837 字节，SHA-512 为 `lY3iCOGeV/DKrI0MuHBHvPscg+AjQBcAGXYEPKqn/NH90eHPJtLm7jVzB4Sj8TAlbrMzVAjYsaJm5lNp930EJA==`。维护者建包后首次读取 registry 时，next 与 latest 均已指向 1.0.0；这次人工建包没有保持“验收前仅 next”的预期渠道状态。当时台账 latest 仍为空，未将已有公开别名视为 CI 验证通过或 OIDC 推广完成。

[修复后完整程序工作流](https://github.com/leike0813/agent-harness-wiki/actions/runs/36996997614) 已成功：从 dev 提交 `f9da7dc718af202523766e5c454b71f5c48a0b37` 手动运行发布工具，候选仍取固定 main tag 的原始 1.0.0，不修改 tag 或已发布字节。六组公开报告再次通过，每组含 16 项检查，全部观察第二版知识；随后 npm 11.21.0 在 `npm-publication` environment 通过 OIDC 执行 dist-tag 写入，registry 回读确认 latest 为 1.0.0。台账记录候选 `promoted`、latest `1.0.0`、验证知识 `web-v1-716cf8f14a05c20d21867f3de753789936d85f58`，时间为 `2026-10-02T10:46:56.160Z`。next 同样为 1.0.0，公开 tarball integrity 与候选一致；程序安装入口是 [npm 包](https://www.npmjs.com/package/agent-harness-wiki)。本 change 的 13 项任务已完成，按本次范围保留为 active，不自动归档。
