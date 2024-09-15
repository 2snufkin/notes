Entities in a Spring project represent the business objects or data structures that are persisted to a database.

## Introduction
This guide provides step-by-step instructions for developers to create a new entity in a Spring project. Entities in a Spring project represent the business objects or data structures that are persisted to a database.

Creating a new entity involves:
1. Defining the entity
2. Creating a corresponding table in the DB
3. Integrating it into the Spring application

## Steps to Create a New Entity
### Step 1: Define the Entity Class
Create a new Java class for your entity in the appropriate package.
```java
package com.example.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class YourEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Add your entity fields here

    // Add getters and setters
}
```
- `@Entity`: Indicates that the class is a JPA entity.
- `@Id`: Marks the primary key field.
- `@GeneratedValue`: Specifies how the primary key should be generated.

### Step 2: Creating a Corresponding Table in the DB
You can add the creation of the table inside a Liquibase script.

### Step 3: Integrating it into the Spring Application
If you created a new Entity, you should include it in the `persistence.xml` file; otherwise, Spring won't find it. For example:
```xml
<class>fr.aphp.tumorotek.model.config.YourEntity</class>
```

## Accessing Inaccessible Attribute

In certain scenarios while working on Tumorotek, you may encounter situations where you need to access an attribute that is normally inaccessible due to various reasons such as lazy loading, session problems, or other restrictions. This inaccessibility can often result in an exception being thrown when attempting to retrieve the attribute value directly.

Instead of attempting to find alternative solutions or bypassing the access restrictions, it is recommended to explore the specific manager implementation associated with the attribute. By leveraging the manager implementation, you can access the desired attribute through appropriate methods, thus ensuring proper handling and adherence to the underlying design and logic.

### Steps to Access an Inaccessible Attribute

1. **Identify the Manager:** Determine the manager responsible for handling the attribute you wish to access. The manager is typically a component or class that encapsulates the logic related to the attribute in question.

2. **Locate the Manager:** Utilize the `ManagerLocator` to retrieve an instance of the specific manager. The `ManagerLocator` is a commonly used utility that provides access to various managers within the project.

3. **Call the Method:** Once you have obtained a reference to the relevant manager, locate the appropriate method that allows access to the desired attribute. This method should provide a safe and controlled way to retrieve the attribute value, taking into account any necessary handling or processing.

4. **Retrieve the Attribute:** Invoke the identified method on the manager instance to retrieve the value of the previously inaccessible attribute. The method should handle any underlying complexities related to 	the attribute's retrieval, such as lazy loading or session management, ensuring consistent behavior within 	the project's architecture.

By adhering to this approach, you can access attributes that would otherwise be inaccessible directly while still following intended design patterns and maintaining integrity of project's logic. This methodology promotes code consistency and helps avoid potential issues that may arise from bypassing access restrictions in an unsupported manner.

Remember that it is essential to thoroughly understand manager implementation and associated method's behavior before accessing any attributes indirectly. Proper usage of manager and its methods will ensure desired results and prevent unintended side effects within your Java project.