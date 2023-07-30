# Getting Started with Google Firestore and Performing CRUD Operations

Google Firestore is a document-based NoSQL database offered on the Google Firebase platform. It uses collections and documents to represent tables and records. This document provides a step-by-step guide to set up Google Firestore, connect Python to Google Firebase, and perform basic CRUD operations using Python.

## Setting up Google Firestore

1. Create a Firebase project to access [Firestore](https://console.firebase.google.com).
2. Go to the console and select your created project.
3. Navigate to Build -> Firestore Database (not RealTime) -> Create Database.
4. Click on "Start in Test mode."
5. Choose the closest location for your database.

## Connecting Python to Google Firestore

Before proceeding, ensure that your Python version is 3.6 or below, as firebase_admin may throw exceptions with Python 3.7 and above.

1. Install firebase_admin by running: `pip install firebase_admin`.
2. Return to the Firebase console.
3. Find the settings button and click on it (usually located near the project overview on the top-left corner).
4. Choose Project Settings => Service Accounts.
5. In the Service Account section, you'll find a code snippet for connecting to Google Firestore.
6. Select Python as the language and copy the code snippet to your Python class.
7. Click on "Generate New Private Key" to download the key.
8. Click on "Manage Service Account Permissions" (a small link on top of the code snippet).
9. Click on "Manage Keys" => "Add Key."
10. Choose JSON as the file format and click create. This file contains your credentials.
11. Put the JSON file in your project, and if you use git, never commit the file.

```python
cred = credentials.Certificate("path/to/serviceAccountKey.json")
```

## Performing CRUD Operations

### Create

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

### READ

To get a single document as a dictionary:

```python
res = my_collection.document('A01').get().to_dict()
```

To get all documents in a collection:

```python
res = collection.get() # returns a list
for i in res:
    print(i.to_dict())
```

### Update

To update a document:

```python
res = collection.document('A01').update({
    'State': 'Chennai',
    'age': 21
})
```

### Delete

To delete a document:

```python
res = collection.document('A01').delete()
```

In this article, we explored Google Firestore, a NoSQL database on the Google Firebase platform, and learned how to perform basic CRUD operations using Python. The advantages of using Google Firebase services and the ease of setting up scalable services on the cloud were also highlighted. Stay tuned for future articles covering other services offered by Google Firebase! Happy learning!