# Introduction

open source framework that allows the development of desktop GUI apps using web tech: Chromium + Node.js. Desktop app are: 
+ more secure, the app run on the machine and not on a web server
+ Native API: access to the OS, hardware, ports, camera etc...
+ Performance: no network overload or dealing with web server
+ Deployment: no server deployment and maintenance

Electron
one single code for all the major OS
versatile: you can create a web-app and desktop app with the same code

Built with electron
Skype, Visual Code, Slack, Whats app etc..

## How it works
OS communicate with Electron with native API
when you run an app on your machine , you run a process
electron -> 1 main file -> 1 single process
the main process interacts with the GUI of the app (with the window/s) through IPC (inter process communication). The main process uses a Module called  IPC Main and the window uses IPC Renderer IPC. 
the GUI is created by the process with the aide of the Browser Window Module
each browser window run a process called renderer process that dis responsible for 1 app window
the renderer use the Chronium engine to display the window and it uses Node.js
with Node.js we can import other modules.\
the main process is like the back end  and the renderer is the front end. I instead of using HTTP, we use IPC.

## Environment Setup
+ Node.js
+ IDE
+ Electron Starter: code that will serve as a starting point for each project *not a must

[https://github.com/bradtraversy/electron-course-files/tree/master/electron-starter] (Electron)