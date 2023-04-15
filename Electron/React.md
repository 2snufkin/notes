# Electron React
there are several ways to start a React project:
1. Strat with the bootstrap project from this course: good for small project
2. `npx create-electron-app name --template=webpack`: you need to config react yourslef
3. `create react app`: was mentioned that it does not recommended
4. electron-react-boilerplate: https://github.com/electron-react-boilerplate/electron-react-boilerplate. Can be overkill for small projects. it has redux, store etc..

## Dev dep
babel: translate to JS
css + style loader: import css
file-loader: import files
webpack: 

## Mise en place
in the package.json change the title, description etc... in the webpack.xxx.config.js change the title inside `new HtmlWebpackPlugin()`. Pay attention that there are two files: one for dev and one for prod

## React Bootstrap
it allow you to use the bootstrap framework as a React component. For example instead of using a div with the class alert, we can use <Alert>
for it to work you need to have bootsrap already install in you project.\
If you have it installed, run:
`npm install react-bootstrap`: install react-bootstrap
else:
`npm install react-bootstrap bootstrap`: install react-bootstrap + bootstrap
If you want to use the bootstrap css you need to load them. Webpack and StyleLoader allow you to do so.

in the injext.js iport the bootstrap css
``import 'bootstrap/dist/css/bootstrap.min.css'	

# DB actions with React
It's generally not recommended to write CRUD methods directly in your React components, as this can lead to tightly coupled code that is difficult to maintain and test. Instead, it's a good practice to separate the concerns of your application and follow the Single Responsibility Principle.

One approach to organizing your code would be to create a separate service or data access layer to handle all database-related operations, including CRUD methods. This service could be implemented in a separate module or file and imported into your main.js or index.js file as needed.

In an Electron app, you might consider using a local database such as SQLite, which can be accessed using libraries like SQLite3 or Sequelize. Your service layer would then use these libraries to perform database operations.

Creating a separate service layer has the added benefit of making it easier to switch out the underlying database implementation in the future, without having to make significant changes to your React components.

So, in summary, it's a good practice to create a separate service or data access layer to handle CRUD methods and keep your React components focused on rendering UI elements and responding to user input.

fetch the need data²
*fd

µ£mplkjnhgbfv<qwsdfghuuygtrfdssezr(t-)