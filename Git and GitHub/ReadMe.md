# Git Hub
## What's Inside:

- CheatSheet: as downloaded from the   [ATLASIAN](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet) website
- Git Commands: a list of git commands 
- Git philosophy: as fetched from Stackoverflow
- Git: a pdf file containing all the notes* I've taken
- Master And Main To Edit: found in Stackoverflow. A lot info. Need to be edited

from the following courses: 
* Git Essentials: Become a Git and GitHub Ninja: By [Kalob taulien](https://kalob.io/)
* Git and GitHub Crash Course: By [Bogdan Stashchu](https://stashchuk.com/)


```sh
TODO: finish last lectures in the Git Essentials: Become a Git and GitHub Ninja Course
```
# Git Workflow - New Task
## working workflow
1. update from remote
2. create task branch -> work on it
3. once a day git rebase origin/<branchmaster> to pull the code from remote. 
## Finishing task
1. git rebase origin/<branchmaster>\
[if there are conflicts solve them -> add and commit with `git commit -am "message"` -> `git rebase --continue`]
2. compile and build your project 
3. push to remote. If there were conflicts use the -f argument.
