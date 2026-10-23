# AZ-900 Question Accuracy and Session QA Review

**Review date:** 2026-10-23  
**Blueprint:** [Microsoft Learn — Study guide for Exam AZ-900](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900), skills measured as of July 20, 2026.  
**Scope:** Source-level review of all 103 question stems, answer-option sets, answer indexes, and objective/topic labels, plus structural checks and focused Playwright browser smoke tests for key mock-session paths. This is not a full end-to-end or accessibility certification of the site.

## Question-bank changes

The initial review replaced 11 selected questions in place. Subsequent targeted passes revised Question 8, clarified Question 31 wording, and replaced duplicate Question 94. IDs, total question count, and the existing visual-question IDs (2, 4, and 5) are preserved.

| ID | Review action | Current objective |
|---:|---|---|
| 6 | Replaced an off-outline database-service recall item with a practical VM deployment question | Resources required for Azure virtual machines |
| 8 | Replaced an outdated duplicate cost-tool scenario with a question on cost drivers | Factors affecting Azure costs |
| 26 | Replaced an SLA recall item that is not explicitly listed in the current skills outline | Cloud security and governance benefits |
| 29 | Replaced a database-service recall item with a comparison of VMs, containers, and functions | Compare containers, virtual machines, and functions |
| 38 | Replaced a repeated Key Vault item with a current identity objective | Microsoft Entra Domain Services |
| 45 | Replaced a workflow-automation item with a listed Azure management tool | Azure portal |
| 55 | Replaced a broad disaster-recovery recall item with a cloud-pricing comparison | Compare cloud pricing models |
| 61 | Replaced a repeated virtual-network definition with an endpoint distinction | Public and private endpoints |
| 67 | Replaced a repeated Functions item with a listed storage tool | Azure Storage Explorer |
| 68 | Replaced a repeated availability-zone definition with a distinct infrastructure concept | Azure datacenters |
| 86 | Replaced a repeated Key Vault item with a current authentication objective | Passwordless authentication |
| 94 | Replaced a duplicate public-cloud definition with a TCO comparison scenario | Total Cost of Ownership (TCO) calculator |
| 100 | Replaced a data-pipeline item with the broader deployment concept named in the current outline | Infrastructure as code (IaC) |

The review also corrected topic-domain labels where identity/access/security content was incorrectly classified under Management & governance, and moved Azure Monitor and Azure Resource Manager topics to Management & governance. The existing question-bank schema validator now also checks that every option is a non-empty string and that answer options are unique.

## Session-control fixes

Source inspection found two issues in pause/resume behavior, now corrected:

- Resuming a paused activity by selecting the same learning path previously restarted it and discarded the active session's answers. Selecting the same paused path now resumes the saved activity.
- Resuming after pausing on an already answered question could leave the Next button disabled. Its state is now recalculated from the current question and pause state.

The timed mock-question section now stops its countdown when the question results view is reached. The UI copy clarifies that CloudMind adds a separate simulated practical task after the timed question section; this is a CloudMind learning feature, not a claim that the official AZ-900 exam uses that format.

## Blueprint and mock-exam coverage

Microsoft's current published domain ranges are:

- Cloud concepts: 25–30%
- Azure architecture and services: 35–40%
- Azure management and governance: 30–35%

CloudMind's mock selector explicitly samples 10 Cloud concepts, 13 Azure architecture and services, and 12 Management & governance questions (35 total), giving a source-level mix of 28.6%, 37.1%, and 34.3% respectively. This is within the published ranges. The full bank intentionally includes additional questions for topic practice, so its raw topic counts do not equal the mock-exam distribution.

## Validation and remaining limits

Automated validation checks the expected count (103), sequential unique IDs, required fields, answer-index bounds, non-empty options, duplicate options, duplicate normalized question stems, and topic-domain labels against the three AZ-900 domains. It also compiles each inline JavaScript block and guards against the session-history filter mutating the active mode. The GitHub Actions workflow is the repeatable structural gate.

Structural validation cannot establish that every technical statement, distractor, rationale, or example is factually perfect. The review corrected the selected items above and checked the bank against the current objective list, but the remaining content still merits ongoing source-by-source fact verification. A separate Playwright workflow now runs in GitHub Actions and checks mock entry, one-question navigation, Practice again, restoring the practical-task stage after refresh, completing that simulated task, and timer-expiry recovery. These short tests deliberately avoid completing all 35 mock questions; manual visual, accessibility, mobile, and broader path-switching checks remain outstanding.

## Second-pass factual and scope corrections

A focused follow-up compared cost-tool terminology and WAF wording with the current Microsoft Learn material:

