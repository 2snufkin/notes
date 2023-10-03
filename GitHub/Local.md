# Local Repository
https://learngitbranching.js.org/: site to prefond your knoledge in git with games
## Init a git project
`git init`:
connect the project to git. create an hidden folder named git when git store every version of every file in the working directory\

## Configurations
you can configurate your name, email, alias etc...
- `git config --global init.$default-Branch-Name`: change the init brunch name from master to whenever I want in all the projects\
- `cat .git/config`: print the config file
`git config --list`: see the list of setting. I can see the author name and email only if they were configured before\
`git config --global user.name "Name Family-name"`: set the author's name globally\
`git config --global user.email Email`: set the author's email globally (the email that I use as username at GitHub)\
`cat ~/.gitconfig`: will display you username and email\
- `git status`: Displays the current status of your working directory, including changes to be committed and untracked files.

### Alias
- `git config --local alias.<alias-name> "<alias-command-without-git>"`: This will set the alias configuration only for the current Git repository, without affecting any other repositories or the global Git configuration on your system. alias-command is without the ketword git.\
`--global`: replacing --local with --global will set the alias globally.
- `git config --get-regexp alias`:  list all of your configured aliases
- `git config --local --unset alias.<alias-name>`: deleting a local Git alias. If you want to delete a global alias replace --local with --global

### Commit's Info

#### Commit History
- `git log`: Shows a list of commits on the current branch.
- `git log --graph`: Displays a visual graph of the commit tree.
- `git log --oneline --graph --decorate --all`: Shows the entire commit history graph, useful after `git fetch`.
- `git log --topo-order --all --graph --date=local --pretty=format:'%C(green)%h%C(reset) %><(55,trunc)%s%C(red)%d%C(reset) %C(blue)[%an]%C(reset) %C(yellow)%ad%C(reset)%n'`: Displays a concise and color-enhanced history of commits.

#### Commit History Visualization
- `gitk --simplify-by-decoration --all`: Opens a graphical window with a compact representation of the commit history.
- `gitk --all`: Opens a graphical window with a more detailed representation of the commit history.
- `git log --oneline --graph --color --all --decorate`: Provides a compact branch representation in the terminal (partial commit names).
- `git log --pretty=oneline --graph --decorate --all`: Displays a branch representation in the terminal with full commit numbers.

#### Showing Files
- `git show`: Displays the changes of the last commit, including added and removed lines.
- `git show <commit-hash>`: Displays detailed information about a specific commit, including changes to files.
- `git diff`: Shows changes between your working directory and the last commit.
- `git diff <commit-hash>`: Compares your working directory to a specific commit.
- `git log -n 1 --name-only --pretty=format:"%h - %an, %ar : %s"`: This command will display the commit hash (%h), author name (%an), relative time (%ar), and commit message (%s) for the most recent commit. Additionally, it will list the names of files that were changed in that commit (--name-only).
- `git log --name-only --pretty=format:"%h - %an, %ar : %s"`: list of files changed in each commit across the history
#### Exiting Commit History Visualization
- Press `q`: Quits the `git log` screen and returns to the terminal.

#### Additional Information
- `git branch`: Lists all local branches and highlights the current branch.
- `git remote -v`: Lists remote repositories and their URLs.
- `git blame <file>`: Shows the commit details for each line of a file.


## Diff
- ` git diff --name-only $branch`: list all files that are different between the specified branch and the current branch. pecifically, it will show the names of files that have been modified, added, or deleted in the specified branch since it diverged from the current branch.  It does not take into account any changes that have been staged (i.e., added to the index) but not yet committed.\
- `git diff --name-only HEAD`: This will show the names of all files that have been modified between the current commit (i.e., HEAD) and the working directory, including any changes that have been staged (but not yet committed).\
- `git diff --name-only`: list the names of files that have been modified in the working directory (i.e., unstaged changes), you can use the following command:
` | wc -l`: adding this will count the number of files.\
`git diff origin/branch_x path/to/file`: compare a file to it's remote version on branch_x.\

