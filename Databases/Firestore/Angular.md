# Working with Firestore in Angular

Firestore is the next generation of the Real-time DB with more powerful queries and automatic scaling. In this guide, we will walk you through the process of setting up Firestore in an Angular project, configuring the AngularFire library, and performing CRUD (Create, Read, Update, Delete) operations with Firestore.

## Firestore Overview

Firestore organizes data into three main components:

1. **Documents**: This is the unit of storage, similar to a JSON object, containing fields and their values.
2. **Collections**: A collection is a group of documents that can be queried together, similar to a folder.
3. **Data**: The actual data stored inside a document with its fields and values.

## Angular SDK and AngularFire

### Angular SDK

To use Firestore in an Angular project, you need to install the Firebase JavaScript SDK. You can do this by running the following command:

```bash
npm install firebase
```

This will install the Firebase JavaScript SDK as a regular NPM package. You can then import it in your Angular project using standard JavaScript imports.

### AngularFire

AngularFire is an Angular-specific library that provides seamless integration between Firebase and Angular. It offers a set of Angular services and components that simplify working with Firebase in an Angular project. AngularFire is the recommended way to use Firebase in Angular applications.

To install AngularFire, run the following command:

```bash
ng add @angular/fire
```

Be cautious not to confuse AngularFire with an un-updated fork called "angularfire2." Always use "@angular/fire" for proper integration with Angular.

## Configuring Firestore and AngularFire

1. Add Firebase Project: Create a Firebase project on the Firebase console. After creating the project, go to the Project Overview and click "Add Firebase to your app." Choose the web platform.

2. Environment Configuration: Open your Angular project's `/src/environments/environment.ts` and `/src/environments/environment.prod.ts` files (if they don't exist, generate them with `ng g environments`). Add your Firebase configuration to both files. Make sure to set `production` to `true` in the prod file.

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```

3. Initialize AngularFireModule: In your `app.module.ts`, import the necessary modules and initialize AngularFireModule with your Firebase configuration.

```typescript
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  // ... other declarations and providers
})
export class AppModule { }
```

## Using Firestore in Angular

To work with Firestore in Angular, follow these steps:

1. Inject AngularFireStore: Inject the AngularFirestore service into the constructor of the delegated service where you want to use Firestore.

```typescript
import { AngularFirestore } from '@angular/fire/compat/firestore';

