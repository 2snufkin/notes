## Notification API
in the JS file, if you want to use desktop noitification you can create a new Notification object. Under the hood it used HTML 5 notification API. Being so, it's only avaliable in the renderer processand not in the main process. If you want to use Notification in the main process chack out Notification module.

### In the renderer
 Example:
```
function notifyUser(options){
	new Notification(options.title, options)
}

```
when calling this function i can specify an icon to be used in the notification
```
notifyUser({
	title: "this is the title",
	body: "will appear under the title",
	icon: path to the icon

})

```
# Storing Data
there are 3 main options:

### HTML5 Storage APIs (localStorage and IndexedDB)

If you primarily access your data in the renderer process, this is the simplest solution. You can access HTML5 storage data from the main process via electron-remote, which provides an asynchronous API to a hidden browser window that can execute DOM/renderer specific code. One drawback to this might be the fact that the API you use to get/set your user data in the main (async) will be different from the what is in the renderer (sync). This is a pretty attractive solution, and one I plan to play around with.

### Store: Flat file (see the Store.md)
If we want to access that data easily from both the renderer and main, using the same API, we can use the node.js fs (file system) module to save data to a JSON file (or any format we want). This approach covers the most common use cases, so we’ll cover how to do this in an example in a moment.

#### Where
Typically data is stored in the user’s “app data” folder.
Where this directory is varies by operating system.
Mac OS: ~/Library/Application Support/<Your App Name (taken from the name property in package.json)>
Windows: C:\Users\<you>\AppData\Local\<Your App Name>
Linux: ~/.config/<Your App Name>

### Embedded database

If we have larger data storage needs there are “embedded” databases like neDB (implements the Mongo API) or sqlite that we could use. Note that this could introduce some complexity because sometimes these databases (like sqlite) are native node modules (they use C++), and shipping cross-platform native code, even through NPM, can have some gotchas. Most applications that I’ve seen/heard of don’t have such complicated storage needs, but I’m sure there’s some use cases for it.