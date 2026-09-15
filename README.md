# The Legend of Myself

> Everyone has an incredible story — indeed, a legend — to tell.

**The Legend of Myself**, or **TLOM**, is an open gamify-your-life platform designed to turn real-life goals, habits and achievements into something that feels more like playing a game.

TLOM started from a simple problem:

**gamifying your life should not become another chore.**

Many gamification and habit-tracking applications require users to create every activity, configure every recurrence, assign rewards and continuously maintain the system themselves.

TLOM takes a different approach.

Instead of asking every Player to become the game designer of their own life, TLOM aims to provide a shared ecosystem of ready-made activities, Campaigns and complete activity packages that can be installed, configured, cloned and shared.

The complexity should live inside the platform.

The Player should be able to simply play.

---

# The basic idea

In TLOM, real-life progress is represented through four main kinds of objectives.

## Routine

A recurring activity.

Examples:

* take a walk every day;
* study for 30 minutes;
* follow your planned breakfast;
* clean the kitchen every Saturday.

## Oneshot

A non-recurring activity that can be completed once.

Examples:

* go for a run;
* make an important phone call;
* organize the garage;
* finish a particular lesson.

## Mission

A meaningful intermediate objective.

Examples:

* save €500;
* complete a course;
* reach a configurable milestone;
* finish a project phase.

## Campaign

A long-term objective representing a larger journey.

Examples:

* improve your lifestyle;
* learn a language;
* save for a trip;
* reach a personal goal.

A Campaign may contain Missions, Routines and Oneshots.

---

# Do. Earn. Progress. Spend.

Completing real-life activities can reward the Player with:

* experience;
* virtual currencies;
* achievements;
* unlocks;
* cosmetic items;
* Campaign-specific rewards.

Currencies are not necessarily global.

A Campaign or activity package can define its own economy and Store.

For example, consider a hypothetical **Healthy Lifestyle** package.

It could contain four daily Routines:

* take a walk;
* follow your planned breakfast;
* follow your planned lunch;
* follow your planned dinner.

Each completed Routine could award one coin.

Completing four Routines every day for thirty days means:

```text
4 × 30 = 120 coins
```

The package Store could then contain personal rewards such as:

```text
Pizza     120 coins
Sushi     120 coins
```

The point is not for TLOM to define what a healthy lifestyle or diet should be.

TLOM provides the game mechanics.

The Player — or, where appropriate, a professional — defines the actual real-life plan.

---

# Activity Packages

One of the main goals of TLOM is to reduce configuration overhead through **Activity Packages**.

Instead of manually creating an entire system, a Player should eventually be able to browse the TLOM Store and install something such as:

```text
Healthy Lifestyle
Learn Guitar
Learn a Language
Keep the House Organized
Save for a Trip
Reading Challenge
```

A package may provide:

* Campaigns;
* Missions;
* Routines;
* Oneshots;
* schedules;
* configurable parameters;
* currencies;
* reward rules;
* Store items;
* visual assets.

Some values can be requested during installation.

For example:

```text
Mission:
    Reach milestone X

Campaign:
    Reach target Y
```

The package defines the mechanics.

The Player only supplies `X` and `Y`.

Packages can initially be provided by TLOM itself, but the long-term goal is to allow community creators to create, share, clone and customize them.

TLOM should become an ecosystem of reusable real-life game mechanics rather than a static collection maintained exclusively by its developers.

---

# One Player, many adventures

Not every real-life goal belongs to a single person.

TLOM is therefore designed around different Campaign modes.

## Personal Campaign

The classic TLOM experience.

The Player owns the Campaign and progresses through it independently.

```text
Player
  └── Campaign
       ├── Mission
       ├── Routine
       └── Oneshot
```

---

# Party Campaign

Some legends are written together.

A **Party Campaign** extends the TLOM model to a group of Players pursuing the same real-life objective.

Party Campaigns are designed to be strongly **cooperative**, not competitive.

For example, two people may want to save money together for a house.

