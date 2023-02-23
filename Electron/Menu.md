# Creating Menu 
When you create a menu, ask yourself id you want this app to run on Mac. Id the answer is yes, you should create a variable to check if isMac and then configurate the menu array for mac also (see section Menu with condition)
## main.js
 add also Menu to your imports
the menu is like a toolbar in a website. the menu is an array of objects. Each object is one entity of menu that can have submenu. you can have also submenu
1. define the menu
```
const main_menu = [{
			label: 'File',
			submenu: [{
				label: 'Quit',
				click : () => app.quit()
			
			}]
}]

// mac behave diffrently, you don't see the menu. to solve it....
if (isMac) {
	main_menu.unshift({role: 'appMenu'}) //unshift is like push but put it in the begining of the array
}
app.on('ready', ()=> {
	createMainMenu(),
	const mainMenu = Menu.buildFromTemplate(main_menu) //pass the array as arg
	Menu.setApplicationMenu(mainMenu)
	...
})

```

## Shortcuts
Electron let you add shortcuts to you menu. it is done by adding an accelerator attribute
add globalShorcut to your imports
```
const main_menu = [{
			label: 'File',
			submenu: [{
				label: 'Quit',
				accelerator : isMac? 'Command+W' : 'Ctrl+W',
				click : () => app.quit()
			
			}]
}]
```
there is a simpler syntax to add a cross platform shortcut
```
				accelerator : 'CmdOrCtrl+W',

```
another way to add shortcuts:\
globalShortcut.register() the first arg is the shortcut and the second is a lambda function with the action of the shorcut
```
app.on('ready', ()=> {
	createMainMenu(),
	const mainMenu = Menu.buildFromTemplate(main_menu) //pass the array as arg
	Menu.setApplicationMenu(mainMenu)
	globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
	globalShortcut.register('CmdOrCtrl+I', () => mainWindow.toggleDevTools())

})

```

## Roles
there are some predefine roles that you can use and will save you time.
you can find them here
https://www.electronjs.org/fr/docs/latest/api/menu
exmple: if you use {role: 'editMenu} it will give you out of the box a full edit menu with cut, copy, undo etc... In this case you won't need to code the label, the click event, the method etc...

## Menu with condition
what if you want to create a menu as a condition? a special menu if you are in dev mode? or a menu if you are in mac (since mac does not behave like windows)
this menu will be avaliable only in dev mode. You will use the spread operateur. If the app is in dev mode, it will return the list of menu else an empty list
```
const main_menu = [
	
	//code for the menu....now let's add conditional menu

	...(isDev?  [ {
		label: 'Dev',
		submenu: [
			{role: 'reload'},
			{role: 'forcereload'},
			{type: 'separator'},
			{role: 'toogledevtools},
				
		]
	
	
	}] : [])  
			
]

```
## open a window from menu
in your app you won't have a lot of windows , it's like a single page app. everything is done in one main window.\
1. create a const variable for the window
2. create a function for the new window
```
const secondWindow

function createSecondWindow(){
const secondWindow = new BrowserWindow({
	title: 'about'
	width : 500,
	height: 600

})
secondWindow.loadFile($path)
}


```
2. Menu: add the label and the click attribute to the menu array. the click will call the createSecondWindow method
```
...
label : 'About',
click: createSecondWindow // the function we have created

```