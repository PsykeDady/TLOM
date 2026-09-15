# Domain Model

A `Goal` is a stable activity definition: its identity, description, type, schedule and reward definition.

A `GoalOccurrence` records one scheduled or manually created execution of a goal. Its explicit status is `PENDING`, `COMPLETED` or `SKIPPED`; a reminder belongs to this occurrence. Routine scheduling is intentionally not implemented here: the context supplies minimal occurrences that a future scheduler can replace.

A `Mission` is an objective, not merely a collection of goals. It can derive progress from associated Oneshots or receive manual/external progress independently from its supporting goals. A `Campaign` groups Missions, but its aggregation rules remain intentionally incomplete.