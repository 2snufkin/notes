# Mongoose
Mongoose can be thought of as the equivalent of Hibernate in the Java world, but for MongoDB. Both Hibernate and Mongoose are object data modeling (ODM) libraries that provide an abstraction layer on top of the underlying database, making it easier for developers to work with the database by using object-oriented programming paradigms.
when dealing with mongoose the methods return a promise. don't use callbacks, use the then or the async await syntax


## Connecting to Remote DB with mongoose

### Node.js
1. install it
 `npm install moongoose`
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


## Working with mongoose
You can define a schema using Mongoose's Schema constructor function, and then create a model (like an Entity) from the schema using the mongoose.model() method. The model is a class that you can use to create, read, update, and delete documents in MongoDB. The model also provides methods to validate data before saving it to the database.

### Define a Schema + model
1. group all of youe models in a folder named models
2. for each model create a js file with the Object name. For example: Artist.js
3. Configurate the Schema. don't incluse the id, it will be auto-generated
4. some properites you can use: type, trim, required, enum
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
	// you can just define the type
  name: String,
  // you can go depper and define constrains
  bio: {
  	type: String,
  	trim : true,
  	required : [true, 'error message']

  	},
  albums: [String],
  category: ['pop', 'rock', 'classic']
  createdAt: { 
  	type: Date, 
  	default: Date.now },
});

module.exports = mongoose.model('Artist', artistSchema);
```

### Using mongoose methods
now you can use mongoose out of the box methods: delete for example. This code deletes the artist with the given ID from the "artists" collection using the findOneAndDelete method of the Artist model.

```
Artist.findOneAndDelete({_id: <artist id>}, function(err, artist) {
  if (err) throw err;
  console.log(artist);
  mongoose.connection.close();
});

```

