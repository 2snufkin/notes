# Basic

## Variables
**Variables:** Act as containers to store data values. is a named location in memory used to store data. Variables allow programmers to manipulate data dynamically during program execution.<br />
**Naming Conventions:** They cannot start with a digit. Avoid using reserved keywords like `if`, `for`, `while`, etc., as variable names.<br />
**Type:** Python is dynamically typed, meaning you don't need to declare the type of a variable explicitly. The data type of a variable can change dynamically during execution.<br />
**Scope:**  Variables in Python have a scope, which defines where the variable is accessible.  Python has local, global, and built-in scopes.<br />
*Local:*Variables declared within a function have local scope and are only accessible within that function.<br />
*Global:* Variables are declared outside of any function and are accessible throughout the program.<br />
**Mutability:** Most of the objects in Python are mutable, except tuples, Strings, numbers and booleans. It means that we can change thiers attributes and if you change or assign new value - it's a new object, not the same one as before the assigment.

### Naming: Underscore in Python
have various uses in Python and are a part of the language's naming conventions. Here are some common uses of underscores:<br />
**`_`:** Can be used as a throwaway variable. It is conventionally used when the variable's value is not going to be used.<br />
**`_variable`:** Used as a convention to indicate that a variable or method is intended for internal use. It signals that the variable or method is part of the internal implementation and should not be accessed directly from outside the module or class.<br />
**`__variable`:** Used to invoke name mangling, a mechanism to make a variable or method name more unique within a class. It changes the name of the variable to include the class name, preventing accidental name clashes in subclasses.<br />
**`variable_`:** A single trailing underscore is sometimes used to avoid naming conflicts with Python keywords or built-in functions.<br />
**`__variable__`:** Used for "magic" or special methods in classes. These methods have a specific purpose, such as `__init__` for object initialization and `__str__` for string representation.

## Types
**Type Hinting:** Intredouce in Python 3.5. Allows to specify the type of a variable or function parameter.<br />
*Syntax:* Var : type. 
*Collctions:* If you want a var to be a list of books `def add_books(books : List[Book])` you ill need to import List `from typing import List`
*Return:* `-> return_type` if it's a custome object, the object type should be inside " " if your are in the same class otherwise "" is not needed

## Imports in Python
**Import:**Importing runs through a file and allows you to access the properties defined inside it. you can import from files or folders as long as they are in your sys paths.<br />
**Relative:**For relative imports within a package, use `.` and `..`.

**__init__.py:** Importing from a folder usually requires a dunder  file to be defined,especially in older Python versions.<br />
**__name__:** Equal to `__main__` in the file you run and is equal to the import path on other files.


## Errors in Python
Error handling is done using `try`, `except`, and `finally` blocks.<br />
**Syntax:** Raise ErrorName("error message")
**Try-except-else-finally :** If a method raise an error and you don't want it to stop your app you try and catch. the else is exe if there is no erros and finally runs no matter what.<br />
**Custom Errors:**You can create custom error classes by inheriting from `Exception`.


## Flow Control

### Conditionals (if, elif, else):
- **If:** Evaluates a condition; if true, it skips further `elif` and `else` checks; if false, it proceeds to the next condition.
- **Elif:** Allows you to check multiple conditions in sequence until a true condition is found.
- **Else:** Executes if none of the `if` or `elif` conditions are true.

## Loops:
- **While:** Loops as long as a condition is true. You can use `break` to exit prematurely.
- **For:** Typically used for iterating over elements in an iterable (e.g., list, tuple, string).

```python
# Type hinting
def add(x: int, y: int) -> int: 
    return x + y

class CustomObject:
    def __init__(self, value: int):
        self.value = value

    def add_values(a: int, b: int) -> int:
        return a + b

    def create_custom_object(value: int) -> "CustomObject":
        return CustomObject(value)

    def create_external_object() -> OtherObject:
        return OtherObject()

# Importing modules
import math
print(math.sqrt(25))

# Importing specific function/class
from random import randint
print(randint(1, 10))

# Relative imports
from .module1 import function1
from ..module2 import function2

# Custom error class
class MyError(Exception):
    pass

# Raise custom error
raise MyError("This is a custom error.")        
```

