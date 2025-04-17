# CI/CD Pipeline for Forgeborn

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) pipeline architecture, stages, tools, and best practices for the `forgeborn-core` project.

---

## Objectives

- Maintain high code quality through automated validation.
- Ensure fast, reliable delivery of new features.
- Provide rollback capability in case of deployment failure.
- Automate testing, linting, and packaging across environments.

---

## CI/CD Architecture Overview

### Tools Used
| Tool         | Purpose                             |
|--------------|-------------------------------------|
| GitHub Actions | Workflow orchestration (CI/CD)     |
| Node.js       | Build and test runtime              |
| ESLint        | Linting and formatting              |
| Markdownlint  | Documentation linting               |
| Supabase CLI  | Backend schema deployment           |
| Docker        | (Planned) Containerization support  |

---

## CI/CD Workflow Stages

### 1. Pre-Commit Validation
- **Tool:** Husky or manually run `npm run check:rules`
- **Validations:**
  - Project rules (`rules.md`)
  - Lint checks (`eslint`, `markdownlint`)
  - Directory structure compliance

### 2. Build & Test (CI)
- **Triggered by:** Pull requests, main branch commits
- **Steps:**
  - Install dependencies
  - Lint TypeScript and Markdown
  - Run unit/integration tests (TBD)
  - Check for valid `.env` and Supabase config

### 3. Deploy (CD)
- **Manual trigger (planned):** GitHub Release or tagged commit
- **Deploy Actions:**
  - Build production assets
  - Sync schemas with Supabase
  - Upload to DigitalOcean / Kubernetes / App Platform (future)

---

## GitHub Actions File Structure

```
.github/workflows/
├── lint.yml
├── test.yml
├── deploy.yml (future)
```

---

## Best Practices

- Run `npm run check:rules` before each PR.
- Keep `main` branch deployable at all times.
- Use semantic commits to auto-generate changelogs.
- Keep secrets out of `.env` — use Supabase/DO secrets management.

---

## Future Enhancements

- ☑️ Lint-based enforcement of all structural rules
- 🔄 Automated rollback on deploy failure
- 🔐 Secrets Agent for GitHub + Supabase secure token sync
- 📦 Publish CI artifacts (blueprints, memory logs, trace YAMLs)
- 📥 Integrate PR feedback from Strategy Agent

---

For any changes to the pipeline, please update this document and notify the team.