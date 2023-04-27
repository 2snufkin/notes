
# Styling React Apps
– Style JSX elements via inline style assignments or with the help of CSS classes
– Set inline and class styles, both statically and dynamically or conditionally
– Build reusable components that allow for style customization
– Utilize CSS Modules to scope styles to components
– Understand the core idea behind styled-components, a third-party CSS-in-JS library

It can be done with:
1. Inline styling:  typically discouraged.
2. External Styling

## How Does Styling Work in React Apps?
You find an import statement in the root entry file (this is the index.js file in projects generated via create-react-app):
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

```
The import './index.css'; statement leads to the CSS file being imported and the defined CSS code being applied to the rendered web page.
It is worth noting that this is not standard JavaScript behavior. **You can't import CSS files into JavaScript—at least not if you're just using vanilla JavaScript.**

It works in React apps because the code is transpiled before it's loaded into the browser. Therefore, you won't find that import statement in the final JavaScript code that's executed in the browser. Instead, during the transpilation process, the transpiler identifies the CSS import, removes it from the JavaScript file, and injects the CSS code (or an appropriate link to the potentially bundled and optimized CSS file) into the index.html file. You can confirm this by inspecting the rendered Document Object Model (DOM) content of the loaded web page in the browser.

You can define any styles you want to apply to your HTML elements (that is, to your JSX elements in your components) directly:
1. inside of the index.css file or in any other CSS files that are imported by the index.css file. 
2. in other css files. You must add additional CSS import statements, pointing at other CSS files, to the index.js file or any other JavaScript files (including files that store components).

### It's all global
**CSS styles are always global.**
No matter whether you import a CSS file in index.js or in a component-specific JavaScript file, the styles defined in that CSS file will be applied globally.
#### Example
That means that styles defined in a goal-list.css file, which may be imported in a GoalList.js file, could still affect JSX elements defined in a totally different component. Later in this chapter, you will learn about techniques that allow you to avoid accidental style clashes and implement style scoping.
Using Inline Styles

# Inline styling

Why it's discouraged? the following discussion on Stack Overflow provides many arguments against inline styles: https://stackoverflow.com/questions/2612483/whats-so-bad-about-in-line-css.

It is done by using the style prop which expects to receive a JavaScript object that contains the style settings—not a plain string (like in HTML). 
Inside the style object, any CSS style properties supported by the underlying DOM element can be set. The property names are those defined for the HTML element (i.e., the same CSS property names you could target and set with vanilla JavaScript, when mutating an HTML element).

Setting inline styles in JSX code works like this:
```
function TodoItem() {
  return <li style={{color: 'red', fontSize: '18px'}}>Learn React!</li>;
};
```
compare with HTML : `<li style="color: red; font-size: 18px">Learn React!</li>`


## Why {{}}
Since the style object is an object and not a plain string, it is passed as a value between curly braces—just as an array, a number, or any other non-string value would have to be set between curly braces (anything between double or single quotes is treated as a string value). Therefore, it's worth noting that the preceding example does not use any kind of special "double curly braces" syntax, but instead uses one pair of curly braces to surround the non-string value and another pair to surround the object data.

## Naming
When setting styles in JavaScript code (as with the style prop shown above), JavaScript CSS property names have to be used. Those names are similar to the CSS property names you would use in CSS code but not quite the same. Differences occur for property names that consist of multiple words (e.g., font-size). When targeting such properties in JavaScript, camelCase notation must be used (fontSize instead of font-size) as JavaScript properties cannot contain dashes. Alternatively, you could wrap the property name with quotes ('font-size').

## Setting inline css dynamically

Here's an example where the color of a paragraph is set dynamically to the color a user enters into an input field:
```
function ColoredText() {
  const [enteredColor, setEnteredColor] = useState('');
  function updateTextColorHandler(event) {
    setEnteredColor(event.target.value);
  };
  return (
    <>
      <input type="text" onChange={updateTextColorHandler}/>
      <p style={{color: enteredColor}}>This text's color changes dynamically!</p>
    </>
  );
};

