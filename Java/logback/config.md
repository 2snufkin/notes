# logback.xml

All of the config will be nested in the `<configuration>` tag

```
<?xml version="1.0" encoding="UTF-8"?>

<!-- For assistance related to logback-translator or configuration  -->
<!-- files in general, please contact the logback user mailing list -->
<!-- at http://www.qos.ch/mailman/listinfo/logback-user             -->
<!--                                                                -->
<!-- For professional support please see                            -->
<!--    http://www.qos.ch/shop/products/professionalSupport         -->
<!--                                                                -->
<configuration>
```
## Rolling file
```xml
  <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>path_to_file.log</file>
    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
      <fileNamePattern>path_to_file-%d{yyyy-MM-dd}.%i.log.zip</fileNamePattern>
      <maxFileSize>50MB</maxFileSize>
      <maxHistory>30</maxHistory>
      <totalSizeCap>1GB</totalSizeCap>
    </rollingPolicy>
    <encoder>
      <pattern>%date [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>

```
<file>:specifies the initial log file path.
<fileNamePattern>: defines the file name pattern for rolled files. The %d{yyyy-MM-dd} pattern indicates that the rolled files will be suffixed with the current date in the format yyyy-MM-dd. The %i placeholder ensures that each rolled file gets a unique number.
<maxFileSize>: specifies the maximum size for each log file. When this limit is reached, the current file will be rolled.
<maxHistory>: determines the maximum number of rolled files to keep.
<totalSizeCap> : specifies the maximum total size of all log files combined. When this limit is reached, the oldest log files will be deleted.

## Console
```xml
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - [%X{username}] %msg%n</pattern>
        </encoder>
    </appender>

```

## Package Config
1. Define a logger and its level
2. Attatch it to an existing appender. The name should match the nalle of your appender
```xml

    <logger name="fr.aphp.tumorotek.manager" additivity="false" level="DEBUG">
        <appender-ref ref="FILE"/>
    </logger>

```
## Root
define the level of each of your appender
```
    <root level="trace">
        <appender-ref ref="FILE"/>
        <appender-ref ref="console" />
    </root>
```

</configuration>
