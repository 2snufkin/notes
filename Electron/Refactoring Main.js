# Orginazing Main.js
you can sperate each window to each own class
the class should have a constructor
all the window options could be passed to the consructor

## Exctracting MainWindow
```
co,st {BrowserWindow} = require('electron')

class MainWindow extends BrowserWindow{

constructor(filepath, isDev){

super({
	title: ....,
	width:.....;
	resizable:....,
	etc...

})
this.loadFile(filepth);
if (isDev){
this.webContents.openDevTools()
}
}
}

module.exports = MainWindow
```
passing it inside the super will be passed to BrowserWindow. You can also pass them to the Class constructor itself and not to super.

After exporting this Module you can use it in the main.js
```
const MainWindow= require('$Relativepath')
....
function createMainWindow(){
mainWindow = new MainWindow('path', isDev)
}


```

## Exctracting Tray
you need to import the Tray, the app for quiting the app anf the Menu for building the contextMenu
```
const { app, Menu, Tray } = require('electron')

class AppTray extends Tray {
  constructor(icon, mainWindow) {
    super(icon)

    this.setToolTip('SysTop')

    this.mainWindow = mainWindow

    this.on('click', this.onClick.bind(this))
    this.on('right-click', this.onRightClick.bind(this))
  }

  onClick() {
    if (this.mainWindow.isVisible() === true) {
      this.mainWindow.hide()
    } else {
      this.mainWindow.show()
    }
  }

  onRightClick() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          app.isQuitting = true
          app.quit()
        },
      },
    ])

    this.popUpContextMenu(contextMenu)
  }
}

module.exports = AppTray






```