# Collections
Data structures used to store and manage multiple elements. There are several built-in collection types that serve different purposes and scenarios. The main collection types in Python include:
**Membership Test (in):** Checks if an element is present in a collection (list, tuple, set) or a string.<br />
**Lists:** Ordered, mutable collections that can contain elements of different data types. Lists support indexing and slicing.<br />
**Tuples:** Ordered, immutable collections similar to lists but with fixed elements. Tuples are commonly used for heterogeneous data.<br />
**Sets:** Unordered, mutable collections that do not allow duplicate elements. Sets are useful for performing mathematical set operations (union, intersection, etc.).<br />
**Dictionaries:** Unordered collections of key-value pairs. Dictionaries are useful for mapping keys to values.<br />
**Strings:** Strings are sequences of characters and can be considered as collections of characters.<br />
**Destructuring Variables:** Allows you to unpack values from iterable types like lists or tuples into individual variables. It enhances code readability and simplifies variable assignments.

### Collection module
These collections provide a wide range of options for handling different types of data and scenarios in Python. Each collection type has its strengths and use cases, and choosing the right one depends on the specific requirements of your program.<br />
*Using:* O use one of those collection you need to import them. `from collections import ...`
**Deque (Double-Ended Queue):** A deque is a double-ended queue that allows efficient insertion and deletion from both ends.<br />
**NamedTuple:** A subclass of a tuple with named fields. It provides more readable and self-documenting code.<br />
**Counter:** A subclass of a dictionary designed to count hashable objects.<br />
**DefaultDict:**  A dictionary with a default value for unknown keys.<br />
**ChainMap:** A dictionary-like class that combines multiple dictionaries into a single mapping.



## Dictionaries
A versatile and powerful data structure that stores key-value pairs. Unlike sequences (such as lists or tuples) that are indexed by a range of numbers, dictionaries are indexed by keys.  
**Syntax:** `my_dict = {'key1': 'value1', 'key2': 'value2', ...}`
**Key:** Each key must be unique within the dictionary, and it is associated with a specific value.Can be any hashable type.
List of keys: `dict_name.keys()`./n
Check if key exists: `if key in dict_name`
**Accessing Values:** Use square brackets and the key to access the value: `value = my_dict['key']` or `value = dict_name.get(key, default_value)`.<br />
**Adding Items:**  `my_dict['new_key'] = 'new_value'`.<br />
**Modifying:** `dict_name[existing_key] = new_value`
**Removing Items:** Use the `del` statement to remove a key-value pair: `del my_dict['key']`.<br />
**Iterating Through Items:**

## Comprehension

### List Comprehension:
You can achive the same result by using the map() but list comprehension is slightly faster.
- **No condition:** Creates a new list from an existing list. Syntax: `[action on each element for element in list]`
- **With condition:** Creates a new list with a condition. Syntax: `[element for element in list if condition]`

### Dictionary Comprehension:
A concise and expressive way to create dictionaries. It provides a shorter syntax compared to traditional methods and is especially useful when you need to generate dictionaries based on some conditions or transformations.<br />
**Syntax:**`{key_expression: value_expression for item in iterable if condition}`
*Key_expression:* The expression that defines the keys for the dictionary.<br />
*Value_expression:* The expression that defines the values for the dictionary.<br />
*Item:* Represents each element in the iterable.<br />
*Iterable:*The iterable (e.g., a list, tuple, etc.) over which the comprehension iterates.<br />
*Condition (optional):* An optional condition that filters the items from the iterable.


