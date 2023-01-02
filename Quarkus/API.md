
# Creating the HTTP API

In this chapter, we will 
+ implement both blocking and non-blocking endpoints on Quarkus using RESTEasy Reactive.
+ create the HTTP API that will be consumed by the frontend 
+ write HTTP REST endpoints in Quarkus. 
+ define the services that will encapsulate the business logic 
+ implement the endpoints that will expose the functionality of the different services to the frontend application.
+ Map Java exceptions to HTTP responses to be able to provide more accurate response status codes


# Writing HTTP REST endpoints with Reactive Approach

## Prerquis

For this to work you need to have a reactive dependency like REStEasy Reactive which provides an implementation of JAX-RS based on Vert.x. One of the major advantages of RESTEasy Reactive compared to the regular RESTEasy alternatives is that it allows us to implement both blocking and non-blocking endpoints.

RESTEasy Reactive JSON: For serializing our database entities into JSON so that they can be consumed by the HTTP API clients.
```
./mvnw quarkus:add-extension -Dextensions=resteasy-reactive-jackson
```

Jackson: one of the most popular Java libraries, commonly known for its JSON data format serialization and deserialization features. However, Jackson is much more than that and offers a complete suite of data processing tools with support for many other data formats and encodings.

## Blocking Endpoint

Follow the regular JAX-RS convention and use the annotations provided. 
```
@Path("blocking-endpoint")
public class BlockingEndpoint {
  @GET
  public String hello() {
    return "Hello World";
  }
}
```


@Path: defining the HTTP path. This annotation will also allow Quarkus to discover the class and expose its JAX-RS-annotated methods as HTTP endpoints.

@GET: is used to indicate that the annotated method should be used to respond to HTTP GET requests.

return type: the return type of the method is what will dictate whether Quarkus treats this as a blocking or a non-blocking endpoint. 



## Non-blocking asynchronous endpoint

The implementation of the non-blocking version of the endpoint just requires a minor change to the return type of the method signature. 

```
@Path("non-blocking-endpoint")
public class NonBlockingEndpoint {
  @GET
  public Uni<String> hello() {
    return Uni.createFrom().item("Hello").onItem().
      transform(s -> s + " World");
  }
}
```


#### Mutiny types
Mutiny: an event-driven reactive programming library for Java. Mutiny is integrated into Quarkus and is the primary model used when dealing with reactive types. Mutiny provides two types:\
Uni: is part of Mutiny. Represents a lazy asynchronous action that emits a single event. This event can either be an item or a failure. .
Multi: asynchronous action, just like Uni, but emits multiple events instead. \

Both types are used as the starting point and input for a Mutiny pipeline. 
When you return a Uni || Multi Object, Quarkus will take care of subscribing to the pipeline and convert it to an applicable HTTP response

##### Working with Mutify
when you perform a query, the database emits asynchronous events. See section [section to complete]\
What you won't generally do is `Uni.createFrom().item("Hello")` since you are just creating an asynchronous pipeline for an item that is already available.


