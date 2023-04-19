# Introduction
Logback is intended as a successor to the popular log4j project. It was designed by Ceki Gülcü, log4j's founder.  The resulting product is faster and has a smaller footprint than all existing logging systems, sometimes by a wide margin. Just as importantly, logback offers unique and rather useful features missing in other logging systems. 
Logback allows:
+ The ability to selectively enable or disable logging requests based on their logger (via logging levels).
+ logging requests to print to multiple destinations (via appenders).

## Configuration
Here is a list of the three required steps in order to enable logging in your application.

1. Configure the logback environment. 
2. In every class where you wish to perform logging, retrieve a Logger instance by invoking the org.slf4j.LoggerFactory class' getLogger() method, passing the current class name or the class itself as a parameter.
3. Use this logger instance by invoking its printing methods, namely the debug(), info(), warn() and error() methods. This will produce logging output on the configured appenders.



### Example
```
package chapters.introduction;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {

  public static void main(String[] args) {

    Logger logger = LoggerFactory.getLogger("chapters.introduction.HelloWorld1");
    logger.debug("Hello world.");

  }
}

```
Note that the above example does not reference any logback classes.Your classes will use the SLF4J API and will be oblivious to the existence of logback. 

## Naming Loggers
naming loggers after the class where they are located seems to be the best general strategy known so far. As the log output bears the name of the generating logger, this naming strategy makes it easy to identify the origin of a log message. 

## Logging levels
Loggers may be assigned levels. The set of possible levels (TRACE, DEBUG, INFO, WARN and ERROR) are defined in the `ch.qos.logback.classic.Level` class. Note that in logback, the Level class is final and cannot be subclassed, as a much more flexible approach exists in the form of Marker objects.
If a given logger is not assigned a level, then it inherits one from its closest ancestor with an assigned level. 
The root logger always has an assigned level. By default, this level is DEBUG. 


## Enabled vs disabled
A logging request is said to be enabled if its level is higher than or equal to the effective level of its logger. Otherwise, the request is said to be disabled.
A log request of level r issued to a logger having an effective level d (config), is enabled if r >= c. 
`TRACE < DEBUG < INFO <  WARN < ERROR`\
if the effective level (logger level defenition) is INFO and you have a logging request of DEBUG
```
c = INFO
r = DEBUG
DEBUG >= INFO? false. so the log message won't be displayed/enabled

```

| TRACE | DEBUG | INFO | WARN | ERROR | OFF |
| TRACE | YES | NO | NO | NO | NO | NO |
| DEBUG | YES | YES | NO | NO | NO | NO |
| INFO | YES | YES | YES | NO | NO | NO |
| WARN | YES | YES | YES | YES | NO | NO |
| ERROR | YES | YES | YES | YES | YES | NO |




## Prinitng status
this will log the logback version and wheather it found the logback-test.xml / logback.xml files. If it didn't find it will set up default configuration. Note that in case of errors, logback will automatically print its internal state on the console.
```
    LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
    StatusPrinter.print(lc);
```
# Architecture
logback is divided into three modules, logback-core, logback-classic and logback-access.

+ The core module lays the groundwork for the other two modules. A general-purpose module, has no notion of loggers. 
+ The classic module extends core. The classic module corresponds to a significantly improved version of log4j. Logback-classic natively implements the SLF4J API so that you can readily switch back and forth between logback and other logging systems such as log4j or java.util.logging (JUL) introduced in JDK 1.4. The third module called access integrates with Servlet containers to provide HTTP-access log functionality. 
+ access module integrates with Servlet containers, such as Tomcat and Jetty, to provide HTTP-access log functionality. Note that you could easily build your own module on top of logback-core.

## Classes
Logback is built upon three main classes: 
+ Logger: part of the logback-classic module
+ Appender: part of logback-core
+ Layout: part of logback-core 

The Logger class is part of the logback-classic module. On the other hand, the Appender and Layout interfaces are part of logback-core. As  

