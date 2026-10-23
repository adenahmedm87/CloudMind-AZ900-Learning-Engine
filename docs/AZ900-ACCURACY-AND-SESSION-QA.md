# AZ-900 Question Accuracy and Session QA Review

**Review date:** 2026-10-23  
**Blueprint:** [Microsoft Learn — Study guide for Exam AZ-900](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900), skills measured as of July 20, 2026.  
**Scope:** Source-level review of all 103 question stems, answer-option sets, answer indexes, and objective/topic labels, plus a source-level inspection of practice and mock-session controls. This is not a live-browser certification of the site.

## Question-bank changes

The review replaced 11 selected questions in place. IDs, total question count, and the existing visual-question IDs (2, 4, and 5) are preserved.

| ID | Review action | Current objective |
|---:|---|---|
| 6 | Replaced an off-outline database-service recall item with a practical VM deployment question | Resources required for Azure virtual machines |
| 26 | Replaced an SLA recall item that is not explicitly listed in the current skills outline | Cloud security and governance benefits |
| 29 | Replaced a database-service recall item with a comparison of VMs, containers, and functions | Compare containers, virtual machines, and functions |
| 38 | Replaced a repeated Key Vault item with a current identity objective | Microsoft Entra Domain Services |
| 45 | Replaced a workflow-automation item with a listed Azure management tool | Azure portal |
| 55 | Replaced a broad disaster-recovery recall item with a cloud-pricing comparison | Compare cloud pricing models |
| 61 | Replaced a repeated virtual-network definition with an endpoint distinction | Public and private endpoints |
| 67 | Replaced a repeated Functions item with a listed storage tool | Azure Storage Explorer |
| 68 | Replaced a repeated availability-zone definition with a distinct infrastructure concept | Azure datacenters |
| 86 | Replaced a repeated Key Vault item with a current authentication objective | Passwordless authentication |
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

Automated validation checks the expected count (103), sequential unique IDs, required fields, answer-index bounds, non-empty options, and duplicate options. The GitHub Actions workflow is the repeatable structural gate.

Structural validation cannot establish that every technical statement, distractor, rationale, or example is factually perfect. The review corrected the selected items above and checked the bank against the current objective list, but the remaining content still merits ongoing source-by-source fact verification. No live-browser regression test was run by this source-level review.

## Second-pass factual and scope corrections

A focused follow-up compared cost-tool terminology and WAF wording with the current Microsoft Learn material:

- **Question 8:** Replaced the TCO-calculator comparison with the current listed objective on factors that affect Azure costs. The explanation now distinguishes estimates for planned use with the Pricing Calculator from reviewing actual spending with Cost Management. Microsoft references: [current AZ-900 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900) and [Azure Pricing Calculator](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/pricing-calculator).
- **Question 31:** Changed “Which Azure service” to “Which Azure security capability” for Web Application Firewall (WAF), because WAF is a capability available through supported networking services rather than one standalone service name. Microsoft references: [Application Gateway overview](https://learn.microsoft.com/en-us/azure/application-gateway/overview) and [secure application delivery choices](https://learn.microsoft.com/en-us/azure/networking/secure-application-delivery).

The other reviewed examples in this pass retained their answers with appropriate qualifications: VM deallocation may stop compute charges while related storage remains billable; private endpoints provide private network access but do not grant authorization by themselves; and region pairing does not automatically configure disaster recovery for every workload. These details are reflected in the relevant explanations and traps.

This is a targeted correction pass, not a claim that every explanation has been independently verified against a dedicated Microsoft Learn page. The manual regression checklist below remains outstanding until exercised in a browser.

## Manual regression checklist

- [ ] Start Unlimited practice; answer a question; confirm feedback, confidence selection, and Next.
- [ ] Pause on an unanswered question and resume; Next should remain disabled until an answer is selected.
- [ ] Answer a question, pause, and resume; Next should become enabled again.
- [ ] Return to learning paths while paused, select the same path, and confirm the current question and answers resume instead of resetting.
- [ ] Start a different path while another is paused; confirm the user receives a warning before switching.
- [ ] Start the 45-minute mock question section; confirm 35 questions are selected with the intended domain mix.
- [ ] Complete the question section and confirm its countdown stops before the separate simulated lab.
- [ ] Complete the lab and confirm the results report counts quiz answers only, displays unanswered questions, and records the mock attempt once.
- [ ] Allow the timer to expire; confirm unanswered questions are added to Smart Review and the session can proceed to the lab/results flow.
- [ ] Refresh mid-session; confirm saved state resumes in the same browser.
- [ ] Confirm the existing visual questions at IDs 2, 4, and 5 still render.
