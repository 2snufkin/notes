# Event Handling

In ZK Framework, events play a crucial role in capturing user interactions and triggering corresponding actions. This guide provides an overview of handling events in ZK, emphasizing the general principles applicable to various scenarios.

## View: The Template

When writing buttons within a ZK template, the `<button>` element is commonly used. Buttons can trigger events by utilizing the `@command` attribute to bind to a ViewModel(Controller) method. Below is an example of how to write a button within a ZK template:

```xml
<template name="model">
    <row>
        <!-- Other template content -->

        <!-- Button for triggering an event -->
        <button label="Click me" onClick="@command('handleEvent', parameter=each)" />
    </row>
</template>
```

In this example:
- The `<button>` element is used to create a clickable button.
- The `label` attribute sets the text displayed on the button.
  - If you want it to come from a properties file for i18n use `label="${c:l('general.cancel')}"`
  - If you want it to come from a variable in the ViewModel use `label="@load(vm.buttonName)"`
- The `onClick` attribute binds the button click event to a ViewModel method (`handleEvent` in this case) using the `@command` annotation.
  - `@command`: It allows declaring which method should be executed when a specific event occurs on a particular component. Use the `@command` attribute in ZUL files to bind the event to the ViewModel method.
- The `parameter=each` part passes the template variable each as a parameter to the ViewModel method.

## ViewModel: The Controller

In the view model, you need to define a method to handle the event. The method should have the same name as the reference name in the template; otherwise, it won't work.

### @Command

The `@Command` annotation is a fundamental part of event handling in ZK. It is applied to methods in the ViewModel that should be invoked in response to UI events. The annotated method acts as a command, defining...

(Truncated due to character limit)