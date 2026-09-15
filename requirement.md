# The Legend of Myself — Phone Client

## 1. Purpose

**The Legend of Myself (TLOM)** is a gamify-your-life platform designed to transform real-life goals, routines and achievements into a game-like progression system.

This repository contains the **Player Phone Client**.

The primary objective of the application is to make personal goal management enjoyable while minimizing the amount of configuration and manual data entry required from the user.

The fundamental UX principle is:

> Complexity belongs to the platform, not to the Player.

Users should preferably install or clone preconfigured activities and campaigns instead of having to design their own gamification system from scratch.

The application must feel like a game rather than a traditional productivity application.

---

# 2. Client Scope

The Phone Client is the primary interface for Players.

It must support:

* personal goals;
* installed activity packages;
* personal campaigns;
* Party Campaign participation;
* Master Campaign participation;
* routines;
* oneshot activities;
* missions;
* rewards;
* virtual currencies;
* stores;
* Player progression;
* notifications;
* Player profile;
* avatar customization.

The Phone Client is **not** the primary administration interface for Masters.

Complex Master Campaign configuration, organization management, analytics and large-scale Player management belong to a separate desktop-oriented **Master Console**.

Some limited Master actions may eventually be available from the Phone Client, but they are not its primary responsibility.

---

# 3. Core Domain Model

TLOM organizes Player activity through four main goal types.

## 3.1 Routine

A **Routine** represents a recurring real-life activity.

Examples:

* take a walk every day;
* follow the planned breakfast;
* study English every Monday, Wednesday and Friday;
* clean the kitchen every Saturday.

A Routine must support scheduling.

At minimum, the model must allow:

* recurrence;
* time of execution;
* activation/deactivation;
* completion;
* rejection/skipping;
* postponement/reminder;
* associated rewards;
* associated progression.

The scheduling model must remain sufficiently generic to support complex recurrence rules in the future.

---

## 3.2 Oneshot

An **Oneshot** represents a non-recurring activity that can be completed once.

Examples:

* go for a run;
* organize the garage;
* complete a specific lesson;
* make a phone call.

Oneshots may be mandatory or optional depending on the Campaign that contains them.

---

## 3.3 Mission

A **Mission** represents a meaningful intermediate objective.

A Mission may contain or depend upon multiple Routines and Oneshots.

Examples:

* lose X kilograms;
* complete a course module;
* save €500;
* finish the backend implementation of a project.

Mission parameters may be configurable when the Mission is installed.

Completion conditions must not be hardcoded into the UI.

---

## 3.4 Campaign

A **Campaign** represents a long-term objective composed of Missions, Routines and/or Oneshots.

Examples:

* reach target weight Y;
* learn a language;
* save enough money for a trip;
* complete a professional training path.

Campaigns must expose clear progress information without requiring the Player to understand their internal implementation.

---

# 4. Campaign Ownership Modes

The Phone Client must be designed around three Campaign ownership modes.

## 4.1 Personal Campaign

A Personal Campaign belongs to the Player.

The Player controls its configuration and progression.

---

## 4.2 Party Campaign

A Party Campaign belongs to a group of Players pursuing a common objective.

Party Campaigns are fundamentally **cooperative**.

The default UX must emphasize:

* shared progress;
* common achievements;
* collaboration;
* collective rewards.

Competition between Party members must never be the default behavior.

Examples:

* a couple saving money for a house;
* friends preparing for a trip;
* a family working toward a shared objective;
* students preparing for an examination.

A Player may join a Party Campaign without paying.

Commercial rules concerning Party creation are server-side/business concerns and must not be hardcoded into the Phone Client.

---

## 4.3 Master Campaign

A Master Campaign is managed by a Master or organization.

The Player participates in goals configured or assigned by the Master.

The Phone Client must allow the Player to:

* view assigned Campaigns;
* view assigned Missions;
* view assigned Routines;
* view assigned Oneshots;
* report completion;
* view validated completion where applicable;
* receive rewards;
* use the Campaign Store;
* view the progress information that the Master has chosen to expose.

The Phone Client must not assume that every Master Campaign is competitive.

Master Campaigns may be:

* cooperative;
* individual;
* team-oriented;
* optionally competitive.

---

# 5. Activity Packages

One of TLOM's primary concepts is the **Activity Package**.

Players should not normally need to manually build complete gamification systems.

Instead, they can discover and install packages containing predefined game mechanics.

A package may define:

* Campaigns;
* Missions;
* Routines;
* Oneshots;
* default schedules;
* configurable parameters;
* reward rules;
* currencies;
* Store items;
* suggested progression rules;
* metadata;
* visual assets.

Example package:

## Healthy Lifestyle

Possible Routines:

* daily walk;
* follow planned breakfast;
* follow planned lunch;
* follow planned dinner.

