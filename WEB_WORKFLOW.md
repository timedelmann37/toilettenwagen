# Web Workflow - Direction before Code

This is the operating guide for agents building or redesigning a marketing site, landing page, portfolio, editorial site, or other brand-led web surface. It exists to preserve decisions between sessions and to prevent a competent implementation from collapsing into a familiar AI landing-page template.

## Authority and scope

Apply this workflow to landing pages, portfolios, campaign pages, editorial sites, and redesigns. It is not the primary workflow for dashboards, dense admin tools, data tables, multi-step wizards, native apps, or collaborative editors. For those, first choose the appropriate product UI system and use the relevant parts of this guide only for marketing surfaces.

Resolve conflicts in this order:

1. Explicit user instruction and verified product facts.
2. Legal, accessibility, performance, and existing business constraints.
3. Confirmed project decisions in `CONTEXT.md`, ADRs, `PRODUCT.md`, `DESIGN.md`, and the current Direction Contract.
4. This workflow and its skills.
5. Aesthetic preference, reference trends, and agent intuition.

Never invent product claims, customer logos, statistics, certifications, or case-study results. A synthetic demonstration is allowed only when clearly marked as synthetic.

## Current state - read and update first

Keep this block accurate at every phase boundary. An agent must resume from the stated phase, not restart the workflow or skip ahead.

```md
## Workflow state

- Surface: `<route or surface name>`
- Mode: `<Persuade | Experience | Read | Operate>`
- Phase: `<0-9 from the table below>`
- Redesign mode: `<greenfield | preserve | overhaul>`
- Confirmed direction: `<one-sentence thesis, or pending>`
- Current primary source: `<brief, spec, ticket, or decision path>`
- Next permitted action: `<one concrete action>`
- Open decision or blocker: `<none, or a concrete question>`
- Last visual evidence: `<desktop/mobile screenshot paths and date>`
```

Do not write "in progress" as a phase. Name the actual phase and the next permitted action. If the block is missing or stale, inspect the repository, the issue tracker, and the last visual evidence before deciding where to resume.

## Workflow map

| Phase | Gate | Required outcome | Next action |
| --- | --- | --- | --- |
| 0. Prepare | Engineering workspace is configured | Tracker and durable decision docs are known | Discovery |
| 1. Discover | Product truth is understood | A sharp problem, audience, proof, and constraints | Research |
| 2. Research | References are interpreted | A compact reference ledger, not a moodboard dump | Direction |
| 3. Direction | User confirms one world | Direction Contract and a distinct page model | Specification |
| 4. Specify | Seams and scope are agreed | Published spec with visual, functional, and test decisions | Tickets |
| 5. Plan assets and slices | Each slice is independently demonstrable | Asset plan and approved vertical tickets | Implement |
| 6. Implement | Static experience works with real content | Complete build, states, responsive behavior | Visual QA |
| 7. Visual QA | Direction is visible in the browser | Valid desktop and mobile evidence; material defects fixed | Motion or final QA |
| 8. Motion and hardening | Movement serves the experience | Purposeful, accessible, performant motion | Final QA |
| 9. Final QA and record | Build satisfies both visual and code gates | Review verdict, documentation, and updated state | Ship |

**Hard rule:** no implementation starts before Phase 3 is confirmed. No motion starts before Phase 7 passes for the static experience.

## 0. Prepare the repository once

Before the first engineering flow in a repository, use `/setup-matt-pocock-skills`. It is an interactive setup, not a silent scaffold. It establishes:

- the issue tracker, either GitHub, GitLab, local Markdown, or the user's stated system;
- `docs/agents/issue-tracker.md` and the tracker vocabulary used by later skills;
- the location and consumption rules for `CONTEXT.md` and ADRs.

Do not create both `AGENTS.md` and `CLAUDE.md`. If one already exists, extend that file. Point it to this document with a short trigger, for example:

```md
## Website work

For any landing page, portfolio, campaign, or redesign work, read `WEB_WORKFLOW.md` before planning or editing UI. Update its Workflow state at every phase boundary.
```

For every UI session, invoke Impeccable's context setup once and follow its reported project context. Use the installed skill directory reported by the environment:

