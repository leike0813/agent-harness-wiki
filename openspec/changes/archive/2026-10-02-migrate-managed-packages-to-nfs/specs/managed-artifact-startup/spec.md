# Spec Delta

## ADDED Requirements

### Requirement: Shared storage boundary

The updater SHALL strictly validate ignored `var/managed-packages/storage.json` as exactly three required string fields: `bytesRoot`, `mountPoint` and `mountSource`. Only an absent file SHALL select local behavior. An unreadable file, malformed JSON, unknown field or invalid value SHALL block the operation without falling back. This deployment SHALL use the values recorded in ADR 0008.

#### Scenario: Invalid storage configuration

- **WHEN** a required configuration field is missing or invalid
- **THEN** the updater reports blocked without selecting local behavior or touching remote bytes

#### Scenario: Unconfigured storage

- **WHEN** `storage.json` is absent
- **THEN** the updater keeps the local package set behavior and does not touch a remote root

### Requirement: Verified NFS paths and permissions

Before accessing remote bytes the updater SHALL verify the actual NFS mount point and source, resolved path containment and required permissions. An existing mount-point directory alone SHALL NOT prove a mount. Candidates, current and store links SHALL resolve to their prescribed locations; executable entries and platform dependencies SHALL remain within the selected snapshot's `node_modules/.pnpm/`. Failed checks SHALL block access without writing to an unmounted local directory.

For NFSv4, effective and inheritable ACL grants SHALL permit writes, deletion and authorization changes only to the owner. Mode bits alone SHALL NOT prove this boundary.

#### Scenario: Wrong or missing mount

- **WHEN** the recorded NFS mount is absent, has a different source, or a required path or permission check fails
- **THEN** the updater reports blocked and does not modify the selected package set

#### Scenario: Hidden ACL write grant

- **WHEN** a directory has mode 0755 but its NFSv4 ACL grants another identity effective or inherited write access
- **THEN** the operation reports blocked and preserves the selected package set

### Requirement: Split package storage

In NFS mode the updater SHALL retain complete snapshots in `<bytesRoot>/candidates/<UUID>/`, including package manifest, lock, workspace file and node_modules. The workspace file SHALL remain fixed in local Git and be copied when creating the candidate; promotion SHALL leave the local workspace file unchanged. The remote `current` link SHALL point to `candidates/<UUID>`. Local candidates and package-set node_modules SHALL link to remote candidates and current/node_modules respectively. Only `.pnpm-store/v11/files` and `tmp` SHALL link to remote `store/v11/`; index.db, WAL, projects registration, update locks, audits, backups and recovery records SHALL stay local.

#### Scenario: Candidate becomes current

- **WHEN** a complete candidate passes verification and is promoted in NFS mode
- **THEN** its complete snapshot remains under the same UUID and the local store index and registration remain local

### Requirement: Local promotion backup and recovery

Mutating update operations SHALL use a local operation lock. In NFS mode, before promotion the recovery record SHALL retain the previous current target and the prior contents of local package.json and pnpm-lock.yaml. Failed promotion SHALL restore the previous consistent set from those two files and pointer. After interruption the next update SHALL recover before observation or installation. Incomplete recovery SHALL retain the backups and record and block new promotion. The remote pointer and local files SHALL NOT be described as one atomic transaction.

#### Scenario: Interrupted promotion

- **WHEN** an update starts with an unfinished promotion recovery record
- **THEN** it restores the prior local files and pointer before proceeding, preserving remote snapshots

#### Scenario: Read-only commands during pending recovery

- **WHEN** a recovery record exists and check-current is invoked
- **THEN** it reports blocked without acquiring the update lock or performing recovery; observe remains metadata-only and does not acquire the update lock

### Requirement: Hard NFS waiting boundary

File operations on hard NFS MAY wait indefinitely during disconnection, including recovery. The updater SHALL NOT infer completed failure, rollback or safe lock release solely from a process timeout while filesystem work is unresolved.

#### Scenario: NFS disconnects during promotion

- **WHEN** a pointer replacement or recovery operation remains waiting on hard NFS
- **THEN** the operation remains pending and no completed rollback or new promotion is reported

## MODIFIED Requirements

### Requirement: Staged verified package set

Candidate package bytes and platform dependencies SHALL be acquired in ignored staging under the active local or NFS layout, pinned with the package-manager lock, and checked against official integrity before any current set is replaced. Installation scripts SHALL remain disabled. A missing platform dependency or a command that requires postinstall download SHALL be blocked rather than executed to repair the candidate.

#### Scenario: Placeholder main command

- **WHEN** a package's public command is a postinstall placeholder but a locked platform dependency contains the real executable
- **THEN** startup uses the registered direct executable path without enabling installation scripts

### Requirement: Isolated offline startup

The Linux startup check SHALL invoke the registered direct entry and offline version or help argument in bwrap with the selected real snapshot bound read-only, temporary home/config/workspace, no user credentials, no network, and bounded time, output and processes. NFS mode SHALL bind the resolved snapshot rather than the mutable current link. It SHALL record command, runtime, sandbox setup, exit status, identity output and failure. Unavailable bwrap SHALL report blocked without a HOME-only fallback.

#### Scenario: Sandbox absent

- **WHEN** bwrap cannot provide the required isolation
- **THEN** the candidate is blocked, the prior environment remains current, and knowledge publication can proceed independently

### Requirement: Successful promotion and independent status

Only a candidate with verified package.json, pnpm-lock.yaml and node_modules that passes identity checks and isolated startup for every selected CLI SHALL become current. In NFS mode promotion SHALL replace `current` atomically by renaming a temporary link in the same directory, and synchronize local manifest and lock files. Success SHALL require matching local identity and selected snapshot. Historical and failed candidates SHALL remain retained without automatic cleanup. Startup status SHALL remain independent of topic evidence and knowledge publication.

#### Scenario: New package fails startup

- **WHEN** a candidate package verifies but its offline help command fails
- **THEN** the old runnable package remains current while the new candidate and its reason remain recorded