```python


# Creating a list
my_list = [1, 2, 3, 4, 5]

# Creating a tuple
my_tuple = (1, 2, 3, 4, 5)

# Creating a set
my_set = {1, 2, 3, 4, 5}

# or using set() constructor
my_set = set([1, 2, 3, 4, 5])



# Creating a dictionary
student = {
    'name': 'John Doe',
    'age': 25,
    'grades': {'math': 90, 'english': 85, 'history': 92}
}

# Accessing values using keys
print(student['name'])
# Output: John Doe

# Modifying a value
student['age'] = 26

# Adding a new key-value pair
student['gender'] = 'Male'

# Removing a key-value pair
del student['grades']

# Iterating through key-value pairs
for key, value in student.items():
    print(f"{key}: {value}")

# Iterating Using keys
  for key in my_dict:
      print(key, my_dict[key])



#Dictionary Comprehension:  Creating a dictionary using comprehension to square numbers
squared_numbers = {x: x**2 for x in range(1, 6)} 
# Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

#Dictionary Comprehension with condition:  Creating a dictionary with even numbers and their squares
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0} 
# Output: {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}

# Destructuring Variables

tuple_example = (1, 2, 3)
a, b, c = tuple_example
# Now, a is 1, b is 2, and c is 3

tuple_example_person = ("Bob", 35, "Gardener")
name, _ , proffesion = tuple_example_person  # If you don't care about a variable, meaning you are never going to use it you can use the underscore

list_example = [4, 5, 6, 2]
x, y, z = list_example
# Now, x is 4, y is 5, and z is 6
head, *Tail = list_example
# The first item will be head and all the others will be collected to the tail variable

# For dictionaries, you can extract values based on keys.

dictionary_example = {'name': 'John', 'age': 30, 'city': 'New York'} 
name, age, city = dictionary_example.values()
# Now, name is 'John', age is 30, and city is 'New York'


# Unpacking in Function Parameters
def example_function(*Args):
    arg1, arg2, *Rest = args
    # arg1 and arg2 capture the first two arguments, and rest captures the rest


# Swapping Variables
a = 5
b = 10
a, b = b, a # b ,a is like writing (b,a) it's a tuple
# Now, a is 10, and b is 5

```

# Functions 
**Function:** A callable variable. They can be defined using the `def` keyword. Functions can take parameters, which are specified in the function definition.<br />
**Default Parameters:** Allow you to set default values for function parameters. If a parameter has a default value, it can be omitted when calling the function, and the default value will be used. When defining a function defualt parameters comes at the end.<br />
*Mutable Default Parameters:* Mutable default parameters can lead to unexpected behavior. See example
**Arguments:** When calling a function, you can pass arguments in two main ways: using positional arguments and using named arguments
Position Arguments: Positional arguments are passed to a function in the order the parameters are defined.
Named Arguments: Named arguments (also called keyword arguments) are passed with the parameter names, and their order doesn't matter.<br />
**Order:** If you call a function and you want to mix position and named arguments the oreder matters. Positional arguments must be provided first, followed by named arguments.<br />
**First-Class Functions:** Python treats functions as values and they are first-class citizens.<br />
*First-class citizens:* They can be passed as arguments, stored in a variable, returned from other functions.


## Lambda:
One-line function defined using the `lambda` keyword. Its puropose is to operate on an input and return an output.<br />
**Uses:** They are often used for short-lived, simple operations where a full function definition seems excessive. for example with `map()`, `filter()`, and `sorted()`.<br />
**Syntax:** Lambda parameters: return
**Naming:** Lambda function doesn't required naming it but in this case you must use it at the same line that it was declared. If you want to use it elsewhere assign it to a variable.

## Unlimited Parameters
Both `*Args` and `**Kwargs` are used to define functions that can accept a variable number of arguments, but they serve different purposes.<br />
**`*Args` (Arbitrary Arguments):**Collects any extra **Positional arguments** Passed to the function into a tuple.<br />
**`**Kwargs` (Arbitrary Keyword Arguments):** Collects any extra **Keyword arguments** Passed to the function into a dictionary.
Summary: `*Args` is used for collecting positional arguments into a tuple, while `**Kwargs` is used for collecting keyword arguments into a dictionary. 
**Collections as argument:**  You can pass a collection with x items as an argument to a method that has x parameters `function_call(*Collection)`.<br />
**Dictionery as argument:** You can pass a dictionary when calling a method if it has corresponding keys (with values) that match the parameter names of the function. `function_call(**Dict)`.<br />
**`**`**: Used to unpack a dictopnary into arguments when calling a function or to collect named arguments into a dictionery inside a function defenition.

## Decorators
**Decorator:**  Used to modify the behavior of functions. They are applied using the `@` syntax and can take parameters.<br />
*@:*  Used to apply a decorator to a function. Will pass the annotated function to the decorator function as an argument
*Parameters:* For a decorator to take a arguments, the function behind it need to have parameters
**Problem:** The registred name of the annotated function will be the name of the decorator function. print `annotated_funtion.__name__` to see it.<br />
*Solution:* Anootated the inner devcorator function  with `@functools.wraps(arg...)` . See example

