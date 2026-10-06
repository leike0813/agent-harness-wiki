## ADDED Requirements

### Requirement: Local transcript consumer support
Consumer 1.2.0 SHALL accept local_transcripts through its existing five queries and stdio MCP using data/v1. Distribution documentation SHALL state that online knowledge containing this topic requires an upgraded consumer because previous consumers validate a closed topic enum. Topic expansion SHALL NOT add a write tool or transcript cleanup command.

#### Scenario: Packaged transcript read
- **WHEN** an installed consumer reads a fixture publication with local transcript knowledge
- **THEN** CLI and MCP return the same cited chapter and normal not_investigated outcomes for missing coverage
