# Grid

Grids in ZK are powerful components for displaying organized data. This guide will walk you through how to work with a Grid, separate data into pages, and implement sorting. We will also explore accessing controller variables in the view and using the master-detail feature.

## Accessing Controller's Variables in View

In ZK, you can access variables in the controller from the view using EL expressions. The implicit variable `win$composer` refers to the controller assigned to the Window component with the ID "win". For example, to assign the model attribute of a Grid with a data model called `carsModel` in the controller, use the expression:

```xml
<grid model="${win$composer.carsModel}" ...>
    <!-- Grid content -->
</grid>
```

## Model Usage

When working with Grid data, you often use a data model, such as ListModelList. In the following snippet, we call the controller's `getCarsModel()` method through the EL expression:

```xml
<grid model="${win$composer.carsModel}" ...>
    ...
    <template name="model">
        <row>...
            <label value="${each.type}" 
                visible="@{fwinRef$composer.method}"/>
        ..</row>
    </template>
</grid>
```

The `<template>` tag generates components iteratively, and the implicit object `each` references each item being iterated in the model.

If there is a logic that calls for a method in the controller you can call it with "@x$composer.y"
- x= composer reference. it's the value of `<window id="x">`
- y= the name of the method or variable

## Column and Header

The number of columns in a Grid depends on the Column components declared within the Columns component. Set the width of each column using the width attribute and specify the title in the column header with the label attribute. The Auxhead component allows additional header bars to group existing column headers. Example:

```xml
<auxhead>
    ...
    <auxheader label="Tech Specification" align="center" colspan="2" />
</auxhead>
<columns>
    ...
    <column label="Transmission" ... />
</columns>
```

## Paging

To enable paging in a Grid, set the mold attribute to "paging". Use the pageSize attribute to control the number of rows per page. Example:

```xml
<grid ... mold="paging" pageSize="5">
    <!-- Grid content -->
</grid>
```

## Sorting

Grids in ZK have built-in sorting functionalities. To enable sorting, assign a Column's sort attribute with "auto" and specify property for sorting. Example:

```xml
<column label="Make" align="center" sort="auto(make)" />
```

## Detail

Grids support master-detail feature allowing you to attach additional content to each row. The detailed view is hidden until expanded. To implement master-detail, wrap detailed content with Detail component. Example:

```xml
<row>
    <detail>...</detail>
    <!-- Other row components -->
</row>
```

This guide provides comprehensive overview of working with a Grid in ZK. Experiment with examples to enhance understanding of these features.
