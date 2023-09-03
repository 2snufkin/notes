


# Cloud

## Configureation
1. Log in to MongoDB website
2. click on Build a new cluster
3. After the setup, inside the console, go to Database Access
4. you will need to add a user with a password or certificate as auth method 
5. Under network access you can limit the ip adress by configurating which IP address can access you cluster. If you want to configure it to have access from anywhere tou click on add IP address and then in the window that opens you click on allow access from anywhere


## Acessing data in the DB
1. in the console go to the clusters
2. go to collections
3. click on add my own data. you will be prompted to enter a DB name, and inital collection name


## Connecting to the DB
### on the website

1. in the collection section click on connect
2. click on connect you app if you want to control the db from your code
3. copy the connection string
 `const conn_str = 'mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority': Replace <username>, <password>, <cluster>, and <database> with the appropriate values for your MongoDB Atlas account.
`

### To mongoose or not to mongoose?
When working with the mongodb package, and not using an object data modeling (ODM) library like mongoose, I will need to write my own code to handle data validation and mapping between JavaScript objects and MongoDB documents.\
if you use the Mongoose library, I don't need to do this. Mongoose provides a schema-based solution to model your application data and provides built-in validation and type-casting features.\
Mongoose supports a wide range of data types, including strings, numbers, dates, booleans, arrays, and embedded documents. You can define validation rules for each field in the schema using Mongoose's schema types, which include required, default, enum, min, max, and more.

Overall, Mongoose can simplify your development process and reduce the amount of boilerplate code you need to write to work with MongoDB.

### in you code

1. create a folder, you can call it config, and inside create a db.js file (the nale is up to you) 
2. copy the connection string
3. if you use mongoose see the connect with moongose section. else move to the next step
4. in your db.js file paste this code
```
const { MongoClient } = require('mongodb');

class DB {
  static async connectDB() {
    try {
    const conn_str = '';
      const client = await MongoClient.connect(conn_str, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB Atlas');
      const db = client.db('db_name');
      return db;
    } catch (err) {
      console.error('Error connecting to MongoDB Atlas', err);
      throw err;
    }
  }
}

module.exports = DB;

```
In this class, we use the MongoClient class from the mongodb package to connect to the database. The connectDB method takes a connection string as an argument and uses it to connect to the specified database ('db_name'). It returns a reference to the database object, which you can use to perform operations on the database.

5. you can use this connection to access your database
```
const DB = require('./db.js');
```
Then, you can call the connectDB method with your connection string:
```
const db = await DB.connectDB(conn_str);

```








# Local


# Mongoose
You can define a schema using Mongoose's Schema constructor function, and then create a model from the schema using the mongoose.model() method. The model is a class that you can use to create, read, update, and delete documents in MongoDB. The model also provides methods to validate data before saving it to the database.
Mongoose can be thought of as the equivalent of Hibernate in the Java world, but for MongoDB. Both Hibernate and Mongoose are object data modeling (ODM) libraries that provide an abstraction layer on top of the underlying database, making it easier for developers to work with the database by using object-oriented programming paradigms.

When considering wheatehr or not to use it, consider the folloowing code. we try to delete and item from a remote collection without mongoose
This code connects to your Atlas MongoDB instance, selects the database you want to use, and then deletes the artist with the given ID from the "artists" collection.
```
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(<your Atlas MongoDB connection string>, function(err, client) {
  if (err) throw err;

  const db = client.db('<your database name>');

  db.collection('artists').deleteOne({_id: <artist id>}, function(err, result) {
    if (err) throw err;

    console.log(result);

    client.close();
  });
});

```
To achieve the same using Mongoose, you would first need to define a schema for the "artists" collection and creates a model based on this schema, which can be used to interact with the "artists" collection.like this:
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  bio: String,
  albums: [String],
  createdAt: { type: Date, default: Date.now },
});

const Artist = mongoose.model('Artist', artistSchema);
```
only then you can delete
```
Artist.findOneAndDelete({_id: <artist id>}, function(err, artist) {
  if (err) throw err;

  console.log(artist);

  mongoose.connection.close();
});

```
This code deletes the artist with the given ID from the "artists" collection using the findOneAndDelete method of the Artist model.

## Connect with moongose
when dealing with mongoose the methods return a promise. don't use callbacks, use the then or the async await syntax
1. install it
node.js : `npm install moongoose`
2. in the db.js file you have created:
`const mongoose = require('mongoose')`
4. create a method to connect to the db
```
const connectDB = async () => {
try {
	connectionString = '...'
	const conn = await 		  	mongoose.connect(connectionString)
		// this can be enough but you can also pass and obect of options as a secnd arg
it will avois us from seeing warnings in the console
	const conn = await 		  	mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUndifedTopology: true,
	
	}
	)

} catcj (error){
console.log(err)

}


}
module.export = connectDB
```



