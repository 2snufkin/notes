# New Project

## Setup with the bootstrapcode
1. start with the bootstrap code
2. change the icon. provide an icon for each OS
3. run `npm install`
4. in the package.json file:
+ change productName and name: assign it with the name of the app
+ change the description
5. in the index.html 
+ change the <title>
+ adjust the body
6. in the main.js, change the title in the createNewWindow method
7. run ` npm run dev`: running npm start will run the app without nodemon


# Setup without the bootstrap code
1. start with an empty folder
2. `npm init`set the entry point to main.js
3. `npm i -D electron`: D is for dev dependency == --save-dev
4. in package.json add a script for run electron. the . symbol is for current directory. it should run the main.js
```
"script":{
"start" : "electron ."
}

```
5. create main.js
6. do something inside the file
7. run `npm start`
8. stop with Ctrl + c

`npm start`: run the app
`ctrl +q `: kill the process


## Project Structure
3 folders: app , assets, node_module, main.js, package.json , package-lock.json
in the app folder you wil lhave your html, css and js folders

# Creating the interface
use can use materialize and font awesome
*CDN: not good. you want to keep things local and not network dependent
solution : download the assets the css + webfonts + js folders 
*css: materialize.min.css + font awesome css
*js: materlize.js
*webfonts: hold the icons
## HTML 
make sure to warp the content of the html in a div that has a css class with the same width   of the window as define in main.js\
if the window will be x and the html will be more then x - you will see a scrollbar 
add all the css files needed to your html
<link rel="stylesheet" href="css/*.css">
if you use materialier include the script
<script src="js/materialize.min.js"></script>

### Adding functionality
Let you use modules
you can either:
1. create a .js file and use it in the HTML with the `<script>`
2. write the script inside the html file.for this to work you need to add a config to the main.js
```
<script>
const path = require('path')
....
</script>

```
# Rendre Node integration 
You will see in the console 
`Uncaught ReferenceError: require is not defined`\
to resolve it you should add an option to the BrowserWindow constructor

```
new BrowserWindow({
	webPreferences : {
		nodeIntegration : true,
	},

})

```
Node integration allow you to get the path of a file that was upload via the HTML
1. capture the HTML element: get ElementBy.. and save it in a variable
2. `variable.files[x].path`: files is an array. if you want only the first file put 0 instaed of x


### Useful methods

#### open a folder
you want the app to open a folder:
1. import shell from electron
2. `shell.openItem(path)`

#### make paths for windows and mac
You use backslashes (\) in Windows, but forward slashes (/) in everything else. it's a lot of work to work with condition: if you are in windows you backslashes else use forward. there is a library that do that for us => slash
1. install npm install slash
2. import using `const slash = require('slash')`
3. use it, pass a path to the slash constructor `slash(path)`

#### open an alert window from JS
if using materliaze
```
M.toast({
	html: `meassage`
})
```



