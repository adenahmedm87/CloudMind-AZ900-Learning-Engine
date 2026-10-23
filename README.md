# CloudMind — The Learning Intelligence Engine

**Learn why. Prove it. Remember it.**

CloudMind is an independent AZ-900 (Microsoft Azure Fundamentals) learning companion. It uses a learner's answers and self-reported confidence to help surface questions worth revisiting—so practice can focus on understanding, not only scores.

**Live demo:** https://adenahmedm87.github.io/CloudMind-AZ900-Learning-Engine/  
**Source code:** https://github.com/adenahmedm87/CloudMind-AZ900-Learning-Engine  
**Submission brief and demo script:** [SUBMISSION.md](./SUBMISSION.md)

## The problem

Practice quizzes often tell learners whether an answer is right or wrong, but a score alone may not reveal *why* the learner is struggling. A confident wrong answer may point to a misconception, while a correct answer made by guessing may still need reinforcement.

## The solution

CloudMind adds a lightweight reflection loop to AZ-900 practice:

1. **Answer** an original practice question.
2. **Reflect** by choosing a confidence level.
3. **Understand** the explanation and, where relevant, complete a transfer check.
4. **Review** questions and topics that practice signals suggest revisiting.

The dashboard now gives an adaptive next-step recommendation based on the learner's saved practice signals. Confidence is treated as a clue—not proof of a misconception.

## Features

- Original Azure Fundamentals practice questions with explanations.
- Beginner practice, focused topic practice, unlimited practice, and a timed mock-exam path.
- Confidence reflection: Guessing, Somewhat confident, or Very confident.
- A Misconception Clinic for wrong answers reported with high confidence.
- Transfer checks to practise applying an idea in a different situation.
- Adaptive next-step recommendation based on review priorities and topic performance.
- A confidence-aware review queue with explanations for why an item is prioritised.
- Topic-level practice signals, session summaries, and activity history.
- Optional interactive simulations for a desktop task, Azure resource-group configuration, architecture design, and network troubleshooting.
- Browser-local progress persistence using `localStorage`.
- Responsive layout and keyboard focus styling for desktop and mobile.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. No build step, package installation, account, or external JavaScript library is required.

## Architecture

CloudMind is a static single-page web application:

- **Interface and learning logic:** HTML, CSS, and browser JavaScript in `index.html`.
- **Question content:** Bundled original practice questions.
- **Progress storage:** Browser `localStorage`; progress remains in the current browser on the learner's device.
- **Hosting:** GitHub Pages.
- **Backend/API:** None in the current prototype.

### Why keep it simple?

The question bank is bundled with the page and learner progress is saved locally. A database, API, message queue, or custom server would add complexity without solving a demonstrated need in this prototype. If future versions need accounts, cross-device synchronisation, centrally updated content, or shared analytics, the architecture can be reconsidered based on measured requirements.

## Learning and privacy boundaries

- Confidence is self-reported and is not a psychological or diagnostic measure.
- Topic performance is a practice signal, not a reliable prediction of certification success.
- Progress is stored in the current browser; it is not synced to an account or automatically shared across devices.
- The hands-on labs are simulations, not live Azure resource deployments.
- Questions are original practice content, not copied official exam questions.

## Publish with GitHub Pages

In repository settings, enable GitHub Pages for the `main` branch and root folder. The app entry point is `index.html`. The live demo link above is the intended presentation entry point.

## Official reference

For official certification details and the current skills outline, consult [Microsoft Learn — Azure Fundamentals](https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/).

## Disclaimer

CloudMind is an independent learning tool and is not affiliated with or endorsed by Microsoft.
