## ADDED Requirements

### Requirement: Gradual topic coverage and current selection integrity
Validation SHALL permit a registered product to omit topics for which it has no chapter editions. Each authored product-topic pair SHALL have exactly one current selection identifying its own edition. Each registered product SHALL have at least one current chapter. Authored chapters SHALL retain the complete fixed question index and existing source validation.

#### Scenario: New topic not investigated
- **WHEN** an existing registered product has current knowledge but no local_transcripts edition
- **THEN** validation succeeds without adding a placeholder chapter

#### Scenario: Authored topic without current selection
- **WHEN** a product has a topic edition but no current selection for that topic
- **THEN** validation fails with CURRENT_MISSING

#### Scenario: Registered product without knowledge
- **WHEN** a registered product has no current chapter
- **THEN** validation fails with CURRENT_MISSING
