# Reading results

A fact applies only to its stated Target, version and conditions. Evidence links identify supporting published records.

- `ok`: reviewed facts match the requested Target and conditions.
- `partial`: investigation coverage is incomplete; listed facts remain conditional.
- `unknown`: a completed investigation did not establish the requested fact. It does not mean unsupported.
- `not_verified`: the requested version or Target has no verified conclusion. Exact versions do not fall back.
- `ambiguous`: required conditions are missing or the latest version cannot be selected uniquely.
- `conflict`: disputed evidence or assessments remain visible for review.
- `not_found`: the requested harness or evidence is absent from this release.

Source observation time (`source_fetched_at`), fact verification time (`fact_verified_at`) and knowledge publication time describe separate events. A newer upstream version does not inherit facts from an older version.
