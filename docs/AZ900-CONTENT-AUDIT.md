# AZ-900 Question Bank Audit

**Audit date:** 2026-10-23  
**Reference:** [Microsoft Learn — Study guide for Exam AZ-900: Microsoft Azure Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900)  
**Reference version:** Skills measured as of July 20, 2026  
**Scope:** Current `index.html` question definitions on `main`; this is a source-level content audit, not a live-browser test.

## Findings

### 1. The live source count needs reconciliation

The current `const questions = [ ... ]` array contains **50 questions with 50 unique IDs (1–50)**. A previous project summary described 103 questions. Before making claims about the size of the question bank, reconcile the source branch and deployed site and determine where the other 53 questions went.

### 2. Objective labels are absent from the current question definitions

None of the 50 current question objects has an `objective` field. The renderer supports displaying `q.objective`, but the current bank does not populate it. This prevents learners from seeing the specific AZ-900 skill being tested and makes objective-level coverage hard to measure.

### 3. Topic balance is not the same as objective coverage

Current distribution:

| Existing topic label | Questions | Share |
|---|---:|---:|
| Cloud concepts | 13 | 26% |
| Azure architecture | 19 | 38% |
| Management & governance | 18 | 36% |
| **Total** | **50** | **100%** |

The topic proportions are broadly close to the official domain-weight ranges, but this alone does not prove coverage of the sub-objectives. The current bank is weighted toward direct service-identification questions.

### 4. Repeated or substantially overlapping concepts

The following pairs overlap enough to merit review during the rewrite. Similar questions can be useful for spaced practice, but they should test different reasoning or scenarios rather than repeat the same recall task.

- **12 and 25:** reliability / continuing operation through service failure.
- **19 and 42:** resource locks preventing deletion or modification.
- **20 and 49:** Azure Service Health incidents and planned maintenance.
- **18 and 43:** Microsoft Entra ID and identity capabilities.
- **7 and 44:** Azure Policy for enforcing or auditing requirements.

### 5. Important areas needing explicit coverage checks

The official study guide includes objectives that are not clearly represented by a dedicated question in the current 50-item bank, or are only touched indirectly. Verify and add coverage for:

- **Cloud concepts:** use cases for public/private/hybrid cloud; comparing cloud pricing models; benefits of predictability, security/governance, and manageability; appropriate IaaS/PaaS/SaaS use cases.
- **Azure architecture and services:** region pairs and sovereign regions; datacenters, subscriptions, and the full management hierarchy; containers, Virtual Machine Scale Sets, availability sets, Azure Virtual Desktop, and VM requirements; subnets, peering, Azure VPN Gateway, and public/private endpoints; storage tiers, account options, redundancy, AzCopy, Storage Explorer, Azure File Sync, Azure Migrate, and Data Box; external identities, Conditional Access, Zero Trust, defense in depth, and Microsoft Defender for Cloud.
- **Azure management and governance:** Microsoft Purview; Azure Cloud Shell, CLI, PowerShell, Azure Arc, and infrastructure as code; Azure Monitor sub-capabilities including Log Analytics, alerts, and Application Insights.

These are audit targets, not a claim that every item above must appear as a standalone question. Some objectives can be tested together in a well-designed scenario.

## Recommended implementation order

1. Reconcile the 50-versus-103 source/deployment discrepancy before editing the bank.
2. Add an objective identifier to every question, mapped to the current official study guide.
3. Review every existing answer key, distractor, rationale, common trap, and example for accuracy and ambiguity.
4. Replace redundant recall items with scenario questions that test distinct objectives.
5. Fill verified objective gaps while preserving image/visual question behavior and stable unique IDs.
6. Add a repeatable content-validation check for unique IDs, valid answer indexes, required fields, objective tags, and per-domain coverage.
7. Run the existing practice, mock, review, pause/resume, and history flows after content changes; content edits must not regress these behaviors.

## Audit limits

- No question content was changed by this audit document.
- No claim is made that all 50 answers have been independently verified against every Microsoft Learn reference.
- Live browser behavior, deployed-site parity, and end-to-end flows still require verification.
- CloudMind is an independent learning companion and is not affiliated with or endorsed by Microsoft.
