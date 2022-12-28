
# Overview and Bootstrapping
+ quick introduction to Quarkus and saw what its main advantages and breakthroughs for the Java ecosystem are. 
+ create a Quarkus project 
+ have a working development environment to implement the new features.

## What is Quarkus
Java framework, cloud orientated [free open source](https://github.com/quarkiverse) project that was initially released in March 2019. The main goals of Quarkus are to improve the application’s startup time, its memory footprint, and the developer experience. Quarkus was built from the ground up to be cloud-native from the start. When Quarkus was designed, the team decided to rely on existing tools, frameworks, and standards instead of building something new from scratch. Quarkus combines the traditional imperative coding style with the cloud-native friendly reactive coding style approach. 

### Tech
Quarkus uses the:
- Java Enterprise Edition (EE) Contexts and Dependency Injection (CDI) standard for dependency injection; 
- MicroProfile, a community-driven specification to optimize Java EE for a microservice architecture and for configuration and monitoring;
- Java Persistence API (JPA) annotations to define the object-relational mapping (ORM); 
- Jakarta RESTful Web Services (JAX-RS) annotations to define the REST controllers; and many more technologies in a long, ever-growing list.

The learning curve is very gentle since most of it is based on proven community standards and libraries.\
Quarkus makes it extremely easy to create native executables for your platform. The framework provides almost transparent integration with GraalVM, a high-performance Java Development Kit (JDK) distribution that allows you to compile your Java code into a standalone binary executable.


## Bootstrapping a Quarkus application
There are more than ne way to create Quarkus app
+ [Web Page](https://code.quarkus.io/)
+ [CLI](https://quarkus.io/guides/cli-tooling)
+ Running a Maven goal
+ IntelliJ UI

### WebPage
1. Navigate to the [Web Page](https://code.quarkus.io/)
2. Set the Maven Group: The generated project will include a package named with this value 
3. In the Artifact field, define the Maven artifact ID. 
4. Add the required dependencies. Start with adding RESTEasy Reactive. You can add others later.
5. Click on the Generate your app button and download a ZIP package with the bootstrapped project.
6. Extract the generated ZIP package  to the project’s definitive location.
7. Open the project with your IDE

### CLI
run `quarkus --version` to see if the CLIis installed on you machine. If not, install it
with Chocolatey : ```choco install quarkus```


#### Creating App
`quarkus create app --help`: display options for creating projects
`quarkus --help`: will show you all the avaliable commends
navigate to the folder you want to create the folder in with cd
`quarkus create app $artifactId`: Create a project with groupId=org.acme, artifactId=artifactId, and version=1.0.0-SNAPSHOT
`quarkus create app $groupId:artifactId`: Create a project with groupId=groupId, artifactId=artifactId, and version=1.0.0-SNAPSHOT
`quarkus create app $groupId:artifactId:version`: Create a project with groupId=groupId, artifactId=artifactId, and version=version


## Extensions
Most of Quarkus extensions are build-time oriented. Most analysis and optimizations happen at build time, so none of this processing needs to be performed during the application startup. The result is an application that starts up nearly instantly.
To learn more about some of the extensions go to the Maven and dependencies.md file
### Adding extensions
`quarkus ext ls`: list all extensions
`quarkus ext add $dependency`: The Quarkus CLI will add  one or more extensions to your project
`quarkus ext rm $dependency`: will remove an extension


## Running the application in dev mode
You can run your application in dev mode that enables live coding using:
```
./mvnw compile quarkus:dev

```
NOTE: Quarkus now ships with a [Dev UI]( http://localhost:8080/q/dev/), which is available in dev mode only at http://localhost:8080/q/dev/.

### Debugging 
IntelliJ: it can be done in one of two ways
+ in the app console (with the Quarkus logo) click on detach a debugger 
+ Run -> Attach to process

### Continuous Testing
When Quarkus is run in continuous testing mode, it will detect code changes to both code and tests. For each change it detects, it will re-run the relevant tests for the affected code.
Just as with the development mode, we can run a Maven command to start the continuous testing mode as follows:
```
./mvnw quarkus:test
```



### Packaging the application

The final step to being able to distribute and run the application would be to package it.
Besides the native mode, which we already analyzed in the Profiles section, Quarkus offers the following package types:

+ fast-jar: This is the default packaging mode. It creates a highly optimized runner JAR package, along with a directory and its dependencies.
+ uber-jar: This mode will generate a fat JAR containing all of the required dependencies. This JAR package is suitable for distribution of the application on its own.
+ native: This mode uses GraalVM to package your application into a single native binary executable file for your platform.
+ native-sources: This type is intended for advanced users. It generates the files that will be needed by GraalVM to create the native image binary. It’s like the native packaging type but stops before triggering the actual GraalVM invocation. This allows performing the GraalVM invocation in a separate step, which might be useful for CI/CD pipelines.

#### Setting the packging mode
You can control the packaging mode by : 
1. setting the quarkus.package.type Maven property. You can set this property in the pom.xml properties section 
2. via the command line when running the Maven commands:

```
./mvnw -D"quarkus.package.type=uber-jar" clean package
```

You can package the application running the following command:
```
./mvnw clean package
```
You should now be able to run the application by executing the following:
```
java -jar target/quarkus-app/quarkus-run.jar
```