# Domain Model

A `Goal` is a stable activity definition: its identity, description, type, schedule and reward definition.

A `GoalOccurrence` records one scheduled or manually created execution of a goal. Its explicit status is `PENDING`, `COMPLETED` or `SKIPPED`; a reminder belongs to this occurrence. Routine scheduling is intentionally not implemented here: the context supplies minimal occurrences that a future scheduler can replace.

A `Mission` is an objective, not merely a collection of goals. It can derive progress from associated Oneshots or receive manual/external progress independently from its supporting goals. A `Campaign` groups Missions, but its aggregation rules remain intentionally incomplete.

A `Reward` describes what an occurrence earns. Current typed rewards are experience and currency rewards, and each reward has a stable identity. A `Currency` has its own identity, so balances remain separate. On completion, currency rewards create immutable `LedgerEntry` snapshots linked to the source occurrence and reward ID. The `Ledger` is the economic source of truth; the `Wallet` only projects each balance by summing ledger entries.

A `Store` groups the IDs of its `StoreItem` catalogue entries. Each StoreItem price is explicit as `{currencyId, amount}` and only accepts a non-empty currency ID with a positive integer amount. A successful purchase creates two immutable facts: a `Purchase` with a snapshot of the price paid and a separate negative `LedgerEntry` with source type `STORE_PURCHASE`. The projected Wallet balance decides whether funds are sufficient; no mutable balance is stored. Purchase requests are idempotent by request ID, while distinct requests may buy the same item again. Inventory, refunds, reversals and Currency scope remain intentionally out of scope.

An `ActivityPackage` is serializable installable content: currencies, campaigns, missions, goals, stores and StoreItems are package definitions, not Player runtime state. Validation runs before installation. The installer namespaces every package-local ID as `packageId::type::localId`, materializes definitions for the existing contexts, and records a `PackageInstallation` with package ID, version and installation time. Installing the same package version is idempotent. GoalOccurrence generation happens in GoalsContext after definitions are installed; ledger entries, balances, purchases, completion and reminder state never enter a package. Package parameters, updates/migrations, uninstall/deactivation, persistence, remote catalogs and ownership are deferred.
