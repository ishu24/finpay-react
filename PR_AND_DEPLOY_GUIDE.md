# PR & Deploy Guide

This document describes concise steps to:

- prepare and push changes
- create a pull request (PR)
- review and leave comments on the PR
- deploy the app (recommended services)

Prerequisites

- Node.js and npm installed
- git configured with your GitHub account
- (optional) GitHub CLI `gh` installed and authenticated: https://cli.github.com/
- Repository already pushed to GitHub and remote named `origin`

1. Create a feature branch and push

- Open PowerShell in the repo folder and run:
  git checkout -b feature/your-change
  git add -A
  git commit -m "Describe your change"
  git push -u origin feature/your-change

2. Create a pull request

- Option A: Using GitHub website
  - Visit: https://github.com/<your-username>/<repo>/pulls and click "New pull request" or use the URL shown after pushing a branch (remote prints the link).
  - Choose base branch `main` (or the appropriate release branch) and head `feature/your-change`.
  - Fill title and description, then click "Create pull request".

- Option B: Using GitHub CLI
  gh pr create --base main --head feature/your-change --title "Short title" --body "More details about the change"

3. Review code and add comments

- Web UI (recommended for inline comments)
  - Open the PR, go to "Files changed".
  - Hover next to a line and click the blue "+" to create an inline comment. Submit the comment as part of a review (Comment / Approve / Request changes).

- GitHub CLI (single comment on PR)
  - Add a general comment: gh pr comment <pr-number> --body "Comment text"
  - Submit a review (approve/request changes/comment):
    gh pr review <pr-number> --approve --body "Looks good"
    gh pr review <pr-number> --request-changes --body "Please address X"
    gh pr review <pr-number> --comment --body "Note about ..."

4. Deploy the app (recommended quick options)

- Create React App build (one-time build step):
  npm install
  npm run build

  # build output placed in ./build

- Vercel (recommended; automatic from GitHub)
  - Sign in to https://vercel.com/ and import the GitHub repo.
  - Choose the branch to deploy (main or preview branches); Vercel will run the build command and publish.

- Netlify (recommended)
  - Sign in to https://app.netlify.com/ and "Add new site" -> GitHub.
  - Select the repo and branch, set build command `npm run build`, publish directory `build`.

- GitHub Pages (for CRA)
  - Add `homepage` to package.json and use `gh-pages` package, or use a static hosting workflow that deploys `build` to GH Pages. Consider Vercel/Netlify for simplicity.

5. Useful checks before PR

- Run tests: npm test
- Lint and typecheck if configured: npm run lint; npm run build (or tsc)
- Ensure node_modules is ignored (add to .gitignore)

6. Notes & best practices

- Keep PRs small and focused. Explain "why" in PR description.
- Use descriptive commit messages and branch names.
- For sensitive changes, request specific reviewers and add checklists in PR description.

If you want, I can:

- create a CI workflow file (GitHub Actions) to run tests on PRs
- set up a deploy pipeline to Vercel or Netlify and connect it to the repo
