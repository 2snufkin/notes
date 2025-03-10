## GitHub Workflow

A successful collaboration workflow can greatly enhance project efficiency and maintainability. Here's a common workflow that many teams follow:

1. **Create a Branch:** Create a new branch for your feature or bug fix → `git checkout -b <branch-name>`.
2. **Make Changes:** Make and modify your code within the branch.
3. **Commit Changes:** Stage changes → `git add <file>`. Commit changes with a descriptive message → `git commit -m "Commit message"`.
4. **Pull Latest Changes:** Regularly pull latest changes from main → `git pull origin main`.
5. **Resolve Conflicts:** If conflicts occur, manually resolve them in conflicted files.
6. **Push to Remote:** Push your branch to the remote repository → `git push origin <branch-name>`.
7. **Open a Pull Request (PR):** Open a PR to merge your branch into main.
8. **Code Review:** Reviewers provide feedback on your code changes.
9. **Address Feedback:** Make necessary changes based on the feedback.
10. **Merge Changes:** After approval, merge the PR into main.
11. **Regular Maintenance:** Periodically clean up merged branches.
12. **Stay Updated:** Keep up with changes in main and rebase your branch if needed.

### Best Practices

- **Clear Commit Messages:** Write descriptive commit messages that explain the purpose of the change. Follow a consistent format.
- **Issue Tracking:** Link PRs to relevant issues in the repository to provide context and maintain a clear history of changes.
- **Documentation:** Maintain thorough documentation for the project, including README files, code comments, and user guides.
- **Use Tags and Releases:** Tag versions of your software to provide stable points for users to reference. This is useful for tracking changes and providing a clear upgrade path.
- **Git Actions:** Leverage GitHub Actions for automating repetitive tasks like testing, building, and deploying. Maintain workflows in version control.

### Bad Practices and Things to Avoid

- **Force Pushing**: Avoid force pushing to shared branches like main. This can overwrite others' changes and create confusion.
- **Large Pull Requests**: PRs that are too large are hard to review and can introduce hidden issues. Keep PRs small and focused.
- **Ignoring Code Reviews**: Don't skip code reviews. They ensure code quality and knowledge sharing among team members.
- **Neglecting Documentation**: Insufficient documentation can lead to confusion and hinder onboarding for new team members.
- **Directly Pushing to Main**: Avoid pushing directly to the main branch without a PR and proper review process.

### Protecting Branches

To maintain code quality and prevent accidental changes, consider implementing these branch protection rules: