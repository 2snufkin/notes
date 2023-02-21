# SSR APPLICATION WITH UNIVERSAL
## Theory

SPA: single page app. Each page is created in the DOM of the browser while the user interacts with the app.\
web server role: host the app and serve only the main page (index.html)
SSR: Server Side Rendering. Advantages:
1. Enhances the performance of the app: also improve user experience by loading the first page quickly and loading the actual client page at the background (FCP: First Contentful Paint)
2. Improve SEO: allows crawlers to index the app and make it discoverable and linkable on social media websites
3. No JavaScript needed: the app is usable to mobile and other low-performant devices that can't afford to execute JS.
server role: prerender the pages while they are requested.
SPA => SSR: Done by using Angular Universal

Steps:
1. Build an Angular APP
2. Integrate Angular Universal
3. Pre-render the content during build
4. Enhance SEO: 
5. Replay events with preboot

## Problems and solutions

### preboot
problem: The app will respond to navigation events initiated from `routerLink` directive but it will not respond to user events during the FCP (click etc...).\
Solution: we will use a special library called preboot to re-play those events after the entire app has been loaded.

### Duplicate HTTP Requests
problem: interacting with HTTP in SSR app may result in duplicated HTTP requests due to the page pre-rendering in the FCP step.
solution: Angular Universal overcome this probelm by using a TransferState mechanism.

## Angular Universal
Enables to create the pages of the app on the server statically during app run time. It creates a fully static version of the app that can run on the browser even with no JavaScript enabled.





# Integrating Angular Universal

## Installing
`ng add @nguniversal/express-engine`\
it will install the npm packadge: it is the heart of the Angular Universal library and it consists of Node.js express web server.\
## Changes made to the app
the installation also modifes the workspace and changes certains files:

1. angular.json: creates new entries in the architect section. it outputs the generated bundle into a separate server folder. The original app bundle is now generated into a browser folder.\

Bottom line: an Angular Universal app generates two version of the same Angular app: one version for the server and one version for the browser
before:
```
 "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/gh-protfolio",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
```

after:
```
```


2. package.json:\
A. add the necessary npm dependencies
B. create scripts: for serving, prerendering building etc... `dev:ssr`, `serve:ssr`, `build:ssr`. All the scripts that contains the `ssr` are related to Angular Universal.
3. server.ts: contains  the node.js Express App that will host the server-side rendered version
4. main.server.ts: The main entry point of the SSR app
5. app.server.module.ts : The main app.module of the SSR app.
6. tsconfig.server.json : a TypeScript config of the SSR app.
7. main.ts: the main app module is loaded ONLY after the DOM has been lodad completly
8. app.module.ts: calls the withServerTransition method. This let us load the app as a SSR.

## Important
global JS objects (window, document etc) are not avaliable when rendering an Angular Universal app in the server since there is no browser. No browser == no document, no window. Angular provides abstraction APIs for some of those objects, in the form of injected Tokens for example : PLATFORM_ID, and DOCUMENT
I can check  on which platform (server / browser) the app is currently running
with the `isPlatformBrowser()` or `isPlatformServer()` 
````
import {isPlatformBrowser} from '@angular/common';
import {Inject, PLATFORM_ID} from '@angular/core';

isBrowser: boolean;


constructor(@Inject (PLATFORM_ID) platfomId: any){
this.isBrowser = isPlatformBrowser(platfomId)
}
````

page 219