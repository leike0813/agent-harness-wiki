# Architecture (placeholder)

> Skeleton-only stub. Full content will be added with the M0 source tree
> (see `AGENTS.md` §11 and PRD §17).

Planned sections:

- Maintenance side vs. query side boundaries.
- Data flow: registry/knowledge → builder → release → QueryService → CLI/MCP/site.
- Module dependency direction (domain at the bottom, MCP at the top).
- Source of truth (Git knowledge) vs. build artifacts (JSON / SQLite / Markdown).
- Why queries never call an LLM.