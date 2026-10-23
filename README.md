# CloudMind — The Learning Intelligence Engine

**Tagline:** Learn why. Prove it. Remember it.

CloudMind is an independent AZ-900 practice companion that uses answer accuracy and self-reported confidence to help learners decide what to review next.

## Features
- Original Azure Fundamentals practice questions with explanations.
- Confidence reflection: Guessing, Somewhat confident, or Very confident.
- Misconception Clinic when an answer is wrong and the learner reports high confidence.
- Transfer checks that ask learners to apply an idea to a new situation.
- Progress statistics, topic-level practice signals, and a review queue.
- Browser-local progress persistence using localStorage.
- Responsive layout for desktop and mobile.

## Run locally
Open `index.html` in a modern browser. No build step or external JavaScript libraries are required.

## Architecture and design decisions

CloudMind is currently a small, static, single-page learning prototype:

- **Interface and question logic:** HTML, CSS, and browser JavaScript in `index.html`.
- **Progress storage:** the browser's `localStorage`; progress stays on the learner's device and is not synced to an account or shared across devices.
- **Hosting:** GitHub Pages serves the static site. The project does not currently run its own application server or API.
- **Learning flow:** answer a question → report confidence → read feedback → review a queued question or weaker topic.

### Why this design?

The system-design lesson emphasized understanding the problem before choosing infrastructure. CloudMind's current question bank is bundled with the page, and progress is saved locally. There is no repeated API request or slow background job that currently justifies adding a database server, cache service, message queue, load balancer, or custom CDN configuration. Adding those components now would increase complexity without solving a demonstrated problem.

If CloudMind later needs accounts, cross-device progress, centrally updated question content, or many concurrent learners, we should measure the bottleneck and revisit the design. Depending on the need, that could mean an API and database, background jobs for genuinely slow tasks, or additional scaling and monitoring. Those are future options, not features implemented in this prototype.

## Publish with GitHub Pages
In the repository settings, enable GitHub Pages for the `main` branch and the root folder. The app entry point is `index.html`.

## Learning-content note
Questions in this prototype are original practice questions, not copied exam questions. They are for learning and review and do not predict exam performance. For official certification details and the current skills outline, consult [Microsoft Learn — Azure Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/).

## Disclaimer
CloudMind is an independent learning tool and is not affiliated with or endorsed by Microsoft.

## Demo walkthrough

Use this short path when presenting CloudMind:

1. Open the live site and select **Start learning**.
2. Choose **Beginner path** and answer a question; demonstrate the explanation and confidence reflection.
3. Show how the review queue and topic progress respond to practice.
4. Pause an activity, return to learning paths, then resume it. If switching paths, confirm that the learner is warned before the new path replaces the active session.
5. Open the **Full mock exam** and explain the timed-question journey and practical task at the end.
6. Open the optional labs to demonstrate the simulated desktop task, Azure resource-group configuration, architecture choice, and network troubleshooting scenario.
7. Show the activity-history selector and explain that progress is stored locally in the current browser.

## Release hand-off checklist

- [ ] Manually test the main learning paths, pause/resume, and switching paths.
- [ ] Confirm previous session history remains after resetting the current activity.
- [ ] Check that diagrams appear on the questions that include them.
- [ ] Complete each lab once with a correct answer and once with an incorrect answer where retries are supported.
- [ ] Refresh the page and confirm browser-local progress behaves as expected.
- [ ] Check keyboard focus, reduced-motion behaviour, and a narrow mobile viewport.
- [ ] Confirm the GitHub Pages site serves the latest `main` version.
- [ ] Capture screenshots and a short demo recording for the final presentation.

These checks are a manual hand-off list; they are not represented as automated browser tests.
