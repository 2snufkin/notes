Spring DevTools, JRebel, and DCEVM are all tools that support hot reloading of code changes in Java applications. 
However, the types of changes that can be hot reloaded may differ between these tools. Here is a brief comparison:

## Spring DevTools:

    Supports hot reloading of changes to Java classes, resources, and Spring configuration files
    Supports adding and modifying methods, fields, and annotations, as well as changing method signatures
    May require additional configuration for some types of changes
    Does not support adding or removing classes or interfaces

## JRebel:

    Supports hot reloading of changes to Java classes, resources, and configuration files
    Supports adding, modifying, and removing methods, fields, classes, and interfaces, as well as modifying method signatures and adding new annotations
    Supports hot reloading of changes to third-party libraries
    Integrates with popular IDEs and application servers
    Some advanced features such as integration with JMX and OSGi are only available in the commercial version

# DCEVM:
**If you are using tomcat, and you deploy a war file. You are wasting your time. it won't work**
Does not support:
+ Add and remove annotation   
+ Add and remove implemented interface    
+ Replace superclass

## Using DCEVM:

1. install DCEVM
2.   download the Hotswap Agent jar file
3.  add VM arguments to your launcher to activate both DCEVM and Hotswap Agent
4.   optionally create configuration


### 1. Install DCEVM 
#### Java 8
You can turn an existing installation of the JVM into a DCEVM version by patching it. The patcher program itself is a Java jar called DCVM-8u181-installer-build2.jar which you can download from here.

1. Download the patcher program, start it 
2. select the directory where your JDK lives in order to patch it. 

The patcher program offers you a choice to either replace the standard JVM with DCEVM or install DCEVM alongside as altjvm. If you select the replace option, you won’t need the -XXaltjvm argument in your program launch VM arguments but you also won’t be able to switch hotswapping off. Therefore I recommend the other choice in the patcher program, Install DCEVM as altjvm.

Patching the JDK in this way does not alter the Java VM itself. A special version of the main jvm library is installed (in jre/lib/dcevm/) which is used instead of the vanilla library when starting the JVM with this command line argument:
```
java -XXaltjvm=dcevm -version

```
you will see
```
openjdk version "1.8.0_252"
OpenJDK Runtime Environment (build 1.8.0_252-8u252-b09-1~18.04-b09)
Dynamic Code Evolution 64-Bit Server VM (build 25.71-b01-dcevm-light, mixed mode)

```
      
Important note for Windows: the latest supported version of Java 8 is 1.8.0_u181 . The DCEVM provided on Github will simply not work with later versions. You can find archived versions of the JDK here. Of course, using an ancient version of the JDK introduces a certain security risk. In general this should not be a big problem if you run it only on a development machine which usually sits protected behind a corporate firewall.

####  Java 11
For Java 11, there is no patch program. Instead, you need to install a special version of the JDK that you can download from here.

My advice would be to install it separately from your regular version of JDK 11 and then choose which one to use in your debug session via configuration options in your IDE.
## 2.Download the Hotswap Agent jar file
You can download it from here. The same jar is used for both Java 8 and Java 11. After downloading, you must keep track of where you left it as you will need to supply the full pathname as one of the VM arguments for your program.
## 3.Arguments for the VM
After all the previous steps has been made, you can start using them in your IDE by adding these arguments for the JVM that you use for running and debugging your application:

     -XXaltjvm=dcevm -javaagent=<full path to Hotswap Agent jar file>

When you then run your application in debug mode, you can see various log messages indicating that hotswapping with Hotswap Agent and DCEVM is active:
```
HOTSWAP AGENT: 17:06:31.669 INFO (org.hotswap.agent.HotswapAgent) - Loading Hotswap agent {1.3.0} - unlimited runtime class redefinition.

```
You can now change some code in your IDE, hit <Ctrl><F9> or whatever to rebuild your project and view the log messages reporting the successful reloading of your changed classes.
## 4.Configuration
In most cases, Hotswap Agent needs no additional configuration. It uses the classpath to determine which class files to monitor for changes. You can add a configuration file src/main/resources/hotswap-agent.properties in which you can add extra classpath information for when your project has dependencies on a jar file that may also change during the course of a debug session. You can also add extra directory information for other resources you want Hotswap Agent to monitor.
Additional notes for IntelliJ

You can install a set of plugins that help in the use of DCEVM / Hotswap Agent. These are the DCEVM Integration plugin and the HotSwapAgent plugin. When you install these you will se an entry named HotSwapAgent in the Tools settings. Here you can configure if and when to use hotswapping and manage some other settings.

Also, after installing the helper plugins IntelliJ will offer to download and install supporting files (notably the DCEVM dynamic load library and the agent jar). I found that this does not always work as expected. You can give it a try by all means but if IntelliJ reports errors you have the description in this article to help you along.

If you manually download the Hotswap Agent, you must set the location in the Tools pane for HotSwapAgent.

When you manage DCEVM and Hotswap Agent activation via the plugins, it will not be necesssary to add the extra VM arguments to your program launchers as this is taken care of by the plugins.
Additional notes for Eclipse

There is no special plugin in Eclipse for managing Hotswap Agent. To use it in Eclipse, make sure that your application is launched with the DCEVM enabled version of the JVM and in the case of Java 8 has extra -XXaltjvm=dcevm -javaagent=/opt/hotswap/hotswap-agent-1.3.0.jar argument for the VM (your version and file location of the agent may be different). When running a servlet container such as Tomcat, you should disable the Auto Reload feature because otherwise both the servlet container and Hotswap Agent will try to do things when classes are recompiled or resources are edited. This page explains it in more detail.

### Links
http://hotswapagent.org/index.html

https://github.com/dcevm/dcevm

https://github.com/HotswapProjects/HotswapAgent

http://hotswapagent.org/mydoc_setup_intellij_idea.html

http://hotswapagent.org/mydoc_setup_eclipse.html

https://documentation.bloomreach.com/library/development/develop-with-hotswapagent.html

https://dzone.com/articles/hot-swap-java-bytecode-on-runtime

https://blogs.sap.com/2018/11/01/hotswap-with-hybris-a-free-open-source-alternative-to-jrebel/
## Setting

+ install DCEVM
+ download the Hotswap Agent jar file
+ add VM arguments to your launcher to activate both DCEVM and Hotswap Agent
+ optionally create configuration

## Spring Loaded:

    Supports hot reloading of changes to Java classes and resources
    Supports adding, modifying, and removing methods and fields, as well as modifying method signatures and adding new annotations
    Supports reloading of changes to inner classes and anonymous inner classes
    Integrates with popular IDEs and build tools such as Eclipse and Maven
    May require additional configuration for some types of changes, such as adding or removing classes    

Overall, all three tools provide valuable functionality for hot reloading of code changes in Java applications, but the specific features and limitations may differ depending on the tool and the types of changes you are making.
