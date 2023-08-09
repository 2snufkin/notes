# Git Merge and Rebase

Git is a powerful version control system that allows developers to manage changes in their codebase effectively. Two common ways to integrate changes from one branch into another are through **merging** and **rebasing**. Each method has its advantages and use cases. This document will provide an overview of both merging and rebasing, along with step-by-step commands and instructions on how to revert a merge or rebase.


## Merging

Merging involves combining changes from one branch into another. It creates a new commit that has two parent commits, representing the divergence and the integration of changes.

### Steps to Perform a Merge:

1. **Switch to the Target Branch:**

   ```bash
   git checkout target-branch
   ```

2. **Merge the Source Branch:**

   ```bash
   git merge source-branch
   ```

3. **Resolve Conflicts (if any):**

   Git will automatically attempt to merge changes, but if conflicts arise, you'll need to resolve them manually by editing the affected files. After resolving conflicts, save the files and commit the changes.

   ```bash
   git add .
   git commit -m "Merge conflict resolution"
   ```

### Merge remote Branch into local.
To merge a remote branch into another remote or local branch, you'll typically follow these steps. Let's say we want to merge gatsby (from) into gatsby_evo (to)
1. **Fetch Changes**: First, make sure you have the latest information about the remote repository by fetching the changes from the remote:
   ```bash
   git fetch origin
   ```
2. **Switch to Target Branch**: If "gatsby_evo" is a local branch, switch to it. If it's a remote branch, and it does not have a local branch that track it - you  want to create and switch to a local branch that tracks the remote "gatsby_evo" branch:

   ```bash
   # If "gatsby_evo" is a local branch
   git checkout gatsby_evo

   # If "gatsby_evo" is a remote branch (create and track a local branch)
   git checkout -b gatsby_evo origin/gatsby_evo
   ```
3. **Merge Remote Branch**: Once you are on the target branch, you can merge the changes from the "gatsby" branch into it:

   ```bash
   git merge origin/gatsby
   ```
This command will merge the changes from the remote "gatsby" branch into the current branch ("gatsby_evo").

4. **Resolve Conflicts (if any)**: If there are any conflicts between the changes in the two branches, Git will prompt you to resolve them. Open the conflicted files, resolve the conflicts, save the changes, and then continue the merge process by:

   ```bash
   git add .       # Add the resolved files
   git commit -m "Resolved conflicts from gatsby branch"
   ```

5. **Push Changes**: After successfully merging and resolving any conflicts, push the changes back to the remote repository:

   ```bash
   git push origin gatsby_evo
   ```
This will push the merged changes to the remote "gatsby_evo" branch.



## Rebasing

Rebasing involves moving the entire history of changes from one branch onto another branch. It results in a linear history, making it appear as though all the changes were made sequentially on a single branch.

### Steps to Perform a Rebase:

1. **Switch to the Source Branch:**

   ```bash
   git checkout source-branch
   ```

2. **Rebase onto the Target Branch:**

   ```bash
   git rebase target-branch
   ```

3. **Resolve Conflicts (if any):**

   Similar to merging, if conflicts occur during the rebase, you'll need to resolve them manually and continue the rebase process.

   ```bash
   git add .
   git rebase --continue
   ```

---

## Reverting a Merge

Reverting a merge means creating a new commit that undoes the changes introduced by the merge commit. This is often useful to undo a mistaken merge or to address a problematic integration.

### Steps to Revert a Merge:

1. **Identify the Merge Commit:**

   Use `git log --merges` to find the hash of the merge commit you want to revert.

2. **Create a Revert Commit:**

   ```bash
   git switch target-branch
   git revert -m 1 <merge-commit-hash>
   ```

   The `-m 1` flag specifies which parent's changes to keep.

3. **Commit:** `git commit -m "Revert the merge commit"`
4. **Push and Force:**
   ```bash
   git push origin branch
   ```
 if there is a problem you can use  
   ```bash
   git push --force origin branch
   ```
## Reverting a Rebase

Reverting a rebase involves resetting the branch to its state before the rebase. This effectively removes all the changes introduced by the rebase.

### Steps to Revert a Rebase:

1. **Identify the Commit Before Rebase:**

   Use `git reflog` to find the hash of the commit before the rebase.

2. **Reset the Branch:**

   ```bash
   git checkout source-branch
   git reset --hard <commit-before-rebase-hash>
   ```

---

Remember that the choice between merging and rebasing depends on the project's workflow and the desired history presentation. Merging maintains a clear separation between feature branches, while rebasing offers a linear history. Always ensure you're following the best practices and collaborating effectively with your team.