### map()
A built-in function that allows you to apply a specified function to all items in an iterable (e.g., a list) and returns an iterator that produces the results. The general syntax of the `map()` function is as follows:
**Syntax:** `map(function, iterable, ...)`
function: The function to apply to each item in the iterable. This can be a built-in function or a user-defined function (including lambda functions).
iterable:The iterable (e.g., a list, tuple, etc.) whose elements will be processed by the specified function.
return: returns an iterator that produces the results lazily, meaning it calculates the values on-the-fly and only when requested. To obtain the final result, you often need to convert the iterator to a list using the `list()` function or another colleciton function.




```python
def greet(name, age):
    print(f"Hello, {name}! You are {age} years old.")

# Using positional arguments
greet("Alice", 25)

# Using named arguments
greet(age=30, name="Bob")

# Function with default parameter
def greet(name="Guest"):
    print(f"Hello, {name}!")

# Function calls
greet() # Hello, Guest
greet("Bob") # Hello, Bob

# Mutable default parameters
def append_to_list(item, my_list=[]):
    my_list.append(item)
    return my_list

result1 = append_to_list(1)
result2 = append_to_list(2)
print(result1)  # [1, 2]
print(result2)  # [1, 2]

# Lambda function assigned to a variable
square = lambda x: x**2 # follow the syntax lambda parameters: return
print(square(4))
# Output: 16

# Lambda function without a name: Using lambda with map to double each element in a list
numbers = [1, 2, 3, 4]
doubled_numbers = map(lambda x: x * 2, numbers) # Output: [2, 4, 6, 8]

# Lambda function with list comphrention: it's hard to read and clumsy
numbers = [1, 2, 3, 4]
doubled_numbers =  [ (lambda x: x * 2)(no) for no in numbers]

# map(): Run through a collection and apply a funtion to each item
new_collection = map(function, collection)

# Unlimited parameters
def args_function(*Args):
    result = 1
    for arg in args:
        result *= arg
    return result

def kwargs_function(**Kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

def example_function(*Args, **Kwargs):
    for arg in args:
        print(arg)
    
    for key, value in kwargs.items():
        print(f"{key}: {value}")

example_function(1, 2, 3, a=4, b=5)
example_function(a=1, b=2, c=3)
multiply(2, 3, 4)

collection = ["Oren", 35]
greet(**Collection) # will call def greet(name, age):


def print_user_info(name, age, country):
    print(f"Name: {name}, Age: {age}, Country: {country}")

# Dictionary containing user information
user_info = {'name': 'John', 'age': 30, 'country': 'USA'}

# Unpacking the dictionary into the method call
print_user_info(**User_info) # equivalent to: print_user_info(name='John', age=30, country='USA')

# First-class functions
def square(x):
    return x ** 2

def operate(func, x):
    return func(x)

result = operate(square, 3)
print(result)



# Simple decorator
import  functools


def decorator(func):
    @functools.wraps(func) #Optional, solve the naming problem (see doc)
    def wrapper():
        print("Before function call.")
        func()
        print("After function call.")
    return wrapper

@decorator
def my_function():
    print("This function is decorated.")

# Decoratoring function with parameters
def actual_decorator(func):
    @functools.wraps(func) #Optional, solve the naming problem (see doc)
    def wrapper(*Args, **Kwargs):
        print(f"{prefix}: Before function call.")
        return func(*Args, **Kwargs)
    return wrapper
   
@actual_decorator         
my_function_with_param(param1, param2):

# Decorator that takes parameters
def repeat(num_times):
    def decorator_repeat(func):
        def wrapper(*Args, **Kwargs):
            for _ in range(num_times):
                result = func(*Args, **Kwargs)
            return result
        return wrapper
    return decorator_repeat

@repeat(num_times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")

```


# Object-Oriented Programming 
Object-Oriented Programming is a programming paradigm that utilizes objects to structure code. In Python, everything is an object, and OOP allows you to model real-world entities as objects, each with its own attributes and behaviors. Key concepts in OOP include classes, objects, encapsulation, inheritance, and polymorphism.