```bash
node <impeccable-skill-dir>/scripts/context.mjs --target <surface>
```

Omit `--target` when no named surface is available. Then invoke the appropriate Impeccable command, for example `shape <surface>`, `critique <target>`, or `animate <target>`. Do not run the context setup repeatedly within the same session.

## 1. Discovery - create a product truth, not a component list

In a repository, start the main flow with `/grill-with-docs`. It records durable language and decisions by driving the `grilling` and `domain-modeling` skills. Keep discovery, the confirmed direction, the spec, and tickets in one unbroken context window where possible.

Capture these decisions before researching implementation details:

- Who arrives, in what situation, and what must they understand, feel, or do?
- What specific proof earns their trust? Prefer real product behavior, people, places, inventory, evidence, or process.
- What is uniquely true here that a competitor cannot copy into the same page template?
- What facts, content, assets, routes, tracking, legal copy, accessibility, SEO, performance, localization, and framework constraints are binding?
- What would make a polished result wrong?

If a state model, interaction, or composition cannot be honestly settled in conversation, use `/prototype` to answer that one question. Use `/handoff` only when moving to another directory, harness, collaborator, or a side task that needs portability. A prototype is evidence for the decision, not production code.

For Impeccable, use `shape <surface>` to create the UX/UI brief before code. Select its mode from visitor success: `Persuade`, `Experience`, `Read`, or `Operate`. A marketing page is normally `Persuade`; a portfolio is normally `Experience`.

**Exit condition:** a short brief names audience, job, primary action, proof, constraints, anti-goals, important states, and the surface mode.

## 2. Research - extract principles from references

Build a small reference ledger. Ten well-explained references are more useful than a hundred screenshots. For each entry, record only:

- URL or source and rights/provenance.
- The single job it informs: layout, type, image direction, motion, navigation, content, or technical mechanism.
- The transferable principle.
- What must not be copied.

Use Pinterest, Dribbble, Land-book, and Awwwards to discover vocabulary and visual systems, not to assemble a collage. Study source code for mechanics, loading strategy, interaction isolation, and accessibility patterns. Do not copy branded visuals, distinctive content, or unlicensed code.

### Optional local inspiration library

The user's design and technique library lives at `C:\Users\timed\Desktop\website-bib`. It is an optional source of inspiration, never a source of requirements. The remote mirror is `https://github.com/timedelmann37/website-bib`; use it only when the local checkout is unavailable or needs an explicitly requested refresh.

Use it only when it helps explore a confirmed brief or direction. No reference, layout, palette, font, interaction, library, or technique from it is mandatory. Product truth and the user-approved Direction Contract always decide the page model. Do not force a reference into the work, and do not let a familiar technique replace an original solution.

When inspiration is useful, browse the library in this order:

1. Read `INDEX.md` first. It is the compact catalog of sites, palette, typography, spacing, breakpoints, style tags, layout vocabulary, characteristic moves, and technique IDs.
2. Filter from the current Direction Contract, then open only the relevant `sites/<slug>/meta.json` and `snippets/<id>.md`. `snippets/INDEX.md` is the technique catalog.
3. If a reference genuinely informs the work, add the selected principle, source path, and anti-copy note to the project's reference ledger. A technique is only a candidate when it supports the selected direction and a real content need.
4. Use `preview.webp` only as a quick visual reminder. Prefer structured metadata and snippets for decisions.

When the user posts a new URL for this library, run the crawler from the library root:

```bash
node scripts/crawl.mjs <url>
```

Respect `robots.txt`. Do not use `--robots-ignorieren` without explicit user authorization. The crawler stores distilled site metadata under `sites/<slug>/meta.json`, and the index can be refreshed with `scripts/build-index.mjs` when the project workflow calls for it.

Separate three evidence types:

| Evidence | It can decide | It cannot decide |
| --- | --- | --- |
| Product facts and real assets | Claims, content, proof, user needs | A visual direction by themselves |
| References | Composition, rhythm, material, interaction principles | A copied page or brand identity |
| Existing website | What must be preserved and what has failed | The authority to repeat its page model |

