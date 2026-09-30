# Spec Delta

## MODIFIED Requirements

### Requirement: Chapter and source identities
Harnesses, snapshots, chapter editions, section IDs, question IDs, source references and version mappings SHALL have unambiguous identities. A chapter's product SHALL be a declared catalog product and its topic identity SHALL agree with every referenced source's product; every surface a chapter, section, answer, or mapping names SHALL be a declared surface of that product. A snapshot's source identity SHALL remain distinct from software-version applicability.

#### Scenario: Wrong product source
- **WHEN** a Pi question cites an OMP-only source reference
- **THEN** the dataset rejects the cross-product link rather than publishing a Pi conclusion

#### Scenario: Undeclared surface
- **WHEN** a section or answer names a surface absent from its product's catalog entry
- **THEN** validation rejects the unknown surface
