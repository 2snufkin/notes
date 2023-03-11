# Store
You can use 3rd packadge but there is no need. it's easy to build. the flow of data:
if you want to use in a data that was stored in the Store inside your renderer.js:
   you must pass by the main process - main.js
else:
	you can use it directly in the main.js
for saving data for the renderer to the store, you also pass par main.js	



## Create the Store
create the class and put it in the working directory near main.js

```
const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
  }
  
  // This will just return the property on the `data` object
  get(key) {
    return this.data[key];
  }
  
  // ...and this will set it
  set(key, val) {
    this.data[key] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

// expose the class
module.exports = Store;
```
## GET data from store
 You can get access to the store from the main process of from the renderer. 
main process: you use it out of the box

### Main process / main.js
```
// First instantiate the class
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 }
  }
});

....
//then use it
 // First we'll get our height and width. This will be the defaults if there wasn't anything saved
  let { width, height } = store.get('windowBounds');

  // Pass those values in to the BrowserWindow options
  mainWindow = new BrowserWindow({ width, height });


```

### Renderer
the main process should send it to the rendrer

1. sending from main.js

```
// an event that fireup when the DOM is ready
mainWindow.webContents.on('dom-ready', () => {
	\\ send it to the renderer 
	mainWindow.webContents.send('event-x', store.get(key))
	})



```
2. cathing it in the renderer with the ipcrenderer

```
ipcRenderer.on('event-x', (event, data)=>{
	....

	})
```
## Save data in the Store

### from the rendere to the store
```
ipcRenderer.send('event-name', object-data)

```
### catch it in the store
```(
ipcMain.on('event-name', (event, data) => {

	store.set('name', data)
	} ) 
```

