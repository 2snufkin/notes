# Zul File

## Window Configuration:
Those are the minimum attributes that should be preset in the window config. The only thing you should modify is the Controller Ref in the `@init` argument
```xml
apply="org.zkoss.bind.BindComposer"
viewModel="@id('vm') @init('fr.aphp.tumorotek.action.administration.ParametresController')"
internalization
```

If you want some values in the template to be translated you can't hard code them. If you give a button "Oui" title it will stay Oui even if the user is on a browser that uses English as a Language.  In this case you will instruct the template to take the value from a *properties file. The syntax is
`${c:l(the key name in the properties file)}`
for example:
```xml
title="${c:l('params.application.title')}"
```

## Looping
The are several ways to loop over a collection inside a ZUL file 
```xml
<forEach> element.
<zk>
    <!-- Assume 'items' is a collection in your ViewModel -->
    <forEach items="@load(vm.collectionVariable)">
        <!-- 'each' represents the current item in the collection -->
        <label value="@load(each.property)" />
    </forEach>
</zk>
```
**Explanation:**
- `<forEach>` Element: The `<forEach>` element is used to iterate over a collection.
- items Attribute:
  `items="@load(vm.items)": Binds the collection (vm.collectionVariable in this case) from the ViewModel to the loop.
- Element:
  Place the component(s) inside the `<forEach>` block that you want to repeat for each item in the collection.In this example, the `<label>` element will be rendered as many times as there are items in the collection.
- `@load(each.property)` Attribute:
  Use @load to bind properties of the current item (`each`) in the loop. This is how you get access to attributes of each item.

This way, content inside `<forEach>` block will be repeated for each item in the collection. Adjust based on your ViewModel and item structure.

## `<grid>` Element
In Tumorotek, collections are usually presented using a grid element.
Define collection attribute of grid element:
```xml
<grid model="@load(vm.parameterList)">
```
Define columns:
```xml
<columns>
    <column width="40%"/>
    <column width="40%"/>
    <column />
</columns>
```
Define template and one row per element in collection with individual cells for each column. Access each item's attribute with `each` keyword.
```xml
<template name="model">
    <!-- Row generated for every item -->
    <row>
      
          <!-- Cell I for Column I-->
       <cell>
          <label value="${c:l(each.code)}" style="color: #636363;" sclass="formLabel" />
       </cell>

          <!-- Cell II for Column II-->
       <cell>
          <label value="@load(each.valeur ? c:l('general.checkbox.true') : c:l('general.checkbox.false'))"
                visible="${!vm.isEditMode(each) || each.type ne 'boolean'}"/>
       </cell>
       
          <!-- Cell III for Column III-->
       <cell>
             <button label="${c:l('general.edit')}" visible="${!vm.isEditMode(each)}"
                   onClick="@command('editParameter', parameter=each)"
                   image="/images/icones/edit.png" height="24px"
             />
       </cell>

    </row>
</template>
```

## Conditional Rendering

In ZK Framework, setting `visible` attribute to false versus using `if` attribute serve different purposes regarding DOM and component rendering.
- Displaying if variable is null: `if="${empty vm.logo}"`
- Displaying if variable equals something: `if="${each.type eq 'something'}`
You can achieve opposite outcome by using `not` keyword, for example: `if="${not empty vm.logo}"`

## Images

Create an AImage Object in Controller and load it into img element:
```xml
<image content="@load(vm.logo)" />
```

## Buttons

Refer to Event Handling section.

For more details consult Grid chapter.