```

The text entered in the `<input>` field is stored in the enteredColor state. This state is then used to set the color CSS property of the `<p>` element dynamically. This is achieved by passing a style object with the color property set to the enteredColor value as a value to the style prop of the `<p>` element. The text color of the paragraph is therefore set dynamically to the value entered by the user (assuming that users enter valid CSS color values into the `<input>` field).

## Conditionally
In this example, the background color of the <input> element is set conditionally, based on the values received via the isValid and isRecommended props.

```
function TextInput({isValid, isRecommended, inputConfig}) {
  let bgColor = 'black';
  if (isRecommended) {
    bgColor = 'blue';
  }
  if (!isValid) {
    bgColor = 'red';
  }
  return <input style={{backgroundColor: bgColor}} {...inputConfig} />
};

```

# External CSS File
As mentioned, using inline styles is typically discouraged, and therefore, CSS styles defined in CSS files (or between <style> tags in the document <head> section) are preferred.
As long as this code gets added to the page via import, the styling will be applied.

Quite frequently, developers aim to target specific elements or groups of elements. Instead of applying some style to all <li> elements on a page, the goal could be to only target the <li> elements that are part of a specific list. Consider this HTML structure that's rendered to the page (it may be split across multiple components, but this doesn't matter here):

## className and not class
when using classes in your JSX code you must use the className. Using `class` will result in a warning in the browser developer tools. 

```
 Course Goals</h2>
  <ul>
    <li class="goal-item">Learn React!</li> //wrong
    <li className="goal-item">Master React!</li> //correct
  </ul>
</nav>
```
But why is React suggesting you use className instead of class?
It's similar to using htmlFor intead of for when working with <label> objects. Just like for, class is a keyword in JavaScript so className is used instead.

 ## Setting className dynamically
 CSS classes can also be set dynamically, as in the following snippet:
```
function TodoPriority() {
  const [chosenPriority, setChosenPriority] = useState('low-prio');
  function choosePriorityHandler(event) {
    setChosenPriority(event.target.value);
  };
  return (
    <>
      <p className={chosenPriority}>Chosen Priority: {chosenPriority}</p>
      <select onChange={choosePriorityHandler}>
        <option value="low-prio">Low</option>
        <option value="high-prio">High</option>
      </select>
    </>
  );
};
```
In this example, the chosenPriority state will alternate between low-prio and high-prio, depending on the drop-down selection. The state value is then output as text inside the paragraph and is also used as a dynamic CSS class name applied to the <p> element. For this to have any visual effect, there must, of course, be low-prio and high-prio CSS classes defined in some CSS file or <style> block. 

## Conditional Styles
Closely related to dynamic styles are conditional styles. 
In fact, in the end, they are really just a special case of dynamic styles. 
In the previous examples, inline style values and class names were set equal to values chosen or entered by the user.
However, you can also derive styles or class names dynamically based on different conditions, as shown here:
```
function TextInput({isValid, isRecommended, inputConfig}) {
  let cssClass = 'input-default';
  if (isRecommended) {
    cssClass = 'input-recommended';
  }
  if (!isValid) {
    cssClass = 'input-invalid';
  }
  return <input className={cssClass} {...inputConfig} />
};


In this concrete example, the default styles are applied using CSS classes. If the isValid prop value is true and the value of the isRecommended prop is false, the input-default CSS class will be applied to the <input> element since neither of the two if statements become active.

In this example, a wrapper component around the standard. The main purpose of this wrapper component is to set some default styles for the wrapped <input> element. The wrapper component is built to provide a pre-styled input element that can be used anywhere in the app. Indeed, providing pre-styled elements is one of the most common and popular use cases for building wrapper components.



If isRecommended is true (but isValid is false), the input-recommended CSS class would be applied. If isValid is false, the input-invalid class is added instead. Of course, the CSS classes must be defined in some imported CSS files (for example, in index.css).



# Combining Multiple Dynamic CSS Classes

In previous examples, a maximum of one CSS class was set dynamically at a time. However, it's not uncommon to encounter scenarios where multiple, dynamically derived CSS classes should be merged and added to an element.

Consider the following example:

function ExplanationText({children, isImportant}) {
  const defaultClasses = 'text-default text-expl';
  return <p className={defaultClasses}>{children}</p>;
}

Here, two CSS classes are added to <p> by simply combining them in one string. Alternatively, you could directly add a string with the two classes like this:

return <p className="text-default text-expl">{children}</p>;

This code will work, but what if the goal is to also add another class name to the list of classes, based on the isImportant prop value (which is ignored in the preceding example)?

Replacing the default list of classes would be easy, as you have learned:

function ExplanationText({children, isImportant}) {
  let cssClasses = 'text-default text-expl';
  if (isImportant) {
    cssClasses = 'text-important';
  }
  return <p className={cssClasses}>{children}</p>;
}

