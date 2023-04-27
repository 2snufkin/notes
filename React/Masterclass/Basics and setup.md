# Esstinals

## Environment setup
+ You must have Node.js installed. It will be used to compile the React app\
*you can check if it's installed by using the `node -v` commend*

## VS 
you can navigate to the folder in the cmd and type `code .`, this will open Visual Studio with this folder loaded

### Plugins
+ Auto Import
+ ES7+ React/Redux/React-Native
+ IntelliCode
+ Material Icon Team

### Setting
File -> Setting -> (search for) 
1. emmet include language -> Add Item. Add javascript as an item and value javascriptreact
2. sticky scrool: check the "show the nested current scope..."

## Docs
1. [old docs](https://legacy.reactjs.org/docs/getting-started.html)
2. [new docs](https://react.dev/)

## Online
if you want to run your app, or a part of your app online you can use [stackblitz](https://stackblitz.com/edit/react-wk5wsw?file=src%2FApp.js)

## Creating a project
it's much more complex then just creating an html + js file with vanilla JS since React code incluse syntax  that the browser doesn't understand, various optimizations should be applied before deployment, a react file has jsx extention which is not supported by browsers etc... So more complex project setup is resquired. To add to it, 

1. create a folder in the location that you want the code to reside
2. use a boilerplate tool / boilerplate code from git
3. run npm install
4. npm run dev while using vite || npm start

### boilerplate tool
you can use the following build tools:
1. create reacte app: a way to start building a new single-page application in React.
`npx create-react-app appname`. if you run `npx create-react-app .` it will exctrat everything in the current folder, otherwise it will create a sub-folder named appname
2. create-vite: more recommended. A tool to quickly start a project from a basic template for popular frameworks.
`npm create vite`

*a project created with create react let you write jsx code inside js file. Vite - not. You will need to use the .jsx*

# How react works
if you delete the src folder you will see that there is a compile error. React does not find the src/index.js. This is the only file it needs. We can write all the application inside this file but we don't do it, we divide it into components. But eventelly all the app is inderictly inside index.js since index.js imoport all the compoentns (or a parent component)