```text
🏠 Campaign: Our House

Party
├── Player A
│    └── Save €1 today
│
└── Player B
     └── Save €1 today

Shared progress
    ↓
Our House
```

Other examples could include:

* couples saving for something together;
* friends preparing for a journey;
* families working toward a shared objective;
* students preparing for an examination.

The important metric is normally:

> **How far have we progressed?**

not:

> Who is winning?

Joining someone else's Party Campaign should not require payment.

The commercial model, when applicable, concerns Party creation rather than participation.

---

# Master Campaign

A **Master Campaign** introduces an authoritative Campaign owner.

This makes TLOM useful in situations where goals are assigned or supervised by someone other than the Player.

Possible Masters include:

* organizations;
* companies;
* teams;
* coaches;
* professionals.

A Master can create and organize:

* Campaigns;
* Missions;
* Routines;
* Oneshots;
* Parties;
* rewards;
* Stores.

A Master may also delegate responsibilities to **Sub-Masters**.

Conceptually:

```text
Master
  │
  ├── Sub-Master
  │     ├── Party
  │     │    ├── Player
  │     │    └── Player
  │     │
  │     └── Player
  │
  └── Party
        ├── Player
        └── Player
```

Master Campaigns can optionally introduce verification.

TLOM should eventually be capable of distinguishing between:

```text
Player reported
Master verified
Automatically verified
```

The purpose of the Master model is not necessarily competition or surveillance.

It provides **authority, orchestration and verification** where a Campaign requires them.

---

# TLOM for organizations

A company could use TLOM to transform internal objectives, training and incentive programs into Campaigns.

A Master could define:

```text
Campaign
    Release 4.0

Missions
    Backend
    Frontend
    Documentation
    Security Review
```

or:

```text
Campaign
    Professional Development

Missions
    Certification
    Training
    Mentoring
```

Employees earn points according to rules defined by the organization.

Those points could be spent in an organization-controlled Store containing additional benefits such as:

* vouchers;
* devices;
* welfare benefits;
* experiences;
* company-promoted travel packages.

TLOM must not assume that raw activity volume represents productivity.

More tasks, more commits or more lines of code do not automatically mean more valuable work.

Organizations define what their objectives mean.

TLOM provides the engine to represent and track them.

Master Campaigns may expose statistics and rankings where appropriate, but competition should remain configurable rather than mandatory.

---

# TLOM for professionals

The same Master model can operate at a much smaller scale.

For example, a nutrition professional could supervise a Player's **Healthy Lifestyle** Campaign.

The professional could:

* configure the Campaign;
* monitor adherence;
* verify selected progress;
* adjust goals;
* update the Player's plan when appropriate.

TLOM itself does not prescribe diets, treatments or medical decisions.

It provides the infrastructure through which Players and qualified professionals can manage goals together.

Domains involving health data require additional privacy, security and regulatory considerations and are therefore part of the longer-term platform vision.

---

# The Player

Your character in TLOM is quite literally **you**.

Players may use a normal profile picture, but TLOM also aims to provide a customizable **pixel-art avatar**.

The character system will use composable graphical layers such as:

```text
Body
Eyes
Hair
Clothes
Shoes
Armor
Headgear
Accessories
Props
Effects
```

The goal is a simple but expressive character creator inspired by classic pixel-art games.

Want to look like a demonic paladin?

Go ahead.

Want a dark 1990s outfit?

Also perfectly valid.

Your life, your legend.

---

# Cosmetics

TLOM's core personal experience is intended to remain accessible without requiring gameplay purchases.

Players may eventually support development through optional cosmetic purchases.

Possible cosmetics include:

* armor;
* outfits;
* hairstyles;
* accessories;
* props;
* effects;
* seasonal sets.

Cosmetics must not provide gameplay advantages.

No pay-to-win.

Looking unnecessarily fabulous while completing the laundry Routine, however, is absolutely allowed.

---

# Visual identity

TLOM should feel like a game.

The main visual language is based around:

* pixel art;
* dark interfaces;
* purple accents;
* game-like cards;
* progress bars;
* rewards;
* achievements;
* subtle animations.

The default visual identity is inspired by a **Dracula-style dark/purple palette**.

The application is designed to support interchangeable themes in the future.

---

# Notifications

One of TLOM's core design goals is to minimize interaction overhead.

A Player should not need to repeatedly open the application just to report routine activities.

Scheduled Routines should eventually generate actionable notifications such as:

```text
🍝 Lunch Routine

Did you follow your plan?

[ Complete ] [ Skip ] [ Remind me later ]
```

Whenever supported by the platform, these actions should be available directly from the notification.

The boring part of TLOM should come to the Player.

The Player should open TLOM for the fun part.

---

# TLOM Events

Future versions may introduce temporary global Events.

Events behave like special Campaigns that Players can join with minimal configuration.

For example:

```text
☠ WORLD BOSS APPROACHING

SUMMER IS COMING

Prepare for the boss of every summer.

[ ACCEPT QUEST ]
```

Events may include:

* special Missions;
* Event points;
* achievements;
* temporary Campaigns;
* exclusive cosmetics;
* optional leaderboards.

Possible Events include:

```text
🎃 Spooky Season
🌱 Spring Cleaning Raid
📚 Back to School
🎄 Christmas Rush
📖 Reading Month
```

Public Events should reward healthy progression rather than encourage unsafe competition around sensitive metrics.

Events may eventually be official, community-created or clearly identified sponsored experiences.

---

# AI-assisted Campaigns

A future version of TLOM may use AI to further reduce configuration effort.

Instead of manually building a Campaign, a Player could say:

```text
I want to learn guitar.
I am a beginner.
I can practice for 30 minutes three times per week.
```

TLOM could propose:

```text
Campaign
├── Mission
│    ├── Routine
│    ├── Routine
│    └── Oneshot
└── Mission
     └── ...
```

The Player reviews the proposal, changes anything they want and activates it.

The same concept may assist Masters in designing organizational Campaigns.

AI is an optional assistant.

TLOM must remain usable without it.

---

# Clients

The long-term TLOM platform is expected to expose different interfaces for different roles.

## Player Phone Client

The primary Player experience.

Designed around:

* Today;
* Routines;
* Oneshots;
* Campaigns;
* Parties;
* rewards;
* Stores;
* avatar;
* notifications.

It is mobile-first and intentionally game-like.

## Master Console

Masters have different requirements.

Managing many Players, Parties, Campaigns and metrics is easier from a larger interface.

The Master Console is therefore intended to be desktop-first and focused on:

* Campaign creation;
* Mission management;
* Party management;
* Player assignment;
* Sub-Masters;
* rewards;
* Store configuration;
* analytics;
* progress monitoring.

Both clients operate on the same underlying TLOM concepts.

---

# Business model

TLOM is being designed with a **free personal core**.

The objective is not to lock ordinary personal gamification behind subscriptions.

Potential revenue sources include different layers of the platform.

## Cosmetics

Optional cosmetic purchases supporting TLOM development.

They provide visual customization only.

## Party Campaigns

Joining Party Campaigns should remain free.

Creating Parties may eventually require either a very small payment or an inexpensive annual Party feature.

The goal is to keep cooperative personal use accessible.

## Master Campaigns

Master Campaigns represent the primary professional and B2B business model.

Masters and organizations may subscribe according to the number of managed Players and required capabilities.

Exact pricing has intentionally not been defined yet.

Pricing must eventually consider:

* infrastructure costs;
* cloud costs;
* support;
* organization size;
* operational requirements;
* sustainable development.

---

# Development philosophy

TLOM is deliberately ambitious.

That does **not** mean everything should be implemented immediately.

The project should grow incrementally while preserving several fundamental principles.

## Complexity belongs to the platform

Players should not need to become game designers.

## Reduce friction

If gamifying an activity takes more effort than performing it, something is wrong.