- **Question 8:** Replaced the TCO-calculator comparison with the current listed objective on factors that affect Azure costs. The explanation now distinguishes estimates for planned use with the Pricing Calculator from reviewing actual spending with Cost Management. Microsoft references: [current AZ-900 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900) and [Azure Pricing Calculator](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/pricing-calculator).
- **Question 31:** Changed “Which Azure service” to “Which Azure security capability” for Web Application Firewall (WAF), because WAF is a capability available through supported networking services rather than one standalone service name. Microsoft references: [Application Gateway overview](https://learn.microsoft.com/en-us/azure/application-gateway/overview) and [secure application delivery choices](https://learn.microsoft.com/en-us/azure/networking/secure-application-delivery).

The other reviewed examples in this pass retained their answers with appropriate qualifications: VM deallocation may stop compute charges while related storage remains billable; private endpoints provide private network access but do not grant authorization by themselves; and region pairing does not automatically configure disaster recovery for every workload. These details are reflected in the relevant explanations and traps.

This is a targeted correction pass, not a claim that every explanation has been independently verified against a dedicated Microsoft Learn page. The manual regression checklist below remains outstanding until exercised in a browser.

- **Question 94:** Replaced a duplicate public-cloud definition (already covered by Question 11) with a Total Cost of Ownership (TCO) calculator scenario. Question 8 now tests factors affecting Azure costs, so both cost objectives are covered separately. The Microsoft AZ-900 outline and Microsoft Learn learning resources distinguish estimating Azure usage with the Pricing Calculator from comparing on-premises and Azure costs with TCO-oriented tools. References: [current AZ-900 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900), [Azure pricing calculator](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/pricing-calculator), and [Azure Migrate business case / TCO](https://learn.microsoft.com/en-us/azure/migrate/how-to-build-a-business-case).

## Manual regression checklist

- [ ] Start Unlimited practice; answer a question; confirm feedback, confidence selection, and Next.
- [ ] Pause on an unanswered question and resume; Next should remain disabled until an answer is selected.
- [ ] Answer a question, pause, and resume; Next should become enabled again.
- [ ] Return to learning paths while paused, select the same path, and confirm the current question and answers resume instead of resetting.
- [ ] Start a different path while another is paused; confirm the user receives a warning before switching.
- [ ] Start the 45-minute mock question section; confirm 35 questions are selected with the intended domain mix.
- [ ] Complete the question section and confirm its countdown stops before the separate simulated lab.
- [ ] Complete the lab and confirm the results report counts quiz answers only, displays unanswered questions, and records the mock attempt once.
- [ ] After completing a mock practical task, confirm the results screen is visible rather than remaining in the lab-only layout.
- [ ] From mock results, select Practice again and confirm a fresh 35-question mock starts with a reset 45-minute timer and the practical task enabled again.
- [ ] From beginner and topic-practice results, select Practice again and confirm the same path/topic question set is retained.
- [ ] Allow the timer to expire; confirm unanswered questions are added to Smart Review and the session can proceed to the lab/results flow.
- [ ] While a session is in progress, change the session-history filter and confirm the active practice mode and mock-exam flow remain unchanged.
- [ ] Refresh mid-session; confirm saved state resumes in the same browser.
- [ ] Confirm the existing visual questions at IDs 2, 4, and 5 still render.


## Third-pass wording and regression guards (2026-10-23)

- **Question 26:** Reworded the cloud security/governance benefit scenario to state the shared-responsibility boundary explicitly, reducing the risk that learners infer the cloud provider removes all customer responsibility.
- **Question 52:** Reworded the consumption-based pricing item to ask for a pricing model rather than incorrectly classifying consumption-based pricing as a cloud benefit.
- **Validator:** Added checks for duplicate question stems after case/punctuation normalization and for topic labels outside the three published AZ-900 skill domains. These guards help prevent future bank drift and accidental duplicate items.

The official Microsoft study guide lists security/governance as cloud-service benefits and consumption-based pricing as a separate cloud-computing objective: [AZ-900 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900). This is a focused wording and regression-guard pass, not a claim that every question explanation has now been independently verified.

## Practice-to-results flow follow-up (2026-10-23)

A source-level pass found two mock-flow regressions in the existing completion path: the mock practical task could leave the page in the lab-only CSS state when the quiz results were rendered, and the shared Practice again handler randomized all 103 questions without resetting the mock timer/lab state. The mock completion handler now restores the practice layout before rendering results, and a mode-aware restart helper resets the correct question set and timer for mock, beginner, and topic practice. Structural regression checks were added for both behaviors.

Focused Playwright browser smoke tests now exercise the key paths above without completing an entire mock. The remaining manual checklist still covers broader visual, accessibility, mobile, pause/resume, and content-display checks.

## Browser smoke tests and refresh recovery (2026-10-23)

The new `.github/workflows/browser-smoke.yml` workflow runs Playwright against the static site on pull requests and pushes to `main`. It currently verifies:

- Entering a mock session starts at Question 1 of 35, displays the timed clock, and advances to Question 2 after an answer.
- Practice again from a completed mock starts a fresh 35-question session with a reset timer.
- Refreshing at the mock practical-task stage restores the simulated task; completing it displays the results screen.
- Refreshing an active timed mock resumes the countdown. A deliberately short test timer expires into the practical-task stage and adds unanswered questions to Smart Review.

These tests exposed and fixed two additional recovery issues: the mock practical-task UI was not reliably restored after refreshing at that stage, and the countdown interval was not restarted for an active saved mock. The test suite is intentionally a fast smoke test, not a full 35-question mock completion or a replacement for all manual checks.