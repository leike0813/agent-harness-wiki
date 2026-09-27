# 0006 — 按需上游审计与隔离候选

状态：accepted  
日期：2026-09-27  
对应：PRD §9.2、§10、§12，OpenSpec `m2-upstream-incremental-audit`

调查 Skill 默认只接收 registry 中的 harness ID。`sources:scan` 在用户调用时逐个检查其 `source_refs`，比较已有快照或上次成功观察，每次将基线、观察、失败、影响和待复核引用写入 Git 跟踪的 `audits/`。查询和发布不读取审计记录，也不触发网络。精确 Target 问题仍可直接调查。

新 npm 包先按 registry `dist.integrity` 校验 tarball，再由固定的 `tar@7.5.22` 在有界读取中检查条目并定位选定文件；只读归档于 `archive/`，不安装或运行。新 Git commit 放在独立 checkout，保持 submodule 指针不变。归档 npm 文件和隔离 Git 文件可作为 draft Evidence 的固定原件；版本、平台、条件和人工语义复核仍由知识记录承担。候选 tarball 不属于 `research/package-set` 的当前受管安装版本，清理归档时须先检查是否已有正式 Evidence 引用。
