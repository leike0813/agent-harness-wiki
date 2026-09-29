# Spec Delta

## ADDED Requirements

### Requirement: Partial chapter update publication
An incremental release SHALL reuse unchanged immutable chapter editions and retained history, add completed new editions or evidenced mappings, and preserve blocked chapters at their prior fixed-source scope. It SHALL not change the current pointer when no reader-visible chapter, source locator or version mapping changed, or when release verification fails.

#### Scenario: One blocked section
- **WHEN** a new source affects one unfinished theme while another theme is fully updated
- **THEN** the new release may include the completed edition and keeps the blocked theme's previous complete edition and pending audit
