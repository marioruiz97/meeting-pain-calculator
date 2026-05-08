# Meeting Pain Calculator — Constitution

## Purpose

This project is not a calculator. It is a movement.

**Meeting Pain Calculator** exists to quantify the cost of "meeting-itis" — the organizational disease of scheduling a 90-minute sync when a two-sentence Slack message would have sufficed. Our mission is to confront stakeholders, managers, and well-meaning but schedule-happy colleagues with one undeniable truth: **bad meetings burn real money and real time.**

We measure. We visualize. We make the invisible cost viscerally obvious — so that the next time someone hits "Send Invite" for a 12-person status update, they feel it in their gut before they feel it in the quarterly budget.

---

## I. Coding Values

### Simplicity Over Complexity
If the meeting could have been an email, it should not be a complex function. Every feature, component, and API route must justify its existence. No premature abstractions, no speculative architecture, no helper functions that help no one.

- Prefer inline logic when it is read once.
- Extract only when duplication is real, not imagined.
- A boring, obvious solution is almost always the right solution.

### AI Veracity
We use AI to tell uncomfortable truths, not to sugarcoat them. The `painScore`, efficiency ratings, and async-candidate detection must be honest, even when the output stings. GPT-4o-mini is not here to validate bad decisions — it is here to diagnose them.

- Prompts must be designed to produce actionable critique, not diplomatic summaries.
- Scores must be calibrated to feel proportional to real-world waste.
- Never soften the verdict to make it more palatable.

### Privacy
Meeting agenda data is analyzed in transit and never persisted. We are a mirror, not a recorder. No logs of agenda content. No analytics pipelines ingesting what teams are discussing. No surveillance dressed as productivity tooling.

- The API route processes and discards. No agenda text ever touches a database.
- Environment variables hold API keys — never hardcode, never commit secrets.
- GDPR and privacy-first defaults are non-negotiable, even for an MVP.

---

## II. Design Principles

### Minimalist Interface
Every pixel must earn its place. If removing a UI element does not break understanding, remove it. Dark mode is the default and the only mode — this tool was built for people who stare at dashboards, not sunshine.

### Emotional Impact Over Informational Density
The "money-burning" counter is not a metric — it is a provocation. Visualizations must trigger a visceral response, not just display data. The pie chart of wasted time should feel like an indictment. The cost counter should feel like a leak you cannot stop.

- Use fire-themed CSS utilities (`.fire-gradient`, `.fire-text`, `.glow-orange`, `.glow-red`) deliberately, not decoratively.
- Animations and transitions must amplify the message, not distract from it.
- Never bury the pain score. It is the headline, always.

### Consistency via Design System
All UI primitives follow the Shadcn pattern in `components/ui/`. Use `cn()` for all conditional class merging. CSS custom properties are defined in `globals.css` as HSL values — do not introduce one-off color values inline.

---

## III. Contributor Golden Rules

1. **Performance is a feature.** The cost counter runs every second. Components that re-render unnecessarily are technical debt with a ticking clock.
2. **Efficient AI token usage.** Prompts must be concise. Schemas must be precise. Do not ask the model for what you can compute yourself.
3. **Type safety is mandatory.** `MeetingAnalysis` in `lib/types.ts` is the source of truth. The Zod schema in the API route mirrors it exactly. Drift between them is a bug waiting to happen.
4. **Lint and type-check before every PR.** Both `npm run lint` and `npm run type-check` must pass. No exceptions, no `// @ts-ignore` escapes.
5. **State lives in `Dashboard.tsx`.** Do not introduce local state in child components for data that belongs to the meeting session. Props flow down; callbacks flow up.
6. **No agenda data is ever logged or stored.** Enforce this at every layer — API route, middleware, analytics hooks. If a logging library would capture agenda content, it is misconfigured.

---

## IV. Tone of Voice

**Professional with a touch of justified sarcasm.**

This product speaks to people who have sat through their fourteenth status update of the week and quietly calculated how much of their career they have donated to other people's indecision. We earn their trust by being sharp, honest, and occasionally savage — never cruel, never dismissive.

- Copy is direct. No filler words.
- Recommendations from the AI analysis use active voice and specific action verbs.
- Error messages acknowledge the problem without blaming the user.
- The "verdict" field in the analysis response is the one place where we let the sarcasm breathe — proportional to the pain score.

---

## Governance

This constitution supersedes all other conventions documented elsewhere in this repository. Any architectural decision that conflicts with these principles requires an explicit amendment with a documented rationale.

Amendments require:
1. A clear statement of what is changing and why.
2. Evidence that the change serves the core mission (quantifying meeting inefficiency with honesty and impact).
3. An update to this file with a new version number and amendment date.

All PRs are measured against these principles. Complexity must be justified. Comfort with the uncomfortable truth is mandatory.

---

**Version**: 1.0.0 | **Ratified**: 2026-05-08 | **Last Amended**: 2026-05-08
