# ZK
the language is ZUML
Build component based UI
a page is a collection of components and it has a .zul .\
a desktop is what you see in front of you, it's what's included in the browser tab.
it can be the ensemble of pages but for this you need to use the <include mode="defer"> tag. this is not recommended: it's makes things more compleceted and it's rarely used.
normally you should have one page per desktop,even if it's composed from diffrent zul files
user interaction -> component emit event -> event listener -> inside the event listner you change the components into something new 
ZK use the EL language 3.0 specifications
# Defenitions
zscript: goof for prototyping but not to production since it's slow. it's a script exe in the server side. it's looks like Java code but it's not really Java. It's an interpeted bran shell, an old library that isn't maintened.


## El
In Java, Expression Language (EL) is used to access and manipulate data stored in JavaBeans components or other objects such as arrays, maps, and lists. EL expressions are a way to simplify the access to data and make the code more concise.
`<p>Hello ${user.name}!</p>` In this example, the EL expression ${user.name} is used to access the name property of a JavaBean component named user. The EL expression is enclosed within ${...} and is evaluated at runtime to retrieve the value of the name property.
|```

<c:forEach var="item" items="${cart.items}">
   <p>${item.name} - ${item.price}</p>
</c:forEach>
```

In this example, the EL expression ${cart.items} is used to access a list of items stored in a JavaBean component named cart. The <c:forEach> tag is a JSTL (JSP Standard Tag Library) tag that iterates over the items in the list and outputs the name and price of each item using EL expressions ${item.name} and ${item.price}.

## TagLib
Tag Library Functions (or simply, Tag Functions) are custom functions that can be defined in a Java class and made available to a JSP page through a custom tag library. These functions are designed to perform specific operations and can be used within JSP expressions, scriptlets, and JSP tags.

A Tag Library Function can take one or more arguments and can return a value. It is defined in a Java class that implements the javax.servlet.jsp.tagext.Function interface, and is typically packaged within a JAR file and deployed as a tag library.

Here is an example of using a custom Tag Function named reverse that reverse a string. This will output dlroW olleH.

```
<%@taglib prefix="util" uri="/WEB-INF/tld/util.tld" %>

<util:reverse input="Hello World"/>

```
there are some tagfunctions that comes with ZK that handle internalization

## Namespaces
A mechanism that allows components to be uniquely identified within a ZUL page or a ZUML file. Namespace is a string value that is assigned to a ZUL page or a ZUML file, and it is used to prefix the IDs of the components defined within that page or file.

Namespace is useful in cases where multiple ZUL pages or ZUML files are used together, and there is a possibility that they might contain components with the same ID. By assigning a unique namespace to each page or file, the components within them can be uniquely identified, and the application can avoid naming conflicts.

Namespace is defined using the xmlns attribute in the root element of a ZUL page or a ZUML file. Here's an example:

`zk
`
<zk xmlns="http://www.zkoss.org/2005/zul"
    xmlns:my="http://www.example.com/my">

  <my:customButton id="myButton" label="Click me"/>

</zk>

In this example, the xmlns attribute defines the default namespace for ZK components. The xmlns:my attribute defines a custom namespace with the prefix my. The my:customButton component is defined within the custom namespace, and its ID is prefixed with my. Therefore, its full ID is myButton.

Note that the namespace prefix used in the component ID must match the namespace prefix used in the xmlns attribute


## Patterns
ZK is a Java web framework that offers several patterns to organize and structure web applications. Here are some of the patterns that are commonly used in ZK:

+ Model-View-Controller (MVC): This pattern separates the application into three main components - the Model, the View, and the Controller. The Model represents the data and the business logic of the application, the View represents the presentation layer, and the Controller manages the interactions between the Model and the View. In ZK, the MVC pattern can be implemented using components such as Listbox, Textbox, and Button, along with their respective controllers.

+ Richlet: This pattern is used to create standalone web applications that do not rely on a servlet container. A Richlet is a lightweight HTTP handler that can receive and respond to HTTP requests directly. In ZK, the Richlet pattern can be implemented using the Richlet class, which allows developers to create custom servlets that can be deployed as standalone applications.

+ Model-View-ViewModel (MVVM): This pattern is similar to MVC, but the Controller is replaced with a ViewModel. The ViewModel is responsible for managing the data and behavior of the View, and it communicates with the Model to update the View. In ZK, the MVVM pattern can be implemented using the ViewModel class, which provides a data-binding mechanism between the View and the ViewModel.

+ Data Access Object (DAO): This pattern is used to abstract the database access layer from the rest of the application. The DAO provides a set of methods for accessing and manipulating data in the database, and it shields the application from the underlying database implementation. In ZK, the DAO pattern can be implemented using the Hibernate or JPA components, which provide object-relational mapping (ORM) capabilities.

+ Publish-Subscribe: This pattern is used to implement event-driven communication between components. A Publisher publishes events to a Topic, and Subscribers subscribe to the Topic to receive the events. In ZK, the Publish-Subscribe pattern can be implemented using the EventQueues component, which provides a mechanism for publishing and subscribing to events.

These are some of the patterns that are commonly used in ZK. Depending on the requirements of the application, one or more of these patterns can be combined to create a robust and scalable web application.











### changing component
what can we do as a reaction to an event
+ add/remove component
+ change properties and attributes
+ change/ add label
+ adding items to a list view
+ activating a tab etc...

## Architecture
1. Server side compoenent: Java
2. Client side JS : rendering the DOM element




## Building components
<ZK>



</ZK>


