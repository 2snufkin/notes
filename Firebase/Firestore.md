# Firestore

FireStore is the next generation of the Real-time DB with more powerful queries and automatic scaling

## Storing
Firestore know 3 types of data: Collection, document and data:\
documents: This is the unit of storage. with fields that map to values. A document is like an Object you store
data: is the data inside a document. The fields and the values
Collection: like a folder. A bunch/collection of the documents 



# Angular 
## SDK
`npm install firebase`:installs the Firebase JavaScript SDK as a regular NPM package, which you can import in your project using standard JavaScript imports. This method does not provide any Angular-specific integration.
## AngularFire

Angular-specific library that provides seamless integration between Firebase and Angular. It provides a set of Angular services and components that simplify the process of working with Firebase in an Angular project.\
The alternative is to use REST API provided by Firebase or SDK.
`ng add @angular/fire `: installs the @angular/fire package, which is an 
(github page): [https://github.com/angular/angularfire]
Be careful, there is an un-updated fork that is called angularfire2 - don't use it



### Configure Firestore and Fire
install angularfire `ng add @angular/fire`
1. Add Project, fill project name and country and click on Create Project
2. Go to the project Console on Firebase
Project Overview -> Add firebase to your app -> choose the platform (web)
3. If you choose to add hosting you can choose the domain name. 
4. if you don't have environment folder or files run `ng g environments`
5. Open /src/environments/environment.ts and the production also and add your Firebase configuration. pay attention that in the prod file the production should be set to true
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
6. Add AngularFireModule to the app.module. 
Here are the different modules. You don't need to add all of them
```ts
import {environment} from "../environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
```

in the imports array:
```ts
    AngularFireModule.initializeApp(environment.firebase)
```
7. Use the different services:
Now you connected Angular and Firebase. Each service in Firebase has its own Module
example: AngularFirestoreModule, AngularFireAuthModule,AngularDatabaseModule etc...
the import goes like this, you import from a sub-folder
`import {AngularFirestoreModule} from 'angularfire2/firestore'`

### Using FireStore:
1. inject the AngularFireStore to the constructor of the delegated service\
`constructor(private firestore: AngularFirestore) { }`
2. create a class variable and call the collection(<collection name>)on the injected variable. This will give you access to the collection
`   readonly collection = this.firestore.collection('collectionName')`  
3. To get data call the valueChanges() - it will return an Observable with a simplified data ( a data that is striped off its metadata like ID)
With value change() if you change the data on firebase, the changed will be reflected immediately without reloading the page (F5)

### [Working with Collections](https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md)
valueChanges(): the downside is that it doesn't include the metadata
snapshotChanges(): give you access to data and metadata. But the result is a more complected object that give me a lot of metadata details
for every document I have  the 
type: was it added/modified/removed
payload: contain the data. to access the data that I am interested in I should access the playload.doc.data()
and for the id: playload.doc.id
to access other field: playload.doc.data().fieldName
 
### Working with Documents
accessing a document: 
```property
db.doc('collectionNaME/id') 
```
the doc method takes as a arg the path to the document
Methods: set, update and delete
set: to override
update: set fields without overriding


