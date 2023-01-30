# Git + GitHub
all commands are run in the project's folder aka working directory

## GIT
`git init`:
connect the project to git. create an hidden folder named git when git store every version of every file in the working directory\
`git config --global init.$defaultBranchName`: change the init brunch name from master to whenever I want in all the projects\
`git config alias.$name [what it does(command)]`: add a alias 

### Info
`git status`: show you on which branch you are at. If your are on a commit or not on a branch (HEAD detached), have you commited? untracked files etc..\
`git config --list`: see the list of setting. I can see the authore name and email only if they were configurated before\
`git config --global user.name "Name FamilyName"`: set the authore's name globally\
`git config --global user.email Email`: set the authore's email globally (the email that I use as username at github)\
`cat ~/.gitconfig`: will display you username and email\
`git log`: show list of commits to the current branch\
`--graph`: will show a graph of the commit tree\
`--oneline --graph --decorate --all`: show the entire tree. good to use after git fetch\
`git log --topo-order --all --graph --date=local --pretty=format:'%C(green)%h%C(reset) %><(55,trunc)%s%C(red)%d%C(reset) %C(blue)[%an]%C(reset) %C(yellow)%ad%C(reset)%n'` : nice presentation of the \
quit: If I want o quit the log screen I need to click on q \
`gitk --simplify-by-decoration --all`: open a window with a compact grapcial representation \
`gitk --all` : open a window with more detailed grapcial representation \
`git log --oneline --graph --color --all --decorate`: compact branch represntation in the terminal(only part of the commit name)\
`git log --pretty=oneline --graph --decorate --all`:  branch represntation in the terminal with full commit number


### Staging, Unstaging And Ignoring
`git add`:  Stage a file/files.Copy files from the working dir. to the staging area. \
`git add`: will copy all files\
`git restore --staged $file` or `git reset $filename`: unstage a file
`git update-index --skip-worktree $filename`: ignores uncommitted changes in a file that is already tracked. git will always use the file content and attributes from the staging area. This is useful when we want to add local changes to a file without pushing them to the upstream:

### Commiting && Uncommiting
`git commit`: copy files from the staging area to the git repository and creating the corresponding git objects and commit object\
`-m "$commitDescription"`: commit a staged file or files\
`-a`:  stage and commit. it's git add + git commit\
`--amend`: modify the last commit message\
`git reflog`: show a track of the historical positions of a branch head, and you can use it to find things that the branch head was pointing at previously. \
`git reset`: can be soft or hard\
`--soft`: delete the last commit but not it's files\
`--hard`: delete the last commit and its files

### Checkout
`git checkout`: it's like switch to commend. it allow you to jump between diffrent versions of the project\
`git chackout $hashNoOfcommit `: update the working directory to the moment in time of this commit, can delete files and can add files\
`git switch $branchname`: update the working directory to a specific branch, go to this branch\
`git checkout $branchname`: no longer used. see git switch\
`git checkout -- $filename`: Undeltete a file. After deleting a file from the working directory,it's possible to restore it to the working directory if it wasn't unstaged\
(in this case, running git add . / git add filename after the delete)

### Branchs
`git branch`: list of the branches\
`git switch -c $branchname`: create new branch and witch to it\
`git branch $branchname` : create a new branch\
`git branch -d $branchname`: delete a branch\
`-m $branchname`: change the current branch name, if you want to change another branch name, move to it before\
`-d:` delete the branch\
`git merge $branchname`: I must be on the reciving branch to run it (with checkout). Will merge the branch in the arg to the reciving branch \
`git rebase $branchname`: rebase a branch


## GITHUB:


### SSH KEYS
`ssh-keygen -o`: create a SSH file on your disk, later to be used in github. It will ask you where to save\
`cat <savefolder>/id_rsa.pub`: will show the SSH string

###  Local => Remote:
`git remote add origin $url`: connect to an exisiting repo in gitub\
`git remote -v`: show if I am connected to a remote repo. if connected I should see the fetch and push files\
`git push origin $branchname`: push changes to github (origin), the branchname is the remote branch, the destination branch.\
-u: define this branch as the default upstream branch.
upstream branch or the tracked remote branch = the branch you will interact with by default when using git pull and git push commands.
`git push --set-upstream-to origin/the_branch`: set upstream branch\
`git push origin --delete $remoteBranchName`: delete remote branch

#### Merge
 !Always do git pull before merge!
1.`git merge $branchname`: locally. the branch name you merge to it should be the same branch name in the git push command (master maybe).\
2. `git push origin $branchname`

### Remote => Local:

`git fetch origin $branchname`: download the changes but not applay them to your local working folder. You can examine them\
`git fetch && git diff HEAD @{u} --name-only`: see what files will be modified if you do a git PULL
`git fetch && git diff @{u} --name-only`: see ALL differences between your current version and the incoming version, including uncommited local modifications. 
`git pull origin $branchname`: take the changes that have been made to the remote branch x.  * before running it make sure you are sitting on the branch that you want it to recive the update\
`git clone $url`: will copy from a remote repo to a local repo (your pc)
`git rebase origin/<branchmaster>` : when on a feature beanch, it will update the feature branch with the remote main branch <branchmaster>

 
# Workflow
 update from remote -> create task branch -> work on it -> once a day `git rebase origin/<branchmaster>` to pull the code from remote.
 when ready to push: compile and build your project -> test it -> `git rebase origin/<branchmaster> -> if there are conflicts solve them
 -> add and commit with `git commit -am "message"` -> git rebase --continue -> push to remote with the -f argument.

 
 
#### Getting one file
```
git fetch: git fetch will download all the recent changes, but it will not put it in your current checked out code (working area).
git checkout origin/<branchname> -- path/to/file.\
//will checkout the particular file from the downloaded changes (origin/master).
```

## What if
- #### I lost a commit, I commited to a detached head

if you commit to detach head, than you move to another branch, you loose your latest work since it was commited to nothing. Don't worry, it's not lost - the commit is still there
The old commit is still in the reflog. It can be done in 2 ways:
##### First
1. find the lost commit
`git reflog` This will show a list of commits, and the "lost" commit should be in there. \
`git fsck --lost-found` this will also do the same

2. create a new branch and attribute it to it or attribute it to an existing branch
`git branch $new-branch $commitNo`\
Note that "lost" commits will get deleted when the database is pruned.

##### Second: Not always work
take over the detached HEAD commits into your current branch directly, without creating and merging a new branch. After finding your commit, 
` git cherry-pick $commitNo`

- #### Reabse conflict
`git rebase --continue`: run this command
