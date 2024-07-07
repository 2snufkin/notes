

## 1. List all files modified in the last commit
Lists all the files modified in the last commit. This alias uses `git diff-tree` to show the names of the modified files without their commit IDs.

### Alias: `listfiles`

#### Command:
```sh
git config --global alias.listfiles '!git diff-tree --no-commit-id --name-only -r HEAD'
```



## 2. Show a concise Git log
Displays a concise and decorated Git log with graph visualization, showing commit hashes, relative dates, commit messages, authors, and branch names.

### Alias: `lg`

#### Command:
```sh
git config --global alias.lg "log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
```


## 3. Show branches with their latest commit messages
Displays a compact log of all branches with commit hashes, commit messages, and a graphical representation of the commit history.

### Alias: `branchlog`

#### Command:
```sh
git config --global alias.branchlog "log --oneline --decorate --all --graph"
```


## 4. Show staged changes before committing
Shows the diff of all changes staged for commit. Useful for reviewing changes before finalizing a commit.


### Alias: `diffstaged`

#### Command:
```sh
git config --global alias.diffstaged "diff --cached"
```


## 5. Quickly discard all changes in the working directory
Discards all changes in the current working directory, reverting it to the state of the last commit.

### Alias: `discard`

#### Command:
```sh
git config --global alias.discard "checkout -- ."
```
