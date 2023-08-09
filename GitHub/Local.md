
`git init`:
connect the project to git. create an hidden folder named git when git store every version of every file in the working directory\
`git config --global init.$default-Branch-Name`: change the init brunch name from master to whenever I want in all the projects\

## Configurations
you can configurate your name, email, alias etc...
`cat .git/config`: print the config file
`git config --list`: see the list of setting. I can see the author name and email only if they were configured before\
`git config --global user.name "Name Family-name"`: set the author's name globally\
`git config --global user.email Email`: set the author's email globally (the email that I use as username at GitHub)\
`cat ~/.gitconfig`: will display you username and email\

### Alias
#### Create
`git config --local alias.<alias-name> "<alias-command-without-git>"`: This will set the alias configuration only for the current Git repository, without affecting any other repositories or the global Git configuration on your system. alias-command is without the ketword git.\
`--global`: replacing --local with --global will set the alias globally.
#### Get
`git config --get-regexp alias`:  list all of your configured aliases
#### Delete
`git config --local --unset alias.<alias-name>`: deleting a local Git alias. If you want to delete a global alias replace --local with --global

### Info
`git status`: show you on which branch you are at. If your are on a commit or not on a branch (HEAD detached), have you committed? untracked files etc..\
`git log`: show list of commits to the current branch\
`git log --graph`: will show a graph of the commit tree\
`git log --oneline --graph --decorate --all`: show the entire tree. good to use after git fetch\
`git log --topo-order --all --graph --date=local --pretty=format:'%C(green)%h%C(reset) %><(55,trunc)%s%C(red)%d%C(reset) %C(blue)[%an]%C(reset) %C(yellow)%ad%C(reset)%n'` : nice presentation of the \
quit: If I want o quit the log screen I need to click on q \
`gitk --simplify-by-decoration --all`: open a window with a compact grapcial representation \
`gitk --all` : open a window with more detailed grapcial representation \
`git log --oneline --graph --color --all --decorate`: compact branch represntation in the terminal(only part of the commit name)\
`git log --pretty=oneline --graph --decorate --all`:  branch represntation in the terminal with full commit number

## Diff
` git diff --name-only $branch`: list all files that are different between the specified branch and the current branch. pecifically, it will show the names of files that have been modified, added, or deleted in the specified branch since it diverged from the current branch.  It does not take into account any changes that have been staged (i.e., added to the index) but not yet committed.\
`git diff --name-only HEAD`: This will show the names of all files that have been modified between the current commit (i.e., HEAD) and the working directory, including any changes that have been staged (but not yet committed).\
`git diff --name-only`: list the names of files that have been modified in the working directory (i.e., unstaged changes), you can use the following command:
` | wc -l`: adding this will count the number of files.\
`git diff origin/branch_x path/to/file`: compare a file to it's remote version on branch_x.\

## Staging, Unstaging And Ignoring
`git add`:  Stage a file/files.Copy files from the working dir. to the staging area. \
`git add`: will copy all files\
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

## Commiting && Uncommiting
`git commit`: copy files from the staging area to the git repository and creating the corresponding git objects and commit object\
`-m "$commitDescription"`: commit a staged file or files\
`-a`:  stage and commit. it's git add + git commit\
`--amend`: modify the last commit message\
`git reflog`: show a track of the historical positions of a branch head, and you can use it to find things that the branch head was pointing at previously. \
`git reset`: can be soft or hard\
`--soft`: delete the last commit but not it's files\
`--hard`: delete the last commit and its files

### Saving comitted files to the Disk
`git archive --format=zip --output=commit-files.zip commit-hash`: creates a zip file named commit-files.zip in your current directory, containing the committed files for the specified commit. The --format=zip option tells git archive to create a zip archive, and the --output=commit-files.zip option specifies the name of the output file.

Note that this command creates an archive of all the files in the commit, not just the files that were changed in the commit


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

