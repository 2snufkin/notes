# Remote: Atlas MongoDB

## Online Config
1. Log in to MongoDB website
2. click on Create. Choose between Severless, Dedicated and Shared (see choose instance). for free cluster choose shared, for the others you need to pay
3. After the setup, inside the console, go to Database Access
4. you will need to add a user with a password or certificate as auth method 
5. Under network access you can limit the ip adress by configurating which IP address can access you cluster. If you want to configure it to have access from anywhere tou click on add IP address and then in the window that opens you click on allow access from anywhere
6. in the console go to the clusters
7. go to collections
8. click on add my own data. you will be prompted to enter a DB name, and inital collection name

## Getting the connections string
1. in the collection section click on connect
2. click on connect you app if you want to control the db from your code
3. copy the connection string, save it in a txt file. it will look like that:\
 `const conn_str = 'mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority'``:`
4. Replace <username>, <password>, <cluster>, and <database> with the appropriate values for your MongoDB Atlas account.
5. copy it's value to the connection variable

## To mongoose or not to mongoose?
When working with the mongodb package, and not using an object data modeling (ODM) library like mongoose, I will need to write my own code to handle data validation and mapping between JavaScript objects and MongoDB documents.\ 
if you use the Mongoose library, I don't need to do this. Mongoose provides a schema-based solution to model your application data and provides built-in validation and type-casting features.\
Mongoose supports a wide range of data types, including strings, numbers, dates, booleans, arrays, and embedded documents. You can define validation rules for each field in the schema using Mongoose's schema types, which include required, default, enum, min, max, and more.
Overall, Mongoose can simplify your development process and reduce the amount of boilerplate code you need to write to work with MongoDB.

If you want to use mongoose see the mongoose.ms file and stop reading here

### Code config MongoDB driver  
1. `npm install mongodb`
2. create a folder, you can call it config, and inside create a db.js file (the nale is up to you) 
3. copy the connection string
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

## Use it
you can use this connection to access your database outside db.js
```
const DB = require('./db.js');
```
Then, you can call the connectDB method with your connection string:
```
const db = await DB.connectDB(conn_str);

```

## Choose instance

 + Serverless: A serverless MongoDB cluster allows you to deploy your MongoDB database without having to manage any infrastructure. With a serverless cluster, the cloud provider manages the database for you, automatically scaling it up or down based on usage. This option is ideal for applications with unpredictable traffic patterns or for developers who want to focus on their application code without worrying about the underlying infrastructure.

 + Dedicated: A dedicated MongoDB cluster is a dedicated set of servers that are provisioned specifically for your database. With a dedicated cluster, you have full control over the configuration of your servers, including the ability to customize hardware, networking, and storage options. This option is ideal for applications with high performance and availability requirements or for organizations that need to meet specific security or compliance requirements.

 + Shared: A shared MongoDB cluster is a set of servers that are shared by multiple users or applications. With a shared cluster, you have limited control over the configuration of your servers and are often limited to a pre-defined set of hardware, networking, and storage options. This option is ideal for small applications or for developers who are just starting out with MongoDB and want to test it out without having to commit to a dedicated cluster.

It's important to note that each of these options has its own advantages and disadvantages, and the best option for your use case will depend on factors such as performance requirements, cost, and the level of control you need over your infrastructure. It's recommended to carefully evaluate each option before making a decision.


# Local