**Exit condition:** the ledger supports at least two plausible directions and identifies one or more category defaults to avoid.

## 3. Direction - lock the visual world and page model

This is the creative decision gate. Do not open 21st.dev, generate final imagery, make a component inventory, or write production UI before this gate is closed.

### 3.1 Classify the starting point

Use Taste's redesign protocol and Impeccable's visual-authority check.

- **Greenfield:** no existing surface or a full visual replacement is explicitly approved.
- **Preserve:** modernize an established identity while retaining its recognizable visual and information structure.
- **Overhaul:** retain confirmed product truth, content, and hard constraints while replacing the visual world. Audit the current brand tokens, IA, content blocks, SEO baseline, analytics dependencies, accessibility wins, and failed patterns first.

Do not silently change URLs, anchor IDs, primary navigation labels, form-field names/order, legal text, logo, or analytics contracts. If the user explicitly asks for a genuinely new page model, do not keep the old hero-to-features-to-testimonials-to-FAQ skeleton merely because it is familiar. Preserve external contracts while redesigning the experience.

### 3.2 Perform Taste's design read

Before any code, state a one-line **Design Read**:

> Reading this as: `<page kind>` for `<audience>`, with a `<vibe>` language, leaning toward `<design system or aesthetic family>`.

If the read genuinely branches, ask exactly one decisive clarifying question. Otherwise declare it and proceed. Then make these dials explicit and reasoned:

```md
DESIGN_VARIANCE: <1-10>
MOTION_INTENSITY: <1-10>
VISUAL_DENSITY: <1-10>
```

The dials are design constraints, not decoration. High variance requires a mobile collapse plan. Motion above 3 requires reduced-motion behavior. High motion is not permission for arbitrary scroll effects.

Choose an official design system only when the product actually belongs to it. Use one system per project. Aesthetic directions such as editorial, brutalist, kinetic type, or web glass are not official systems; implement them honestly with the existing stack and documented approximations.

### 3.3 Present distinct candidates

Create two or three directions only when the user has a real choice. Each candidate must differ in all three:

1. **Page model:** the order and form of the story, not just section colors.
2. **Focal proof:** what the first viewport demonstrates.
3. **Signature behavior:** the interaction or browsing ritual that is native to this direction.

For each candidate state the world, first viewport, visitor path, type and image character, palette/material rules, signature interaction, mobile consequence, and honest risk. Include an explicit anti-goal.

Do not present three variants that share the same section topology. If directions converge on the same page architecture, they are one direction with cosmetic variants.

### 3.4 Write the Direction Contract

Once the user chooses, save a short Direction Contract under `docs/design/` or the project's existing design-doc location. It must contain:

- chosen mode, redesign mode, Design Read, and three dial values;
- product-specific thesis and first-viewport proof;
- page model and content sequence;
- typography, image, palette, shape, and theme rules;
- signature interaction and reduced-motion fallback;
- source assets and content claims allowed;
- accessibility, responsiveness, performance, SEO, and preservation constraints;
- explicit anti-goals and acceptance evidence.

Use Impeccable `init` if durable product context is missing. For a new surface or replacement world, follow its new-work flow after discovery. `DESIGN.md` records an implemented world; it is not a substitute for selecting one.

**Exit condition:** the user has selected one direction and the Direction Contract makes it impossible for an implementer to choose a generic fallback.

## 4. Specification - translate decisions without reopening them

Use `/to-spec` only after discovery and the direction are settled. It synthesizes the current context. It does not start another user interview.

Before publishing the spec, inspect the repository and agree the highest useful test seam with the user. The spec must cover:

- problem statement and visitor-facing solution;
- exhaustive user stories, including mobile, loading, error, empty, form, and keyboard states where relevant;
- implementation decisions and interaction contracts, including the Direction Contract by reference;
- testing decisions at external behavior seams;
- out-of-scope work and preservation constraints.

Publish it through the configured tracker and apply the agent-ready label. Do not fill the spec with fragile file paths or code snippets unless a prototype contains the only precise expression of a decision.

**Exit condition:** one published specification names what is being built, how success is proven, and what agents may not invent.

## 5. Assets and vertical tickets - plan proof before polish

