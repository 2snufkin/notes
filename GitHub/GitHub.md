# Git + GitHub
all commands are run in the project's folder aka working directory

## GIT
`git init`:
connect the project to git. create an hidden folder named git when git store every version of every file in the working directory\
`git config --global init.$default-Branch-Name`: change the init brunch name from master to whenever I want in all the projects\

### Alias
#### Create
`git config --local alias.<alias-name> "<alias-command>"`: This will set the alias configuration only for the current Git repository, without affecting any other repositories or the global Git configuration on your system. alias-command is without the ketword git.\
`--global`: replacing --local with --global will set the alias globally.
#### Get
`git config --get-regexp alias`:  list all of your configured aliases
#### Delete
`git config --local --unset alias.<alias-name>`: deleting a local Git alias. If you want to delete a global alias replace --local with --global

### Info
`cat .git/config`: print the config file
`git status`: show you on which branch you are at. If your are on a commit or not on a branch (HEAD detached), have you committed? untracked files etc..\
`git config --list`: see the list of setting. I can see the author name and email only if they were configured before\
`git config --global user.name "Name Family-name"`: set the author's name globally\
`git config --global user.email Email`: set the author's email globally (the email that I use as username at GitHub)\
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
`git restore --staged $file` or `git reset $filename`: unstage a file\
`git update-index --skip-worktree $filename`: ignores uncommitted changes in a file that is already tracked. git will always use the file content and attributes from the staging area. This is useful when we want to add local changes to a file without pushing them to the upstream

### Excluding a file
if you have made changes to a file that you do not want to push to the main project or share with others, then you can exclude that file from being committed by using the 
1. make sure that the file is not already committed by running the command git status. If the file is not committed, it should show up under the "Changes not staged for commit" section.
2. `git update-index --assume-unchanged <file-path>`: ignore any changes made to the file and not include it in future commits.
`git update-index --no-assume-unchanged <file-path>`: This will tell Git to start tracking changes to the file again.
Note that this approach is only recommended for local changes that you do not want to push to the main project. If you need to exclude files from being committed for everyone, then you should use a .gitignore file instead.


### Commiting && Uncommiting
`git commit`: copy files from the staging area to the git repository and creating the corresponding git objects and commit object\
`-m "$commitDescription"`: commit a staged file or files\
`-a`:  stage and commit. it's git add + git commit\
`--amend`: modify the last commit message\
`git reflog`: show a track of the historical positions of a branch head, and you can use it to find things that the branch head was pointing at previously. \
`git reset`: can be soft or hard\
`--soft`: delete the last commit but not it's files\
`--hard`: delete the last commit and its files

### Stash
stash: available from all the branches. creating stash: adding a stash is like a stack of stash, when I want to pull one, I pull it from the top of the list (the last one added). The stash with the highest number is the oldest stash@{no}. moving without stash is possible if both the main and the branch are at the same level (HEAD).\
`git stash list`: list all stashes
`git diff --staged`: show you all the code changes for all the staged files

#### Create : before leaving the branch
`git stash`: save your changes in a temporary location, allowing you to switch to another branch without committing your changes. Don't stash untracked files\
`-u`: stash also untracked files. shortcut of --include-untracked\
`git stash --keep-index`: stash only the unstage (red) files. index is the staging area. with `git status` you will see only the staged files and all the ustaged files won't be part of the working area

`git stash save "comment"`: it's like git stash bit it allow you to add comment\
`git stash push -m "comment"`: it's like `git save "comment"`\
`git stash --patch`:: let you pass every file which is a candidate for stash and ask you if you want to stash it. with the `Stash this chunk?` question. you can use the question mark to see what every letter of the answer represent\

#### Get : after returning to the branch
`git stash apply`: restore the latest stash but don't remove it from the list of stashes\
`git stash apply stash@{<no>}`: apply specific stash\
`git stash pop`:restore the latest stash (stash@{0}). Pop will apply and remove it from the list of stashes\
If you have more than one stash, you can specify which stash to apply using the following command:\
`git stash apply stash@{<number>}`: <number> is the number of the stash you want to apply, starting from 0 for the most recent stash.\
`git stash branch <branch-name>`: create a branch out of stash\



#### Delete
`git stash drop stash@{<no>}`: remove the specific stash from the stash list\
`git stash clear`: clear the stash list - remove all the items in the list\

#### moving changes
If I made changes to the wrong branch, do the following:
1. Stash
2. Change branch  
3. Pop stash


