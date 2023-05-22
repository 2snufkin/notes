# Firebase
Required:\
1. Angular cli installed? do nothing : `npm install -g @angular/cli`
2. Firebase cli? do nothing : `npm install -g firebase-tools`
3. An exisiting Firebase project, 
4. Is Firebase connected to your Angular app? ? do nothing : `firebase login`


## Firebase login
Running the `firebase login` command itself does not generate any files. It is a command used to authenticate the Firebase CLI (Command Line Interface) with your Firebase account.
When you run the `firebase login` command, it opens a browser window where you can sign in with your Firebase account credentials. 
Once you successfully authenticate, the Firebase CLI stores the login credentials locally on your machine, allowing you to access and manage your Firebase projects from the command line.
The Firebase CLI uses a configuration file called `.firebaserc` to store project-specific settings, but this file is generated when you initialize your project using the `firebase init` command.

## Deploy
1. Initialize Firebase in your project: In the terminal, navigate to your Angular project's root directory and run the following command to initialize Firebase:
`firebase init`. This will prompt you to select the Firebase features you want to set up. Choose "Hosting" using the arrow keys, click on space and press Enter. 
Select your Firebase project from the list, or create a new one if prompted.
2.  Configure Firebase Hosting: Next, you'll be asked to configure your Firebase Hosting settings. Use the following options:
+ What do you want to use as your public directory? dist/[your-angular-project-name] (replace [your-angular-project-name] with the actual name of your Angular project)
+ Configure as a single-page app? Yes
+ Set up automatic builds and deploys with GitHub? No (unless you want to set up automatic deployment using a GitHub repository)
3. Build your Angular app: Before deploying, you need to build your Angular app for production. `ng build --configuration production --aot` the aot is optional (Ahead-of-Time compilation)
This will create a "dist" folder in your project directory with the compiled production-ready files.
4. Deploy your app to Firebase Hosting: Run the following command to deploy your app to Firebase Hosting:
`firebase deploy --only hosting`
This command will upload your app's files to Firebase Hosting and provide you with a Firebase Hosting URL.

### Customize the Firebase Hosting URL
If you want to customize the URL with the prefix "xyz", you can do so in the Firebase Hosting settings. 
1. Go to the Firebase console, select your project, and navigate to the "Hosting" section.
2. In the "Custom domains" tab, follow the instructions to add a custom domain and configure it to use your desired prefix.
