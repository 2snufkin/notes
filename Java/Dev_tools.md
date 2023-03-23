# Developer tools
Spring Boot includes an additional set of tools that can make the application development experience a little more pleasant. The spring-boot-devtools module can be included in any project to provide additional development-time features. To include devtools support, simply add the module dependency to your build:

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
            <scope>runtime</scope>  // from chat gpt

    </dependency>
</dependencies>

```
Note that we have set the scope to runtime, which means that the dependency will only be included when you run your application, and not when you build it.
## IntelliJ Config
1. open the "Settings" dialog (either by selecting "File" > "Settings" or by pressing "Ctrl + Alt + S" on Windows or "Cmd + , " on Mac).
2. "Build, Execution, Deployment" section, select "Compiler".
3. select "Build process VM options".
4. In the "VM options" field, add the following line:\
`-Dspring.devtools.restart.enabled=true`\
  
This tells IntelliJ IDEA to enable Spring DevTools automatic restarts.

When you run your application from within IntelliJ IDEA, Spring DevTools will only watch for changes in the specified packages. If you make a change to a file in one of these packages, Spring DevTools will automatically restart your application.

## Attention
Developer tools are automatically disabled when running a fully packaged application. If your application is launched using java -jar or if it’s started using a special classloader, then it is considered a “production application”. Flagging the dependency as optional in Maven or using compileOnly in Gradle is a best practice that prevents devtools from being transitively applied to other modules using your project.


repackaged archives do not contain devtools by default. If you want to use certain remote devtools feature, you’ll need to disable the excludeDevtools build property to include it. The property is supported with both the Maven and Gradle plugins.
20.1 Property defaults
## Caching 
Several of the libraries supported by Spring Boot use caches to improve performance. For example, template engines will cache compiled templates to avoid repeatedly parsing template files. Also, Spring MVC can add HTTP caching headers to responses when serving static resources.

Whilst caching is very beneficial in production, it can be counter productive during development, preventing you from seeing the changes you just made in your application. For this reason, spring-boot-devtools will disable those caching options by default.

Cache options are usually configured by settings in your application.properties file. For example, Thymeleaf offers the spring.thymeleaf.cache property. Rather than needing to set these properties manually, the spring-boot-devtools module will automatically apply sensible development-time configuration.


For a complete list of the properties that are applied see DevToolsPropertyDefaultsPostProcessor.
# Automatic restart
Applications that use spring-boot-devtools will automatically restart whenever files on the classpath change. This can be a useful feature when working in an IDE as it gives a very fast feedback loop for code changes. By default, any entry on the classpath that points to a folder will be monitored for changes. Note that certain resources such as static assets and view templates do not need to restart the application.

## Triggering a restart
As DevTools monitors classpath resources, the only way to trigger a restart is to update the classpath. The way in which you cause the classpath to be updated depends on the IDE that you are using. 
+ In Eclipse, saving a modified file will cause the classpath to be updated and trigger a restart. 
+ In IntelliJ IDEA, building the project (Build -> Build Project) will have the same effect.

You can also start your application via the supported build plugins (i.e. Maven and Gradle) as long as forking is enabled since DevTools need an isolated application classloader to operate properly. Gradle and Maven do that by default when they detect DevTools on the classpath.

Automatic restart works very well when used with LiveReload. See below for details. If you use JRebel automatic restarts will be disabled in favor of dynamic class reloading. Other devtools features (such as LiveReload and property overrides) can still be used.

DevTools relies on the application context’s shutdown hook to close it during a restart. It will not work correctly if you have disabled the shutdown hook ( SpringApplication.setRegisterShutdownHook(false)).

When deciding if an entry on the classpath should trigger a restart when it changes, DevTools automatically ignores projects named spring-boot, spring-boot-devtools, spring-boot-autoconfigure, spring-boot-actuator, and spring-boot-starter.
[Note]

DevTools needs to customize the ResourceLoader used by the ApplicationContext: if your application provides one already, it is going to be wrapped. Direct override of the getResource method on the ApplicationContext is not supported.

## LiveReload

The spring-boot-devtools module includes an embedded LiveReload server that can be used to trigger a browser refresh when a resource is changed. LiveReload browser extensions are freely available for Chrome, Firefox and Safari from livereload.com.

If you don’t want to start the LiveReload server when your application runs you can set the spring.devtools.livereload.enabled property to false.

You can only run one LiveReload server at a time. Before starting your application, ensure that no other LiveReload servers are running. If you start multiple applications from your IDE, only the first will have LiveReload support.

## Restart vs Reload
The restart technology provided by Spring Boot works by using two classloaders. Classes that don’t change (for example, those from third-party jars) are loaded into a base classloader. Classes that you’re actively developing are loaded into a restart classloader. When the application is restarted, the restart classloader is thrown away and a new one is created. This approach means that application restarts are typically much faster than “cold starts” since the base classloader is already available and populated.

If you find that restarts aren’t quick enough for your applications, or you encounter classloading issues, you could consider reloading technologies such as JRebel from ZeroTurnaround. These work by rewriting classes as they are loaded to make them more amenable to reloading. Spring Loaded provides another option, however it doesn’t support as many frameworks and it isn’t commercially supported.



## Including only certains packadges
 you can configure Spring DevTools to only watch for changes in specific packages of your project.
To do this, you need to add a to the configuration file named .spring-devtools.properties to your project's classpath. In this file, you can specify the packages that you want to be watched for changes.

1. Create a file named spring-devtools.properties in your project's src/main/resources directory.
2. Add the following lines to the file:

```
restart.include.core=/core/**
restart.include.model=/model/**
restart.include.web=/web/**
```
In this example, we have specified that Spring DevTools should only watch for changes in the core, model, and web packages.

## Excluding resources
Certain resources don’t necessarily need to trigger a restart when they are changed. For example, Thymeleaf templates can just be edited in-place. By default changing resources in /META-INF/maven, /META-INF/resources, /resources, /static, /public or /templates will not trigger a restart but will trigger a live reload. If you want to customize these exclusions you can use the spring.devtools.restart.exclude property. 
For example, to exclude only /static and /public you would set the following:

`spring.devtools.restart.exclude=static/**,public/**`

if you want to keep those defaults and add additional exclusions, use the `spring.devtools.restart.additional-exclude`

## Watching additional paths
You may want your application to be restarted or reloaded when you make changes to files that are not on the classpath. 
To do so, use the
`spring.devtools.restart.additional-paths`
property to configure additional paths to watch for changes. You can use the spring.devtools.restart.exclude property described above to control whether changes beneath the additional paths will trigger a full restart or just a live reload.
## Disabling restart

If you don’t want to use the restart feature you can disable it using the `spring.devtools.restart.enabled` property.
In most cases you can set this in your application.properties (this will still initialize the restart classloader but it won’t watch for file changes).

If you need to completely disable restart support, for example, because it doesn’t work with a specific library, you need to set a System property before calling SpringApplication.run(…​). For example:

public static void main(String[] args) {
    System.setProperty("spring.devtools.restart.enabled", "false");
    SpringApplication.run(MyApp.class, args);
}

## Using a trigger file

If you work with an IDE that continuously compiles changed files, you might prefer to trigger restarts only at specific times. To do this you can use a “trigger file”, which is a special file that must be modified when you want to actually trigger a restart check. Changing the file only triggers the check and the restart will only occur if Devtools has detected it has to do something. The trigger file could be updated manually, or via an IDE plugin.

To use a trigger file use the spring.devtools.restart.trigger-file property.
[Tip]

You might want to set spring.devtools.restart.trigger-file as a global setting so that all your projects behave in the same way.
20.2.5 Customizing the restart classloader

As described in the Restart vs Reload section above, restart functionality is implemented by using two classloaders. For most applications this approach works well, however, sometimes it can cause classloading issues.

By default, any open project in your IDE will be loaded using the “restart” classloader, and any regular .jar file will be loaded using the “base” classloader. If you work on a multi-module project, and not each module is imported into your IDE, you may need to customize things. To do this you can create a META-INF/spring-devtools.properties file.

The spring-devtools.properties file can contain restart.exclude. and restart.include. prefixed properties. The include elements are items that should be pulled up into the “restart” classloader, and the exclude elements are items that should be pushed down into the “base” classloader. The value of the property is a regex pattern that will be applied to the classpath.

For example:

restart.exclude.companycommonlibs=/mycorp-common-[\\w-]+\.jar
restart.include.projectcommon=/mycorp-myproj-[\\w-]+\.jar

[Note]

All property keys must be unique. As long as a property starts with restart.include. or restart.exclude. it will be considered.
[Tip]

All META-INF/spring-devtools.properties from the classpath will be loaded. You can package files inside your project, or in the libraries that the project consumes.
# Known limitations

Restart functionality does not work well with objects that are deserialized using a standard ObjectInputStream. If you need to deserialize data, you may need to use Spring’s ConfigurableObjectInputStream in combination with Thread.currentThread().getContextClassLoader().

Unfortunately, several third-party libraries deserialize without considering the context classloader. If you find such a problem, you will need to request a fix with the original authors.

# Global settings

You can configure global devtools settings by adding a file named .spring-boot-devtools.properties to your $HOME folder (note that the filename starts with “.”). Any properties added to this file will apply to all Spring Boot applications on your machine that use devtools. For example, to configure restart to always use a trigger file, you would add the following:

~/.spring-boot-devtools.properties. 

spring.devtools.reload.trigger-file=.reloadtrigger
# Remote applications

The Spring Boot developer tools are not just limited to local development. You can also use several features when running applications remotely. Remote support is opt-in, to enable it you need to make sure that devtools is included in the repackaged archive:
```
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludeDevtools>false</excludeDevtools>
            </configuration>
        </plugin>
    </plugins>
</build>

```
Then you need to set a spring.devtools.remote.secret property, for example:
spring.devtools.remote.secret=mysecret

## Warning
Enabling spring-boot-devtools on a remote application is a security risk. You should never enable support on a production deployment.

Remote devtools support is provided in two parts; 
+ there is a server side endpoint that accepts connections
+ client application that you run in your IDE. 
The server component is automatically enabled when the spring.devtools.remote.secret property is set. The client component must be launched manually.
## Running the remote client application

The remote client application is designed to be run from within your IDE. You need to run org.springframework.boot.devtools.RemoteSpringApplication using the same classpath as the remote project that you’re connecting to. The non-option argument passed to the application should be the remote URL that you are connecting to.

For example, if you are using Eclipse or STS, and you have a project named my-app that you’ve deployed to Cloud Foundry, you would do the following:

    Select Run Configurations…​ from the Run menu.
    Create a new Java Application “launch configuration”.
    Browse for the my-app project.
    Use org.springframework.boot.devtools.RemoteSpringApplication as the main class.
    Add https://myapp.cfapps.io to the Program arguments (or whatever your remote URL is).

A running remote client will look like this:


Because the remote client is using the same classpath as the real application it can directly read application properties. This is how the spring.devtools.remote.secret property is read and passed to the server for authentication.

It’s always advisable to use https:// as the connection protocol so that traffic is encrypted and passwords cannot be intercepted.
If you need to use a proxy to access the remote application, configure the spring.devtools.remote.proxy.host and spring.devtools.remote.proxy.port properties.
## Remote update

The remote client will monitor your application classpath for changes in the same way as the local restart. Any updated resource will be pushed to the remote application and (if required) trigger a restart. This can be quite helpful if you are iterating on a feature that uses a cloud service that you don’t have locally. Generally remote updates and restarts are much quicker than a full rebuild and deploy cycle.


Files are only monitored when the remote client is running. If you change a file before starting the remote client, it won’t be pushed to the remote server.
## Remote debug tunnel
Java remote debugging is useful when diagnosing issues on a remote application. Unfortunately, it’s not always possible to enable remote debugging when your application is deployed outside of your data center. Remote debugging can also be tricky to setup if you are using a container based technology such as Docker.

To help work around these limitations, devtools supports tunneling of remote debug traffic over HTTP. The remote client provides a local server on port 8000 that you can attach a remote debugger to. Once a connection is established, debug traffic is sent over HTTP to the remote application. You can use the spring.devtools.remote.debug.local-port property if you want to use a different port.

You’ll need to ensure that your remote application is started with remote debugging enabled. Often this can be achieved by configuring JAVA_OPTS. For example, with Cloud Foundry you can add the following to your manifest.yml:

---
    env:
        JAVA_OPTS: "-Xdebug -Xrunjdwp:server=y,transport=dt_socket,suspend=n"

[Tip]

Notice that you don’t need to pass an address=NNNN option to -Xrunjdwp. If omitted Java will simply pick a random free port.
[Note]

Debugging a remote service over the Internet can be slow and you might need to increase timeouts in your IDE. For example, in Eclipse you can select Java → Debug from Preferences…​ and change the Debugger timeout (ms) to a more suitable value (60000 works well in most situations).
[Warning]

When using the remote debug tunnel with IntelliJ IDEA, all breakpoints must be configured to suspend the thread rather than the VM. By default, breakpoints in IntelliJ IDEA suspend the entire VM rather than only suspending the thread that hit the breakpoint. This has the unwanted side-effect of suspending the thread that manages the remote debug tunnel, causing your debugging session to freeze. When using the remote debug tunnel with IntelliJ IDEA, all breakpoints should be configured to suspend the thread rather than the VM. Please see IDEA-165769 for further details.
Prev 	Up	 Next
19. Running your application 	Home	 21. Packaging your application for production


-------------------------------