**Class:** A blueprint for creating objects. It defines a data structure (attributes) and methods (functions) that operate on that data.
self: a reference to the object itself when the object is created
**Object:** An instance of a class. It is a concrete realization of the class, with specific values for its attributes.
Creating Object: my_object = MyClass(attribute1_value, attribute2_value...)
**`__init__` method:**  The constructor. It initializes the object's attributes when the object is created.<br />
**Attributes:** Attributes are variables that store data specific to each object created from the class.
Access: `value = my_object.attribute1`
**Methods:** Methods are functions defined within a class that operate on the class's attributes or perform other actions.<br />
*Instance Method:* Bound to an instance of the class and can access and modify the instance's attributes, providing behavior specific to each instance.
calling: You must create an object if you want to call it.  all the instance methods within a Class must have at least one parameter -> self
behinf the scene: Python does ClassName.method_name(instance) for example `yoni = Student("Yoni", (100, 85, 71)) => Student.calculate_avarage(yoni)`
*Class Method:* Anottated with `@classmethod`. Bound to the class rather than instances, often used for operations that involve the class itself, and they can't access or modify instance-specific attributes directly.<br />
*Static method:* Anottated with `@staticmethod`. It's not really a method, it's more of a function inside a class which is independent of class and instance state, often used for utility functions within the class that don't require access to instance-specific or class-specific attributes.<br />
**Inheritance:** X is y relationship between classes. Allows a subclass to inherit attributes and methods from another class (parent class). 
`super()` function: Used to call the methods of the parent class.<br />
**Composition:** X has y relationship. Allows one class to contain an instance of another class as a member or attribute.



## Magic methods
Magic methods, also known as dunder methods (short for "double underscore" methods), are special methods in Python that are surrounded by double underscores on both sides of their names. These methods are called implicitly by the Python interpreter in response to certain events, and they provide a way to define how objects behave in various contexts. 

**`__init__`:**The `__init__` method is called when an object is created. It initializes the object's attributes.<br />
**`__eq__`:** Is called when comparing objects using the equality operator (`==`).<br />
**`__str__`:** Returns a string representation of the object. It is called when the `str()` function or `print()` function is used on an object. Not defining it will return something that looks like the Object's memory place
**`__repr__:`**Intended for developer. Return an unambiguous detailed representation string that can be used to recreate the object. 
**`__len__`:** Returns the length of an object. It is called when the `len()` function is used on an object.<br />
**`__call__` - Callable Objects:** Allows an object to be called as if it were a function.



```python
class MyClass:
    def __init__(self, attribute1, attribute2):
        self.attribute1 = attribute1
        self.attribute2 = attribute2

    def method1(self):
        # Method code here
        pass

    def method2(self):
        # Method code here
        pass

# Creating an instance of MyClass
my_object = MyClass(attribute1_value, attribute2_value)  

# Accessing attributes
value = my_object.attribute1

# Calling methods
my_object.method1()   

# Inheritance
lass MyDerivedClass(MyClass):
    def __init__(self, attribute1, attribute2, attribute3):
        super().__init__(attribute1, attribute2)
        self.attribute3 = attribute3

    def method3(self):
        # Method code here
        pass   
# Type of methods
class Book:

    COVER = ("hardcover", "softcover")

    def __init__(self, name, book_type, weight):
        self.name = name 
        self.book_type = book_type
        self.weight = weight

    def instance_method(self):
        return f"Instance method called with value: {self.name}"

     @classmethod
    def hardcover(cls, name, weight):
        return  cls(name, cls.COVER[0], weight)
        
     @staticmethod
    def static_method():
        return "Static method called, no nothing about the class or it's variables"    
    


# Calling the instance method
obj = MyClass(42)
result = obj.instance_method()

# Calling the class method without creating an instance
result = MyClass.class_method()

# Calling the static method without creating an instance
result = MyClass.static_method()



# Magic methods

class MyList:
    def __init__(self, items):
        self.items = items

    def __len__(self):
        return len(self.items)

   


class Book:
    def __init__(self, title, author, year_published):
        self.title = title
        self.author = author
        self.year_published = year_published  
        
    def __repr__(self):
    return f"<Book('{self.title}', '{self.author}', '{self.year_published }')"      

class CallableClass:
    def __call__(self, x):
        return x * 2

my_callable = CallableClass()
result = my_callable(3)  # Calls __call__, result is 6     

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    ```        


