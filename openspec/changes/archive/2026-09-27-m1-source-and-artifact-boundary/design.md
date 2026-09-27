# Design

## Context

M0 source records hold fixture files and hashes, and every M0 snapshot has an exact Target. The validator reads fixture bytes, while releases contain source and snapshot metadata and expose no archive access. The new official documentation has no exact CLI version; the Codex repository commit is a source revision, not a package identity. Existing release verification recomputes generated pages, so page output for earlier knowledge must stay unchanged.

## Goals / Non-Goals

**Goals:** Capture one official repository revision and one official documentation page as real, fixed provenance; make metadata independently valid and originals explicitly auditable; keep old releases queryable.

**Non-Goals:** Capability conclusions, five-harness coverage, package acquisition, runtime startup, continuous fetching, or an arbitrary source adapter framework.

## Decisions

- Extend the existing Zod source schema as a strict `kind` union: `fixture_file`, `git_repository`, and `official_documentation`. Add Artifact YAML under `knowledge/<harness>/artifacts/` as a strict union of `git_checkout` and `archived_document`. Each artifact has a globally unique ID and a source/harness owner. Keep content hashes on fixed artifacts and snapshots, never on mutable source definitions.
- Preserve the old snapshot shape as one union branch. Add `source_revision` with an exact `source-tree` Target, artifact ID, commit and selected file hash; add `documentation` with harness/surface, requested and resolved HTTPS URLs, raw and extracted hashes, identity Markdown extractor, and explicit unknown version applicability. Claims remain exact Target records. Existing snapshot-to-claim target checks reject an unversioned document as accepted/disputed evidence until a later change defines a reviewed applicability binding.
- Capture the official Codex repository in `upstream/codex-cli` as a submodule at `67a709665ac7b50311b93e32612c9a8281684787`. The source-tree Target uses CLI/Linux/x64/native and that commit; it does not represent a distributed binary. The selected file is `README.md` and its observed SHA-256 is `ba4e1f69ff48386e72a9c5e1edaf76aad64a475c2d51af79ccba6d1128261ba7`.
- Capture `https://developers.openai.com/codex/cli.md`, which currently redirects to `https://learn.chatgpt.com/docs/codex/cli.md`. Archive the Markdown response under the ignored `archive/codex-cli/<artifact-id>/` directory. Since the response is already Markdown, raw and extracted bytes share one file/hash and the extractor is `identity-markdown@1`. The observed response hash is `4592869a38de248eef8c623816032bc34787c7797fcf7a64e41d860da83d1a5e`; the actual capture must record its own hash and timestamp after verifying the final official origin.
- Ordinary dataset validation checks IDs, owner/source/snapshot references, safe paths, exact commit/hash consistency, and source kind compatibility without reading archives or the network. A separate `pnpm sources:audit` reads only named local artifacts and submodule files, rejects symlinks/traversal, verifies SHA-256 and Git HEAD, and reports missing originals. Default `pnpm verify` stays offline and archive-independent.
- Add `artifacts` to new release JSON and SQLite. The published JSON field is optional for old releases; the builder emits it and uses version `2`, while verification accepts version `1` releases lacking artifact rows. Generated page rendering for old knowledge stays byte-identical. QueryService excludes unversioned documentation snapshots from `latest_upstream`; source revisions remain scoped to `source-tree` distribution.
- The production dataset has only a Codex harness, two sources, two snapshots and two artifacts. It has no Claim or Coverage record yet. New metadata is queryable only through the existing released provenance structures, and no new MCP tool is added.

## Risks / Trade-offs

- Mutable official documentation changes between planning and capture → verify the official redirect and record the captured bytes, hash and actual time, without reusing the observed hash as if immutable.
- Archive/submodule absent on another machine → ordinary offline validation and release reading still work; explicit source audit fails with a specific missing-original diagnostic.
- Metadata is mistaken for capability proof → no accepted claims are added; the validator rejects unversioned document evidence for exact Target claims, and QueryService excludes that document from version discovery.

## Migration Plan

Additive schema and builder version update; retain old fixture record branches and release parsing. Run existing fixture verification and, when available, open an already-built M0 release. Keep source originals out of Git and release artifacts. No history rewrite or publish.