### 5.1 Plan assets before implementation

For every major viewport, list the required evidence: real photograph, product image, interface capture, illustration, texture, video, or generated visual. A hero needs an actual visual, not a text stack over a decorative gradient.

Use Higgsfield only after image role, art direction, required aspect ratio, and section placement are known. Before a Higgsfield job, verify its active workspace with:

```bash
higgsfield workspace list --json
higgsfield workspace set <workspace_id>
```

Check entitlement for the chosen generation or edit feature before queuing work. If it is unavailable, use verified real assets or mark a deliberate asset slot. Never replace an unavailable asset with a hand-built fake screenshot or generic decorative SVG.

Keep each generated asset's prompt, input reference, and origin beside the asset or in the asset ledger. Generate the hero or one critical asset first, test it in the actual composition, then expand the set.

### 5.2 Convert the spec to buildable tickets

Use `/to-tickets`. Tickets are **tracer bullets**: each one is a narrow, complete, independently demonstrable slice through all relevant layers. They are not horizontal lists such as "write all CSS" or "add all animations."

Every ticket records what it delivers, acceptance criteria, and its real blocking edges. Present the proposed breakdown to the user and obtain approval before publishing it. With a local tracker, publish one file per ticket under `.scratch/<feature>/issues/`; with a remote tracker, publish one issue per ticket and connect blockers.

Suggested dependency shape for a distinctive surface:

1. Content, token, asset, and technical foundation.
2. First viewport as the proof of the chosen direction.
3. Core narrative or primary interaction.
4. Remaining content structures and real states.
5. Responsive, accessibility, and performance completion.
6. Purposeful motion.
7. Whole-surface visual review and final fixes.

**Exit condition:** the frontier contains only tickets whose blockers are complete. The first build ticket proves the direction rather than creating a generic component catalog.

## 6. Implementation - build the experience in the right order

For each approved frontier ticket, start a fresh implementation context and invoke `/implement`. It uses `/tdd` where a behavioral seam exists, runs regular type and focused tests, the full suite at the end, then `/code-review`, and commits the ticket's work.

Build in this order inside a surface:

1. Real content, semantic structure, tokens, and asset placement.
2. The first viewport until it demonstrates the thesis.
3. The primary narrative, proof, or interaction.
4. Remaining sections with varied layout families.
5. Loading, empty, error, focus, and touch states.
6. Responsive behavior and performance budget.
7. Motion only after the static version holds together.

Use 21st.dev as a selective implementation reference after the Direction Contract exists. Take an isolated interaction pattern or accessibility behavior, verify its dependency and license, and rewrite it in the project's own tokens, content, typography, and motion grammar. Do not import an entire generic section or let the available component choose the page model.

For React/Next work, isolate interactive motion and pointer behavior in small client leaves. Do not drive continuous scroll or pointer values through React state. Verify packages in `package.json` before importing them.

**Exit condition:** the static surface works with real content and real assets at desktop and mobile widths. A typecheck alone does not satisfy this phase.

## 7. Visual QA - inspect the browser, not the intention

Run visual QA after the complete static surface exists. Capture valid full-page desktop and mobile screenshots from the document top, plus the user's actual viewport if known. Open every capture before using it as evidence.

Use a bounded two-round process:

1. Inspect desktop and mobile together against the Direction Contract, then batch all material fixes.
2. Recapture and confirm once. Do not enter an endless self-polish loop.

Use Impeccable commands deliberately:

- `critique <target>` for a structured UX/design review.
- `typeset <target>` for hierarchy, font choice, and line rhythm.
- `layout <target>` for spacing, composition, and visual hierarchy.
- `adapt <target>` for responsive behavior.
- `bolder`, `quieter`, `distill`, or `delight` only when that specific diagnosis is true.
- `audit <target>` for accessibility, performance, and responsive technical checks.

Inspect these concrete questions:

- Does the first viewport prove the product-specific thesis rather than only establishing a mood?
- Is the page model structurally distinct from the category default and from rejected directions?
- Do type, imagery, palette, shape, and spacing belong to one visual world?
- Are claims sourced, copy comprehensible, and content density intentional?
- Do desktop and mobile read as designed compositions rather than collapsed layouts?
- Is a real visual used where the design requires one?

