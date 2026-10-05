## ADDED Requirements

### Requirement: Product and scope selection
The consumer SHALL offer `ahw init` with a searchable multi-select TUI adapted from ResearchSpec, including search, bounded scrolling, independent selection, arrow navigation, Space toggle, Enter completion and clean cancellation. Product identities SHALL come from catalog. `--tools` SHALL accept comma-separated IDs, names or aliases and bypass the selection TUI. Project scope SHALL default to cwd; `--global` SHALL select global scope.

#### Scenario: Filtering selected products
- **WHEN** a selected product disappears from filtered results
- **THEN** its selection remains until explicitly deselected

#### Scenario: Unsupported project scope
- **WHEN** all selected products lack project configuration
- **THEN** the project option is disabled and global scope remains available

#### Scenario: Mixed project support
- **WHEN** some selected products lack project configuration
- **THEN** the scope option, warning and plan identify those skipped products before confirmation

### Requirement: Review before configuration
Every initialization SHALL display a plan identifying products, scope, concrete paths, actions and skipped reasons before writing. Confirmation SHALL default to refusal. Non-TUI `--yes` or `-y` SHALL skip confirmation while retaining the plan. Non-interactive input SHALL require explicit tools and yes. JSON mode SHALL reserve stdout for structured results.

#### Scenario: Refusal or cancellation
- **WHEN** a user refuses or cancels initialization
- **THEN** no directories, backups or configuration files are written

### Requirement: Verified configuration entries
Initialization SHALL configure all verified local entries of a selected product and deduplicate shared files, preserving unrelated settings, servers and comments. Unknown or UI-only entries SHALL be skipped with reasons. Amazon Q SHALL use existing agents only; ambiguous Bob global paths SHALL be skipped; Rovo Dev SHALL use its explicit mcpConfigPath. Launch configuration SHALL use the server name agent-harness-wiki and the unversioned npm package, preserving explicitly supplied consumer options.

#### Scenario: Existing server
- **WHEN** the same server is already configured
- **THEN** equivalent configuration remains unchanged and differing configuration is planned for confirmed update

### Requirement: Preflight and recovery
All candidate files SHALL be parsed, edited and checked before any writes. Invalid or unwritable targets SHALL abort the entire round. Confirmed writes SHALL check the baseline, preserve permissions and symlink behavior, back up replaced files and restore this round's writes on failure without overwriting concurrent modifications. Init SHALL not initialize knowledge queries or execute a harness.

#### Scenario: One corrupt target
- **WHEN** one target configuration cannot be parsed
- **THEN** no selected target is written and initialization exits nonzero

#### Scenario: Concurrent modification
- **WHEN** a target changes after plan generation
- **THEN** initialization refuses to replace that changed file
