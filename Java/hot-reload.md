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

## DCEVM:

    Provides enhanced class redefinition functionality for the JVM
    Supports hot reloading of changes to Java classes and interfaces, but does not support resources or configuration files
    Supports adding, modifying, and removing methods and fields, as well as modifying method signatures and adding new annotations
    Integrates with popular IDEs and application servers
    May require additional configuration for some types of changes
    
## Spring Loaded:

    Supports hot reloading of changes to Java classes and resources
    Supports adding, modifying, and removing methods and fields, as well as modifying method signatures and adding new annotations
    Supports reloading of changes to inner classes and anonymous inner classes
    Integrates with popular IDEs and build tools such as Eclipse and Maven
    May require additional configuration for some types of changes, such as adding or removing classes    

Overall, all three tools provide valuable functionality for hot reloading of code changes in Java applications, but the specific features and limitations may differ depending on the tool and the types of changes you are making.