### Checkout
`git checkout`: it's like switch to commend. it allow you to jump between different versions of the project\
`git checkout $hashNoOfcommit `: update the working directory to the moment in time of this commit, can delete files and can add files\
`git switch $branch-name`: update the working directory to a specific branch, go to this branch\
`git checkout $branch-name`: no longer used. see git switch\
`git checkout -- $filename`: Un delete a file. After deleting a file from the working directory,it's possible to restore it to the working directory if it wasn't upstaged\
(in this case, running git add . / git add filename after the delete)

### Branches and merge
`git branch`: list of the branches\
`git branch --merged origin/<devbranch> -r` : list all the remote branches that have been merged into the remote master branch, where origin is the default name for the remote repository\
`git switch -c $branch-name`: create new branch and witch to it\
`git branch $branch-name` : create a new branch\
`git branch -d $branch-name`: delete a branch\
`-m $branch-name`: change the current branch name, if you want to change another branch name, move to it before\
`-d:` delete the branch\
`git merge $branch-name`: I must be on the receiving branch to run it (with checkout). Will merge the branch in the arg to the receiving branch \
`git rebase $branch-name`: rebase a branch

###Saving comitted files
`git archive --format=zip --output=commit-files.zip commit-hash`: creates a zip file named commit-files.zip in your current directory, containing the committed files for the specified commit. The --format=zip option tells git archive to create a zip archive, and the --output=commit-files.zip option specifies the name of the output file.

Note that this command creates an archive of all the files in the commit, not just the files that were changed in the commit
## GITHUB:


### SSH KEYS
`ssh-keygen -o`: create a SSH file on your disk, later to be used in GitHub. It will ask you where to save\
`cat <save-folder>/id_rsa.pub`: will show the SSH string

###  Local => Remote:
`git remote add origin $URL`: connect to an existing repository in GitHub\
`git remote -v`: show if I am connected to a remote repository. if connected I should see the fetch and push files\
`git push --set-upstream origin master`: To use for the first push. Push the current branch and set the remote as upstream\ 
`git push origin $branch-name`: push changes to GitHub (origin), the branch-name is the remote branch, the destination branch.\
-u: define this branch as the default upstream branch.
upstream branch or the tracked remote branch = the branch you will interact with by default when using git pull and git push commands.
`git push --set-upstream-to origin/the_branch`: set upstream branch\
`git push origin --delete $remoteBranchName`: delete remote branch

#### Merge
 !Always do git pull before merge!
1.`git merge $branch-name`: locally. the branch name you merge to it should be the same branch name in the git push command (master maybe).\
2. `git push origin $branch-name`

### Remote => Local:

`git fetch origin $branch-name`: download the changes but not apply them to your local working folder. You can examine them\
`git fetch && git diff HEAD @{u} --name-only`: see what files will be modified if you do a git PULL
`git fetch && git diff @{u} --name-only`: see ALL differences between your current version and the incoming version, including uncommitted local modifications. 
`git pull origin $branch-name`: take the changes that have been made to the remote branch x.  * before running it make sure you are sitting on the branch that you want it to receive the update\
`git clone $URL`: will copy from a remote ropository to a local repository (your PC)
`git rebase origin/<branch-master>` : when on a feature branch, it will update the feature branch with the remote main branch <branch-master>\
 `git checkout origin/<remote_branch> -- <file_path>`: update a file to it's remote version
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
### Getting a certain commit
 `git archive --format=tar <commit-hash> | tar -x --wildcards '*.txt'`: The first part of the command, git archive --format=tar <commit-hash>, creates a tar archive of the files in the commit. The second part of the command, tar -x --wildcards '*.txt', extracts only the files that match the *.txt pattern from the archive.

In this example, the *.txt pattern matches only files with a .txt extension. You can replace this pattern with any other pattern that matches the files you want to download.

After running this command, you will have a directory with only the changed files from the specified commit. Note that this command does not create a Git repository, so you won't be able to commit changes or push them back to the remote. If you need to work with the files in a Git repository, you should clone the repository and then checkout the commit that you want to work with using the git checkout <commit-hash> command.
  
#### Getting one file
```
git fetch: git fetch will download all the recent changes, but it will not put it in your current checked out code (working area).
git checkout origin/<branch-name> -- path/to/file.\
//will checkout the particular file from the downloaded changes (origin/master).
```

