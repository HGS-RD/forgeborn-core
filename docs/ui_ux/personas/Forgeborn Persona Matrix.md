# 👤 Forgeborn Persona Matrix

This matrix defines the primary personas who interact with the Forgeborn trust governance platform. Each persona is mapped to key responsibilities, trust lifecycle touchpoints, UI/UX needs, and integration preferences. This supports role-aware dashboard design, permissions, and onboarding workflows.

---

## 🎯 Purpose
- Guide UI/UX development through real-world user roles
- Define persona-specific data needs, actions, and alerts
- Inform dashboard views, CLI options, and export formats

---

## 🧩 Persona Table

| Persona | Description | Primary Objectives | Trust Responsibilities | Preferred UI Features |
|---------|-------------|---------------------|-------------------------|------------------------|
| **CTO** | Executive in charge of trust policy ownership and cross-team governance | Ensure governance alignment, minimize risk, sign off on policy changes | Approve high-impact triggers, sign trust policies, authorize overrides, monitor critical-tier simulation regressions | Trigger ledger, policy diff viewer, critical tier override alerts, anomaly flags
| **QA Lead** | Oversees trust simulation, fallback detection, and blueprint stability | Catch misaligned trust conditions before enforcement | Approve simulation outcomes, monitor fallback rates, flag trust score dips | Simulation runner, validation report panel, fallback trend dashboard |
| **Security Officer** | Ensures trust signatures, ledger integrity, and compliance auditability | Block unsigned policies, prevent trust score tampering | Validate signatures, monitor ledger commits, trigger rollback | Signature validator, ledger digest viewer, approval badge history |
| **DevOps Engineer** | Owns deployment flow, CI gating, and policy rollouts | Maintain trust score pipeline health and CI pass rate | Monitor blueprint tier enforcement, gate on unresolved triggers | Trust badge in CI/CD, pre-deploy trust status, rollback tools |
| **Product Owner** | Aligns delivery progress with trust scoring and blueprint tiers | Avoid regressions, advocate for tier promotions | Review simulation impact on delivery velocity, track trust tier drift, submit tier promotion proposals | Score trends, blueprint tier viewer, delivery impact report, tier change notification toggle
| **Agent Developer** | Builds and tests trust-compliant agents and simulation logic | Validate enforcement logic, simulate agent trust behavior | Run policy-aware simulation, test `fallback`, `paused`, `escalated` states, author reusable simulation templates | CLI integration, YAML viewer, test scaffold preview, template authoring tools
| **Governance Reviewer** | Participates in trigger approval, policy review, and simulation sign-off | Uphold review SLAs, track open trust actions | Approve/reject triggers, comment on diffs, confirm simulation alignment. Reviewer roles may be assigned statically or rotated per trigger domain. | Approval panel, diff-to-sim replay, open trigger queue, reviewer role logic display
| **Auditor** | External or internal reviewer of trust posture and historical actions | Verify compliance history, check reviewer approvals | Inspect signatures, download policy history, trace decision flow | Export tools, reviewer logs, scoring audit trail |

---

## 📊 Persona → Dashboard Mapping

| View | Relevant Personas |
|------|-------------------|
| `/dashboard` | All (summary of posture, score, open actions) |
| `/blueprints` | DevOps, Product, QA |
| `/triggers` | CTO, Governance, QA |
| `/simulation` | QA, Agent Dev, Product |
| `/policy` | CTO, Security, Auditor |
| `/compliance` | Security, Auditor |

---

## ✅ Summary

> 🔁 This matrix should be reviewed quarterly alongside governance evolution, simulation coverage needs, and score recalibration rules to ensure personas remain aligned to trust workflow dynamics.
This persona matrix aligns the structure of the Forgeborn dashboard and toolchain with real organizational roles and responsibilities. It enables trust lifecycle transparency and reinforces human-in-the-loop accountability across simulation, enforcement, approval, and audit.
