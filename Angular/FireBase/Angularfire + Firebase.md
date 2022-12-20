# Angularfire + Firebase

Firebase: Hosting provider + Services. Pay What you use


## Services:


| Realtime DB  | Authentication |
| ------------- |:-------------:|
| No neeed to write server side code.      | User signup + Login    |
| Store and sync Data via REST and sdk      |     |
| Popular for mobile Apps     |     |


| Storage  | File upload & Download |
| ------------- |:-------------:|
| File upload/download  | User behavior, crash statistics etc..   |
| Store and sync Data via REST and sdk|     |



| Cloud Functions  | |
| ------------- |:-------------:|
| You write your own server side code etc..   |
| Connect to various events|     |


* Security and resources are managed for me

### FireStore vs Realtime
FireStore is the next generation of the Real-time DB with more powerful quries and automatic scaling

FireStore
1. Choose between locked/test mode:
locked mode: will let only auth user to access the data 
test mode: everyone can read/write to the db

#### How does it work?
The cloud firestore store data, not files.
Firestore know 3 types of data: Collection, document and data
you store documents. This is the unit of storage. with fields that map to values. A document is like an Object you store
data: is the data inside a document. The fields and the values
Collection: like a folder. A bunch of the documents 
A document can have a collection. If I sat that a document is an Object so an Ocject can have a list of other objects (== Collection)




## Getting started
1. Add Project, fill project name and country and click on Create Project
2. Creating a project will give you access to all the above services


### AngularFire
a 3rd package that serves as a bridge between Angular App and Firebase.
The alternative is to use REST API provided by Firebase or SDK.
SDK: Javascript Package
AngularFire will provide all the features provided by SDK in a manner that embreces Observable-based "Data streams". Can be used only with Angular apps.



### Connect Angular to Firebase
(github page): [https://github.com/angular/angularfire]
Becareful, there is an un-updated fork that is called angularfire2 - don't use it
1. ng add @angular/fire

2. Open /src/environments/environment.ts and add your Firebase configuration:
```property
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

where I take tose values from? Go to the project Console on Firebase
Project Overview -> Add firebase to your app -> choose the platform 

3. Add AngularFire to the app.module
```ts
import {AngularFireModule} from 'angularfire2',;
import {enviroment} from '../enviroments/enviroment'
```

in the improts array:
```ts
AngularFireModule.initializeApp(enviroment.firebase)
```

4. Use the diffrent services:
Now you connected Angular et Firebase. Each service in Firebase has its prope Module
example: AngularFirestoreModule, AngularFireAuthModule,AngularDatabaseModule etc...
the import goes like this, you import from a sub-folder
import {AngularFirestoreModule} from 'angularfire2/firestore'

Using FireStore:
inject the AngularFireStore to the constructor of the delegated service
call the collection(<collection name>)on the injected variable  
call the valueChanges() - it will return an Observable with a simplified data ( a data that is striped off its metadata like ID)
With value change() if you change the data on firebase, the changed will be reflected immidatly without reloading the page (F5)

### [Working with Collections](https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md)
valueChanges(): the downside is that it doesn't incluse the metadata
snapshotChanges(): give you access to data and metadata. But the result is a more complected object that give me a lot of metadata details
for every document I have  the 
typep: was it added/modified/removed
payload: contain the data. to access the data that I am intrested in I sould access the playload.doc.data()
and for the id: playload.doc.id
to access other field: playload.doc.data().fieldName
 
### Working with Documents
acessing a document: 
```property
db.doc('collectionNaME/id') 
```
the doc method takes as a arg the path to the document
Methods: set, update and delete
set: to override
update: set fields without overriding



## Authentification 

### Theory
Angular send the credntial to the server, they are validated (or not) and the server say : 'its ok, the user is auth'
There is a diffrence between Single Page  App and Traditional App
Traditional web app: We use a Session. The session will be stoored on the server and on the client we will get a cookie
SPA:  Firebase doesn't store sessions. Stateless, RESTful API. But it's not only firebase, Any backend that I use to communicate with Angular is stateless since we ask only one page and no multiple pages so 
there is no point to save the state on the server since I query it (ask for a html page) only once.
Since the Session way doesn't work, the server send us a token and we should store it on the browser (localstorage)
Token: a long String the encode (not encrypt) some data about the auth status
Whenever I want to request a Protected resource (like a DB) I need to attach the token to the request and the server validate if it's a valid Token ( was generated by the server) or if it's a fake one / expired token 
If the token is valid, we get access, otherwise - we don't.
protected resource: When config. Firestore at the begining I choose the Test config. Everyone is able to read and write to the DB, and token isn't needed. The DB is not protected. This config need to be changed.
Don't store the info. wheather the user is auth or not in a boolean (isAuth), you can't send it to the server. The server wants more, Work with Tokens.

#### Firebase Token
We can manage the token through firebase, we don't need  to extract and store it manually. We don't need to worry about it's experation date since Firebase always give us a fresh Token with every request. If we log out the token will be destoryed.


### Practiqua

#### Protect the DB
In the console go to the Cloud Firestore -> [Rules](https://firebase.google.com/docs/rules/rules-language?hl=en&authuser=0)
```
allow read, write: if request.auth != null

```
click on Publish

#### 
1. Go to the Firebase console and activate it (you will have to choose a sign-in method)
2. Add the AngularFireAuthModule 
3. In the auth service inject the AngularFireAuth
 

#### Registering User
on the injected service call the 
```ts
.auth.createUserWithEmailAndPassword(email, password)

```
It return a promise. You can listen to sucess case or to an error
```ts
.then(result => {
  react to a sucess in auth
})
.catch(error => {
  react to an error
})

```

#### User Login
The method name is confusing, it's login what I am looking for but the method name is Sign In
```ts
.auth.signInWithEmailAndPassword(email, password)

```
It return a promise. You can listen to sucess case or to an error
You don't need to send the Token to the server. AngularFire do it automatically for you as long as you use the signInWithEmailAndPassword() to login.


#### User logout
```ts
.auth.signOut()
```
it will get rid of the token. Everything will work but you will get an error in the console "Missing ot insuddcient permissions"
This error appear because after logging out I am still listen to  the DB changes whenever I use snapshotChanges()/ valueChanges()
Solution: 
1. in the subscribe() you can manage this error
```
subscribe(res => {....}, error => {.....})
```
2. Cancell the subscription
create a field to hold the Subscription and create a method cancelSubscription
If you have more than one subscription you want to cancel you can create an array of Subscriptions
```
private firebaseSubscriptions: Subscription[]
```
and then add every Subscription you want to be able to cancel
```
this.firebaseSubscriptions.push(this.db.collection(...).valueChanges() etc...)
```
Create a cancellSubscription method with the 
```
this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
```
3. In the AuthService got to the logout() and call the cancellSubscription method that you have created


#### Listen to changes in Auth Status
1. in the Auth service create a method to initAuthListner
```
.authState.subscribe( user => {
  if (user){
    navigate to page x etc....
  }
  else {
    cancel subscription, navigate to the login page etc...
  }
  })
```
2. Where will you call this method? when the app starts
in the AppComponent:
immplement OnInit, inject the AuthService and inside ngOnInit call the initAuthListner method that you just created