But what if the goal is not to replace the list of default classes? What if text-important should be added as a class to <p>, in addition to text-default and text-expl?

The className prop expects to receive a string value, and so passing an array of classes isn't an option. However, you can simply merge multiple classes into one string. And there are a couple of different ways of doing that:

    String concatenation:

    cssClasses = cssClasses + ' text-important';

Using a template literal:

cssClasses = `${cssClasses} text-important`;

Joining an array:

cssClasses = [cssClasses, 'text-important'].join(' ');

These examples could all be used inside the if statement (if (isImportant)) to conditionally add the text-important class based on the isImportant prop value. All three approaches, as well as variations of these approaches, will work because all these approaches produce a string. In general, any approach that yields a string can be used to generate values for className.
Merging Multiple Inline Style Objects

When working with inline styles, instead of CSS classes, you can also merge multiple style objects. The main difference is that you don't produce a string with all values, but rather an object with all combined style values.

This can be achieved by using standard JavaScript techniques for merging multiple objects into one object. The most popular technique involves using the spread operator, as shown in this example:

function ExplanationText({children, isImportant}) {
  let defaultStyle = { color: 'black' };
  if (isImportant) {
    defaultStyle = { ...defaultStyle, backgroundColor: 'red' };
  }
  return <p style={defaultStyle}>{children}</p>;
}

Here, you will observe that defaultStyle is an object with a color property. If isImportant is true, it's replaced with an object that contains all the properties it had before (via the spread operator, ...defaultStyle) as well as the backgroundColor property.

Note

For more information on the function and use of the spread operator, see Chapter 5, Rendering Lists and Conditional Content.
Building Components with Customizable Styles

As you are aware by now, components can be reused. This is supported by the fact that they can be configured via props. The same component can be used in different places on a page with different configurations to yield a different output.

Since styles can be set both statically and dynamically, you can also make the styling of your components customizable. The preceding examples already show such customization in action; for example, the isImportant prop was used in the previous example to conditionally add a red background color to a paragraph. The ExplanationText component therefore already allows for indirect style customization via the isImportant prop.

Besides this form of customization, you could also build components that accept props already holding CSS class names or style objects. For example, the following wrapper component accepts a className prop that is merged with a default CSS class (btn):

function Button({children, config, className}) {
  return <button {...config} className={`btn ${className}`}>{children}</button>;
};

This component could be used in another component in the following way:

<Button config={{onClick: doSomething}} className="btn-alert">Click me!</Button>

If used like this, the final <button> element would receive both the btn as well as btn-alert classes.

You don't have to use className as a prop name; any name can be used, since it's your component. However, it's not a bad idea to use className because you can then keep your mental model of setting CSS classes via className (for built-in components, you will not have that choice).

Instead of merging prop values with default CSS class names or style objects, you can also overwrite default values. This allows you to build components that come with some styling out of the box without enforcing that styling:

function Button({children, config, className}) {
  let cssClasses = 'btn';
  if (className) {
    cssClasses = className;
  }
  return <button {...config} className={cssClasses}>{children}</button>;
};

You can see how all these different concepts covered throughout this book are coming together here: props allow customization, values can be set, swapped, and changed dynamically and conditionally, and therefore, highly reusable and configurable components can be built.
Customization with Fixed Configuration Options

Besides exposing props such as className or style, which are merged with other classes or styles defined inside a component function, you can also build components that apply different styles or class names based on other prop values.

This has been shown in the previous examples where props such as isValid or isImportant were used to apply certain styles conditionally. This way of applying styles could therefore be called "indirect styling" (though this is not an official term).

Both approaches can shine in different circumstances. For wrapper components, for example, accepting className or style props (which may be merged with other styles inside the component) enables the component to be used just like a built-in component (e.g., like the component it wraps). Indirect styling, on the other hand, can be very useful if you want to build components that provide a couple of pre-defined variations.

A good example is a text box that provides two built-in themes that can be selected via a specific prop:

function TextBox({children, mode}) {
  let cssClasses;
  if (mode === 'alert') {
    cssClasses = 'box-alert';
  } else if (mode === 'info') {
    cssClasses = 'box-info';
  }
  return <p className={cssClasses}>{children}</p>;
};

This TextBox component always yields a paragraph element. If the mode prop is set to any value other than 'alert' or 'info', the paragraph doesn't receive any special styling. But if mode is equal to 'alert' or 'info', specific CSS classes are added to the paragraph.

