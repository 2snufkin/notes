# Setup
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


# main.js
let's de-structure the elements we need from Electron. app manage the entire life cycle of the app and Browser Window is a class that used to create windows
```
const{ app, BrowserWindow} = require('electron)

function createMainWindow(){
const mainWindow = new BrowserWindow({
	title: 'my app'
	width : 500,
	height: 600

})
}

```
the BrowserWindow constructor take an object of option and there are a lot. you can see all of them here:\

https://www.electronjs.org/docs/latest/api/browser-window

You need to call this function when the app is ready

```
app.on('ready', createMainWindow)
```

you can also implement garbage collection:
this code creates a main window when Electron is ready, and then listens for the 'ready' event on that window. Once the window is ready, it sets the mainWindow variable to null to prevent keeping an unnecessary reference to it in memory. This is a good practice to avoid memory leaks and improve performance.
 
```
// This code listens for the 'ready' event that is emitted when Electron has finished initializing and is ready to create windows.
app.on('ready', () => {
	// When the app is ready, create a new main window.
	createMainWindow();

	// This code listens for the 'ready' event that is emitted when the main window has finished loading its content.
	mainWindow.on('ready', () => {
		// Once the main window is ready, set the mainWindow variable to null to avoid keeping a reference to it in memory.
		mainWindow = null;
	});
});
```

## Loading Window

```

let mainWindow // so we can use it outside of the function

const{ app, BrowserWindow} = require('electron)

function createMainWindow(){
const mainWindow = new BrowserWindow({
	title: 'my app'
	width : 500,
	height: 600,
	resizable : false // can't resize the window


})

mainWindow.loadUrl(`file://${_dirname}/app/index.html`)
}

```


the loadUrl method can have an site url as an argument so the first window is a website.
Alternatively I can use the 
```
mainWindow.loadUrl(`./app/index.html`)

```
if I have a <title> in the HTML it will override the method's title definition

using the dev tool on the window we will see an error about security policy. It can be resolved by adding:
```
<meta http-equiv="Content-Security-Policy" content="script-src 'self` 'unsafe-inline">
``` 

## Customize the window
`backgroundColor: x`: change the background of the app
`resizable`: can you resize the window?
`title`: the title
`icon`: an icon for your app. follow by `'.assets/.....'`(create the assets folder)


# Platform & Environment check
checking which env. we are in (dev or production) or which platform we are in (OS: windows, mac , Linux). Why should I want to do it?
maybe i will do some things according to those conditions

## Checking environment
the value of the environment is found in `process.env.NODE_ENV`

```
//set env
process.env.NODE_ENV='development'
const isDev  = process.env.NODE_ENV ! == 'production ? true : false'
```
## Checking platform
the value of the platform is found in `process.platform`
you can console.log(process.platform) to see which platform you are at
```
const isMac  = process.platform ! == 'darwin ? true : false'
```

## Examples
how would you make the window resizable in dev env. but not resizable in production? you can make use of the isDev variable you have defined

`resizable : isDev? true : false`

this code is checking if all windows are closed and, if the platform is not macOS, it will quit the Electron app. This is because on macOS it is common for apps to keep running even when all windows are closed, whereas on other platforms it is more typical for the app to quit when all windows are closed.
```
// This code listens for the 'window-all-closed' event that is emitted when all windows are closed.
app.on('window-all-closed', () => {
	// If the current platform is not macOS (darwin), then the app should quit.
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

```


# Useful Code
this code is checking if there are any windows currently open, and if not, it creates a new main window. This is typically used to ensure that the app has a main window available to the user, even if they have previously closed it. On macOS, this event is typically emitted when the user clicks on the app icon in the Dock, but on other platforms it may be emitted in other circumstances.
```
// This code listens for the 'activate' event that is emitted when the user clicks on the app icon (in the Dock on macOS).
app.on('activate', () => {
	// If there are no windows currently open, create a new main window.
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow(); // is the function you have created in this class
	}
});
```

# Hot Swap
used for hotswap and auto reload the server when you makes changes to the code instead of relaunching the app


### electron-reload
https://www.npmjs.com/package/electron-reload\

`npm install electron-reload`

```
'use strict';

const {app, BrowserWindow} = require('electron');

const electronReload = require('electron-reload')

// Standard stuff
app.on('ready', () => {
  let mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  // the rest...
});

```

### Nodemon
it will reload the main process but not the window. To reload the window click on `Ctrl + r`
`npm i -D nodemon`: install nodemon
package.json : add the following script
```
"dev": "nodemon --exec electron ."

```
to run in this mode `npm run dev`