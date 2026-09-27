import Database from "better-sqlite3";
import type { PublishedKnowledge } from "./projection.js";
import { canonical } from "./projection.js";

export function writeSqlite(file: string, knowledge: PublishedKnowledge): void {
  const db = new Database(file);
  try {
    db.pragma("journal_mode = DELETE");
    db.pragma("foreign_keys = ON");
    db.exec(`
      CREATE TABLE harnesses (id TEXT PRIMARY KEY, name TEXT NOT NULL, aliases_json TEXT NOT NULL, payload_json TEXT NOT NULL);
      CREATE TABLE sources (id TEXT PRIMARY KEY, harness_id TEXT NOT NULL REFERENCES harnesses(id), payload_json TEXT NOT NULL);
      CREATE TABLE snapshots (id TEXT PRIMARY KEY, source_id TEXT NOT NULL REFERENCES sources(id), target_key TEXT NOT NULL, payload_json TEXT NOT NULL);
      CREATE TABLE claims (id TEXT PRIMARY KEY, harness_id TEXT NOT NULL REFERENCES harnesses(id), target_key TEXT NOT NULL, topic TEXT NOT NULL, fact_key TEXT NOT NULL, review_status TEXT NOT NULL, payload_json TEXT NOT NULL);
      CREATE TABLE evidence (id TEXT PRIMARY KEY, claim_id TEXT NOT NULL REFERENCES claims(id), snapshot_id TEXT NOT NULL REFERENCES snapshots(id), payload_json TEXT NOT NULL);
      CREATE TABLE assessments (id TEXT PRIMARY KEY, claim_id TEXT NOT NULL REFERENCES claims(id), status TEXT NOT NULL, payload_json TEXT NOT NULL);
      CREATE TABLE coverage (id TEXT PRIMARY KEY, harness_id TEXT NOT NULL REFERENCES harnesses(id), target_key TEXT NOT NULL, topic TEXT NOT NULL, status TEXT NOT NULL, payload_json TEXT NOT NULL);
      CREATE VIRTUAL TABLE claims_fts USING fts5(claim_id UNINDEXED, body);
      CREATE INDEX claims_scope ON claims(harness_id, target_key, topic, fact_key);
      CREATE INDEX coverage_scope ON coverage(harness_id, target_key, topic);
    `);
    const insert = {
      harness: db.prepare("INSERT INTO harnesses VALUES (?, ?, ?, ?)"),
      source: db.prepare("INSERT INTO sources VALUES (?, ?, ?)"),
      snapshot: db.prepare("INSERT INTO snapshots VALUES (?, ?, ?, ?)"),
      claim: db.prepare("INSERT INTO claims VALUES (?, ?, ?, ?, ?, ?, ?)"),
      evidence: db.prepare("INSERT INTO evidence VALUES (?, ?, ?, ?)"),
      assessment: db.prepare("INSERT INTO assessments VALUES (?, ?, ?, ?)"),
      coverage: db.prepare("INSERT INTO coverage VALUES (?, ?, ?, ?, ?, ?)"),
      fts: db.prepare("INSERT INTO claims_fts(claim_id, body) VALUES (?, ?)"),
    };
    const records = knowledge.records;
    const harnesses = new Map(
      records.harnesses.map((item) => [item.harness_id, item]),
    );
    const assessments = new Map(
      records.assessments.map((item) => [item.assessment_id, item]),
    );
    db.transaction(() => {
      for (const item of records.harnesses)
        insert.harness.run(
          item.harness_id,
          item.name,
          canonical(item.aliases),
          canonical(item),
        );
      for (const item of records.sources)
        insert.source.run(item.source_id, item.harness_id, canonical(item));
      for (const item of records.snapshots)
        insert.snapshot.run(
          item.snapshot_id,
          item.source_id,
          canonical(item.target),
          canonical(item),
        );
      for (const item of records.claims) {
        const target = {
          ...item.target,
          version_identity: item.version_applicability.versions[0],
        };
        const reviewStatus = item.assessment_refs.some(
          (id) => assessments.get(id)?.status === "disputed",
        )
          ? "disputed"
          : "accepted";
        insert.claim.run(
          item.claim_id,
          item.target.harness_id,
          canonical(target),
          item.topic,
          item.fact_key,
          reviewStatus,
          canonical(item),
        );
        insert.fts.run(
          item.claim_id,
          [
            item.fact_key,
            item.topic,
            JSON.stringify(item.assertion),
            harnesses.get(item.target.harness_id)?.aliases.join(" ") ?? "",
          ].join(" "),
        );
      }
      for (const item of records.evidence)
        insert.evidence.run(
          item.evidence_id,
          item.claim_id,
          item.snapshot_id,
          canonical(item),
        );
      for (const item of records.assessments)
        insert.assessment.run(
          item.assessment_id,
          item.claim_id,
          item.status,
          canonical(item),
        );
      for (const item of records.coverage)
        insert.coverage.run(
          item.coverage_id,
          item.target.harness_id,
          canonical(item.target),
          item.topic,
          item.status,
          canonical(item),
        );
    })();
  } finally {
    db.close();
  }
}
