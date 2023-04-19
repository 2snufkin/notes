# Architecture
Zk supports the MVC and MVVM patterns. The biggest difference from the Controller in the MVC is that ViewModel does not contain any reference to UI components and knows nothing about the View's visual elements.

## MVC
MVC (Model-View-Controller) which separates an application into 3 roles:
+ Model is responsible for exposing data while performing business logic which is usually implemented by users.
+ View is responsible for displaying data which is what ZUL does.
+ Controller can change the View's presentation and handle events sent from the View.

## MVVM
Model-View-ViewModel (The View and Model plays the same roles as they do in MVC).\
+ Model is responsible for exposing data while performing business logic which is usually implemented by users.
+ View is responsible for displaying data which is what ZUL does.
+ ViewModel acts like a special Controller which is responsible for exposing data from the Model to the View and providing required actions and logic for user requests from the View.

# User Interface
for creating web and mobile apps. All the usert actions are handeled inside the Controller and the changes will reflect to browser automatically.
You don't need to care about communication details between browsers and servers, ZK will handle AJAX details for you.
for vuilding the "html" part, ZK uses ZK User-Interface Markup Language (ZUML) and the file extention is `*.zul`

## Componenets
ZK provide with hunderands of [components](https://www.zkoss.org/zkdemo/grid) but you can also create your own components in a zul format


## Data component
data component is a zul component that rtecive data from the Controller.
All data components (inside the zul file) are designed to accept a separate model object (from the controller) that contains data to be rendered,
and the component renders the data model upon a template (what you specify inside <template>). Like in Java Swing, you create a ListModelList, populate it with data
and then provide prepared data model object to the component by setModel(). (zulComponentRef.setModel(listModelRef))
Controller
````java
public class ProfileViewController extends SelectorComposer<Component>{
    ...
    @Wire
    Listbox country;

    @Override
    public void doAfterCompose(Component comp) throws Exception{
        super.doAfterCompose(comp);

        ListModelList<String> countryModel = new ListModelList<String>(CommonInfoService.getCountryList());
        country.setModel(countryModel);

        ...
    }
    ...

}
````
zul file
````html
<listbox id="country" mold="select" width="200px">
    <template name="model">
        <listitem label="${each}" />
    </template>
</listbox>
````
Define a template, so that <listbox> can know how to render its data model.
If you don't define it, <listbox> renders the model with a default built-in template.
+ The name attribute has to be model which means it's a template for <listbox> model.
+ ${each} is an implicit variable and is a ref to one object(String) of the data model.

### Using Child Components
to use another component in your component you use the <apply> and you reference the component you want to insert
<apply templateURI="path/to/component">
apply is a shadow component. It can inject a sepreated zul into the parent zul

## Layouts 
ak has various [layout](https://www.zkoss.org/zkdemo/layout) components 

## The view 
Building the view in ZK is basically creating components, and there are two ways to do it:
1. ZUML (XML format, declarative) approach.
2. Java (programmatic)

 Each XML element instructs ZK to create a component, and each XML attribute controls the component's function and looking. 


## Zul file

1. create a file with the `*.zul` extention
2. write tou view inside a <zk> </zk>


# CSS
1. usinf style attriute
2. using sclass to refer to a css class defined in a stylesheet. the stylesheet can be internal or external
+ internal: inside a <style > </style> directly after after the <zk>
+ external: before the <zk> tag define `<?link rel="stylesheet" type="text/css" href="/style.css"?>`


# Controller 
## Create component in the controller
1. Create a component object.
2. Setup the component's attributes.
3. Append to the target parent component.

### Wire component
to control a cpmponent we mst get its object reference. when you specify a [@Wire](https://www.zkoss.org/wiki/ZK_Developer%27s_Reference/MVC/Controller/Wire_Components) annotation on a field or setter method, the SelectorComposer will automatically find the component and assign it to the field or pass it into the setter method. By default SelectorComposer locates the component whose ID and type both match the variable name and type respectively in the zul but there are two ways to wire
1. component delector syntax
```java
@Wire("window > textbox")
	Textbox tb; // wire to the first textbox whose parent is a window
```
2. component id (default)
```java
@Wire
	Button btn; // wire to the button with id "btn"w
```
## Init. the view
It is very common that we need to initialize components when a zul file is loaded. for this you should override the `doafterCompose(Component)`. ZK will call this method after the applied component and its all child components are created, so we can change components' attributes or even create other components in it.
*You need to call`super.doAfterCompose(comp);` because it performs initialization like wiring components for you*

## Events & Event Listener
A ZK event (org.zkoss.zk.event.Event) is:
+ an abstraction of an activity made by user
+ notification made by an application,
+ invocation of server push

### Example
a user clicks a button on the browser, this will trigger onClick sent to the server. If there is an event listener registered for the button's onClick event, ZK will pass the event to the listener to handle it. The event-listener mechanism allows us to handle all user interaction at server side.




# Attributes
*pre* : preserve new line character
`<label pre="true" value="hello &#xA;world"/>`: will dispaly it in 2 lines. the default is false and it will ignore special charecters
*sclass*: css class selector
*align* : controls vertical alignement in <hbox> and horizontal in <vbox>
*pack* : control horizontal aligmlent

# Controlling components
the simple way to respond to user clicking is to define an event listener methood and register it in the onClick attribute. 
## with <zscript>
run on the server side, suitable for fast prototyping, interpreted when a zul page is created. So after you modify the code inside, you can reload your browser to see the changed result without re-deployment. But it has issues in performance and clustering environment, we don't recommend to use it in production environment.

## with Controller
the controller manipulate the view. the view fires event that are trated by the controller.
what is manipulet? changing the user interface by creating, removing, or changing components and all changes you made will reflect to browsers.
To create a Controller in ZK you simply:
1. create a class that inherits org.zkoss.zk.ui.select.SelectorComposer.
```java
public class SidebarChapter2Controller extends SelectorComposer<Component>{
    //other codes...
}
```
2. associate" the controller with a component in the zul file by specifying fully qualified class name in apply attribute. After that the component and all its child components are under the controller's control.
```html
<grid apply="org.zkoss.essentials.chapter2.SidebarChapter2Controller"
    hflex="1" vflex="1" sclass="sidebar">
    ...
</grid>
```

# MVVM
ViewModel is just a class that doe not need to extend any parent class or implement any interface. Since the ViewModel contains no reference to UI components, you cannot control components directly by their setter and getter. Therefore, ZK supports a data binding mechanism, ZK Bind, to synchronize data and handle events and respond between the View and ViewModel.
We use a binder which responsible for the communcation between View and ViewModel

## Apply ViewModel on a component: zul file
Bind a ZK component to the viewModel by setting the viewModel attribute
`<grid viewModel="@id('vm') @init('org.zkoss.essentials.chapter2.SidebarViewModel')">`
 ViewModel is prepared and bound to a component, you can bind a component's attributes to the ViewModel's property. Once the binding is established, ZK will synchronize (load or save) data between components and the ViewModel for us automatically.
* since zk 8 you don't need to specify apply="org.zkoss.bind.BindComposer" explicitly. Because ZK implicitly applies BindComposer for you if you specify a ViewModel *
```
<grid viewModel="@id('vm') @init('org.zkoss.essentials.chapter2.SidebarViewModel')"
    ...
    model="@load(vm.sidebarPages)" >
    ...
    <rows>
        <template name="model">
            <row sclass="sidebar-fn" >
                <image src="@load(each.iconUri)"/>
                <label value="@load(each.label)"/>
            </row>
        </template>
    </rows>
</grid>

```
the @id is like a variable and it's possible to access the ViewModel's properties.

### implicit each
The variable each is an implicit variable that you can use without declaration inside <template>, and it represents one object (SidebarPage) of the data model for each iteration when rendering. We use each with dot notation to reference a data object's property. In each <row>, we show an image icon by loading a URL and a label.

## Commands 
ViewModel also contains View's application logic which are implemented by methods. We call such a method "Command" of the ViewModel. The View's behaviors are usually triggered by events from the View. The data binding mechanism also supports binding an event to a ViewModel's command. Firing the component's event will trigger the execution of bound command that means invoking the corresponding command method.

### ViewModel
To declare a command method in a ViewModel, you should apply annotation @Command to a method. You could specify a command name which is the method's name by default if no specified.
```
public class SidebarViewModel {
    ...
    @Command
    public void navigate(@BindingParam("page") SidebarPage page) {
        Executions.getCurrent().sendRedirect(page.getUri());
    }
}
```
`Executions.getCurrent())`: returns the current Execution which is a wrapper of HttpServletRequest. 
`sendRedirect()`: will redirect a browser to the specified URL.
 
 ### zul
Under the MVVM approach, we handle events by binding an event attribute (e.g. onClick) to a Command of a ViewModel like:
`<row sclass="sidebar-fn" onClick="@command('navigate', page=each)">`
We need to pass the SidebarPage with key page to the command method with the implicit variable each.
After we bind an event to a Command, each time the event is fired, ZK will invoke the corresponding command method.
