# ES6: Next Generation JS
don't use var, use let or const
const: a variable that will never be re-assign a new value. if so, there will be an exception thrown in the console.
let: does not jave this restriction

## Compatibility: Babel
not all browsers and even the modern versions support all the JS next generation features. There is a solution that convert next genertion JS features to non next generation JS. It's called Babel and you will use it in your projects.


## Arrow functions

Not arrow 
```
function myFuc(){
}
```
Arrow function
```
const myFuc = () => {
}
```
Arrow with only a return. you must ommit the return keyword in this case
```
const myFuc = (x , y) => i

```


solve problems with the `this` keyword. Inside an arrow function it will always keep it context and will not change on runtime.


## Export and imports
Inside a JS file you can import content from another file.

### Export
#### Default export
person.js: exporting an object
```
const person = {
name: x
age: 3
}

// default = default export
export defult person

```

#### Named exports
utility.js: exporting methods and variables. 
```
export const onDelete() => {...}

export const baseData = 10;

```

### Import
if you want to import a class, function or variable you must export it and only then you can import it

#### Default import
import from a class that has export default. You are free to name the import variable as you like since there is no ambiguity. JS will know what to import since it's the defulat
```

import prs from './person.js'

// or 
import mishou from './person.js'
```
#### Named import
Import from a class with seperate exports. You need to target what you want to import by its name since there is no default and js wouldn't know what exactly you are intrested in. You import by name, and the name goes within `{}`. You can use alias.\
If you want to import everything from a file you can use  `import * as alias`. the alias will be a JS object that will expose all the exports as properties
```
import {baseData} from './utility.js'
//or
import {onDelete} from './utility.js'
// or both
import {onDelete, baseData} from './utility.js'
// using alias 
import {onDelete as del, baseData as base} from './utility.js'
//importing everything. 
import * as tools from './utility.js'

```

## Classes
creating class
```
class Person{
	constructor(){
	this.name = 'x';
	}
}

```
blueprint for objects. It has properties and methods
using classes : `const x = new Person()`

## Spread Operator
**`...`**: can serve as spread or rest operator. which of them? depend on where we use it.\

**spread:** used to pull up all the array's elements or object's propeties
```
const newArray = [...oldArray, 12]
consr newObject = {...oldObject, newProperty: value}
```
**rest:** use to merge a list of duntion arguments into an array. You use it in a function argument list. It means that this function can get an unlimited amount of arguments and they will be merge to an array then you can appaly array methods.
```
function sortArgs(...args){
	return args.sort()
}

```
## Destrcturing
Extract array elements /object properties and store them in variables. Sounds like spread operator? not really.\
spread operetor takes all elements/properties and disterbute them in a new array/ object. \
destructing pull out single elements/ properties and store them in variables 
### Array destructuring
the order defindes which element we pull
```
const names = ['Max','Avi', 'Ori']
[a,b] = names
console.log(a) // Max
console.log(b) // Avi

```
### Object destructuring
the property name defines which property we pull
```
const client = {name: max, client_no : 054154, age:35}
{name, client_no} = client
console.log(name) // max
console.log(client_no) // 054154
console.log(age) // undefined, you didn't pull it out

```

# Reference vs Perimitive types
**primitive:** numbers, strings, boolean. Assign one of them to a new variable and you will create a real copy, it copy the value to the new variable. changing the one wn't change the other. 

**reference:** objects and arrays. Assign it to a new variable won't create a copy. It will assign it with the pointer and not with the value. For creating a real copy you can use the spread operator

# map, filter etc...
take a function x as an argument and excute it on each element on the array, the return of this x function will used to populate a new array
 

