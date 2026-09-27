# First-wave semantic review and decision

## Fixed Targets

<!-- prettier-ignore -->
| Harness | npm package | Version | Fixed source material |
|---|---|---:|---|
| Codex CLI | `@openai/codex` | `0.157.1` | Package snapshot; three captured official Markdown pages with unknown version applicability; older independent source checkout |
| Claude Code | `@anthropic-ai/claude-code` | `2.1.283` | Package snapshot; three captured official Markdown pages with unknown version applicability |
| OpenCode | `opencode-ai` | `1.18.32` | Package snapshot; official source checkout `545f51d26cc39a907d2867492d498d9607ea5fa4` |
| Pi | `@mariozechner/pi-coding-agent` | `0.73.1` | Package snapshot with shipped Skills documentation; official source checkout `781152fc24841dc54b22284514604048ebe5e2c9` |
| OMP | `@oh-my-pi/pi-coding-agent` | `18.3.4` | Package snapshot with shipped source; official source checkout `dff728c572a8c4c29016549b6e407c4550fcdac6` |

Each Target is CLI, Linux/x64, native execution, with a `linux-x64-glibc` npm distribution. Each has seven Coverage records. The Skills, MCP, and configuration records cite their fixed snapshots and describe the files or sections examined, findings, and remaining gaps. Current official web pages are retained for investigation but do not establish the selected package's behavior. The three new source checkouts are recorded separately from npm package snapshots; their tag names alone do not prove a build mapping.

## Reviewed candidate

<!-- prettier-ignore -->
| Field | Value |
|---|---|
| Claim | `knowledge/pi/claims/claim-pi-user-skills-path.yaml` |
| Fact | `skills.discovery.user_path` is the semantic path `{base: home, segments: [.pi, agent, skills]}` |
| Exact Target | Pi CLI, `npm:@mariozechner/pi-coding-agent:linux-x64-glibc`, release `0.73.1` |
| Evidence | `knowledge/pi/evidence/evidence-pi-user-skills-path.yaml`: package snapshot `snapshot-pi-npm`, `docs/skills.md` line 27, excerpt `` `~/.pi/agent/skills/` `` |
| Package integrity | `sha512-gXQh3SaZmWTfVMc4Ao5+LGbVeKvzyO7tolok0nLsZgq9nGjZx/EEU3NM8C+qUnB4Nvs2rswG5qOVgLzQkq0fHQ==` from the tracked pnpm lockfile |
| Assessment | `knowledge/pi/assessments/assessment-pi-user-skills-path.yaml`, status `accepted`; reviewer `human-user`; recorded at `2026-09-27T11:32:20Z` |

The line, package version, integrity, selected file SHA-256, and excerpt passed the explicit offline source audit. The isolated pre-acceptance candidate release `var/review-current/first-wave-review-20260927/` has five harnesses and 35 Coverage records. CLI and MCP returned `partial` with zero published facts for Pi Skills, and the site built without a Pi fact page entry.

The user explicitly accepted this candidate in conversation. The accepted Assessment records that decision while retaining `documented` as the evidence basis and leaving runtime observation outstanding. At this first review, `releases/first-wave-pi-skills-20260927/` was the current formal release. It published one accepted Pi Skills user-path Claim. CLI and a real MCP SDK client both returned that fact under the exact Target; the overall topic status remained `partial`. The site built from that release. The later five-product review and current release are recorded in [full-review.md](full-review.md).