## Appender
 Logback allows logging requests to print to multiple destinations. An output destination is called an appender. Currently, appenders exist for the console, files, remote socket servers, to MySQL, PostgreSQL, Oracle and other databases, JMS, and remote UNIX Syslog daemons. More than one appender can be attached to a logger.

The addAppender method adds an appender to a given logger. Each enabled logging request for a given logger will be forwarded to all the appenders in that logger as well as the appenders higher in the hierarchy.
### doAppend()
All appenders shipped with the logback distribution extend the AppenderBase abstract class that implements the doAppend method in a synchronized block ensuring thread-safety. The doAppend() method of AppenderBase also invokes custom filters attached to the appender, if any such filters exist. Custom filters, which can be dynamically attached to any appender, are presented in a separate chapter.
## Layout
The output format. This is accomplished by associating a layout with an appender. The layout is responsible for formatting the logging request according to the user's wishes, whereas an appender takes care of sending the formatted output to its destination. 

The PatternLayout, part of the standard logback distribution, lets the user specify the output format according to conversion patterns similar to the C language printf function. 

example: `%-4relative [%thread] %-5level %logger{32} - %msg%n` will result in `176  [main] DEBUG manual.architecture.HelloWorld2 - Hello world.`

## Best practice
`logger.debug("Entry number: " + i + " is " + String.valueOf(entry[i]));`
involves the cost of onstructing the message parameter, that is converting both integer i and entry[i] to a String, and concatenating intermediate strings. This is regardless of whether the message will be logged or not. 
A better solution will be 
```
Object entry = new SomeObject(); 
logger.debug("The entry is {}.", entry);
```
Only after evaluating whether to log or not, and only if the decision is positive, will the logger implementation format the message and replace the '{}' pair with the string value of entry. In other words, this form does not involve the cost of parameter construction when the log statement is disabled.

# Under the hood
What are the steps that the logback framework takes when the user invokes a logger’s printing method?
Let's analyze the steps logback takes when the user invokes the info() method of a logger named com.wombat. 

1. Get the filter chain decision\
If it exists, the TurboFilter chain is invoked. Turbo filters can set a context-wide threshold, or filter out certain events based on information such as Marker, Level, Logger, message, or the Throwable that are associated with each logging request. If the reply of the filter chain is FilterReply.DENY, then the logging request is dropped. If it is FilterReply.NEUTRAL, then we continue with the next step, i.e. step 2. In case the reply is FilterReply.ACCEPT, we skip the next and directly jump to step 3
2.  Apply the basic selection rule\
logback compares the effective level of the logger with the level of the request. If the logging request is disabled according to this test, then logback will drop the request without further processing. Otherwise, it proceeds to the next step.
3. Create a LoggingEvent object\
logback will create a ch.qos.logback.classic.LoggingEvent object containing all the relevant parameters of the request, such as the logger of the request, the request level, the message itself, the exception that might have been passed along with the request, the current time, the current thread, various data about the class that issued the logging request and the MDC. Note that some of these fields are initialized lazily, that is only when they are actually needed. The MDC is used to decorate the logging request with additional contextual information. 
4. Invoking appenders\
After the creation of a LoggingEvent object, logback will invoke the doAppend() methods of all the applicable appenders, that is, the appenders inherited from the logger context.
5. Formatting the output\
It is responsibility of the invoked appender to format the logging event. However, some (but not all) appenders delegate the task of formatting the logging event to a layout. A layout formats the LoggingEvent instance and returns the result as a String. Note that some appenders, such as the SocketAppender, do not transform the logging event into a string but serialize it instead. Consequently, they do not have nor require a layout.
6. Sending out the LoggingEvent
After the logging event is fully formatted it is sent to its destination by each appender.


# Configuration
Logback can be configured either programmatically or with a configuration script expressed in XML or Groovy format. Existing log4j users can convert their log4j.properties files to logback.xml using our PropertiesTranslator web-application. 

## initialization steps

