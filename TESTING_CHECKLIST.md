# CloudMind — Final Manual Testing Checklist

Use this checklist against the **deployed live site**, not only the source file. Check each item only after personally confirming the expected result. These are manual checks; they are not automated tests.

Live site: https://adenahmedm87.github.io/CloudMind-AZ900-Learning-Engine/  
Repository: https://github.com/adenahmedm87/CloudMind-AZ900-Learning-Engine

## A. Deployment and first impression

- [ ] Open the live link in a fresh browser tab and confirm the latest page loads without a blank screen or visible JavaScript error.
- [ ] Confirm the landing page, title, Start Learning, and How It Works actions behave correctly.
- [ ] Check the page at desktop width and a narrow mobile viewport.
- [ ] Confirm the README live-demo link opens the same deployed app.

## B. Core question flow

- [ ] Start beginner practice and answer a question.
- [ ] Confirm the selected answer is marked correctly/incorrectly and feedback explains why.
- [ ] Confirm the confidence choices appear at the intended stage and the chosen option is visibly selected.
- [ ] Confirm the learner can continue to the next question.
- [ ] Confirm a transfer check, where shown, can be completed and provides feedback.
- [ ] Complete a session and review the summary, score, unanswered count, and topic breakdown.

## C. Confidence-aware learning and recommendations

- [ ] In a clean browser session, answer incorrectly and select **Very confident**.
- [ ] Confirm the question is queued and marked as a **possible misconception risk** / highest-priority review item.
- [ ] Answer another question correctly but select **Guessing** (low confidence).
- [ ] Confirm the review explanation treats it as a reinforcement opportunity, not as a mistake.
- [ ] Return to the dashboard and confirm the recommended next step changes to match the saved learning signals.
- [ ] Confirm the recommendation button opens the relevant practice/review flow.
- [ ] Confirm the wording does not claim that one answer proves a misconception.

## D. Smart review and topic progress

- [ ] Open Smart Review and confirm queued items are shown.
- [ ] Confirm high-confidence wrong answers appear before lower-priority queued items.
- [ ] Confirm the topic mastery display reflects attempted questions.
- [ ] Confirm the weak-topic recommendation is sensible when a topic has low practice accuracy.
- [ ] Confirm an empty review queue has a clear empty state and does not break navigation.

## E. Navigation, session state, and history

- [ ] Move between Dashboard, Practice, Review, Labs, Progress, and Guide.
- [ ] Pause and resume a session if the control is available in the selected path.
- [ ] Try switching activity while a session is active and confirm the app communicates what will happen.
- [ ] Reset the current activity and confirm the reset warning is clear.
- [ ] Confirm saved session history remains after resetting current answers.
- [ ] Confirm the history selector switches between activity types.
- [ ] Refresh the page and confirm saved progress and review state behave as expected.

## F. Hands-on simulations

- [ ] Complete the desktop simulation correctly and inspect its feedback.
- [ ] Submit an incorrect desktop-task response where supported and confirm retry/feedback behaviour.
- [ ] Complete the Azure portal simulation with the specified settings and confirm grading.
- [ ] Submit an incorrect Azure portal configuration and confirm useful feedback.
- [ ] Complete the architecture scenario with the correct and an incorrect choice.
- [ ] Complete the network troubleshooting scenario with the correct and an incorrect choice.
- [ ] Confirm the interface clearly presents these activities as simulations, not real Azure deployments.

## G. Accessibility and final polish

- [ ] Navigate major controls using the keyboard and confirm focus indicators are visible.
- [ ] Check that buttons and answer options remain readable and usable on mobile.
- [ ] Check that no content is clipped horizontally at narrow widths.
- [ ] Check browser console for uncaught errors during the key flows.
- [ ] Confirm browser-local storage behaviour and understand that progress is not synced to another device.
- [ ] Confirm the deployed version contains the latest changes and the live link is publicly accessible.

## Final sign-off

- [ ] All critical flows above passed on the deployed site.
- [ ] Any failed checks were fixed, redeployed, and retested.
- [ ] Demo video and final pitch still accurately describe the deployed version.
- [ ] Final repository and live-demo links are ready to paste into the hackathon submission form.

**Important:** Do not mark the project fully tested until the deployed version has been checked. CloudMind is an independent practice companion; it is not affiliated with Microsoft and its practice scores do not predict official certification results.