This component therefore doesn't allow direct styling via some className or style prop that would be merged, but it does offer different variations or themes that can be set with the help of a specific prop (the mode prop in this case).
The Problem with Unscoped Styles

If you consider the different examples you've so far dealt with in this chapter, there's one specific use case that occurs quite frequently: styles are relevant to a specific component only.

For example, in the TextBox component in the previous section, 'box-alert' and 'box-info' are CSS classes that are likely only relevant for this specific component and its markup. If any other JSX element in the app had a 'box-alert' class applied to it (even though that might be unlikely), it probably shouldn't be styled the same as the <p> element in the TextBox component.

Styles from different components could clash with each other and overwrite each other because styles are not scoped (i.e., restricted) to a specific component. CSS styles are always global, unless inline styles are used (which is discouraged, as mentioned earlier).

When working with component-based libraries such as React, this lack of scoping is a common issue. It's easy to write conflicting styles as app sizes and complexities grow (or, in other words, as more and more components are added to the code base of a React app).

That's why various solutions for this problem have been developed by members of the React community. The following are two of the most popular solutions:

    CSS Modules (supported out of the box in React projects created with create-react-app)
    Styled components (using a third-party library called styled-components)

Scoped Styles with CSS Modules

CSS Modules is the name for an approach where individual CSS files are linked to specific JavaScript files and the components defined in those files. This link is established by transforming CSS class names, such that every JavaScript file receives its own, unique CSS class names. This transformation is performed automatically as part of the code build workflow. Therefore, a given project setup must support CSS Modules by performing the described CSS class name transformation. Projects created via create-react-app support CSS Modules by default.

CSS Modules are enabled and used by naming CSS files in a very specific and clearly defined way: <anything>.module.css. <anything> is any value of your choosing, but the .module part in front of the file extension is required as it signals (to the project build workflow) that this CSS file should be transformed according to the CSS Modules approach.

Therefore, CSS files named like this must be imported into components in a specific way:

import classes from './file.module.css';

This import syntax is different from the import syntax shown at the beginning of this section for index.css:

import './index.css';

When importing CSS files as shown in the second snippet, the CSS code is simply merged into the index.html file and applied globally. When using CSS Modules instead (first code snippet), the CSS class names defined in the imported CSS file are transformed such that they are unique for the JS file that imports the CSS file.

Since the CSS class names are transformed and are therefore no longer equal to the class names you defined in the CSS file, you import an object (classes, in the preceding example) from the CSS file. This object exposes all transformed CSS class names under keys that match the CSS class names defined by you in the CSS file. The values of those properties are the transformed class names (as strings).

Here's a complete example, starting with a component-specific CSS file (TextBox.module.css):

.alert {
  padding: 1rem;
  border-radius: 6px;
  background-color: salmon;
  color: red;
}
.info {
  padding: 1rem;
  border-radius: 6px;
  background-color: #d6aafa;
  color: #410474;
}

The JavaScript file (TextBox.js) for the component to which the CSS code should belong looks like this:

import classes from './TextBox.module.css';
function TextBox({ children, mode }) {
  let cssClasses;
  if (mode === 'alert') {
    cssClasses = classes.alert;
  } else if (mode === 'info') {
    cssClasses = classes.info;
  }
  return <p className={cssClasses}>{children}</p>;
}
export default TextBox;

Note

The full example code can also be found at https://packt.link/13nwz.

If you inspect the rendered text element in the browser developer tools, you will note that the CSS class name applied to the <p> element does not match the class name specified in the TextBox.module.css file:
Figure 6.4: CSS class name transforms because of CSS Modules usage

Figure 6.4: CSS class name transforms because of CSS Modules usage

This is the case because, as described previously, the class name was transformed during the build process to be unique. If any other CSS file, imported by another JavaScript file, were to define a class with the same name (info in this case), the styles would not clash and not overwrite each other because the interfering class names would be transformed into different class names before being applied to the DOM elements.

Indeed, in the example provided on GitHub, you can find another info CSS class defined in the index.css file:

.info {
  border: 5px solid red;
}

That file is still imported into index.js, and hence its styles are applied globally to the entire document. Nonetheless, the .info styles clearly aren't affecting <p> rendered by TextBox (there is no red border around the text box in Figure 6.4). They aren't affecting that element because it doesn't have an info class anymore; the class was renamed to text-box_info__vCxmZ by the build workflow (though the name will differ as it contains a random element).

