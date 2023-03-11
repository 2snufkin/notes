# Project Structure
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

# IPC coomunication: Events

## HTML -> Main Process

### HTML's JS : send an event
capture data and send it to the main process using IPC renderer
1. import `const {ipcRenderer } = require('electron)`
2. use the send method. the first argument is identifier as a string and the second is optional and it's any data yoy want to send as an object. it's optionam because there are use case that you just want to send an event to prompt something
```
//code..you tory to respond to use action
ipcRenderer.send(identifier, {
		imaPath  //since E6 you don't need to write imagePah : imagPath
		quality
	})

```

### catch the event : main.js
communication HTML = > main process. You will see later that it's possible to communicate main process => HTML
1. import `const {...,ipcMain } = require('electron)`

3. catch it with the on method.
for an event:
```
ipcMain.on(identifier)
```
for event + data: you can get a hold of the data, you do it in the callback function. 
```
ipcMain.on(identifier, callback)

//example:
ipcMain.on("img:mini", (event, data) => {
		...
	})

```


## Main Window -> Renderer
### main.js
1. use the mainWindow variable has an object called webContents, access this object
2. use the send method: 

`mainWindow.webContents.send()`\
you can also send data or message
`mainWindow.webContents.send("done")`\


### HTML's JS
1. use the ipcRenderer on() 
```
ipcRenderer.on('done', () => {
		// do something
	})
```

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
# Creating Log File
it will create a local log file on your computer. it can help you debug your app if something goes wrong, also in production (you don't have acces to console in production)
1. npm i electron-log
2. `const log = require {'electron-log}`
3. you have error, warn, info, verbose, debug, silly methods
4. the use is simple : `log.warn("a probleme has occured")`
5. the log is saved here: home directory => library => logs

# Package 
First of all: chane to production mode
To build the app you need a library. you can use:
1. electron-package
2. electron-builder

the electron-builder package, which is a more powerful and flexible tool for building and packaging Electron applications. It allows you to configure many aspects of the build process, such as customizing the app icon, adding extra resources, setting the output directory, and more.

On the other hand, the electron-packager tool is a simpler alternative for building Electron apps, which does not have as many customization options as electron-builder. It is used in the package-mac, package-win, and package-linux scripts in your package.json file to build the app for different platforms.

## electron-package
for this task we use a package that called electron-packager. this is a dev dependency
1. install: `npm i -D electron-packager`
2. in the main.js set the NODE.ENV to "production"
3. in the package.json you will need to add scripts for each OS packaging process inside the "script" object
4. the scripts to add will be inside the init project I will create that will serve an entry point to each electron project and I will git push it
5. for it to work inside the assets folder you need to have linux, mac and win folder with the icon named icon
6. read carfully each script. there are things to modify like productName, align the name of your icon which the name inside the script etc...
7. to pack run `npm run {script}`. example: `npm run package-win`
8. it will save it at the same folder you have defined in the --out inside the script

## electron-builder
1. `npm install electron-builder --save-dev`
2.  write the yml file
3. `npm run build`
## why icon per os?
because every OS work with diffrent file type windows accept the .ico, mac accept the .icns