1. Logback will search for any custom Configurator providers using service-provider loading.

A custom Configurator is an implementation of ch.qos.logback.classic.spi.Configurator interface. Custom configurators are searched by looking up file resources located under `META-INF/services/ch.qos.logback.classic.spi.Configurator`. The contents of this file should specify the fully qualified class name of the desired Configurator implementation.

2. If no custom Configurator was found in the previous step, then DefaultJoranConfigurator will be instantiated and invoked.
• If the system property "logback.configurationFile" is set, then DefaultJoranConfigurator will try to locate the file specified the aforementioned system property.
• If the previous step fails, DefaultJoranConfigurator will try to locate the configuration file logback-test.xml in the classpath.
• If no such file is found, it will try to locate the configuration file logback.xml in the classpath. Note that this is the nominal configuration step.
• If neither file can be located, DefaultJoranConfigurator will return without further processing.

If none of the above succeeds, logback-classic will configure itself automatically using the BasicConfigurator which will cause logging output to be directed to the console

## For Development 
If you are using a build tool according to Maven's folder structure, then if you place the logback-test.xml under the src/test/resources folder, Maven will ensure that it won't be included in the artifact produced. Thus, you can use a different configuration file, namely logback-test.xml during testing, and another file, namely, logback.xml, in production. 

## logback.xml


```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration>

<configuration>
    <import class="ch.qos.logback.classic.encoder.PatternLayoutEncoder"/>
    <import class="ch.qos.logback.core.ConsoleAppender"/>
      <import class="ch.qos.logback.core.status.OnConsoleStatusListener"/>

<!--    adding StatusListener to print logback's status - optional-->
  <statusListener class="OnConsoleStatusListener"/>
    
    
<!--     appender for the console-->
    
    <appender name="STDOUT" class="ConsoleAppender">
        <encoder class="PatternLayoutEncoder">
            <pattern>%d{HH:mm} [%thread] %-5level %logger{36} -%kvp- %msg%n</pattern>
        </encoder>
    </appender>

<!--    define the desired logging level and attch appenders-->
    <root level="warn">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>

```
# Defentitions:

**appender**:  a class that can be seen as an output destination. Appenders exist for many different destinations including the console, files, Syslog, TCP Sockets, JMS and many more.
**Logger context**:  Every single logger is attached to a LoggerContext which is responsible for manufacturing loggers as well as arranging them in a tree like hierarchy. 
**root logger**: resides at the top of the logger hierarchy. get be retrive by its name `Logger rootLogger = LoggerFactory.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);`

# TroubouleShoot
+ with java 8 you can not go further than logback-classic 1.3.6
+ when trying to use logback-classic 1.3.6 in some projects is was o.k, in others there was a problem with the slf4j API, it didn't recognise logback. if this happen use 1.2.3
+ for logback.xml to be recognised it need to be inside a recognised resources folder. When working with Maven put it inside the resources folder that belongs to the package that generate the WAR 
+ using older versions (for example 1.2.3) has a great imapct on the syntax of the logback.xml file


```
// for older versions of logback
<configuration>

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <!-- encoders are assigned the type
         ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
    <encoder>
      <pattern>%-4relative [%thread] %-5level %logger{35} -%kvp- %msg %n</pattern>
    </encoder>
  </appender>

  <root level="DEBUG">
    <appender-ref ref="STDOUT" />
  </root>
  </configuration>

```

```
// for older versions of logback - this will not work

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration>

<configuration>
  <import class="ch.qos.logback.classic.encoder.PatternLayoutEncoder"/>
  <import class="ch.qos.logback.core.ConsoleAppender"/>

  <appender name="STDOUT" class="ConsoleAppender">
    <encoder class="PatternLayoutEncoder">
      <pattern>%-4relative [%thread] %-5level %logger{35} -%kvp- %msg %n</pattern>
    </encoder>
  </appender>

  <root level="DEBUG">
    <appender-ref ref="STDOUT"/>
  </root>
</configuration>

```