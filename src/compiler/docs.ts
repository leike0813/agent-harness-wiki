import type { Claim, Topic } from "../domain/schema.js";
import { topicSchema } from "../domain/schema.js";
import { canonical, type PublishedKnowledge } from "./projection.js";

export const topicNames: Record<Topic, string> = {
  skills: "Skills（技能）",
  mcp: "MCP",
  custom_agents: "自定义 agents",
  custom_providers: "自定义 providers",
  hooks: "Hooks（钩子）",
  native_plugins: "原生插件",
  configuration: "配置机制",
};

const escapeText = (value: string): string =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/([*_`\[\]{}()#!|])/g, "\\$1")
    .replace(/\r?\n/g, " ");

function renderClaim(
  claim: Claim,
  statuses: Map<string, { status: string; verifiedAt: string }>,
): string {
  const status = claim.assessment_refs.some(
    (id) => statuses.get(id)?.status === "disputed",
  )
    ? "disputed"
    : "accepted";
  const target = {
    ...claim.target,
    version_identity: claim.version_applicability.versions[0],
  };
  const assertion = claim.assertion;
  const detail =
    assertion.type === "search_path"
      ? `发现位置：${assertion.path.base === "home" ? "~" : assertion.path.base}/${assertion.path.segments.join("/")}`
      : assertion.type === "capability_support"
        ? `能力范围：${assertion.capability}`
        : assertion.type === "discovery_rule"
          ? `发现规则：${assertion.rule}`
          : assertion.type === "transport_support"
            ? `传输方式：${assertion.transport}`
            : assertion.type === "provider_protocol"
              ? `协议：${assertion.protocol}`
              : assertion.type === "hook_event"
                ? `事件：${assertion.event}`
                : assertion.type === "plugin_lifecycle"
                  ? `插件阶段：${assertion.stage}；机制：${assertion.mechanism}`
                  : `优先级：${assertion.higher} 高于 ${assertion.lower}`;
  return [
    `### ${escapeText(claim.fact_key)}`,
    "",
    `- Review: ${status}`,
    `- 事实复核时间：${escapeText(
      claim.assessment_refs
        .map((id) => statuses.get(id)?.verifiedAt ?? "")
        .sort()
        .at(-1) ?? "未记录",
    )}`,
    `- 结论：${claim.support.availability}；${escapeText(detail)}`,
    `- 实现方式：${claim.support.delivery ?? "未标注"}`,
    `- 适用：${escapeText(target.harness_id)} ${escapeText(target.version_identity.value)} / ${target.os} / ${target.arch} / ${target.execution_mode} / ${escapeText(target.distribution)}`,
    `- 条件：${claim.conditions.all_of.length ? escapeText(claim.conditions.all_of.map((item) => JSON.stringify(item)).join("；")) : "无额外条件"}`,
    `- Evidence: ${claim.evidence_refs.map((id) => `[${escapeText(id)}](../evidence/${id}.md)`).join(", ")}`,
    "",
  ].join("\n");
}