Run the Taste pre-flight check in full before declaring the surface done. In particular verify the chosen design read and dials, one theme strategy, consistent accent and radius rules, legible controls, real assets, restrained cards, a varied section rhythm, both supported color modes, and every visible string.

**Exit condition:** screenshots show the promised direction at all required viewports, and the material defects from the first pass were handled in one batch.

## 8. Motion and hardening - one choreography, not scattered tricks

Now use Impeccable `animate <target>` when the user-facing experience needs motion. Every animation must explain itself in one sentence as hierarchy, storytelling, feedback, or a state transition. If it cannot, omit it.

Choose the smallest appropriate mechanism:

- Motion (`motion/react`) for component state, entry/reveal, and layout transitions.
- GSAP with ScrollTrigger for genuinely pinned, scrubbed, or horizontal scrolltelling.
- CSS or IntersectionObserver for simple, lightweight view-based behavior.
- Canvas/WebGL only when the chosen direction makes the technique itself part of the experience.

Do not combine GSAP, Three.js, and Motion in the same component tree. Do not add raw scroll listeners, scroll-position React state, or animation-frame loops that update React state. Animate transform and opacity, clean up effects, and lazy-load expensive work.

For motion intensity above 3, honor `prefers-reduced-motion` with a complete static or instant alternative. Motion must not hide essential content, block keyboard access, delay the CTA, or degrade mobile performance.

Then use Impeccable `harden <target>` if errors, localization, edge cases, or production states still need attention, and `optimize <target>` when measured UI performance is the issue.

**Exit condition:** the signature interaction works, is motivated, cleans up correctly, has a reduced-motion fallback, and preserves the static information architecture.

## 9. Final QA, review, and durable record

Run the final gates in this order:

1. Re-run the visual captures after motion settles or is disabled for capture.
2. Run Impeccable's required detector for changed web UI files once at the end of the visual pass, then fix mechanical findings.
3. Run `/code-review <fixed-point>` against a stated fixed point. It must report separately on **Standards** and **Spec**. Do not treat a pass on one axis as a pass on the other.
4. Run the project's test suite and production build.
5. Verify accessibility, responsive behavior, performance, links, forms, asset provenance, and every user-facing claim.
6. After the last accepted visual change, use Impeccable `document` to record the implemented visual system in `DESIGN.md`; do not document an intended but unbuilt world.
7. Update the Workflow state with the final evidence, decision, and next action.

For full web UI work, use a fresh Impeccable finish review with the original request, Direction Contract, screenshots, detector findings, and relevant build evidence. A clean lint or typecheck is not visual approval.

**Definition of done:** the build meets the approved Direction Contract in the browser, works for real users and content, passes the appropriate technical checks, has closed review findings or an explicit user decision to ship with them, and has an up-to-date durable record.

## Deliberate sequencing rules

| Do not do this first | Do this first | Why |
| --- | --- | --- |
| Start from 21st.dev or a component gallery | Confirm the page model and Direction Contract | Available components otherwise become the design |
| Generate a large image batch | Define each asset's role, aspect ratio, and placement | Unplaced images create decorative filler |
| Add scroll effects to an unfinished layout | Pass static visual QA | Motion amplifies structural weakness |
| Build a design system from theory | Extract only proven repetition after real surface work | Premature systems freeze generic decisions |
| Treat code review as visual review | Capture and inspect the rendered page | Code quality and visual authority are separate questions |
| Create many cosmetic variants | Create one or two structurally independent candidates | A changed palette is not a changed direction |
| Preserve an old page skeleton by inertia | Preserve only confirmed content and external contracts | Redesign means deciding what deserves to survive |

## Minimal handoff packet

When a fresh agent must continue, give it the current Workflow state plus links to:

- the latest Direction Contract;
- confirmed product facts and `CONTEXT.md`/ADRs;
- the published spec and frontier ticket;
- asset ledger and existing real/generated assets;
- latest valid desktop and mobile screenshots;
- known defects, review verdict, and exact next permitted action.

Do not replace these primary sources with a broad prose recap when the agent can read the originals.
