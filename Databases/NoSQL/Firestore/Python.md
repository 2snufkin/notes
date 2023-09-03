# Working with Firestore in Python

Firestore is a document-based NoSQL database provided by Google Firebase. In this guide, we will walk you through the process of setting up Firestore, connecting Python to Google Firebase, and performing basic CRUD (Create, Read, Update, Delete) operations using Python.

## Table of Contents

1. [Setting up Google Firestore](#setting-up-google-firestore)
   1.1 [Create a Firebase project](#create-a-firebase-project)
   1.2 [Enable Firestore](#enable-firestore)
   1.3 [Choose the database location](#choose-the-database-location)

2. [Connecting Python to Google Firestore](#connecting-python-to-google-firestore)
   2.1 [Install firebase_admin](#install-firebase-admin)
   2.2 [Get Service Account Credentials](#get-service-account-credentials)

3. [Performing CRUD Operations](#performing-crud-operations)
   3.1 [Create](#create)
   3.2 [Read](#read)
   3.3 [Update](#update)
   3.4 [Delete](#delete)

## 1. Setting up Google Firestore

### 1.1 Create a Firebase project

To get started, you need to create a Firebase project to access Firestore. Go to the [Firebase console](https://console.firebase.google.com) and create a new project. If you already have a project, select it from the console.

### 1.2 Enable Firestore

In the Firebase console, navigate to "Build" -> "Firestore Database" (not RealTime) -> "Create Database." Choose "Start in Test mode" for now.

### 1.3 Choose the database location

Select the closest location for your database. This will determine where your Firestore data is stored.

## 2. Connecting Python to Google Firestore

Before proceeding, ensure that your Python version is 3.6 or below, as `firebase_admin` may throw exceptions with Python 3.7 and above.

### 2.1 Install firebase_admin

Install the `firebase_admin` package by running the following command in your terminal:

```
pip install firebase_admin
```

### 2.2 Get Service Account Credentials

In the Firebase console, go to "Project Settings" => "Service Accounts." Here, you'll find a code snippet for connecting to Google Firestore. Select Python as the language and copy the code snippet to your Python class.

Click on "Generate New Private Key" to download the key. Then, click on "Manage Service Account Permissions" (a small link on top of the code snippet).

Next, click on "Manage Keys" => "Add Key." Choose JSON as the file format and click create. This file contains your credentials.

Put the JSON file in your project directory, and if you use version control (e.g., Git), make sure not to commit the file.

```python
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
```

## 3. Performing CRUD Operations

Now that we have connected Python to Firestore, let's learn how to perform CRUD operations.

### 3.1 Create

To create a collection:

```python
my_collection = db.collection('programmer_details') 
```

To add a new document:

```python
res = my_collection.document().set({ 
    'name': 'Vishnu',
    'age': 19,
    'Country': 'India',
    'Programming_languages': ['Python', 'C#', 'C++']
})
```

To use the `add` method, call it on the collection:

```python
my_collection.add(object)
```

To set the ID yourself, pass it as a parameter to the `document` method:

```python
res = my_collection.document('A01').add({
    'name': 'Vishnu',
    'age': 19,
    'Country': 'India',
    'Programming_languages': ['Python', 'C#', 'C++']
})
```

### 3.2 Read

To get a single document as a dictionary:

```python
res = my_collection.document('A01').get().to_dict()
```

To get all documents in a collection:

```python
res = my_collection.get() # returns a list
for doc in res:
    print(doc.to_dict())
```

### 3.3 Update

To update a document:

```python
res = my_collection.document('A01').update({
    'State': 'Chennai',
    'age': 21
})
```

### 3.4 Delete

To delete a document:

```python
res = my_collection.document('A01').delete()
```

## Conclusion

In this guide, we learned how to work with Google Firestore in Python. We covered setting up Firestore, connecting Python to Google Firebase, and performing CRUD operations using Python. Firestore provides a scalable and flexible NoSQL database solution, making it a powerful tool for web and mobile app developers.

By leveraging Firestore and other services offered by Google Firebase, developers can focus on building features and functionalities for their applications without worrying about managing backend infrastructure. Happy learning and stay tuned for more articles covering other services offered by Google Firebase!