# Services: Implementing the business logic
```
@ApplicationScoped
public class UserService {
  // …
}
```
 Quarkus uses ArC, a [CDI](https://quarkus.io/guides/cdi.) implementation to provide dependency injection. 

## Bean
Bean: an object managed by a CDI container that supports a set of services such as life cycle callbacks, dependency injection, and interceptors.
CDI container: the environment where the application runs. It’s responsible for the creation and destruction of bean instances and the injection of these instances into other beans. 
Declaring: There are several ways to declare beans in Quarkus, the easiest being the use of bean-defining annotations.
@ApplicationScoped: a bean-defining annotation that declares a singleton instance of the Java class, which will be shared in a single application context. Whenever this class gets injected into other beans, the CDI container will inject the same instance to each of these dependent beans.
### Injecting Beans
```
@ApplicationScoped
public class ProjectService {
  private final UserService userService;
  @Inject
  public ProjectService(UserService userService) {
    this.userService = userService;
  }
  // …
}
```
+ Create a private final variable 
+ Annotate the constructor with @Inject 
+ Provide the service as a constructor argument and assign in to the variable
## CRUD
@ReactiveTransactional: Use it when writing or deleting from the database. No need to use in reading; it indicates that the executed method should be run within a reactive Mutiny transaction to persist in the database. You make sure that the data is only persisted in the case that the complete service logic covered by the transaction is successful.

### Find By ID

```
    public Uni<User> findById(long id) {

  return User.<User>findById(id)

    .onItem().ifNull().failWith(() -> new

     ObjectNotFoundException(id, "User"));

}

```
This method will return a Uni object that will either 
+ emit a User entity for the ID provided if the user exists in the database 
+ fail with an exception if it doesn’t.
1. calling the User.findById static method, which is part of the active record pattern methods provided by the PanacheEntity base class. No need to inject anything into the service class since all these methods can be accessed statically.
2. The User.findById method call returns a Uni object that emits an item containing either the found user or null if it doesn’t exist. 

#### Avoiding emiting null
you should asynchronously process the result 
1. check for the null value, `onItem().ifNull()`  and throw a Hibernate ObjectNotFoundException with the ID of the missing object. If a user subscribes to this Uni and nothing is found, the subscription will fail instead of emitting a null value.

#### Find By ID with JOIN
```

public Uni<Project> findById(long id) {

  return userService.getCurrentUser()

    .chain(user -> Project.<Project>findById(id)

      .onItem().ifNull().failWith(() -> new

        ObjectNotFoundException(id, "Project"))

      .onItem().invoke(project -> {

        if (!user.equals(project.user)) {

          throw new UnauthorizedException("You are not

            allowed to update this project");

        }

      }));

}

```
The JPQL will be something like: `SELECT PROJECT p From JOIN on User u where p.id =:id and p.user.id = user.id`
This method returns a Uni instance that will emit an item containing the project with the requested ID.
+ If the project doesn’t exist, the Uni subscription will fail with ObjectNotFoundException. 
+ If the project exist but belongs to a user other than the one logged in, it will fail with UnauthorizedException.

1. get the current User: returned Uni instance that will emit the logged-in user
2. `.chain(user -> Project.<Project>findById(id)`: chained to a lambda expression, which receives this user as its only argument and retrieves the project by its ID. 
3. `.onItem().ifNull().failWith(() -> new ObjectNotFoundException(id, "Project"))`:
4. In addition we also check that the project belongs to the returned user and we throw UnauthorizedException if it doesn’t.

### Find By Name
```
    public Uni<User> findByName(String name) {

  return User.find("name", name).firstResult();

}
```
This method returns a Uni object that emits a User entity for the matching name or null if no user matches the criteria.\
`find()`: The first argument is the Hibernate Query Language (HQL) query and the second is the parameter to be passed to the query. However, in this case, we’re not even providing a complete HQL query but one of the simplified forms that Quarkus supports. This query is the equivalent of the HQL: from User where name = ?.
`firstResult()`:  produces a Uni instance that either emits the first User entity matching the criteria or null. \
Unlike with the previous findById method, we are not checking for a null item to fail with an exception. 


### FindAll

```
    public Uni<List<User>> findAll() {

  return User.listAll();

}

```
This will return a Uni object that emits a list containing all of the available entities in the database. 

#### Find All with Join
```
public Uni<List<Project>> listForUser() {
  return userService.getCurrentUser()
    .chain(user -> Project.find("user", user).list());
}
```
JPQL: 'SELECT p From Project p Where p.userId = :userId'\
Think differently: Here we don't use an ID, we use the all embedded entity.

This method returns a Uni object that will emit an item containing a list of all the project entities in the database that belong to the currently logged-in user.

1. invoking getCurrentUser to retrieve a Uni object that will emit the user performing this operation.
2. The Uni instance is asynchronously chained to a lambda expression that uses the input user argument as the parameter of an HQL query to find a project with the current user.

### Find with sort

```
    public Uni<User> getFirstUser() {


  return User.find("order by ID").firstResult();

}


```

this method just returns a Uni instance that emits a single item containing the user with the lowest ID available in the database.



### Create
```
@ReactiveTransactional

public Uni<User> create(User user) {

  return user.persistAndFlush();

}
```
This method persists a new user entity in the database with the data from the provided User object instance and returns a Uni object with a single item containing the updated User object.


Once the hashed password is set, we are ready to persist the new instance by invoking the persistAndFlush() method. This is another of the methods provided by the PanacheEntity base class.

The method is annotated with a @ReactiveTransactional annotation that indicates that the executed method should be run within a reactive Mutiny transaction to persist in the database. We will configure all of the service methods that perform write or delete operations with this annotation to make sure that the data is only persisted in the case that the complete service logic covered by the transaction is successful.


#### Create`with treartment

```
public Uni<User> create(User user) 
  user.password = BcryptUtil.bcryptHash(user.password);
  return user.persistAndFlush();
}
```

If before persiting the object in th datababse you need to do some treatment, do ut and then persist the Object.\ 
Example: Before persisting the object, we update the password value in the provided object with a bcrypt hash. \



##### Bycrypt
bcrypt is a password-hashing function based on the Blowfish cipher. bcrypt is especially recommended for hashing passwords because it is a slow and expensive algorithm. The slowness of the function makes it ideal to store passwords because it helps mitigate brute-force attacks by reducing the number of hashes per second an attacker can use when performing a dictionary attack.


### Update

```

public Uni<User> update(User user) {

  return findById(user.id)

    .chain(u -> User.getSession())

    .chain(s -> s.merge(user));

}

```
This method will update the data of an exisiting user entity in the database with the values from the provided user entity input argument. 

The supplied user argument will most likely come from a deserialized user entity from an HTTP request body. So, in this case, since the entity will be in a detached state and we want to update it, we can’t call the user.persistAndFlush() method we used for the create method.

`.chain()`: The chain method is how Mutiny chains asynchronous operations and maps their result. It expects a lambda expression that accepts the resolved item and should return a new Uni instance with the mapped value.\

1. Find the data: 
`findById(user.id)`

2. Get the sesssion:
`.chain(u -> User.getSession())`:  chaining the Uni instance and mapping the emitted item to the underlying Hibernate session,  we are ignoring the received user and returning a Uni<Session> object.

3. Use the session to update the entity:
`.chain(s -> s.merge(user))`: we invoke the merge method of the now available Hibernate session. The merge operation will copy the state of the provided detached user instance onto a managed instance of the same entity. Internally, Hibernate do the following:
+  retrieve the user from the database 
+  copy all the attribute values of the detached version. 
+ check the @Version field to enforce optimistic locking and prevent a more recent version of the entity from being overwritten. 
The method returns the updated, managed entity and makes it available to the Uni subscriber.

### Delete
```
@ReactiveTransactional

public Uni<Void> delete(long id) {
  return findById(id)
    .chain(u -> Uni.combine().all().unis(
          Task.delete("user.id", u.id),
          Project.delete("user.id", u.id)
        ).asTuple()
        .chain(t -> u.delete())

    );
}
```
This method deletes the user with the id provided by the database and all of its owned tasks and projects and returns a Uni object that will emit a null item if it completes successfully.\
1. Find the user in the DB by its ID  
2. The Uni instance returning the found user is then chained to a more complex lambda expression that performs asynchronous deletions of the associated tasks and projects. To delete all tasks and projects associated wityh the user, you need to chain two different batch deletions: Task.delete("user.id", u.id) and Project.delete("user.id", u.id). 
3. `Uni.combine().all().unis(…).asTuple()`: To make sure that the user is only deleted once every related task and project is deleted
4. `.chain(t -> u.delete())`:  Responsible for the effective user deletion if the previous operation succeeds. `t` is the tuple.


#### Delete with Join

```
@ReactiveTransactional
public Uni<Void> delete(long id) {
  return findById(id)

    .chain(p -> Task.update("project = null WHERE project = ?1", p)
    .chain(i -> p.delete()));
}

```
This method deletes the project with the matching ID from the database and updates all of the related tasks to unset the project. The method returns a Uni object that will emit a null item if it completes successfully.

`Task.update()`:The method get as an argument a simplified HQL query 

####  Delete with method reference operator
```
@ReactiveTransactional
public Uni<Void> delete(long id) {
  return findById(id)
    .chain(Task::delete);
}
```


## Creating an Endpoint

### Create a class

```
@Path("/api/v1/users")
public class UserResource {
  private final UserService userService;
  @Inject
  public UserResource(UserService userService) {
    this.userService = userService;
  }
  // …
}
```
1. Create a class with the correct naming.\
Naming: EntityName + Resource
2. Annotate it with @Path that will be common to all of the endpoints in this class. It will declare and expose an endpoint
3. Inject the services or dependencies

@Produces(MediaType.APPLICATION_JSON): most of the endpoints will produce a JSON response body, so you can use this annotation. However, this is not necessary for Quarkus because the JSON response media type is inferred from the presence of the quarkus-resteasy-reactive-jackson dependency and is used as the default for most of the return types. You can disable this feature by providing the following property: `quarkus.resteasy-json.default-json=false.`

### Create Endpoints Methods
#### @GET

```
@GET
public Uni<List<User>> get() {
  return userService.list();
}
```
@GET: Annotate the method with the HTTP request type you want this method to responds to
no arguments: if the annotation has no arguments it will responds to the url that was define in @Path(). In this case, the endpoint will be available at the /api/v1/users URL.
@Path("self") will make it avaliable at the /api/v1/user/self URL

Attention: non public fields of the entity won't be exposed through the HTTP API.

#### @POST
@POST:  used to indicate that this method should be selected to respond to HTTP POST method calls.

```
@POST
@Consumes(MediaType.APPLICATION_JSON)
@ResponseStatus(201)
public Uni<User> create(User user) {
  return userService.create(user);
}
```
@Consumes(MediaType.APPLICATION_JSON):  indicates that the HTTP request should include a body with an application/json content type. This annotation, in combination with the User user method parameter, configures Quarkus to deserialize the provided JSON body in the request into a User entity instance. 
@ResponseStatus(201): forces Quarkus to respond with a 201 Created response status code instead of the standard 200 OK upon success.


#### @PUT
@PUT: Quarkus will select this method when dealing with HTTP PUT requests targeting this path.
```
@PUT
@Consumes(MediaType.APPLICATION_JSON)
@Path("{id}")
public Uni<User> update(@PathParam("id") long id, User user) {
  user.id = id;
  return userService.update(user);
}
```

##### The problem with private fields
When setting an Entity field as a private, prevent this field from being exposed through the HTTP API. If you are using the same same entity class to deserialize HTTP request bodies containing the data, there is no way for Quarkus to set the data for this field.
Solution: in the Entity class add a setter with `@JsonProperty("...")`
for example:
```
@JsonProperty("password")
public void setPassword(String password) {
  this.password = password;
}
```

The method will be used by Jackson to deserialize (string top object) the value of the password property. However, since the password instance variable is still package-private, it won’t be serialized (object to string)


#### @DELETE
@DELETE: the method will be selected when dealing with HTTP DELETE requests
```
@DELETE
@Path("{id}")
public Uni<Void> delete(@PathParam("id") long id) {
  return userService.delete(id);
}
```
### Dealing with service exceptions
To be able to handle the application’s exceptions and map them to proper HTTP responses, we need to provide an implementation of ExceptionMapper.\
1. Create a RestExceptionHandler class that implements ExceptionMapper
```
@Provider
public class RestExceptionHandler implements ExceptionMapper<HibernateException> {
  // …
}
```
ExceptionMapper: An Interface (The JAX-RS specification) to be able to customize the way Java exceptions are converted to HTTP responses. To write a custom ExceptionMapper, we need to create a class that implements this interface and annotates it with the
2. Annotate with @Provider: automatically discovered by Quarkus. 
3. Pass <HibernateException> as the type parameter: This means that only exceptions that extend HibernateException will be processed by this mapper.

#### Imlplimtation examples

1. hasExceptionInChain: This method checks whether the current exception, throwable, or any of the exceptions in its stack trace are an instance of the provided exceptionClass:

```
private static boolean hasExceptionInChain(Throwable throwable, Class<? extends  Throwable> exceptionClass) {

  return getExceptionInChain(throwable, exceptionClass).isPresent();
}
```

2. PostgreSQL error: This method tries to retrieve a PgException from the provided throwable exception’s stack trace. If a PgException is found, it then checks to see whether it contains the provided error code. We will initially use this method to identify when a database’s unique constraint has been violated.

```
private static boolean hasPostgresErrorCode(Throwable throwable, String code) {

  return getExceptionInChain(throwable, PgException.class)

    .filter(ex -> Objects.equals(ex.getCode(), code))

    .isPresent();
}
```

3. HTTP Status code: This method contains the logic to effectively map the exceptions into HTTP responses with more suitable HTTP status codes:
+ If the exception corresponds to ObjectNotFoundException, a response with a 404 Not Found status code will be returned. If the exception is of the StaleObjectStateException type, which is thrown when there is an optimistic lock problem, a 409 Conflict status code will be returned instead. The same 409 Conflict status code will be provided if the exception corresponds to a PostgreSQL unique key violation. In any other case, a response with a standard 400 Bad Request status code will be returned.

This method could be improved to cover other kinds of exceptions or to provide more details in the response.

```
public Response toResponse(HibernateException exception) {

  if (hasExceptionInChain(exception, ObjectNotFoundException.class)) {

    return Response.status(Response.Status.NOT_FOUND)
    
      .entity(exception.getMessage()).build();

  }

  if (hasExceptionInChain(exception, StaleObjectStateException.class)

    || hasPostgresErrorCode(exception, PG_UNIQUE_VIOLATION_ERROR)) {

    return Response.status(Response.Status.CONFLICT).build();

  }

  return Response.status(Response.Status.BAD_REQUEST)

    .entity("\"" + exception.getMessage() + "\"").build();
}
```



Note that we’ve included the -i command-line flag to print the response headers and body. You should be able to see something similar to the following:
Figure 3.8 – A screenshot of a cURL execution showing the 404 Not Found status

Figure 3.8 – A screenshot of a cURL execution showing the 404 Not Found status

We can also force a conflict error by issuing a request to create a duplicate user:

curl -i -X POST -d"{\"name\":\"admin\",\"password\":\"pass\"}" -H "Content-Type: application/json" localhost:8080/api/v1/users

Once executed, the following headers should be visible:
Figure 3.9 – A screenshot of a cURL execution showing the 409 Conflict status

Figure 3.9 – A screenshot of a cURL execution showing the 409 Conflict status

We’ve now implemented a common exception mapper that will convert Java exceptions to HTTP responses. This is very useful for the frontend side of the application, which can now properly handle any of the exceptions managed by our RestExceptionHandler.
Summary

In this chapter, we learned how to implement both blocking and non-blocking endpoints in Quarkus using RESTEasy Reactive. We also implemented the complete business logic and HTTP API for our application. We started by developing the business logic for the task manager in different service classes. Then, we implemented the JAX-RS endpoints in resource controller classes that receive these services via dependency injection. We also learned how to map Java exceptions to HTTP responses to be able to provide more accurate response status codes and how to fully customize the response.

You should now be able to implement HTTP and REST APIs in Quarkus. In the next chapter, we’ll see how to secure the application using JWT. We’ll implement JWT authentication and authorization and protect the endpoints we just developed.
Questions

    Can RESTEasy Reactive be used to implement synchronous, blocking endpoints?
    What are the two types provided by Mutiny to start a pipeline?
    What is a bean?
    How can you easily declare a singleton bean in Quarkus?
    Why is bcrypt preferred for hashing passwords?
    How can you add a path parameter to a URL in Quarkus?
    Is it necessary to include the @Produces JAX-RS annotation in Quarkus endpoint definitions?
    How can you intercept a Java exception and map it to an HTTP response?

#### Working with Path Variables
```
@GET
@Path("{id}")
public Uni<User> get(@PathParam("id") long id) {
  return userService.findById(id);
}
```
@Path("{id}"): includes an {id} parameter so that we can retrieve the user ID from the request URL. This annotation is used in combination with the annotated method argument: @PathParam("id") long id.

## Summery
From the initial query to the database, through the business logic and data processing, down to the JAX-RS endpoint definition: everything is encapsulated within an asynchronous Mutiny pipeline, taking full advantage of the non-blocking reactive capabilities offered by Quarkus.