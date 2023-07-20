@echo off
:: Retrieve the PC hostname
set "pc_name=%computername%"
git pull
git add .

:: Create the commit message with date, time, and PC hostname
set "commit_message=Changes made on %date% at %time% from PC %pc_name%"
git commit -m "%commit_message%"

git push origin