constructor(private firestore: AngularFirestore) { }
```

2. Accessing a Collection: Create a class variable and call the `collection(<collection name>)` on the injected `AngularFirestore` instance. This will give you access to the collection.

```typescript
readonly collection = this.firestore.collection('collectionName');
```

3. Reading Data: To retrieve data from Firestore, use the `valueChanges()` method. This will return an Observable with simplified data (data stripped off metadata like ID).

```typescript
this.collection.valueChanges().subscribe(data => {
  console.log(data);
});
```

Alternatively, you can use `snapshotChanges()` to get access to data and metadata. This method provides a more complex object with information about the type of change (added/modified/removed) and the payload (actual data).

```typescript
this.collection.snapshotChanges().subscribe(actions => {
  actions.forEach(action => {
    console.log(action.payload.doc.data());
    console.log(action.payload.doc.id);
  });
});
```

4. Working with Documents: To access a specific document, use the `doc(<path>)` method, where the path is the path to the document.

```typescript
const documentRef = this.firestore.doc('collectionName/documentId');
```

Methods for working with documents include:

- `set`: To set or override the entire document with new data.
- `update`: To update specific fields in the document without overriding the whole document.
- `delete`: To delete the document.

## Authentication

### Theory

Authentication in Angular involves sending user credentials to the server for validation. The server will then respond with an "OK" status if the user is authenticated. There are differences between Single Page Apps (SPAs) and Traditional Apps in terms of how they handle authentication.

- Traditional Web App: These apps use sessions. The session is stored on the server, and the client gets a cookie to maintain the session.

- SPA: Firebase, like any backend used to communicate with Angular SPAs, is stateless, meaning it doesn't store sessions. Instead, it uses a stateless, RESTful API. Since SPAs request only one page and not multiple pages, there's no need to save the state on the server. Thus, Firebase sends a token to the client, which needs to be stored on the browser (usually in local storage).

Tokens are long strings that encode authentication data. When requesting a protected resource (e.g., a database), the client attaches the token to the request, and the server validates whether it's a valid token generated by the server or a fake/expired one. If the token is valid, access to the protected resource is granted; otherwise, access is denied.

Protected Resource: Firestore is initially configured in Test mode, allowing anyone to read and write to the database without the need for a token. However, this configuration should be changed to restrict access to authorized users only.

When working with tokens, avoid storing information about whether the user is authenticated or not in a boolean variable (e.g., isAuth). Instead, use tokens for authentication.

#### Firebase Token

Firebase manages the token for us, eliminating the need to extract and store it manually. We don't need to worry about its expiration date, as Firebase always provides a fresh token with each request. When a user logs out, the token is automatically destroyed.

### Practice

#### Protect the Database

To protect the Firestore database, go to the Firebase console and navigate to Cloud Firestore -> [Rules](https://firebase.google.com/docs/rules/rules-language?hl=en&authuser=0). Add the following rule to restrict access to authenticated users only:

```rules
allow read, write: if request.auth != null;
```

Click on "Publish" to save the rule.

#### Registering a User

1. Activate Firebase authentication in the Firebase console by choosing a sign-in method.
2. Add the AngularFireAuthModule to your Angular project.
3. In the authentication service, inject the AngularFireAuth service.

To register a user, call the following method on the injected service:

```typescript
.auth.createUserWithEmailAndPassword(email, password)
```

This method returns a promise, and you can handle success or error cases using `then` and `catch`.

#### User Login

To log in a user, use the `signInWithEmailAndPassword(email, password)` method:

```typescript
.auth.signInWithEmailAndPassword(email, password)
```

This method also returns a promise for handling success or error cases. The token is automatically sent to the server when using `signInWithEmailAndPassword()`, so there's no need to manage it manually.

#### User Logout

To log out a user, call the `signOut()` method:

```typescript
.auth.signOut()
```

This method destroys the token. However, you may still see an error in the console ("Missing or insufficient permissions") after logging out. This is because the app may still be listening to database changes using `snapshotChanges()` or `valueChanges()`.

To handle this error, you can manage it in the `subscribe()` method or cancel the subscriptions altogether. To cancel subscriptions, create a field to hold the `Subscription` and a method called `cancelSubscription`:

```typescript
private firebaseSubscriptions: Subscription[] = [];

private cancelSubscription(): void {
  this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
}
```

Whenever you create a subscription, add it to the `firebaseSubscriptions` array:

```typescript
this.firebaseSubscriptions.push(this.db.collection(...).valueChanges());
```

In the AuthService, call `cancelSubscription()` in the `logout()` method to unsubscribe from all active subscriptions.

#### Listen to Changes in Auth Status

To listen for changes in the authentication status, create a method called `initAuthListener`:

```typescript
.initAuthListener(): void {
  .authState.subscribe(user => {
    if (user) {
      // Navigate to a page or perform actions for authenticated users
    } else {
      // Unsubscribe from subscriptions, navigate to login page, etc.
    }
  });
}
```

Call `initAuthListener` in the `AppComponent`'s `ngOnInit` method to set it up when the app starts:

```typescript
ngOnInit(): void {
  this.authService.initAuthListener();
}
```

This way, whenever the app starts, it will listen to changes in the authentication status and react accordingly.

## Conclusion

In this guide, we explored how to work with Firestore in an Angular project using AngularFire. We covered configuring Firestore and AngularFire, reading and writing data to Firestore, and working with collections and documents. Firebase and AngularFire provide a powerful combination for building real-time web applications with Angular, making it easy to interact with a scalable and flexible NoSQL database. Then we learn how to use the out of the box Authentication.