# AZ-900 Question Bank Audit

**Audit date:** 2026-10-23  
**Reference:** [Microsoft Learn — Study guide for Exam AZ-900: Microsoft Azure Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900)  
**Reference version:** Skills measured as of July 20, 2026  
**Scope:** The full `const questions = [ ... ]` array in `index.html` on `main`, before the objective-tagging implementation branch was applied. This is a source-level audit, not a live-browser test.

## Findings

### 1. The bank contains 103 questions

The question array contains **103 questions with 103 unique IDs (1–103)**. The earlier count of 50 came from inspecting only the first 50 objects, which use a different object-key style from IDs 51–103. The questions are in one array; the bank was not missing 53 questions.

### 2. Objective labels were incomplete

Before the implementation branch, only **20 of 103 questions had an `objective` field**. The renderer already displays `q.objective`, but the remaining 83 questions were missing labels. The companion implementation branch adds objective labels to those 83 questions while preserving question IDs and the existing question text, answer choices, rationales, traps, examples, and visual-question hooks.

### 3. Topic balance is not the same as objective coverage

Baseline distribution by existing topic label:

| Existing topic label | Questions | Share |
|---|---:|---:|
| Cloud concepts | 27 | 26.2% |
| Azure architecture | 43 | 41.7% |
| Management & governance | 33 | 32.0% |
| **Total** | **103** | **100%** |

Microsoft's current domain weights are Cloud concepts 25–30%, Azure architecture and services 35–40%, and Azure management and governance 30–35%. The bank is broadly aligned on cloud concepts and management/governance; architecture is slightly above the published range. Topic proportions alone do not prove that every sub-objective is covered.

### 4. Repeated or substantially overlapping concepts

These pairs should be reviewed for distinct reasoning value rather than automatically deleted. Similar questions can support spaced practice if they test different decisions or scenarios.

- **12 and 25:** high availability / reliability through service failure.
- **19 and 42:** resource locks preventing deletion or modification.
- **20 and 49:** Azure Service Health incidents and planned maintenance.
- **18 and 43:** Microsoft Entra ID and identity capabilities.
- **7 and 44:** Azure Policy for enforcing or auditing requirements.

### 5. Areas for item-by-item coverage and accuracy review

The following topics deserve explicit verification against the official outline and the exact question wording, not an assumption that the entire topic is absent:

- **Cloud concepts:** public/private/hybrid use cases; cloud pricing comparisons; predictability, security/governance, and manageability benefits; clear IaaS/PaaS/SaaS use cases.
- **Azure architecture and services:** sovereign regions and datacenters; subscriptions and the full management hierarchy; Virtual Machine Scale Sets and availability sets; subnets and peering; storage-account options and redundancy; AzCopy, Storage Explorer, File Sync, Azure Migrate, and Data Box; external identities and guest access; Conditional Access, Zero Trust, and defense in depth.
- **Azure management and governance:** Azure Cloud Shell, CLI, PowerShell, and Azure Arc; infrastructure-as-code choices; Microsoft Purview; Azure Monitor sub-capabilities such as Log Analytics, alerts, and Application Insights.

These are review targets. Some objectives can be tested together in a well-designed scenario rather than one question per bullet.

## Recommended implementation order

1. Add objective labels to all 103 existing questions without changing IDs or removing visual questions.
2. Add a repeatable validator for unique IDs, required fields, objective labels, answer indexes, and topic distribution.
3. Review every answer key, distractor, rationale, common trap, and example against authoritative Microsoft Learn pages.
4. Rewrite overlapping recall items only when the replacement tests a distinct objective or decision.
5. Fill verified objective gaps with original, scenario-based questions while preserving the current learning flows.
6. Run practice, mock, review, pause/resume, and history regressions; live browser and deployed-site checks remain separate validation steps.

## Audit limits

- This document records the baseline audit; the objective-tagging implementation is proposed separately.
- Structural validation cannot prove subject-matter accuracy. Answer keys and explanations still need item-by-item source review.
- Live browser behavior, deployed-site parity, and end-to-end flows have not been verified here.
- CloudMind is an independent learning companion and is not affiliated with or endorsed by Microsoft.
