# DEPLOY 

First of all: change to production mode
To build the app you need a library. you can use:
1. electron-package
2. electron-builder

the electron-builder package, which is a more powerful and flexible tool for building and packaging Electron applications. It allows you to configure many aspects of the build process, such as customizing the app icon, adding extra resources, setting the output directory, and more.

On the other hand, the electron-packager tool is a simpler alternative for building Electron apps, which does not have as many customization options as electron-builder. It is used in the package-mac, package-win, and package-linux scripts in your package.json file to build the app for different platforms.

## electron-package
for this task we use a package that called electron-packager. this is a dev dependency
1. install: `npm i -D electron-packager`
2. `process.env.NODE_ENV = production`: change the env. to production
3. in the package.json you will need to add scripts for each OS packaging process inside the "script" object. you have them in the bootstrap project
4. the scripts to add will be inside the init project I will create that will serve an entry point to each electron project and I will git push it
5. for it to work inside the assets folder you need to have linux, mac and win folder with the icon named icon
6. read carfully each script. there are things to modify like productName, align the name of your icon which the name inside the script etc...
7. to pack run `npm run {script}`. example: `npm run package-win`
8. it will save it at the same folder you have defined in the --out inside the script

## electron-builder
1. `npm install electron-builder --save-dev`
2.  write the yml file
3. `process.env.NODE_ENV = production`: change the env. to production
4. `npm run build`


## why icon per os?
because every OS work with diffrent file type windows accept the .ico, mac accept the .icns