## Ready-made first

Installing and configuring an existing package should normally be easier than building one manually.

## Cooperation first

Party Campaigns are primarily cooperative.

## Competition is optional

Leaderboards can be useful, particularly in some Master Campaigns and Events, but they are not the foundation of TLOM.

## Real rewards matter

Points should be capable of representing something meaningful instead of being meaningless numbers that increase forever.

## No pay-to-win

Consumer purchases should never make someone better at TLOM.

## TLOM provides mechanics, not life advice

The platform helps Players follow goals.

It does not decide what their health, financial, professional or personal goals should be.

## It should still be a game

TLOM must never become a boring task manager wearing a pixel-art hat.

---

# Roadmap

TLOM began as a small React prototype in 2022.

The original prototype established the first concepts:

* Goals;
* Routines;
* Oneshots;
* Missions;
* Campaigns;
* rewards;
* recurring schedules;
* Player/session concepts.

The project is now being redesigned around the larger TLOM vision.

## Phase 0 — Talete

**Original prototype — 14 October 2022**

Initial experimentation with:

* React;
* Goal model;
* Routines;
* Oneshots;
* Missions;
* Campaigns;
* recurrence;
* rewards;
* basic Player interface.

This phase represents the origin of TLOM rather than its final architecture.

---

## Phase 1 — Rebuild the Player

Modernize the Phone Client and establish the current TLOM foundations.

Primary objectives:

* modern React architecture;
* domain/UI separation;
* mobile-first navigation;
* Today experience;
* Routines;
* Oneshots;
* Missions;
* Campaigns;
* Player profile;
* basic progression;
* currencies;
* Campaign Store;
* scheduling;
* actionable notifications;
* Dracula-inspired theme;
* initial pixel-art avatar architecture.

The objective of this phase is to prove the fundamental loop:

```text
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

---

## Phase 2 — Packages

Build the system that removes the burden of manually designing your own game.

Objectives:

* Activity Package format;
* package installation;
* configurable package parameters;
* official package catalog;
* cloning;
* package updates;
* package Store integration.

Later iterations may introduce community publishing.

---

## Phase 3 — Party Campaigns

Bring cooperative progression to TLOM.

Objectives:

* Parties;
* invitations;
* Party Campaigns;
* shared Missions;
* shared progress;
* Party rewards;
* Party Campaign Store;
* cooperative UX;
* Party creation business rules.

Joining another Player's Party remains frictionless.

---

## Phase 4 — Master Campaigns

Introduce authoritative Campaign management.

Objectives:

* Master role;
* Sub-Master role;
* Player assignment;
* Party assignment;
* verification;
* organization Stores;
* configurable metrics;
* Master Console;
* subscriptions based on managed Players.

This phase establishes the foundation of TLOM's professional and B2B platform.

---

## Phase 5 — The Living Game

Make the TLOM world evolve around its Players.

Possible objectives:

* global Events;
* seasonal Campaigns;
* Event cosmetics;
* Event leaderboards;
* creator ecosystem;
* richer avatar customization;
* additional themes;
* automatic activity verification;
* external integrations.

---

## Phase 6 — Intelligent Assistance

Use AI where it genuinely reduces Player and Master effort.

Possible objectives:

* natural-language Campaign creation;
* suggested Missions;
* suggested Routines;
* schedule generation;
* package customization;
* Master Campaign assistance.

AI remains an assistant rather than a requirement.

---

# Current status

TLOM is currently under active redesign.

The existing source code should be considered an **early prototype**.

Some concepts already exist in code, while many parts described in this document represent the planned direction of the project.

Expect things to change.

Probably a lot.

---

# The Legend of Myself

TLOM is based on a simple idea:

Real life already contains quests.

Some repeat every day.

Some take five minutes.

Some take years.

Some are yours alone.

Some only make sense with other people.

Some have someone helping you along the way.

TLOM tries to give all of them the language of a game.

**Your goals.
Your party.
Your rewards.
Your progress.
Your legend.**
