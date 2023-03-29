# HOW TO
### Close a process that uses a port
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
in powershell
```
foreach ($file in Get-ChildItem -Path "C:\Tech\code\TK For TK\tumorotek-webapp\src\main\webapp\zuls" -Filter "*.zul" -Recurse | Select-String -Pattern "<calendarbox" | Select-Object -Unique Path) {
    $file.Path
}

```
1. List FileInfo objects for all files containing pattern:
```

    Get-ChildItem -Recurse filespec | Where-Object { Select-String pattern $_ -Quiet }
    ls -r filespec | ? { sls pattern $_ -q }

```
2.     List file names for all files containing pattern:

```
 Get-ChildItem -Recurse filespec | Select-String pattern | Select-Object -Unique Path
    ls -r filespec | sls pattern | select -u Path


```
3.  List FileInfo objects for all files not containing pattern:


```
 Get-ChildItem -Recurse filespec | Where-Object { !(Select-String pattern $_ -Quiet) }
    ls -r filespec | ? { !(sls pattern $_ -q) }

```
4.     List file names for all files not containing pattern:

```
  

    (Get-ChildItem -Recurse filespec | Where-Object { !(Select-String pattern $_ -Quiet) }).FullName
    (ls -r filespec | ? { !(sls pattern $_ -q) }).FullName


```
other options
1. Get-ChildItem -Recurse | Select-String "dummy" -List | Select Path
2. findstr /S /I /M /C:"ENTER THE STRING YOU SEARCH HERE" *.*
3. foreach ($file in Get-ChildItem | Select-String -pattern "dummy" | Select-Object -Unique path) {$file.path}
4. if you search in one directory: `select-string -Path "c:\temp\*.*" -Pattern "result"  -List | select Path`
   

