## To run a Tomcat server with a specific WAR file on Windows startup
1. create a batch file that will start the server and deploy the WAR file
2. add the batch file to the Windows startup folder. 

Steps:
1. Open Notepad or any other text editor. and write the following:\
```
cd <tomcatLocation> : example: cd C:\Tech\Tomcat\bin
catalina.bat run
```
2. Save the file with a .bat extension. For example, you can name the file startup.bat and save it in the C:\Tech\Tomcat folder.
3. configure Tomcat to deploy the WAR file on startup. To do this, open the C:\...\Tomcat\conf\server.xml file in a text editor.\
Locate the `<Host>` tag and add the following lines inside it:
`<Context path="" docBase="path/to/your/war/file.war" debug="0" reloadable="true" />`\
Make sure to replace path/to/your/war/file.war with the actual path to your WAR file.
4. Save the server.xml file.
5. add the batch file to the Windows startup folder:\
*  press the Windows key + R to open the Run dialog box, type shell:startup and press Enter.
*  This will open the Startup folder. Right-click in the folder and select "New" > "Shortcut".
*   In the "Create Shortcut" dialog box, type the path to the startup.bat file that you created earlier, and click "Next".
*  Type a name for the shortcut (such as "Tomcat Server"), and click "Finish".

Now, every time you start Windows, the batch file will run, starting the Tomcat server and deploying the WAR file specified in the server.xml file.
