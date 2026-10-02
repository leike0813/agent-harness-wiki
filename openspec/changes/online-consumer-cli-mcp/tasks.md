# Tasks

## 1. 公共契约与共享领域

- [x] 1.1 定义消费者 strict 结果、metadata、history_scope、history_not_available 和结构化技术错误 schema，接入 JSON Schema 导出／检查，以代表性正常／错误结果校验并通过类型检查。
- [x] 1.2 抽出产品解析、版本选择、章节／小节界面答案投影、比较共同问题与分页纯逻辑，接回本地 QueryService；复用本地版本／界面／query 测试确认同步调用和本地 DTO 不变。
- [x] 1.3 实现在线五查询，按需读目录／主题／选定章节／来源目录，裁剪选版在正文请求前完成；测试 exact／prefix／近似／source_only／partial-section／candidate／未调查／来源缺失与比较裁剪目标。
- [x] 1.4 接入共享词法读取、页面定位和合作取消；从真实生成资源测试排序／分页、回读小节、cache 计量及所有既定预算，文档记录共享领域与两条能力线。

## 2. 固定发布的客户端与缓存

- [x] 2.1 实现在线 current→manifest→catalog 初始化、协议／退役检测、固定发布及最后成功记录；受控 HTTP 测试 A→B、失败不退旧、不覆盖成功记录、损坏身份和子路径定位。
- [x] 2.2 实现内存32 MiB及磁盘128 MiB目标 LRU、owned namespace、原子写、读取重校验、在线恢复／离线失败和禁用磁盘；测试并发完整写／损坏／回收／写失败及离线部分缓存，ADR说明软容量边界。
- [x] 2.3 落实30秒总期限、10秒单次完整HTTP、4并发、64不同资源、两次GET与Retry-After；用表格驱动HTTP故障／期限／排队／warm-cache预算测试验证永久错误不重试。
- [x] 2.4 传递取消到队列、fetch、正文、退避与有界组装，close终止未完成工作；验证独立调用不受取消及总期限不重置。
- [x] 2.5 落实三平台缓存默认路径与显式覆盖、不读真实HOME；参数化路径测试覆盖无效环境变量及含空格目录，补开发文档。

## 3. 消费者入口与MCP

- [x] 3.1 创建消费者只读CLI与启动参数、help／version免初始化、JSON统一错误和退出码；CLI集成测试五查询、错误／离线、无维护命令及全局参数位置。
- [x] 3.2 将MCP适配改为五操作结构接口，保留本地入口并加入消费者版本／词法说明／metadata／isError，保持128 KiB及小节指导；运行本地MCP与response-limit测试。
- [x] 3.3 从消费者进程用真实SDK测试恰好五工具／无Resources和Prompts／输入拒绝／结果一致，取消／断连使HTTP工作结束，失败不退出进程；不使用handler mock冒充协议测试。

## 4. 独立工件与许可

- [x] 4.1 创建公开1.0.0消费者workspace、私有维护者包名、依赖闭包编译与显式files，生成consumer:build／pack入口；实际tgz清单验证无维护者、数据库、模型、知识或workspace依赖。
- [x] 4.2 实现受控npm源／隔离缓存及源码树外真实tgz安装／npx验收，consumer:verify检查五CLI／stdio／版本及依赖；默认不访问公网、真实HOME或全局安装。
- [x] 4.3 落实MIT代码与CC BY4.0原创知识／文档许可和第三方权利，加入消费者完整说明及固定版本MCP模板；核对package许可／tgz携带许可与本地入口文档。

## 5. 验证矩阵与交接

- [x] 5.1 创建仅验证CI：三OS／架构×Node最低24.12.0及最新24.x，执行真实包、含空格路径、CLI和SDK stdio，记录环境且无发布权限；静态核对工作流与本地验收脚本一致。
- [x] 5.2 实际运行本机消费者验收，记录Node／ICU／平台、包体积和测试；完成PRD／AGENTS／README／数据模型／开发／ADR／路线图更新，修复前置归档链接，清晰区分已实现／已打包／已上线。
- [x] 5.3 在真实Linux最低／最新24.x、macOS arm64及Windows x64 runner执行矩阵并保存结果；未运行组合保留本项未完成，不把路径模拟或CI文件存在当实际通过。
- [x] 5.4 完成pnpm verify、消费者相关检查、schema／format／lint／typecheck及openspec strict验证，修复实际回归；核对任务证据与第三change交接，Git提交与推送按维护者明确授权执行，不归档或公开发布。

本机验收、包清单与实际矩阵见 [ADR 0010](../../../docs/decisions/0010-online-consumer.md#本机验收)。2026-10-02 的 [CI 36970819489](https://github.com/leike0813/agent-harness-wiki/actions/runs/36970819489) 在六个真实 runner 组合均通过，每组 25 项检查；已下载各组 verification.json 与 manifest.json，5.3 据此勾选。
