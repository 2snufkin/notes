# MVC 
Under this approach, we implement the event handling and presentation logic in a controller with no code present in the 
ZUL file. This approach makes the responsibility of each role (Model, View, and Controller) more cohesive and allows you 
to control components directly.  

## VALIDATION
It's done in the zul file. Each ZK input component provides a built-in input validation by `constraint` attribute. You can specify a pre-defined 
constraint rule to activate it, then the validation works without writing any code in a controller. For example:
````html
 <textbox id="fullName" constraint="no empty: Please enter your full name"
             width="200px"/>
````
you can use regex
````html
 <textbox id="email"
          constraint="/.+@.+\.[a-z]+/: Please enter an e-mail address"
          width="200px"/>
````
The constraint rule means "date in the future is not allowed" and it also restricts the available
date to choose.

`<datebox id="birthday" constraint="no future" width="200px"/>`

## Save & Reload Data
There is a more flexible way to define an event listener in a controller with @Listen other than calling addEventListener().

### @Listen
inside a controller class you can create an event listener while annotating a method the @Listen annotation.  ZK will "wire" the
method to the specified components for specified events.  
+ The method should be public.\
+ have a void return type, and have either no parameter or one parameter of the specific event type (corresponding to the event listened) . 
+  specify event listening rule in the annotation's element value
````java
public class ProfileViewController extends SelectorComposer<Component>{

    @Listen("onClick=#saveProfile")
    public void doSaveProfile(){
        ...
    }
    ...
}
````
@Listen will make doSaveProfile() be invoked when a user clicks a component (onClick) whose id is "saveProfile" (#saveProfile).
# MVVM
Building a user interface using the MVVM approach is not different from the MVC approach.
the ViewModel can't have zul component references. ViewModel exposes its data by getter methods, it doesn't have to define
a corresponding member variable. 
1. Write the ViewModel class
````java
public class ProfileViewModel implements Serializable{

    //services
    private AuthenticationService authService = new AuthenticationServiceChapter3Impl();
    private UserInfoService userInfoService = new UserInfoServiceChapter3Impl();

    //data for the view
    private User currentUser;

    public User getCurrentUser(){
        return currentUser;
    }

    public List<String> getCountryList(){
        return CommonInfoService.getCountryList();
    }
}
````
2. Apply a viewModel to a component (see introduction.md)
3. Use the data in that the viewModel expose (with its getter methods) via `@load`
ex: 
`<listbox model="@load(vm.countryList)" mold="select" width="200px">`
`<label value="@load(vm.currentUser.account)"/>`
**How to assign a selected value to an object?**
 we can't do it in the ViewModel since it can't have reference to the zul component and it does not have setters
`<listbox model="@load(vm.countryList)" selectedItem="@load(vm.currentUser.country)" mold="select" width="200px">`
here the selected item is set to the country attribute of the current user

## @Save & Reload Data
@save, ZK can save user input back to a ViewModel automatically. You need to specify where to save it
`<textbox value="@save(vm.currentUser.fullName)" .../>`
if you want reloading and saving data in the same component
`<textbox value="@load(vm.currentUser.fullName)@save(vm.currentUser.fullName)" .../>`
The syntax is quite long. ZK knows your pain and provides a shortcut syntax: @bind:
`<textbox value="@load(vm.currentUser.fullName)@save(vm.currentUser.fullName)" .../>`

## React to events
Under the MVVM approach, we handle events by binding an event attribute (e.g. onClick) to a Command of a ViewModel.
ViewModel also contains View's behaviors which are implemented by methods.We call such a method "Command" of the ViewModel.
These methods usually manipulate data in the ViewModel, and they are usually triggered by events from the View. 
The Data binding mechanism also supports binding an event to a ViewModel's command. 
Firing the component's event will trigger the execution of bound command that means invoking the corresponding command method.

### @Command
For ZK to recognize a command method in a ViewModel, you should apply annotation @Command to a command method.
Our example has two behavior: "save" and "reload", so we define two command methods for each of them:

### @notifyChange
During execution of a command, one or more properties may be changed due to performing business or presentation logic.
Developers have to specify which property (or properties) is changed, then the data binding mechanism can reload them
to synchronize the View to the latest state. You can
One property:
`@NotifyChange("oneProperty")`
Multiple properties:
`@NotifyChange({"property01","property02"})
`
All properties in a ViewModel:
`@NotifyChange("*")
`
## zul file
you use this syntax and you pass the commend nae as an argument
````java
    <hlayout>
            <button onClick="@command('save')" label="Save"/>
            <button onClick="@command('reload')" label="Reload"/>
        </hlayout>
````
## Form Binding
Form binding automatically creates a middle object as a buffer. 
Before saving to ViewModel all input data is saved to the middle object.


In this way we can keep dirty data from saving into the ViewModel before the user confirms.
### How 
Steps to use a form binding:
1.  Give an id to middle object in 'form' attribute with @id.
2. Then you can reference the middle object in ZK bind expression with its id, e.g. @id('fx').
3. Specify ViewModel's property to be loaded with @load
4. Specify ViewModel's property to save and before which Command with @save
5. This means binder will save the middle object's properties to ViewModel before a command execution.
6. Bind component's attribute to the middle object's properties like you do in property binding.
You should use middle object's id specified in @id to reference its property, e.g. @load(fx.account).

````html
...
    <grid width="500px"
    form="@id('fx')@load(vm.currentUser)@save(vm.currentUser, before='save')">
        ...
        <rows>
            <row>
                <cell sclass="row-title">Account :</cell>
                <cell><label value="@load(fx.account)"/></cell>
            </row>
            <row>
                <cell sclass="row-title">Full Name :</cell>
                <cell>
                    <textbox value="@bind(fx.fullName)" width="200px"
                    constraint="no empty: Plean enter your full name"/>
                </cell>
            </row>
      ....
    </div>
...

````
