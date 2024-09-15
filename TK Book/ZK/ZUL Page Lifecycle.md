# ZUL Page Lifecycle

The ZK framework provides two key annotations, `@init` and `@AfterCompose`, for handling component initialization and ViewModel setup in ZK-based applications. While both methods serve the purpose of initializing components and assigning variables in the ViewModel, they differ in terms of when they are executed during the ZUL page lifecycle.

## ZUL Page Lifecycle Overview

**Page Initialization:**
- Loading properties of components declared in ZUL.
- If a ViewModel is assigned using the `viewModel` attribute, it is initialized by the Binder, and the `@init` method is called if present.

**Component Creation:**
- Components are created, and properties are set.
- If an `@init` method is annotated, it is called during this phase.
- After the component is fully created, the `@AfterCompose` method is executed.

**Event Processing:**
- Handling user interactions and events.

**Rendering:**
- Rendering the final view for the user.

### @init Annotation:

**Execution Timing:**
- Called during the component creation phase, after the ViewModel initialization.
- Executed before the `@AfterCompose` method.

**Use Case:**
- Suitable for assigning variables and performing tasks that do not depend on the complete creation of components. Interacting with UI at this stage will cause an exception since they are null at this stage.

**Example:**
```java
@init
public void init() {
    // Initialization logic during component creation
}
```

### @AfterCompose Annotation:

**Execution Timing:**
- Called after the complete creation of components.
- Executes after the `@init` method.

**Use Case:**
- Ideal for tasks that require the fully initialized state of components.

**Example:**
```java
@AfterCompose
public void afterCompose() {
    // Logic executed after complete creation of components
}
```

## Best Practices

**Recommendation:**
Using `@AfterCompose` over `@init` is recommended when logic depends on complete component creation and ViewModel initialization.

**Flexibility:**
Depending on requirements, developers can choose appropriate annotation or use both methods in combination for different initialization tasks.

By understanding nuances between `@init` and `@AfterCompose`, developers can optimize initialization process in ZK applications, ensuring variables are assigned at most appropriate point in page lifecycle.