## Files
`git add`:  Stage a file/files.Copy files from the working dir. to the staging area. \
`git add .`: will copy all files\
`git restore --staged $file` or `git reset $filename`: unstage a file\
`git update-index --skip-worktree $filename`: ignores uncommitted changes in a file that is already tracked. git will always use the file content and attributes from the staging area. This is useful when we want to add local changes to a file without pushing them to the upstream

### Excluding a file
Note that this approach is only recommended for local changes that you do not want to push to the main project. If you need to exclude files from being committed for everyone, then you should use a .gitignore file instead. \

if you have made changes to a file that you do not want to push to the main project or share with others, then you can exclude that file from being committed. \

Make sure that the file is not already committed by running the command git status. If the file is not committed, it should show up under the "Changes not staged for commit" section. \

**If it was not commited yet:**
1. `git update-index --assume-unchanged <file-path>`: ignore any changes made to the file and not include it in future commits.
2.`git update-index --no-assume-unchanged <file-path>`: This will tell Git to start tracking changes to the file again. \

**If it was commited:**
1. **Untrack the File:** `git rm --cached <file-path>`
2. **Update .gitignore** After untracking the file, you should add its path to the .gitignore file to ensure it doesn't get accidentally staged again in the future. Add  `/path/to/your/file` relative to the root of your repository.
3. **Commit the Changes:** `git commit -m "Stopped tracking <file-name>"`

## Commits

In Git, commits are essential for tracking changes in your project. Each commit represents a snapshot of your project at a particular point in time. Here are some common Git commit commands and concepts:

### Creating Commits

- `git commit`: This command is used to create a commit in Git. It copies files from the staging area to the Git repository and creates the corresponding Git objects and a commit object.

- `git commit -m "$commitDescription"`: You can use this command to commit staged files along with a brief commit message for documentation.

- `git commit -a`: This command stages and commits changes in one step. It's essentially equivalent to running `git add .` followed by `git commit`.


### Squash Commits

Squashing commits is a technique to combine multiple commits into a single, more organized commit. This can help keep your Git history clean and meaningful, especially when working on feature branches. Here's how you can squash commits:

1. Use `git rebase -i HEAD~n`, where `n` is the number of commits you want to squash. You can replace it wit ha hash of the commit that will mark the start of the squash. This command opens an interactive rebase dialog.

2. In the interactive rebase dialog, replace `pick` with `squash` (or simply `s`) for the commits you want to squash. Leave `pick` for the commit you want to keep.

3. Save and close the dialog. Git will then prompt you to edit the combined commit message.

4. Edit the commit message as desired and save the changes.

5. Git will complete the rebase, and you will have a single squashed commit with the combined changes.


### Modifying the Most Recent Commit

To make changes to the most recent commit, including modifying the commit message or adding new changes to it, you can use the `--amend` option with the `git commit` command:

```bash
git commit --amend
```

This will open your default text editor, allowing you to modify the commit message. You can also stage additional changes before saving.
#### Modifing commit message:
git commit --amend -m "New commit message"

#### Adding Changes to the Last Commit:
To add new changes to the last commit without changing its commit message, follow these steps:
1. Stage the changes you want to add to the last commit using `git add`.

   ```bash
   git add <files>
   ```

2. Use the `--amend` option to include the staged changes in the last commit:

   ```bash
   git commit --amend
   ```
   or without modifing the message: 
   ```bash
   git commit --amend --no-edit
   ```
## Modifying Older Commits

If you need to modify a commit that is not the most recent one, you'll need to use interactive rebasing. Interactive rebasing allows you to edit, squash, or split commits.

### Interactive Rebase

1. Open the interactive rebase tool with the following command, specifying how many commits you want to go back:

   ```bash
   git rebase -i HEAD~<number-of-commits>
   ```

