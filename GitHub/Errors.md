# Reject push to remote branch
```
 ! [rejected]        TG-120 -> TG-120 (non-fast-forward)
error: failed to push some refs to '*********.git'
hint: Updates were rejected because the tip of your current branch is behind
```
This error occurs when you are trying to push changes to a remote branch, but the remote branch has changes that you don't have in your local branch. It means that someone else has pushed changes to the remote branch, and now your local branch is behind the remote branch.
problem: Updates were rejected because the tip of your current branch is behind
Here's how you can resolve this issue:
1. `git fetch origin`: Fetch the latest changes from the remote branch
2. `git rebase origin/branch_name`:  Rebase your local branch with the remote branch
Resolve any conflicts that arise: If there are any conflicts, Git will stop the rebasing process and ask you to resolve the conflicts. 
You'll need to edit the conflicting files and then run the following command to mark the conflicts as resolved:
`git add file_name`
`git rebase --continue`: Continue the rebasing process: After resolving the conflicts, continue the rebasing process
3. `git push origin branch_name`:  Push the changes to the remote branch
Using the -f option with git push is generally not recommended, as it can overwrite changes on the remote branch and cause issues for other contributors. It's usually better to resolve conflicts and ensure that your local branch is up-to-date with the remote branch before pushing changes.
Now your local branch should be up to date with the remote branch, and you should be able to push your changes without any errors
--------------------
# Conflicts
Git creates a conflict when it doesn't know which version of a file to keep. 
This happens when a file has been modified in the same place by 2 separate sources!
.

## How to resolve
3 options are avaliable:
1. `git checkout --theirs <filename>`: prefere and keep the remote version. It will overwrite the local version and discard your modification
2. `git checkout --ours <filename>`: prefere and keep the local version. It will ignore the remote version
3. Manually: Modify the conflicting file and make a 3rd version which will then be kept. 

###Manually
First, understand what you see:
+ Zone of the conflict is inside <<<<<<< ... >>>>>>>.
+ <<<<<<< HEAD: local modificiation
+ ====== : end of local modification. what will come nexy is the remote modification
+ blabla2f75db7blabla : is the unique ID of the commit where the conflicting text originated

## What's next?
No matter what you choose, you will need to continue with `git add <filename>`, `git commit` and  `git rebase --continue` or `git push` or something else depending on what you try to achieve.

-----------------------------
# I lost a commit, I commited to a detached head

if you commit to detach head, than you move to another branch, you loose your latest work since it was commited to nothing. Don't worry, it's not lost - the commit is still there
The old commit is still in the reflog. It can be done in 2 ways:
## First
1. find the lost commit
`git reflog` This will show a list of commits, and the "lost" commit should be in there. 
`git fsck --lost-found` this will also do the same

2. create a new branch and attribute it to it or attribute it to an existing branch
`git branch $new-branch $commitNo`
Note that "lost" commits will get deleted when the database is pruned.

## Second: Not always work
take over the detached HEAD commits into your current branch directly, without creating and merging a new branch. After finding your commit, 
` git cherry-pick $commitNo`

## Reabse conflict
`git rebase --continue`: run this command
