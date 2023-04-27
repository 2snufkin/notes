# Maven Wrapper
The Maven Wrapper (also known as "mvn wrapper" or just "wrapper") is a small script and a set of files that allow you to run Maven builds without requiring a pre-installed version of Maven on your system. It is essentially a self-contained Maven binary that can be used to build and package your project without the need for a separate Maven installation.

The Maven Wrapper works by downloading the necessary Maven version specified in the project's wrapper configuration file, which is typically called mvnw or mvnw.cmd (depending on your operating system), along with a small Maven launcher script. The downloaded files are stored in the .mvn/wrapper/ directory of your project and used to execute Maven commands.

Using the Maven Wrapper provides several benefits. First, it ensures that everyone working on the project is using the same version of Maven, which can help prevent issues caused by differences in Maven versions. Second, it eliminates the need for developers to install and manage their own Maven installations, which can be especially helpful for new team members or when setting up a new development environment. Finally, it simplifies the process of building and running your project, since you can execute Maven commands using the wrapper script instead of having to remember the path to your Maven installation.

To use the Maven Wrapper, you simply need to include the wrapper configuration files (mvnw or mvnw.cmd, along with the mvnw.bat and mvn files in the .mvn/wrapper/ directory) in your project's source code repository. Then, you can use the ./mvnw or ./mvnw.cmd command (depending on your operating system) to execute Maven commands, just as you would with a regular Maven installation

## Configurate it in intelliJ
1. Open your project in IntelliJ.
2. Make sure your project contains the wrapper files. If not, create them by running the following command in your project directory:
`mvn -N io.takari:maven:wrapper` : This will create the mvnw or mvnw.cmd file (depending on your operating system), along with the .mvn/wrapper directory that contains the necessary wrapper files.
3.  go to File > Settings (on Windows) or IntelliJ IDEA > Preferences (on Mac).
4. In the Settings/Preferences dialog, navigate to Build, Execution, Deployment > Build Tools > Maven.
5. Check the Use Maven Wrapper option.
6. Click the OK button to save the changes.

Now, you can run Maven commands using the wrapper script (mvnw or mvnw.cmd) by selecting Maven from the right-hand side of the IntelliJ window, and then selecting the desired Maven command from the dropdown menu.
