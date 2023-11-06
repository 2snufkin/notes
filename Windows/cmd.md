# HOW TO

## Launch a script with windows startup
Please note that you may need administrative privileges to create a scheduled task, and the task will run in the background when you log in. Make sure to adjust the file paths and settings according to your system configuration.

1. Create a bat file to run

If you want to run a py script: 
+ Save your Python script in a location where it won't be moved or deleted.
+ Create a batch script (.bat) that will run your Python script and save it in the same folder. Open Notepad and paste the following code:
```
@echo off
pythonw.exe "C:\path\to\your\script\main.py"
```
2. Open the Windows Task Scheduler:         Press Win + S, type "Task Scheduler," and press Enter.
3. In the Task Scheduler, click on "Create Basic Task..." in the right-hand panel.
4. Follow the wizard to give your task a name and a description. Click "Next."
4. Choose "When the computer starts" and click "Next."
5. Choose "Start a program" and click "Next."
6. Browse and select the batch (.bat) script you created in step 1.2
7. Review your settings and click "Finish" to create the task.



## Close a process that uses a port
You want to run Angular on 4200 but you forgot to close it. You don't want to work with a random port. How do you close this process?
@mise en place: replace the port 4200 with the port u try to close
1. run as admin:
```cmd
netstat -ano | findstr :4200
```
you will get something like this:   
```properties
 TCP    [::1]:4200             [::]:0                 LISTENING       12920
``` 
2. copy the number after LISTENING and use it in the next command, replacing 12920 with what you got
3. kill the process:
```cmd
 taskkill /PID 12920 /F
```

4. test that it has been done by using the same command in step 1. 
```cmd
netstat -ano | findstr :4200
```
You should get no result

## Find all files that contains a string
### in powershell
whatever inside {xy} is a field you must enter according to your seach needs. Don't put it inside {} however.
```
foreach ($file in Get-ChildItem -Path "{insert_the_search_path}" -Filter "*.{filetype}" -Recurse | Select-String -Pattern "{search_term}" | Select-Object -Unique Path) {
    $file.Path
}
```
### In CMD
`findstr /S /C:"STRING" "C:\path\to\code\*.java"`
+ /S: Searches for matching files in the current directory and all subdirectories.
+ /C:"log.debug": Specifies the search string to look for. In this case, it is log.debug.
+ "C:\path\to\code\*.java": Specifies the path to the directory to search in, followed by the file pattern `*.java` to limit the search to Java files.
`findstr /S /R /C:"log.debug.*\+" "C:\path\to\code\*.java"`
+ /R option enables the use of regular expressions with findstr. The regular expression log.debug.*\+ searches for the string log.debug followed by any characters (.*) and the + sign (\+).
+ | clip: copy to clipboard instead of printing to the console
+ | find /C /V: count the number of lines that are not empty (/V "").