export function renderDocs(knowledge: PublishedKnowledge): Map<string, string> {
  const pages = new Map<string, string>();
  const records = knowledge.records;
  const notice =
    knowledge.profile === "fixture"
      ? "> Fictional fixture data. Not real harness guidance.\n\n"
      : "";
  const statuses = new Map(
    records.assessments.map((item) => [
      item.assessment_id,
      { status: item.status, verifiedAt: item.fact_verified_at },
    ]),
  );
  const coverageById = new Map(
    records.coverage.map((item) => [item.coverage_id, item]),
  );
  const snapshots = new Map(
    records.snapshots.map((item) => [item.snapshot_id, item]),
  );
  const sources = new Map(
    records.sources.map((item) => [item.source_id, item]),
  );
  const guides = (records.guides ?? []).map((guide) => ({
    ...guide,
    coverage: coverageById.get(guide.coverage_ref),
  }));
  const page = (title: string, lines: string[]): string =>
    `# ${title}\n\n${notice}${lines.join("\n").trimEnd()}\n`;

  pages.set(
    "docs/index.md",
    page("Harness 配置与扩展知识", [
      `Release: ${escapeText(knowledge.release_id)}`,
      "",
      "先选产品，再看精确版本下某一主题的已复核事实与调查缺口。[产品目录](harnesses/index.md) · [发布信息](release.md)",
      "",
      ...topicSchema.options.map(
        (topic) => `- [${topicNames[topic]}](topics/${topic}.md)`,
      ),
    ]),
  );
  pages.set(
    "docs/release.md",
    page("Release details", [
      `- ID: ${escapeText(knowledge.release_id)}`,
      `- Profile: ${knowledge.profile}`,
      `- Published: ${escapeText(knowledge.knowledge_published_at)}`,
      `- Claims: ${records.claims.length}`,
      `- Coverage records: ${records.coverage.length}`,
      `- 阅读章节：${guides.length}`,
      "",
      "发布时间不是来源抓取或事实复核时间；每条结论仍以自己的 Target 和证据为准。",
    ]),
  );
  pages.set(
    "docs/harnesses/index.md",
    page(
      "产品目录",
      records.harnesses.map(
        (item) => `- [${escapeText(item.name)}](${item.harness_id}.md)`,
      ),
    ),
  );
  for (const harness of records.harnesses) {
    const claims = records.claims.filter(
      (item) => item.target.harness_id === harness.harness_id,
    );
    const coverage = records.coverage.filter(
      (item) => item.target.harness_id === harness.harness_id,
    );
    const harnessGuides = guides.filter(
      (item) => item.coverage?.target.harness_id === harness.harness_id,
    );
    const scope = harnessGuides[0]?.coverage?.target;
    pages.set(
      `docs/harnesses/${harness.harness_id}.md`,
      page(escapeText(harness.name), [
        scope
          ? `本页调查对象：${escapeText(scope.distribution)} ${escapeText(scope.version_identity.value)}，${scope.os}/${scope.arch}/${scope.execution_mode}。知识发布于 ${escapeText(knowledge.knowledge_published_at)}。仅针对这个精确版本与环境。`
          : `别名：${harness.aliases.map(escapeText).join("、")}`,
        "",
        "章节中的配置线索用于说明已查到什么；只有「已复核事实」才可作为该版本的配置依据。缺少完整配方、最小示例或重载诊断时，章节会指出仍需核查的环节。",
        "",
        "历史边界：本页不把其他版本、分发或源码 Target 的变化推定为当前包的行为；跨版本结论需要逐版本复核。",
        "",
        ...topicSchema.options.flatMap((topic) => {
          const chapter = harnessGuides.find(
            (item) => item.coverage?.topic === topic,
          );
          const topicCoverage =
            chapter?.coverage ?? coverage.find((item) => item.topic === topic);
          const topicClaims = claims.filter(
            (item) =>
              item.topic === topic &&
              (!topicCoverage ||
                canonical({
                  ...item.target,
                  version_identity: item.version_applicability.versions[0],
                }) === canonical(topicCoverage.target)),
          );
          const inspected =
            topicCoverage?.snapshot_refs?.flatMap((id) => {
              const snapshot = snapshots.get(id);
              if (!snapshot) return [];
              const source = sources.get(snapshot.source_id);
              const label =
                "kind" in snapshot && snapshot.kind === "documentation"
                  ? "官方文档（版本适用性未确认）"
                  : "kind" in snapshot && snapshot.kind === "npm_release"
                    ? `npm 包 ${snapshot.package_name}@${snapshot.version}`
                    : "kind" in snapshot && snapshot.kind === "source_revision"
                      ? "固定源码 revision"
                      : "固定来源";
              const url =
                source?.kind === "official_documentation"
                  ? source.url
                  : source?.kind === "git_repository"
                    ? source.repository_url
                    : undefined;
              return [
                `${url ? `[${label}](${url})` : label} · ${escapeText(id)} · 采集于 ${escapeText(snapshot.source_fetched_at)}`,
              ];
            }) ?? [];
          return [
            `## ${topicNames[topic]} {#${topic}}`,
            "",
            `**${topicNames[topic]}** · Coverage: ${topicCoverage?.status ?? "not_started"}`,
            "",
            ...(topicClaims.length
              ? [
                  "### 已复核事实",
                  "",
                  ...topicClaims.map((item) => renderClaim(item, statuses)),
                ]
              : ["本主题尚无已接受的精确版本能力事实。", ""]),
            ...(chapter
              ? [
                  `### ${escapeText(chapter.title)}`,
                  "",
                  chapter.body.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
                  "",
                ]
              : ["本发布尚无该主题的阅读指南。", ""]),
            ...(inspected.length
              ? [
                  "### 调查材料",
                  "",
                  ...inspected.map((item) => `- ${item}`),
                  "",
                ]
              : []),
          ];
        }),
        ...(coverage.length > harnessGuides.length
          ? [
              "## 其他调查 Target",
              "",
              "以下覆盖记录属于其他版本或分发，不能用于上述精确包。",
              "",
              ...coverage
                .filter(
                  (item) =>
                    !harnessGuides.some(
                      (guide) => guide.coverage_ref === item.coverage_id,
                    ),
                )
                .map(
                  (item) =>
                    `- ${item.topic} / ${escapeText(item.target.distribution)} / ${escapeText(item.target.version_identity.value)}：${item.status}`,
                ),
            ]
          : []),
      ]),
    );
  }
  for (const topic of topicSchema.options as Topic[]) {
    pages.set(
      `docs/topics/${topic}.md`,
      page(topicNames[topic], [
        "选择产品阅读完整调查、精确版本事实和剩余缺口：",
        "",
        ...records.harnesses.map((harness) => {
          const chapter = guides.find(
            (item) =>
              item.coverage?.topic === topic &&
              item.coverage.target.harness_id === harness.harness_id,
          );
          const status =
            chapter?.coverage?.status ??
            records.coverage.find(
              (item) =>
                item.target.harness_id === harness.harness_id &&
                item.topic === topic,
            )?.status ??
            "not_started";
          return `- [${escapeText(harness.name)}](../harnesses/${harness.harness_id}.md#${topic})：${status}`;
        }),
        "",
        "## 已复核事实",
        "",
        ...records.claims
          .filter((item) => item.topic === topic)
          .map((item) => renderClaim(item, statuses)),
      ]),
    );
  }
  for (const item of records.evidence) {
    const claim = records.claims.find(
      (candidate) => candidate.claim_id === item.claim_id,
    );
    const location =
      item.locator.kind === "line"
        ? `第 ${item.locator.start}–${item.locator.end} 行`
        : `章节「${escapeText(item.locator.heading)}」`;
    pages.set(
      `docs/evidence/${item.evidence_id}.md`,
      page(escapeText(item.evidence_id), [
        claim
          ? `- 对应事实：[${escapeText(claim.fact_key)}](../harnesses/${claim.target.harness_id}.md#${claim.topic})`
          : `- 对应 Claim：${escapeText(item.claim_id)}`,
        `- 固定来源：${escapeText(item.snapshot_id)}，${location}`,
        `- 证据方向：${item.stance}；取得方式：${item.basis}`,
        "",
        "### 摘录",
        "",
        `> ${escapeText(item.excerpt)}`,
      ]),
    );
  }
  return pages;
}
