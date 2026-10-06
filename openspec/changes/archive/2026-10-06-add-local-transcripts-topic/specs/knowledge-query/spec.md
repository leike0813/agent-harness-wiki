## ADDED Requirements

### Requirement: Uninvestigated declared topic
A read of a valid topic with no chapter for a known product SHALL return not_investigated through existing local and consumer query interfaces. Invalid product or surface identities SHALL retain not_found; version requests without a surface SHALL remain ambiguous. Comparison SHALL preserve each target's uncertainty without inventing answers.

#### Scenario: Partial product coverage
- **WHEN** local_transcripts is requested for a known product that has other current topics only
- **THEN** the read returns not_investigated with the fixed release identity

#### Scenario: Mixed comparison
- **WHEN** one product has local transcript answers and another has no transcript chapter
- **THEN** comparison preserves the answered result and the uninvestigated target
