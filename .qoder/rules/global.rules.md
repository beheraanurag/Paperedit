---
trigger: manual
---
# Global Rules — project-wide AI assistant guidance
# File: .qoder/rules/global.rules.md
# Description: Global rules applied across the repository.
# Limitations: Qoder supports plain natural language rules. Keep rule files concise (<100k chars total).

## meta
- name: "Global coding standards & assistant behavior"
- scope: ["**/*"]          # apply to whole repo
- priority: "high"
- owner: "dev-team@example.com"

---

## Behavior / Assistant persona
1. You are the project's AI coding assistant. Prioritize correctness, security, and maintainability.
2. Be concise: produce short, focused diffs and explain changes in 2–4 lines.
3. When proposing code, always include tests or a test plan for the change.
4. If a change touches public API or DB schema, note migration steps and version bump.

---

## Code style & conventions
1. Follow existing repository conventions. If editing JS/TS files follow the project's ESLint rules (use `prettier` formatting).
2. Use descriptive variable and function names. Avoid single-letter names except in small scopes.
3. For React components:
   - Prefer functional components + hooks.
   - Keep components < 250 LOC. If larger, recommend splitting.
4. For backend Node/Express:
   - Use async/await, never swallow errors silently.
   - Validate incoming requests with a schema (Zod/Joi) and return proper HTTP codes.

---

## Testing & CI
1. Provide unit tests for all non-trivial logic and component snapshots for UI components where appropriate.
2. Keep tests deterministic — avoid time/date sensitive tests without mocks.
3. Add/Update CI config instructions when new required checks are introduced.

---

## Security & Data
1. Never log secrets or PII in plaintext. Mask or omit sensitive values.
2. If adding third-party deps, list them and note why they're needed and the license.
3. Validate and sanitize all external inputs (files, multipart, JSON).

---

## Commit message & PR style
1. Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Provide a short description + 1–2 line body if needed.
2. For migration or breaking changes: include `BREAKING CHANGE:` in the commit body and an upgrade guide.

---

## Documentation & Comments
1. Add/update README sections for new modules.
2. Comments should explain *why* not *what*.
3. If generating scaffolding, create a short README in that module.

---

## File patterns & special cases
1. For files in `frontend/**` enforce React/Tailwind patterns (component naming, props typing).
2. For files in `backend/**` enforce API response shapes and error handling patterns.
3. For `scripts/` or tooling, include usage examples and required env vars in comments.

---
