50 Lectures
# Working with Git
Version control: local, centrelized
local: good if you are working alone
centralized: there is main server repository. You take the shared code from it and you don't have a local version of the code
Distributed: it has the main server repository and a local repository. you can't push directly to the server repository. you must push to the local repository (commit) and then to the server (push)

you must install git to be able to work with it. it will install git bash (the commend line)
you should define your name and email
to start work with git you need to initiate git in the desired folder
Working Directory is your playground. Git track all the files there but it does not add it to the staging area/index area, for it you use `git add`. Those file are avaliabe in staging area but not in the local repository. For them to be added to the local repository you use `git commit`
to know which files are in which stage of the work flow you can use `git status`
+ untracked files: files that are in the working area but not in the staging area
+ tracked files: files in the staging area
+ list all the commits with `git log`
HEAD is another word for local repository
git diff compares the working directory with the most recent commit, while git diff --staged compares the staging area with the most recent commit.
You can compare diff between 2 commits
# Working with gitHub

# Working with others
# Commits
# Branches
# Team
# Reverting Changes
# Project
