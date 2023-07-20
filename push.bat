@echo off
:: Retrieve the PC hostname
set "pc_name=%computername%"

:: Check if the PC hostname is "DESKTOP-F6R5C8I", set pc_name to "Home", otherwise set it to "Outside Home"
if "%computername%"=="DESKTOP-F6R5C8I" (
    set "pc_name=Home"
) else (
    set "pc_name=Outside Home"
)

git pull
git add .

:: Create the commit message with date, time, and PC hostname
set "commit_message=Changes made on %date% at %time% from PC %pc_name%"
git commit -m "%commit_message%"

git push origin
