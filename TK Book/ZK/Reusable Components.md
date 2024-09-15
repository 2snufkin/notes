Reusable Components

You can create a reusable grid component using the`<?component>` processing instruction. This guide will demonstrate how to create a reusable grid component and pass a list of data and a button's action method as attributes to the component. The reusable component is of type Create a Reusable zul Component Create a New ZUL File for the Reusable Component: Create a new ZUL file (e.g., ReusableGrid.zul) where you will define your reusable component.

```
<grid model="${arg.listModel}"  apply="zk.gradle.vm.grid.dynamic_renderer.ReusableGridController"
	  rowRenderer="zk.gradle.vm.grid.dynamic_renderer.SimpleRenderer"
	  sclass="narrow" height="400px">
		<columns>
		<column width="5%">Id</column>
		<column width="30%">Language</column>
		<column width="40%">Contributor</column>
		<column width="10%">Charset</column>
		<column width="15%">Like</column>
	</columns>

</grid>
```

List its attributes: Write the use of the component. for example:

```
<gridDerive listModel="${$composer.prodDerives}"/>                                        
```
attribute: listModel argument: List&lt;ProdDerives&gt;

Create the Java Controller for the Reusable Grid Component:: Create a corresponding Java controller class (e.g., ReusableGridController.java). Every attribute must have a Getter in the Java Controller for this component. In this case, you must have a method. In this example listModel. If you pass an attribute that already exists in zk (like visible) you should extend the more generic ZK component. For example, in this case, you may want to extend Grid.

Use it in another component: Open another component file where you want to use the reusable component and:

Create a reference: use the `<?component>` tag at the top of the file

```xml
<?component name="gridDerive" macroURI="./grid.zul" ?>
```

Place your component in the zul file using the same name you used in the name attribute.

```html
<gridDerive listModel="${$composer.contributors}"/>
```

Code Example

Reusable Component

```
<zk>
<button disabled="${arg.isDisable}">Button From Outside</button>
</zk>
```

When ZK loads this component, it won't know what disabled is. It will look for setDisabled method.

Destination Component

```
<?component name="customButton" macroURI="/zuls/component/Buttoncustom.zul" ?>
// Some code
<customButton isDisable="true" />
```

Exceptions

org.zkoss.zk.ui.UiException: Page not found: /zuls/component/GridDerive.zul:

Verify that there are no errors in the macroURI path.

```
<?component name="customButton" macroURI="/zuls/component/Buttoncustom.zul" ?>
```
If you still get this message, recompile/build the project. If you still get this message, move to step 3.

The problem is not in the path; The Exception message is misleading which makes developers work harder. The problem lies within the zul file. There is some incoherence. If you replace it with 

```
// Some code 
<zk>
<button disabled="${arg.isDisable}">Button From Outside</button>
</zk>
```

You will see that the exception will disappear.