It's also worth noting that the index.css file is still imported into index.js, as shown at the beginning of this chapter. The import statement is not changed to import classes from './index.css';, nor is the CSS file called index.module.css.

Note, too, that you can use CSS Modules to scope styles to components and can also mix the usage of CSS Modules with regular CSS files, which are imported into JavaScript files without using CSS Modules (i.e., without scoping).

One other important aspect of using CSS Modules is that you can only use CSS class selectors (that is, in your .module.css files) because CSS Modules rely on CSS classes. You can write selectors that combine classes with other selectors, such as input.invalid, but you can't add selectors that don't use classes at all in your .module.css files. For example, input { ... } or #some-id { ... } selectors wouldn't work here.

CSS Modules are a very popular way of scoping styles to (React) components, and they will be used throughout many examples for the rest of this book.
The styled-components Library

The styled-components library is a so-called CSS-in-JS solution. CSS-in-JS solutions aim to remove the separation between CSS code and JavaScript code by merging them into the same file. Component styles would be defined right next to the component logic. It comes down to personal preference whether you favor separation (as enforced by using CSS files) or keeping the two languages close to each other.

Since styled-components is a third-party library that's not pre-installed in newly created React projects, you have to install this library as a first step if you want to use it. This can be done via npm (which was automatically installed together with Node.js in Chapter 1, React – What and Why):

npm install styled-components

The styled-components library essentially provides wrapper components around all built-in core components (as in, around p, a, button, input, and so on). It exposes all these wrapper components as tagged templates—JavaScript functions that aren't called like regular functions, but are instead executed by adding backticks (a template literal) right after the function name, for example, doSomething'text data'.

Note

Tagged templates can be confusing when you see them for the first time, especially since it's a JavaScript feature that isn't used too frequently. Chances are high that you haven't worked with them too often. It's even more likely that you have never built a custom tagged template before. You can learn more about tagged templates in this excellent documentation on MDN at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates.

Here is a component that imports and uses styled-components to set and scope styling:

import styled from 'styled-components';
const Button = styled.button`
  background-color: #370566;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
`;
export default Button;

This component isn't a component function but rather a constant that stores the value returned by executing the styled.button tagged template. That tagged template returns a component function that yields a <button> element. The styles passed via the tagged template (i.e., inside the template literal) are applied to that returned button element. You can see this if you inspect the button in the browser developer tools:
Figure 6.5: The rendered button element receives the defined component styles

Figure 6.5: The rendered button element receives the defined component styles

In Figure 6.5, you can also see how the styled-components library applies your styles to the element. It extracts your style definitions from the tagged template string and injects them into a <style> element in the <head> section of the document. The injected styles are then applied via a class selector that is generated (and named) by the styled-components library. Finally, the automatically generated CSS class name is added to the element (<button>, in this case) by the library.

The components exposed by the styled-components library spread any extra props you pass to a component onto the wrapped core component. In addition, any content inserted between the opening and closing tags is also inserted between the tags of the wrapped component.

That's why the Button created previously can be used like this without adding any extra logic to it:

import Button from './components/button';
function App() {
  function clickHandler() {
    console.log('This button was clicked!');
  }
  return <Button onClick={clickHandler}>Click me!</Button>;
}
export default App;

Note

The complete example code can be found on GitHub at https://packt.link/XD6IL.

You can do more with the styled-components library. For example, you can set styles dynamically and conditionally. This book is not primarily about that library though. It's just one of many alternatives to CSS Modules. Therefore, it is recommended that you explore the official styled-components documentation if you want to learn more, which you can find at https://styled-components.com/.
Using Other CSS or JavaScript Styling Libraries and Frameworks

As mentioned, there are many third-party styling libraries that can be used in React apps. There are alternatives to styled-components or CSS Modules that help with scoping styles. But there are also other kinds of CSS libraries:

    Utility libraries that solve very specific CSS problems—independent of the fact that you're using them in a React project (for example, Animate.css, which helps with adding animations)
    CSS frameworks that provide a broad variety of pre-built CSS classes that can be applied to elements to quickly achieve a certain look (e.g., Bootstrap or Tailwind)

It is important to realize that you can use any of these CSS libraries with React. You can bring your favorite CSS framework (such as Bootstrap or Tailwind) and use the CSS classes provided by that framework on the JSX elements of your React app.