2. An editor will open, displaying a list of commits from the current HEAD going back the specified number of commits.

3. Change the word "pick" to one of the following options to modify the corresponding commit:

   - **pick:** Keep the commit as is.
   - **edit:** Pause the rebase process to allow you to amend the commit.
   - **squash:** Combine the commit with the previous one.
   - **reword:** Change the commit message.

4. Save and close the editor.

5. Git will pause at each commit marked as "edit," allowing you to make changes.

6. After making your changes, stage them with `git add` and then use `git commit --amend` to modify the commit.

7. Continue the rebase with `git rebase --continue`.

8. Repeat steps 5-7 for each "edit" commit in the rebase.


### Deleting a Specific Commit
You can use git reabse -i or git reset:
+ git rebase -i <hash>: allows you to modify the commit history by reordering, editing, or dropping commits while preserving the history.
+ git reset --soft <hash>: moves the branch pointer while preserving the commit history and staged changes.
+ git reset --hard <hash>: moves the branch pointer and removes commits and changes made after the reset point, effectively rewriting history.

#### git reabse -i
   - Purpose: Interactive rebasing allows you to modify and reorder commits interactively.
   - Result: You can edit, squash, reword, or drop individual commits during the interactive rebase.
   - Commit History: Commits can be changed or combined into new commits.
   - Commit SHA-1: Commits are typically rewritten with new SHA-1 hashes.
   - Safety: Safer for shared branches if used carefully because it preserves commit history.
   - Use Case: Used when you want to clean up commit history or incorporate changes from another branch into your current branch.

#### git reset --soft

   - Purpose: Soft reset moves the branch pointer to a specific commit while keeping the changes staged.
   - Result: The commit you reset to becomes the new head of the branch, and the changes from subsequent commits are staged and ready for a new commit.
   - Commit History: Previous commits are still part of the branch's history.
   - Commit SHA-1: The commit history remains unchanged, so commit SHA-1 hashes are retained.
   - Safety: Safe for personal branches or if you want to rewrite the commit message without altering history.
   - Use Case: Useful when you want to make additional changes to a previous commit or reword its message.

#### git reset --hard 

   - Purpose: Hard reset moves the branch pointer to a specific commit and discards all changes made after that commit.
   - Result: Resets the branch to the specified commit, discarding any changes in the working directory and staging area.
   - Commit History: Commits that were reset are no longer part of the branch's history.
   - Commit SHA-1: Commits after the reset point are effectively deleted and won't appear in the commit history.
   - Safety: Can be dangerous on shared branches because it permanently removes commits.
   - Use Case: Should be used with caution and only when you're certain you want to remove commits and start over from a specific point.


### Saving Committed Files to the Disk

You can create a compressed archive of committed files for a specific commit using the following command:
`git archive --format=zip --output=commit-files.zip commit-hash`
This command will create a zip file named `commit-files.zip` in your current directory, containing all the files as they existed at the specified commit (`commit-hash`).
Note that this command archives all the files in the commit, not just the files that were changed in the commit.



## Stash
stash: available from all the branches. creating stash: adding a stash is like a stack of stash, when I want to pull one, I pull it from the top of the list (the last one added). The stash with the highest number is the oldest stash@{no}. moving without stash is possible if both the main and the branch are at the same level (HEAD).\
`git stash list`: list all stashes
`git diff --staged`: show you all the code changes for all the staged files

### Create : before leaving the branch
`git stash`: save your changes in a temporary location, allowing you to switch to another branch without committing your changes. Don't stash untracked files\
`-u`: stash also untracked files. shortcut of --include-untracked\
`git stash --keep-index`: stash only the unstage (red) files. index is the staging area. with `git status` you will see only the staged files and all the ustaged files won't be part of the working area

`git stash save "comment"`: it's like git stash bit it allow you to add comment\
`git stash push -m "comment"`: it's like `git save "comment"`\
`git stash --patch`:: let you pass every file which is a candidate for stash and ask you if you want to stash it. with the `Stash this chunk?` question. you can use the question mark to see what every letter of the answer represent\

