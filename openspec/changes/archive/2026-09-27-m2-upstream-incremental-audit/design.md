## Design

The scanner loads the validated production dataset and resolves only harness IDs in the registry. Each registered Source is observed independently. The initial baseline comes from existing Snapshots; later scans use the latest successful observation in the Git audit ledger. Errors are recorded per Source and do not suppress other observations.

An audit record contains the observed identity, baseline, status, time, changed paths where available, and potentially affected topics and Claim IDs. The record belongs to `audits/<harness-id>/`, outside the publication dataset. A no-change invocation still writes a record. Changed or blocked observations remain pending until a maintainer investigates or resolves them; the Skill links draft candidates and gaps to the audit record.

For npm, the scanner checks registry metadata and `dist.integrity`. New package tarballs are downloaded into ignored `archive/`, verified against SRI, then read as bounded tar entries without extracting or running them. An `archived_package_file` Artifact can later identify a selected entry and its hash. The fixed `research/package-set` is untouched.

For Git, the scanner resolves the remote default HEAD, clones changed revisions into an ignored candidate checkout, and compares paths if the baseline commit can be obtained. It never moves a submodule. Documentation is fetched from its registered Markdown URL and compared by raw SHA-256; redirects stay on the registered origin.

The Skill maps direct source and file changes to existing evidence and coverage, and broadens review to all seven topics for new package versions or uncertain configuration/build changes. It creates exact-Target draft records only where evidence supports them. Existing accepted records and the release pointer remain unchanged.