Possible Oneshot:

* go for a run.

Possible Mission:

* lose X kilograms.

Possible Campaign:

* reach target weight Y.

X and Y are Player-configurable parameters.

TLOM itself does **not** prescribe diets or medical treatment. The package tracks adherence to goals defined by the Player or an appropriate professional.

---

# 6. Package Store

The Phone Client must eventually expose an Activity Package Store.

Players must be able to:

* browse packages;
* search packages;
* inspect package contents before installation;
* install a package;
* configure required parameters;
* clone supported content;
* uninstall or deactivate installed content.

Packages may originate from:

* TLOM official packages;
* community creators;
* organizations;
* Masters.

The architecture must not assume that TLOM developers are the only package authors.

Community-created packages are a fundamental future capability.

---

# 7. Reward Economy

Goals may produce rewards when completed.

Rewards may include:

* experience;
* Campaign-specific currency;
* Package-specific currency;
* unlocks;
* achievements;
* cosmetic rewards.

Currencies must not be assumed to be global.

A Campaign or package may define its own currency and economy.

Example:

A Healthy Lifestyle package contains four daily Routines.

Each completed Routine awards:

```
1 coin
```

Completing all four every day for 30 days allows the Player to earn:

```
4 × 30 = 120 coins
```

The package Store may contain:

```
Pizza — 120 coins
Sushi — 120 coins
```

These are virtual representations of self-assigned real-life rewards.

The application must support both **earning** and **spending** currency.

Virtual currency must therefore not behave merely as an ever-increasing score.

---

# 8. Stores

TLOM may expose multiple kinds of Stores.

## 8.1 Campaign / Package Store

Contains rewards defined by the Campaign or package creator.

Examples:

* pizza;
* sushi;
* free evening;
* personal reward;
* company welfare benefit;
* voucher;
* device;
* organization-provided experience.

---

## 8.2 Cosmetic Store

Contains purely cosmetic Player customization.

Examples:

* armor;
* clothing;
* hairstyles;
* props;
* accessories;
* visual effects;
* avatar backgrounds.

Cosmetics must never provide gameplay advantages.

TLOM must not become pay-to-win.

---

# 9. Player Profile

Every Player must have a profile.

The profile must eventually support:

* display name;
* profile picture;
* pixel-art avatar;
* progression;
* achievements;
* equipped cosmetics;
* owned cosmetics;
* active Campaigns;
* Party memberships.

Privacy controls must determine which information other Players can see.

---

# 10. Pixel-Art Avatar System

TLOM's primary visual identity is based on **pixel art**.

Players may use either:

* a traditional profile picture;
* a customizable pixel-art character.

The pixel-art character creator should follow a simple layered approach similar in spirit to classic 2D RPG character creators.

The avatar system must support composable layers such as:

```
body
eyes
hair
facial features
top
bottom
shoes
armor
headgear
accessories
held items
visual effects
```

The exact layer model may evolve.

Avatar assets must be data-driven and must not require application code changes for every new cosmetic item.

Future cosmetic sets may include themes such as:

* fantasy;
* dark fantasy;
* casual;
* 1990s;
* gothic;
* cyberpunk;
* seasonal content.

The avatar system should be simple enough to render efficiently on mobile devices while allowing a large number of combinations.

---

# 11. Creator Support and Cosmetics

Users may voluntarily support TLOM development through purchases.

Support purchases may reward the Player with cosmetic items.

Examples:

* armor sets;
* outfits;
* props;
* accessories;
* special avatar effects.

These purchases must remain cosmetic.

A Player who never spends money must retain access to the core personal gamification experience.

Monetization rules must be provided by backend configuration and must not be embedded directly in UI logic.

---

# 12. Visual Identity

The application must look and feel like a game.

It must **not** resemble a conventional corporate task-management application.

Primary visual characteristics:

* pixel-art influence;
* dark interface;
* purple as an important accent;
* game-like cards;
* game-like progression indicators;
* expressive feedback for achievements;
* restrained animations.

The default theme should follow a **Dracula-inspired dark/purple aesthetic**.

However, the visual system must support interchangeable themes.

Colors, typography, backgrounds, borders and common visual properties must therefore be based on reusable design tokens rather than hardcoded throughout components.

Future themes may include:

* light;
* retro;
* terminal;
* fantasy;
* cyberpunk;
* seasonal themes.

Only the default theme is required initially.

---

# 13. Mobile-First UX

The Phone Client must be designed **mobile first**.

Common Player actions should require as few interactions as possible.

Particular attention must be given to:

* checking a Routine;
* rejecting/skipping a Routine;
* postponing a Routine;
* checking current progress;
* claiming a reward;
* spending Campaign currency;
* joining a Party;
* joining an Event.

