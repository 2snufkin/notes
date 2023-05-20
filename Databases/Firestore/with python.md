# Google Firestore
Google Firestore is a document-based NoSQL database and so it uses collections and documents to represent tables and records.\
It is necessary to make sure that each document is named uniquely to prevent overwriting of documents and losing data. If you are familiar with MongoDB or other popular document-based NoSQL databases, you can relate the name of the database with the “_id” field present in MongoDB documents that uniquely identifies them in a collection.

# Setting up Google Firestore
## Console
1. Create a Firebase project in order to access [Firestore](https://console.firebase.google.com). 
2. Go to the console and choose the project you've created
3. Build -> Firestore Database (not RealTime) -> Create Database
4. click on Start in Test mode
5. Choose the closest location 


## Connect python to Google Firebase 
Ensure that your python version is 3.6 or below as firebase_admin throws an exception because of the async module added in python 3.7 onwards. If you have a higher version installed, you can use anaconda to create a new environment with python 3.6. I am using python 3.6.5 for this article.\

1. pip install firebase_admin
2. Return to the console
3. Find the setting button and click on it (should be near the project overview on the top-left corner)
4. Choose Project Setting => service account
5. You will find a code snippet for connecting to Google Firebase.
6. Select python as the language and copy the code snippet paste it to the python class
7. Click on Generate New Private Key, it should donload the key.
8. click on “manage service account permissions“ (it's a small link on top of the code)
9. click on “manage keys” => “add key”
10. choose JSON as the file format and click create. This is your credentials
11. Put the json file in your project and if you use git never commit the file
```
cred = credentials.Certificate("path/to/serviceAccountKey.json")
```

# Performing CRUD 
### Create

#### A collection
```
my_collection = db.collection('programmer_details') 
```


#### Create/add a new file
```
res = my_collection.document().set({ 
    'name': 'Vishnu',
    'age': 19,
    'Country': 'India',
    'Programming_languages': ['Python', 'C#', 'C++']
})
```

if you want to use the add method you should call it on the collection 
```
my_collection.add(object)
```

to set the ID yourself, you can pass it as a parameter to the document method
```
res = my_collection.document('A01').add({ # insert document
    'name': 'Vishnu',
    'age': 19,
    'Country': 'India',
    'Programming_languages': ['Python', 'C#', 'C++']
})
```

### READ
It is important that we convert the object to a dictionary so that it can be handled properly. For doing so, we can directly call the “to_dict()” function, which returns the document as a dictionary.
```
res = my_collection.document('A01').get().to_dict()

```
To get all the documents present inside a collection, we can directly call the get function on a collection but it returns a list of objects and each object needs to be converted to a dictionary using the “to_dict()” function for further processing.
```
res = collection.get() # returns a list
for i in res: print(i.to_dict())

```

### Update
```
res = collection.document('A01').update({
    'State': 'Chennai',
    'age': 21
})

```


### Delete
```
res = collection.document('A01').delete()

```














Let’s see if the document has been updated in Firestore or not. We can see that two new fields – state and age have been added to the document.


Let’s now try to delete a document inside a collection. For this, we can directly call the “delete()” function associated with the document.

res = collection.document('A01').delete()
print(res)
Conclusion
In this article, we got to learn about Google Firestore, a NoSQL database offering on the Google Firebase platform, and how we can perform basic CRUD operations using the python programming language. Along with this, we also learned how to create and set up a project in Google Firebase.

As mentioned earlier, Google Firebase offers a lot of services for free and one such service is the Google Firestore. These services are hosted on Google Cloud and are production-ready and have the autoscale feature enabled by default, which is a big advantage as we, the developers, do not have to spend a huge amount of time setting up these services to scale on demand. This saves a lot of time and allows developers to focus more on developing features and functionalities rather than worrying about setting them up on the cloud. I will cover the Google Cloud Storage service offered by Firebase in my next article. I will also try to cover other services offered by Google Firebase in the coming weeks, so stay tuned!

Hope you enjoyed reading this article and learned something new. Thanks for reading and happy learning!