Some libraries and frameworks have React-specific extensions or specifically support React, but that does not mean that you can't use libraries that don't have this.
Summary and Key Takeaways

    Standard CSS can be used to style React components and JSX elements.
    CSS files are typically directly imported into JavaScript files, which is possible thanks to the project build process, which extracts the CSS code and injects it into the document (the HTML file).
    As an alternative to global CSS styles (with element, id, class, or other selectors), inline styles can be used to apply styling to JSX elements.
    When using CSS classes for styling, you must use the className prop (not class).
    Styles can be set statically and dynamically or conditionally with the same syntax that is used for injecting other dynamic or conditional values into JSX code—a pair of curly braces.
    Highly configurable custom components can be built by setting styles (or CSS classes) based on prop values or by merging received prop values with other styles or class name strings.
    When using just CSS, clashing CSS class names can be a problem.
    CSS Modules solve this problem by transforming class names into unique names (per component) as part of the build workflow.
    Alternatively, third-party libraries such as styled-components can be used. This library is a CSS-in-JS library that also has the advantage or disadvantage (depending on your preference) of removing the separation between JS and CSS code.
    Other CSS libraries or frameworks can be used as well; React does not impose any restrictions regarding that.

What's Next?

With styling covered, you're now able to build not just functional but also visually appealing user interfaces. Even if you often work with dedicated web designers or CSS experts, you still typically need to be able to set and assign styles (dynamically) that are delivered to you.

With styling being a general concept that is relatively independent of React, the next chapter will dive back into more React-specific features and topics. You will learn about portals and refs, which are two key concepts that are built into React. You will understand which problems are solved by these concepts and how the two features are used.
Test Your Knowledge!

Test your knowledge of the concepts covered in this chapter by answering the following questions. You can then compare your answers to examples that can be found here: https://packt.link/vJgKI.

    With which language are styles for React components defined?
    Which important difference between projects with and without React has to be kept in mind when assigning classes to elements?
    How can styles be assigned dynamically and conditionally?
    What does "scoping" mean in the context of styling?
    How could styles be scoped to components? Briefly explain at least one concept that helps with scoping.

Apply What You Learned

You are now not only able to build interactive user interfaces but also style those user interface elements in engaging ways. You can set and change those styles dynamically or based on conditions.

In this section, you will find two activities that allow you to apply your newly gained knowledge in combination with what you learned in previous chapters.
Activity 6.1: Providing Input Validity Feedback upon Form Submission

In this activity, you will build a basic form that allows users to enter an email address and a password. The provided input of each input field is validated, and the validation result is stored (for each individual input field).

The aim of this activity is to add some general form styling and some conditional styling that becomes active once an invalid form has been submitted. The exact styles are up to you, but for highlighting invalid input fields, the background color of the affected input field must be changed, as well as its border color and the text color of the related label.

The steps are as follows:

    Create a new React project and add a form component to it.
    Output the form component in the project's root component.
    In the form component, output a form that contains two input fields: one for entering an email address and one for entering a password.
    Add labels to the input fields.
    Store the entered values and check their validity upon form submission (you can be creative in forming your own validation logic).
    Pick appropriate CSS classes from the provided index.css file (you can write your own classes as well).
    Add them to the invalid input fields and their labels once invalid values have been submitted.

The final user interface should look like this:
Figure 6.6: The final user interface with invalid input values highlighted in red

Figure 6.6: The final user interface with invalid input values highlighted in red

Since this book is not about CSS and you may not be a CSS expert, you can use the index.css file from the solution and focus on the React logic to apply appropriate CSS classes to JSX elements.

Note

The solution to this activity can be found via this link.
Activity 6.2: Using CSS Modules for Style Scoping

In this activity, you'll take the final app built in Activity 6.01 and adjust it to use CSS Modules. The goal is to migrate all component-specific styles into a component-specific CSS file, which uses CSS Modules for style scoping.

The final user interface therefore looks the same as it did in the previous activity. But the styles will be scoped to the Form component so that clashing class names won't interfere with styling.

The steps are as follows:

    Finish the previous activity or take the finished code from GitHub.
    Identify the styles belonging specifically to the Form component and move them into a new, component-specific CSS file.
    Change CSS selectors to class name selectors and add classes to JSX elements as needed (this is because CSS Modules require class name selectors).
    Use the component-specific CSS file as explained throughout this chapter and assign the CSS classes to the appropriate JSX elements.

    Note

    The solution to this activity can be found via this link.

End of Chapter 6
