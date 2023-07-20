@echo off
git pull
git add .
set "commit_message=Changes made on %date% at %time% from PC: %computername%"
git commit -m "%commit_message%"
git push origin




