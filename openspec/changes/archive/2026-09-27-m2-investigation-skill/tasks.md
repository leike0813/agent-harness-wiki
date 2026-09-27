# Tasks

## 1. Investigation contract

- [x] 1.1 Add the manually invoked project Skill with exact-Target intake, fixed-source investigation, draft/gap output, validator commands, and human handoff; verify its instructions against the current schema and the accepted Pi record.
- [x] 1.2 Add a Git ignore exception for only this Skill subtree; verify `git check-ignore` still excludes unrelated `.agents/skills/` content and exposes the new Skill.

## 2. Integration and review

- [x] 2.1 Update the implementation roadmap, README, and development guide for direct Skill invocation before source scanning; verify referenced commands exist and documentation matches the current boundary.
- [x] 2.2 Run the production dataset validator, relevant repository checks, and OpenSpec strict validation; inspect the Skill against the source, review, failure, and output scenarios before marking the change complete.
