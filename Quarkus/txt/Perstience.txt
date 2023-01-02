
# Persistence

+ add a persistence layer to the application 
+ connect it to a database. 
+ Quarkus Dev Services
+ Entity classes 
Goal:  you should be able to persist and store the data of your application in a database. 



## Data persistence in Quarkus

Data persistence:  the means by which your application will be able to store and retrieve its data from one execution to the next. This means that any data that was input will survive after the process that created it has ended.

### Hibernate
Hiberante: is one of the most mature object-relational mapping (ORM) libraries for the Java programming language. It is  widely used framework for data persistence. It also provides an implementation for the Java Persistence API (JPA) specification.

ORM: A software engineering technique that enables applications to interact with a database in a platform-agnostic way using an object-oriented approach. Instead of writing database vendor-specific queries using Structured Query Language (SQL) or other languages, developers can interact with the database and define the entities using a more natural Java programming language.

JPA: the most widely adopted ORM specification for the Java programming language. 

Quarkus has a growing list of extensions to support data persistence.  If you follow the reactive paradigms use Hibernate Reactive, a reactive persistence API, in its simplified Panache version.\
Database:  PostgreSQL database has a reactive client extension for Quarkus .

### Adding dependencies to our project
dependencies will be added with maven goal and not with the CLI\
```
./mvnw quarkus:add-extension -Dextensions=hibernate-reactive-panache,reactive-pg-client,io.quarkus:quarkus-elytron-security-common
```
This will add
#### Reactive PostgreSQL Client
extension name:  quarkus-reactive-pg-client\
Allows your application to connect to a PostgreSQL database using the reactive pattern. It’s especially suited for Hibernate Reactive and RESTEasy Reactive since it allows you to take full advantage of the reactive, non-blocking approach, from the client’s request to effective data retrieval and processing from the database.
#### Hibernate Reactive Panache
extension name: hibernate-reactive-panache
In this case, we are adding the reactive-flavored version of the dependency, which will allow us to perform non-blocking, asynchronous operations.
Panache is a Quarkus-specific, simplified version of Hibernate. It allows writing JPA entities without the need for repetitive boilerplate code. It also provides methods to perform create, read, update, and delete (CRUD) operations, besides defining and executing basic queries for your entity.

#### Elytron Security Common
extension name: elytron-security-common
This dependency is not related to data persistence; it provides some security tooling that we will use to encrypt the passwords.  this dependency is directly maintained in the Quarkus project.

## Configuring Quarkus
add the following entries to configure Hibernate and PostgreSQL:
```
#DataBase CONFIG
quarkus.datasource.db-kind=postgresql  
quarkus.hibernate-orm.sql-load-script=import.sql
%dev.quarkus.hibernate-orm.database.generation=drop-and-   create
%dev.quarkus.hibernate-orm.sql-load-script=import-dev.sql
%dev.quarkus.hibernate-orm.log.sql=true
```


+ quarkus.datasource.db-kind: This entry defines the type of database we’ll be connecting to.
+ quarkus.hibernate-orm.sql-load-script:  defines a path to a file containing SQL statements that will be executed when the application starts. By default, when running Quarkus in dev mode, it will try to automatically load a file with the name import.sql. However, since we also want to provide some initial data for production, we manually define the property for both environments. When we launch the application in dev mode, the import-dev.sql file will be loaded; when we launch the application in production mode, the import.sql file will be loaded instead.

+ %dev.quarkus.hibernate-orm.database.generation: This property instructs Hibernate on what to do with the application schema upon startup. The default is for Hibernate to perform no action.

+ %dev.quarkus.hibernate-orm.log.sql: This entry configures Quarkus to log the SQL commands sent to the database in the console. 


## Entities
Your Entity will extend the PanacheEntity class. Let us now see what features the Panache entity provides. The Panache extension allows  to implement the persistence layer using either the repository pattern or the active record pattern. Depending on the development pattern you select, the extension provides  with two different base classes:
+ PanacheEntity, which will be used for the active record pattern
+ PanacheRepository, which will be used when dealing with the repository pattern.

### The repository pattern
It defines a repository as a class or component that encapsulates the logic required to access, create, update, or delete the entity objects or their aggregates. Panache provides the PanacheRepository interface, which should be implemented by all of your repository classes and provides utility methods for most CRUD operations.

