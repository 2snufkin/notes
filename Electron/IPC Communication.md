# IPC coomunication: Events

## Renderer process -> Main Process

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


## Main Process -> Renderer process
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
