# Start Here

## Mise en place
+ You must have Node.js installed

## Creating a project
it's much more complex then just creating an html + js file with vanilla JS since React code incluse syntax  that the browser doesn't understand, various optimizations should be applied before deployment, a react file has jsx extention which is not supported by browsers etc... So more complex project setup is resquired. To add to it, 

1. create a folder in the location that you want the code to reside
2. use a boilerplate tool / boilerplate code from git
3. run npm install
4. npm run dev while using vite || npm start

you can use the following build tools:
1. create reacte app: a way to start building a new single-page application in React.

*a project created with create react let you write jsx code inside js file. Vite - not. You will need to use the .jsx*

## Project Structure
+ main.jsx: the entry code to the app. It imports: React, ReactDom and the App component
+ index.html: the onlt HTML file in a react project. used by main.jsx to render React code (the App component) inside the index.html
+ App.jsx: exporting a function called App. the function return more jsx code
+ package.json: used by Node.js and front-end projects to manage the dependencies/3rd partie packages that you want to use in your code.
+ React component : a function that return jsx code. A react component can be used a,d reused in other jsx code.


# Building Components
1. create a folder for the components
2. create a new jsx file. it's a common practice to capitiliaze file names that contains react components
3. write the component function without the body and named it with an upper case. Give it signeficant name that will hint about it's porpose
4. export the function you can either use `export function` or at the end of the file `export default Function`. The way you export will impact the way you import it 
5. return jsx code
6. To see it in action - use the component: 
I. import it `import ComponenName from './components/ComponentName` . *the import path is the relative path from pp.jsx*\
II.  include it in another component or in the App component in this way <Component />
*if you use the component in other component, it must start with an uppercase letter. Why? If it will start with lowercase react will think it's an HTML component and search for it, it won't find*


stoped at: Building a First Custom Component

# State management




# Forms



# Adding backend



# Routing