### The active record pattern 
This pattern is most suitable when the domain logic is not too complex, and only simple CRUD operations are performed on the entities. For this to work, the PanacheEntity class,  should be extended by all of the entities. This will provide the entity class with utility methods to perform basic CRUD and query operations and allows  to omit the otherwise necessary boilerplate getter and setter methods. Panache will add the getter/setter methods at runtime and replace all the field calls with the proper setter or getter method calls.

#### !BEST PRACTICE
strongly recommend grouping the different features in individual feature packages (user, project, task, and so on). If the project evolves in the future and needs to be broken down into separate modules or applications, the refactoring process will be much easier.

#### Example
```
@Entity
@Table(name = "user")
public class User extends PanacheEntity {
}
```

@Entity:  The main requirement when declaring JPA entities is to annotate the class with the . Hibernate will detect this annotation and map it to a database table. 
 @Table:  customize the name of the table. Otherwise hibernate will give it the same name of the class
 
#### Example
```
@Column(unique = true, nullable = false)
public String name;
@Column(nullable = false)
String password; //by ommiting public, it's package-private_
@CreationTimestamp
@Column(updatable = false, nullable = false)
public ZonedDateTime created;
@Version
public int version;
@Column(length = 1000) public String description;
@ElementCollection(fetch = FetchType.EAGER)
@CollectionTable(name = "user_roles", joinColumns =
  @JoinColumn(name = "id"))
@Column(name = "role")
public List<String> roles;
```
##### Where is the @Id?\
The PanacheEntity base class provides an id field with an automatically generated long value that will be mapped to a database sequence.

##### what is package-private?
This implies that when User instance objects get serialized through our HTTP API, this field won’t be included.

##### Annotations
 @Column: you can config. if the Column accept null or not, if any field must be unique, can it be updated 'hould only be set upon creation)\
@CreationTimestamp:  will set the field value to the current Java virtual machine date when saving the entity for the first time.

+ length: Hibernate maps strings to varchar(255) database data types. Since this length might be insufficient, it can be extended with the length attribute.
 
@Version: This field is used for optimistic locking. It will prevent saving an outdated version of the entity that would otherwise overwrite the most recent changes of a newer version.  This field is automatically set by Hibernate upon insertion. It will be checked and automatically incremented upon saving.

This roles field has three annotations mostly related to where this data is mapped in the database:
 @ElementCollection: annotation is used when mapping very simple non-entity data that is embedded into an entity.  example: we are simply embedding a collection of strings representing the roles the user has. 
EAGER fetch option since we want to always retrieve the list of roles for the user.
 @CollectionTable:  configure the name of the  target table of embedded types. 
 @JoinColumn: Nested annotation.  the column used to reference the foreign key
@Column: in this case it’s configuring the name of the column in the target table, that contains the data I am  interested in. 

```
@Entity
@Table(
  name = "projects",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"name", "user_id"})
  }
)
```
uniqueConstraints:can be done by configuring the uniqueConstraints option of the @Table annotation. You can define the columns whose combination will be unique. In this example the name of the project isn't unique and can be duplicated in the table. but the combination of project name ans user_is is unique so a user can't have 2 projects with the same name. If you were to define the column as unique, then the name would be unique for all users, so two users wouldn’t be able to each have the same project name.\
@ManyToOne: It’s defined as a reference to the User entity. The optional configuration manage whether this field can or can’t be persisted with a null value.



## Quarkus Dev Services
Its main feature is to automatically provision services in development and test modes. This means that if your project has an extension configured to provide a database service, a messaging provider, an in-memory datastore, or one of the many other supported services, Quarkus will automatically start and configure this service for your application upon its startup.

Under the hood, Quarkus uses Testcontainers and Docker to provide these services. It’s required to have a Docker-compatible environment for this feature to work.

This means we won’t need to have a local PostgreSQL database available when running our application in development mode. We won’t need to provide a configuration either. Quarkus will start a Docker container with a fresh 


Quarkus Dev Services is also very convenient for testing purposes since the tests will run in a real database with a clean slate. This means you won’t need to configure mocks or in-memory databases or provide a specific testing database environment to run your tests. Just like with dev mode, when you run your tests, Quarkus will start the development services for you without any further configuration.

Old Way: If you want to woek with a traditional workflow with a fixed development environment. you  need to add the following entry to the application.properties file: 
```
quarkus.devservices.enabled=false.
```
simply providing a manual service configuration should also disable Dev Services.


### Docker
You will need a working Docker environment to take advantage of Quarkus Dev Services. 
+ Linux: There are Docker packages available for most Linux distributions.
+ Windows or macOS machine: you can install Docker Desktop.