# Tailwind CSS Crash Course
Tailwind CSS is an open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables.
[cheatsheet](https://tailwindcomponents.com/cheatsheet/)

## Install
The best way to install Tailwind is to go to the [docs](https://tailwindcss.com/docs/installation).
There are also a framework guide that guide how to install per framework
There are multiple ways to install Tailwind CSS:

1. npm: 
```bash
npm install tailwindcss
```



2. CDN: 
```html
  <script src="https://cdn.tailwindcss.com"></script>
```
If you want to get only the css file:
```html
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
```

3. Download: You can download the CSS file from the official website and link it in your HTML file.

## Common Properties
+ shorcuts: Tailwind uses -sm for small, -md for medium , -lf for large, -xl for extra large etc...Those are translated to pixels at the end.
Tailwind CSS provides a vast range of utility classes for common properties like colors, spacing, typography, and more. Here are some examples:

### Colors

```html
<div class="bg-blue-500 text-white p-4">
  This div has a blue background with white text.
</div>
```

### Spacing
the number is a multiple of 4. p-4 is 16px, p-0.5 is 2px , p-0 is zero pixels.If you divide by 4 you will get the valur in rem units.\
px: left + right padding.\
py: top + bottom pdding.\
```html
<div class="p-4 m-2">
  Padding: 1rem, Margin: 0.5rem
</div>
```

### Typography

```html
<p class="text-2xl font-bold">
  This is a paragraph with larger and bold text.
</p>
```

## States

Tailwind CSS allows you to apply styles to elements on different states: hover,focus etc... The syntax is state:property
ex: `hover:bg-blue-600 hover:cursor-pointer`

```html
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Hover me!
</button>
```

## Responsive Design
In Tailwind CSS, breakpoints refer to specific screen widths at which the styles applied to an element can change to accommodate different screen sizes. The breakpoints you provided are the minimum widths at which these changes occur:

1. `sm`: 640px
2. `md`: 768px
3. `lg`: 1024px
4. `xl`: 1280px
5. `2xl`: 1536px

```html
<div class="lg:flex lg:justify-between">
  <div class=" md:w-32 lg:w-48">Content on larger screens</div>
</div>
```
**Range:** If you want to cover a range use the following syntax from:max-to  `md:max-lg`
### Mobile
for mobile defention don't target any breakpoint, then for PC target the sm. example:
the text will be small on mobile but xl on a PC. Mobile are around 390px wide. They don't fulfill the entry condition for sm which is minimum of 640px.
<p class="text-m sm:text-xl">
## Dark Mode

Implementing dark mode is simple with Tailwind CSS:

```html
<div class="bg-white dark:bg-gray-800">
  <p class="text-black dark:text-white">Toggle dark mode!</p>
</div>
```

## Custom Configuration

Tailwind CSS is highly customizable. You can extend or override its default configuration. For example, adding custom colors:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FFA500',
        secondary: '#00FF00',
      },
    },
  },
};
```

## Project Demo

Now let's build a complete web page using Tailwind CSS:

```html
<!-- Your complete web page code goes here -->
```

## Header and Hero Section

The header and hero section are essential components of a web page. Here's an example:

```html
<header class="bg-gray-900 text-white py-4">
  <nav class="container mx-auto px-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">My Website</h1>
    <ul class="flex space-x-4">
      <li><a href="#" class="hover:text-blue-500">Home</a></li>
      <li><a href="#" class="hover:text-blue-500">About</a></li>
      <li><a href="#" class="hover:text-blue-500">Contact</a></li>
    </ul>
  </nav>
</header>

<section class="bg-gray-300 py-20 text-center">
  <h2 class="text-4xl font-bold">Welcome to My Website!</h2>
  <p class="mt-4">Learn all about Tailwind CSS here.</p>
</section>
```

## Footer

Create a footer section to complete the web page:

```html
<footer class="bg-gray-800 text-white py-4 text-center">
  <p>&copy; 2023 My Website. All rights reserved.</p>
</footer>
```

## Responsive Screen and Component Tools

Tailwind CSS offers responsive screen and component tools to make your development process more efficient:

### Breakpoints

```html
<div class="lg:w-1/2 md:w-2/3 sm:w-full">Responsive width based on breakpoints</div>
```

### Component Reusability with @apply

```html
<style>
  .btn {
    @apply px-4 py-2 rounded text-white font-semibold;
  }
  .primary {
    @apply bg-blue-500 hover:bg-blue-600;
  }
  .secondary {
    @apply bg-gray-500 hover:bg-gray-600;
  }
</style>

<button class="btn primary">Primary Button</button>
<button class="btn secondary">Secondary Button</button>
```

## Integrating Tailwind CSS in React Project

To integrate Tailwind CSS into a React project, follow these steps:

1. Install required dependencies:

```bash
npm install tailwindcss postcss autoprefixer
```

2. Create a `tailwind.config.js` file:

```bash
npx tailwindcss init
```

3. In the `tailwind.config.js` file, extend the theme as needed:

```javascript
module.exports = {
  theme: {
    extend: {
      // Your custom theme settings here
    },
  },
};
```

4. Create a `postcss.config.js` file:

```javascript
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
```

5. Import Tailwind CSS styles into your main CSS file (e.g., `styles.css`):

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

6. Import the CSS file into your React components:

```javascript
import React from 'react';
import './styles.css';

const App = () => {
  // Your React components
};

export default App;
```

You're all set! You can now use Tailwind CSS utility classes in your React components.

---

Congratulations! You've completed the Tailwind CSS Crash Course Documentation. Now you have the skills to create stunning and responsive web interfaces using Tailwind CSS in both standalone projects and React applications. Happy coding! 🚀