# Contributing to Meeting Pain Calculator

Thank you for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/your-org/meeting-pain-calculator.git
cd meeting-pain-calculator
npm install
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local
npm run dev
```

## Branch Strategy

- `main` — production-ready code
- `feat/<name>` — new features
- `fix/<name>` — bug fixes
- `chore/<name>` — tooling, deps, refactors

## Pull Request Process

1. Fork the repo and create a branch from `main`.
2. Run `npm run type-check` and `npm run lint` — both must pass.
3. Keep PRs focused. One feature or fix per PR.
4. Write a clear PR description explaining *why*, not just *what*.
5. Request a review; PRs require at least one approval.

## Code Standards

- **TypeScript strict mode** is enabled — no `any` without justification.
- **No comments** unless the *why* is non-obvious.
- **No unused variables** — the linter will catch them.
- Components go in `components/`, business logic in `lib/`.
- Server-only code (API routes, AI calls) stays in `app/api/`.

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs. actual behavior
- Browser/Node version
- Relevant console output

## Feature Requests

Open an issue with the `enhancement` label. Describe the problem you're solving, not just the solution.
