## Call a method of another compoent
1. get a reference to the component's controller
```
(ContrllerClassName) self.getFellow("zulId")
         .getAttributeOrFellow("zulId$composer", true);

```
2. call a method


## Get reference to an Element inside another component's zul

```
return ((FicheRequete) self.getParent().getParent().getParent().getFellow("ficheRegion").getFellow("ficheRequete")
         .getFellow("winFicheRequete").getAttributeOrFellow("winFicheRequete$composer", true));

```


    self.getParent().getParent().getParent() retrieves the immediate parent of the current component, and then its parent, and then the parent of that parent. This is used to navigate up the component tree hierarchy.

    .getFellow("ficheRegion") retrieves the fellow component with the ID "ficheRegion" from the previous parent component. This assumes that "ficheRegion" is a component defined within the same level or below the current component.

    .getFellow("ficheRequete") retrieves the fellow component with the ID "ficheRequete" from the previously retrieved "ficheRegion" component. This assumes that "ficheRequete" is a component defined within "ficheRegion" or its sub-components.

    .getFellow("winFicheRequete") retrieves the fellow component with the ID "winFicheRequete" from the previously retrieved "ficheRequete" component. This assumes that "winFicheRequete" is a component defined within "ficheRequete" or its sub-components.

    .getAttributeOrFellow("winFicheRequete$composer", true) retrieves the value of the attribute named "winFicheRequete$composer" from the previously retrieved "winFicheRequete" component. If the attribute is not found, it retrieves the fellow (component) itself. The true argument indicates that the component should be retrieved even if the attribute is not found.

    (FicheRequete) is a cast that explicitly specifies the type of the retrieved component, indicating that it should be treated as an instance of the FicheRequete class.

Overall, the provided code snippet uses a combination of getParent() and getFellow() methods to navigate the component tree hierarchy and retrieve a specific component with a given ID.

Note: The usage of getParent() multiple times in the code snippet suggests that the desired component is located several levels above the current component. Adjust the number of getParent() calls based on your component tree structure to navigate to the correct level.

I hope this explanation clarifies the difference between getParent() and getFellow() and how they are used in the provided code snippet.