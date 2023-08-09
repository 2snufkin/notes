# GITHUB:


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

### Merge
 !Always do git pull before merge!\
1.`git merge $branch-name`: locally. the branch name you merge to it should be the same branch name in the git push command (master maybe).\
2. `git push origin $branch-name`

## Remote => Local:

`git fetch origin $branch-name`: download the changes but not apply them to your local working folder. You can examine them\
`git fetch && git diff HEAD @{u} --name-only`: see what files will be modified if you do a git PULL
`git fetch && git diff @{u} --name-only`: see ALL differences between your current version and the incoming version, including uncommitted local modifications. 
`git pull origin $branch-name`: take the changes that have been made to the remote branch x.  * before running it make sure you are sitting on the branch that you want it to receive the update\
`git clone $URL`: will copy from a remote ropository to a local repository (your PC)
`git rebase origin/<branch-master>` : when on a feature branch, it will update the feature branch with the remote main branch <branch-master>\
`git checkout origin/<remote_branch> -- <file_path>`: update a file to it's remote version

### Merge remote branch into local.\
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
