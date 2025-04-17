
# Linting Standards for Forgeborn Core

Maintaining consistent code quality across the Forgeborn project is crucial for scalability, team collaboration, and long-term maintainability. This document defines the enforced linting standards across the codebase.

---

## 1. Language Targets

- **JavaScript/TypeScript**
- **Markdown**
- **YAML**
- **JSON**
- **Shell Scripts**

---

## 2. Core Linting Tools

| Tool          | Purpose                             |
|---------------|-------------------------------------|
| `eslint`      | Linting for `.js` and `.ts` files   |
| `prettier`    | Code formatting across all files    |
| `markdownlint`| Consistent markdown formatting      |
| `yaml-lint`   | YAML file syntax checking           |
| `shellcheck`  | Shell script linting                |

---

## 3. ESLint Configuration (`.eslintrc.json`)

- **Environment**: ES2020, Node
- **Parser**: TypeScript with `@typescript-eslint/parser`
- **Rules**:
  - Semi-colons required
  - Double quotes for strings
  - No unused variables
  - Consistent return statements
  - Prefer `const` over `let` where possible

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-unused-vars": "warn",
    "prefer-const": "error"
  }
}
```

---

## 4. Prettier Configuration (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## 5. Markdown Linting

- Enforced via `markdownlint-cli`
- Rules:
  - Line length ≤ 120 characters
  - Headings must increment by one level at a time
  - No trailing spaces
  - Proper emphasis and list spacing

---

## 6. YAML & JSON

- Use `yaml-lint` and `jsonlint`
- Keys should use snake_case
- Sorted keys encouraged in config files

---

## 7. Shell Scripts

- All `.sh` scripts linted with `shellcheck`
- Must start with `#!/bin/bash`
- No implicit `cd`; always use full paths
- Exit codes must be checked explicitly

---

## 8. Linting in CI/CD

All linting tools run as part of the GitHub Actions pipeline using the `check:rules` and `fix:rules` scripts:

```bash
npm run check:rules
npm run fix:rules
```

Linting errors must be resolved before PRs are accepted.

---

## 9. Auto-fix and IDE Integration

- VSCode recommended with ESLint + Prettier extensions
- Format on save enabled
- Auto-lint on commit via Husky or Git hooks (future)

---

## 10. Contributions

Any PR failing lint checks will be automatically rejected. See `CONTRIBUTING.md` for PR formatting and review guidelines.

---
