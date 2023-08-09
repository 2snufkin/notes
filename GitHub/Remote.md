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




- **Fetch Remote Changes:**
  ```
  git fetch origin
  ```

- **Switch to Target Branch:**
  ```
  git checkout target_branch
  ```

- **Cherry-Pick a Single Commit:**
  ```
  git cherry-pick commit_hash
  ```

- **Cherry-Pick a Range of Commits:**
  ```
  git cherry-pick starting_commit_hash^..ending_commit_hash
  ```

- **Resolve Conflicts (if needed):**
  ```
  git cherry-pick --continue
  ```

- **Abort Cherry-Pick (if needed):**
  ```
  git cherry-pick --abort
  ```

- **View Cherry-Picked Commit:**
  ```
  git show cherry-picked_commit_hash
  ```

- **Commit Cherry-Picked Changes:**
  ```
  git commit
  ```

- **Push Changes to Remote:**
  ```
  git push origin target_branch
  ```










### Cherry Picking One Commit
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