### Get : after returning to the branch
`git stash apply`: restore the latest stash but don't remove it from the list of stashes\
`git stash apply stash@{<no>}`: apply specific stash\
`git stash pop`:restore the latest stash (stash@{0}). Pop will apply and remove it from the list of stashes\
If you have more than one stash, you can specify which stash to apply using the following command:\
`git stash apply stash@{<number>}`: <number> is the number of the stash you want to apply, starting from 0 for the most recent stash.\
`git stash branch <branch-name>`: create a branch out of stash\


### Delete
`git stash drop stash@{<no>}`: remove the specific stash from the stash list\
`git stash clear`: clear the stash list - remove all the items in the list\

### moving changes
If I made changes to the wrong branch, do the following:
1. Stash
2. Change branch  
3. Pop stash


## Checkout and Switch
`git checkout`: it's like switch to commend. it allow you to jump between different versions of the project\
`git checkout $hashNoOfcommit `: update the working directory to the moment in time of this commit, can delete files and can add files\
`git switch $branch-name`: update the working directory to a specific branch, go to this branch\
`git checkout $branch-name`: no longer used. see git switch\
`git checkout -- $filename`: Un delete a file. After deleting a file from the working directory,it's possible to restore it to the working directory if it wasn't upstaged\
(in this case, running git add . / git add filename after the delete)

## Branches and merge
`git branch`: list of the branches\
`git branch --merged origin/<devbranch> -r` : list all the remote branches that have been merged into the remote master branch, where origin is the default name for the remote repository\
`git switch -c $branch-name`: create new branch and witch to it\
`git branch $branch-name` : create a new branch\
`git branch -d $branch-name`: delete a branch\
`git branch -m $branch-name`: change the current branch name, if you want to change another branch name, move to it before\
`git merge $branch-name`: I must be on the receiving branch to run it (with checkout). Will merge the branch in the arg to the receiving branch \
`git rebase $branch-name`: rebase a branch

# Remote Repository


## SSH KEYS
`ssh-keygen -o`: create a SSH file on your disk, later to be used in GitHub. It will ask you where to save\
`cat <save-folder>/id_rsa.pub`: will show the SSH string

## Getting info
`git log --merges --pretty=format:'%h %s' --grep='Merge pull request'`: return a list of all merege pull requests
`git remote -v`: show if I am connected to a remote repository. if connected I should see the fetch and push files\

## Connecting to remote
`git remote add origin $URL`: connect to an existing repository in GitHub\

##  Local => Remote:
`git push --set-upstream origin master`: To use for the first push. Push the current branch and set the remote as upstream\ 
`git push origin $branch-name`: push changes to GitHub (origin), the branch-name is the remote branch, the destination branch.\
-u: define this branch as the default upstream branch.\
upstream branch or the tracked remote branch = the branch you will interact with by default when using git pull and git push commands.
`git push --set-upstream-to origin/the_branch`: set upstream branch\
`git push origin --delete $remoteBranchName`: delete remote branch


## Remote => Local:

`git fetch origin $branch-name`: download the changes but not apply them to your local working folder. You can examine them\
`git fetch && git diff HEAD @{u} --name-only`: see what files will be modified if you do a git PULL
`git fetch && git diff @{u} --name-only`: see ALL differences between your current version and the incoming version, including uncommitted local modifications. 
`git pull origin $branch-name`: take the changes that have been made to the remote branch x.  * before running it make sure you are sitting on the branch that you want it to receive the update\
`git clone $URL`: will copy from a remote ropository to a local repository (your PC)
`git rebase origin/<branch-master>` : when on a feature branch, it will update the feature branch with the remote main branch <branch-master>\
`git checkout origin/<remote_branch> -- <file_path>`: update a file to it's remote version