The Player should not be forced to navigate complex forms for common actions.

Advanced configuration should be progressively disclosed.

---

# 14. Notifications

Notifications are a core part of the Player experience rather than an optional convenience.

A scheduled Routine should be capable of producing an actionable notification at the configured time.

Where supported by the platform, the Player should be able to act directly from the notification.

Minimum actions:

```
Complete
Skip
Remind me later
```

The objective is to allow routine management without requiring the Player to open the full application.

Notification scheduling must respect:

* Player preferences;
* Routine schedule;
* timezone;
* disabled Routines;
* Campaign state.

Notification logic must be isolated from presentation components.

---

# 15. Completion and Verification

TLOM must distinguish between different levels of completion trust.

The data model must be capable of representing at least:

```
PLAYER_REPORTED
MASTER_VERIFIED
AUTOMATICALLY_VERIFIED
```

Not every Campaign requires verification.

Personal Campaigns may rely entirely on Player-reported completion.

Master Campaigns may require validation for selected goals.

Future integrations may automatically validate selected activities.

The UI must clearly communicate verification status without making unverified personal goals feel inferior.

---

# 16. Progression

The Player must receive immediate and understandable feedback after meaningful actions.

Possible feedback includes:

* XP gained;
* currency gained;
* Mission progress;
* Campaign progress;
* achievement unlocked;
* cosmetic unlocked;
* Party progress.

Animations and feedback should make completion satisfying but must remain fast and non-blocking.

The Player must always be able to continue interacting with the application without waiting for decorative animations.

---

# 17. Party Experience

Party Campaign screens should emphasize the shared objective.

Default Party views should prioritize:

* collective progress;
* current common objective;
* recent Party achievements;
* Party Missions;
* Party Campaign status.

Individual member statistics may exist when explicitly useful but should not dominate the experience.

The default language and visualization should communicate:

> We are progressing.

rather than:

> I am beating the other members.

---

# 18. Master Campaign Player Experience

Players participating in a Master Campaign must clearly understand:

* which organization/Master controls the Campaign;
* what has been assigned;
* what information is shared with the Master;
* what progress is visible;
* which rewards are available;
* whether a goal requires verification.

The application must visually distinguish:

* personal content;
* Party content;
* Master-managed content.

The distinction must be understandable without exposing implementation details.

---

# 19. Events — Future Capability

The architecture should allow future **TLOM Events**.

Events are temporary Campaigns proposed by the platform or approved providers.

Example:

```
WORLD BOSS
Summer is Coming
Prepare for the boss of every summer!
```

A Player should eventually be able to:

* inspect the Event;
* join with minimal configuration;
* complete Event goals;
* earn Event points;
* unlock Event cosmetics;
* view Event progress;
* optionally participate in leaderboards.

Events must always be opt-in.

Public leaderboards must not encourage unsafe competition around sensitive health metrics.

For example, a health-related Event should rank Event progression or completion rather than kilograms lost, BMI or calorie restriction.

Events are **not required for the initial MVP**.

---

# 20. AI-Assisted Campaign Configuration — Future Capability

Future versions may integrate an AI assistant to reduce configuration effort.

Example Player request:

```
I want to learn guitar.
I can practice 30 minutes three times per week.
I am a beginner.
```

The assistant may propose:

* Campaign;
* Missions;
* Routines;
* optional Oneshots;
* schedules;
* reward structures.

Generated content must remain editable and require Player confirmation before activation.

The core TLOM experience must remain fully functional without AI.

AI integration is **not part of the initial MVP**.

---

# 21. Navigation

The exact navigation structure may evolve during UX development.

The Player must nevertheless have quick access to the conceptual areas:

* Home / Today;
* Campaigns;
* Party;
* Store;
* Profile.

The **Today** experience should be the primary operational screen.

It should answer immediately:

> What should I do now?

and expose currently relevant Routines and Oneshots without forcing the Player to navigate through Campaign hierarchies.

---

# 22. Home / Today

The Home screen should prioritize current actionable content.

It may include:

* due Routines;
* upcoming Routines;
* relevant Oneshots;
* recently completed goals;
* Campaign progress;
* Party progress;
* available rewards;
* important Event information.

The screen must avoid becoming an analytics dashboard.

Detailed statistics belong in dedicated views.

---

# 23. Offline and Network Resilience

Common Player interactions should tolerate temporary network loss where reasonably possible.

Actions such as Routine completion should be designed for optimistic/local persistence and later synchronization.

The UI must represent:

* pending synchronization;
* synchronization failure;
* successful synchronization.

Conflict resolution rules must eventually account for server-authoritative Master Campaign data.

The initial implementation may provide a simpler synchronization strategy, but components must not assume permanent connectivity.

---

# 24. Accessibility

Game aesthetics must not compromise usability.

The application must support:

* readable text;
* sufficient contrast;
* scalable UI;
* meaningful labels;
* keyboard navigation where applicable;
* screen-reader-friendly controls;
* reduced-motion preferences.

Color alone must never represent completion, failure or verification state.

---

# 25. Security and Privacy

The Phone Client must never assume that locally supplied data is trusted.

Authorization and authoritative Campaign rules belong to the backend.

The client must:

* securely handle authentication tokens;
* avoid exposing unnecessary personal data;
* respect Campaign visibility rules;
* distinguish local state from server-authoritative state.

Master-managed content must make data-sharing boundaries understandable to Players.

Sensitive information must never be included in analytics or logs unnecessarily.

---

# 26. Technical Direction

The existing project is a React prototype and may contain obsolete dependencies, experimental components and temporary models.

Before implementing new features, the codebase should be audited.

The modernization effort should:

1. preserve useful existing concepts;
2. remove obsolete or unused dependencies;
3. replace deprecated React patterns;
4. establish a maintainable component structure;
5. introduce a clear domain layer;
6. separate domain state from presentation;
7. establish routing;
8. establish theme tokens;
9. establish API/service abstractions;
10. establish test infrastructure.

Do not preserve old implementation decisions merely for compatibility with the prototype.

The existing repository represents the **origin of the idea**, not an immutable architecture.

---

# 27. Domain/UI Separation

React components must not contain core business rules.

Business concepts such as:

* reward calculation;
* Campaign completion;
* Mission completion;
* schedule interpretation;
* verification;
* Party progression;
* currency transactions;

must live outside visual components.

UI components consume domain state and invoke explicit application actions.

This separation is required to allow future clients and the Master Console to share the same backend semantics.

---

# 28. Backend Independence

The Phone Client must communicate with TLOM backend services through a defined API abstraction.

Components must not depend directly on:

* database structure;
* backend implementation language;
* cloud provider;
* persistence technology.

Mock implementations should be possible during frontend development.

---

# 29. MVP Priority

The first modernized usable version should focus on proving the fundamental TLOM loop:

```
DISCOVER / CREATE
       ↓
    ACTIVATE
       ↓
      DO
       ↓
     EARN
       ↓
   PROGRESS
       ↓
     SPEND
       ↓
     REPEAT
```

Initial priority should therefore be given to:

* modern application foundation;
* Player profile;
* Routine;
* Oneshot;
* Mission;
* Campaign;
* Today screen;
* scheduling;
* actionable notifications;
* basic reward economy;
* Campaign Store;
* basic package installation;
* clear progression feedback.

Party Campaign support should follow once the personal loop is stable.

Master Campaign Player support should reuse the same domain primitives.

Pixel avatar customization may initially use a minimal asset set while preserving the complete layered architecture.

---

# 30. Explicit Non-Goals for the Initial MVP

The initial modernization must **not** attempt to implement the entire TLOM vision at once.

The following may be designed for but deferred:

* complete community marketplace;
* advanced creator economy;
* AI Campaign generation;
* global Events;
* sponsored Events;
* complex public leaderboards;
* enterprise analytics;
* full Master administration;
* advanced automatic activity verification;
* large cosmetic catalog;
* healthcare-specific functionality;
* complex monetization flows.

The architecture should avoid blocking these features, but speculative abstractions must not make the MVP unnecessarily complex.

---

# 31. Product Principles

Every implementation decision should be evaluated against the following principles.

### 31.1 Minimize Player effort

Gamification must not create more work than the activity being gamified.

### 31.2 Prefer ready-made content

Installing and customizing a package should usually be easier than creating a Campaign manually.

### 31.3 Make progress satisfying

Actions should produce immediate, understandable game-like feedback.

### 31.4 Keep competition optional

Personal and Party experiences are primarily about self-improvement and cooperation.

### 31.5 Keep paid gameplay fair

Consumer purchases must not provide gameplay advantages.

### 31.6 Separate authority from presentation

The server determines authoritative state. The Phone Client presents and interacts with it.

### 31.7 Preserve Player ownership

Personal goals and progress must remain conceptually distinct from organization-controlled Campaigns.

### 31.8 Be a game, not another task manager

If a screen starts looking like corporate project-management software without a strong reason, reconsider the UX.

---

# 32. Long-Term Vision

TLOM should ultimately allow one Player identity to participate simultaneously in multiple aspects of real life.

A Player may have:

```
Personal Campaigns
    +
Party Campaigns
    +
Master Campaigns
    +
Temporary Events
```

while maintaining one coherent Player identity, progression system and game experience.

The Phone Client is the Player's window into that world.

TLOM should make real-life progress feel like progressing through a game without requiring the Player to become the designer and administrator of that game.
