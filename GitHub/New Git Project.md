# New Project

- Push to GitHub: 
- Register/Login on Github
- Create a new repository
https://github.com/new

Locally: 
- Update .gitignore and add .env


## Initial Setup:
- git init
- git add .
- git commit -m “init”
- git branch -M main
- git remote add origin <repository_link>
- git push -u origin main

## LF will be replaced by CRLF
About ‘LF will be replaced by CRLF’ warning during add, 
Info: https://stackoverflow.com/a/63430105/7846238
Solution: git config --global core.autocrlf false


## Branch for Development
Create a dev branch to save development changes,
- git checkout -b dev
- git add .
- git commit -m “Your commit message”
- git push -u origin dev

## Pushing to Dev
Now, whenever you need to push changes on the dev branch,
- git add .
- git commit -m “Your commit message”
- git push origin dev

## Production Ready
Merge changes from dev to main whenever changes are final for production,
- git push origin dev
- git checkout main
- git pull origin main
- git merge dev
- git push origin main