## Cherry-Picking 
Cherry picking in Git allows you to select a commit from one branch and apply it onto another branch. This can be useful when you only want to take a specific commit from a feature branch and merge it into your main branch, without merging the entire feature branch.



**Cherry-Pick a Single Commit:**
  ```
  git cherry-pick commit_hash
  ```

**Cherry-Pick a Range of Commits:**
  ```
  git cherry-pick starting_commit_hash^..ending_commit_hash
  ```

**Continue Cherry-Pick (run this after resolving):**
  ```
  git cherry-pick --continue
  ```

**Abort Cherry-Pick (if needed):**
  ```
  git cherry-pick --abort
  ```

**View Cherry-Picked Commit:**
  ```
  git show cherry-picked_commit_hash
  ```


### Cherry Picking One Commit
0. Fetch Remote Changes: run `git fetch origin`. 
1. Checkout the branch where you want to apply the commit 
2. Get the commit hash of the commit you want to cherry pick. You can find this by running `git log` on the branch with the commit. If you do it don't forget to switch to the target branch
3. Run the cherry pick command, specifying the commit hash:
```
git cherry-pick <commit-hash>
```
4. If there are no conflicts, Git will apply the commit directly. If there are conflicts, you will need to resolve them before committing the changes.
5. Once done, commit the changes. The commit message will include information that this was a cherry picked commit.
```
git commit -m "Cherry pick commit <commit-hash>" 
```
6. work on your task. When you push to origin you don't want to push also  the cherry-pick commit so for this:
```bash
git rebase -i HEAD~5
```
This will open an interactive text editor with a list of recent commits, including the commit you want to remove

7. Change pick to drop in front of the commit you want to remove. Save and close the text editor. Git will now proceed with the rebase and drop the commit you specified.

Remember that this action alters the commit history, so if your branch has been pushed to a remote repository, you might need to force-push the branch to update the remote history. `git push --force-with-lease origin <branch-name>`. Be cautious when force-pushing, as it can affect other collaborators who have pulled the branch. Communication with your team is important in such cases.


## Cherry Picking Multiple Commits 
You can also cherry pick a range of commits using:

```
git cherry-pick <start-commit-hash>..<end-commit-hash>
```
This will apply the sequence of commits onto the current branch. Again, resolve any conflicts before committing.

## Caveats of Cherry Picking

Some things to keep in mind when cherry picking:
- Cherry picked commits will have different hash IDs than the original commits.
- Don't cherry pick a merge commit without also cherry picking its parent commits. This can lead to issues.
- Cherry picking does not bring over the branch relationship or any tags from the original commit.
- Regular git commands like `git rebase` and `git revert` may be better choices in some situations.




 ### Getting one file from remote
```
git fetch: git fetch will download all the recent changes, but it will not put it in your current checked out code (working area).
git checkout origin/<branch-name> -- path/to/file: will checkout the particular file from the downloaded changes (origin/master).
```
   

### Travel in time
 if someone introduce a bug to the main remote branch and you want to go back to earlier version
1.`git log`:  to see the commit history of the main branch. Look for the commit before the bug was introduced. You can use the arrow keys to scroll through the output, and press q to exit the log view.
2. Find the hash of the commit you want to switch to. It should be a long string of letters and numbers, like d7258d4b6faaa4e9686071ecf8c4529a0d7a3b3c.
3. `git checkout <commit-hash>`:  switch to that commit. 
4. You should now be on the main branch at the state of the code before the bug was introduced. You can create a new branch from here if you want to make changes and keep them separate from the refactoring branch.
5. to return back : `git branch <main>`


# Workflow
 update from remote -> create task branch -> work on it -> once a day `git rebase origin/<branch-master>` to pull the code from remote.
 when ready to push: compile and build your project -> test it -> `git rebase origin/<branch-master> -> if there are conflicts solve them
 -> add and commit with `git commit -am "message"` -> git rebase --continue -> push to remote with the -f argument.
