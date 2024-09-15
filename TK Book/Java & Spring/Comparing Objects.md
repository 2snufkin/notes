# Comparing Objects in Java

## Comparing Primitive Types, Java Objects, and Custom Objects in Java: Best Practices
In Java, comparing values involves different approaches for primitive types, Java objects, and custom objects. Each type requires specific consideration due to their inherent differences in behavior and memory allocation. When dealing with objects, it is crucial to understand why using `==` for comparison might lead to unexpected results.

1. **Primitive Types:**
   Primitive types, such as int, char, boolean, etc., should be compared using the standard comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`). Since primitive types directly store values, these operators compare the actual data.
   ```java
   int num1 = 5;
   int num2 = 5;

   if (num1 == num2) {
       // Code for equal values
   } else {
       // Code for unequal values
   }
   ```

2. **Java Objects:**
   For objects in Java, it is recommended to use the `equals()` method provided by the Object class. The `equals()` method is often overridden by classes to define custom equality rules.
   ```java
   String str1 = new String("Hello");
   String str2 = new String("Hello");

   if (str1.equals(str2)) {
       // Code for equal values
   } else {
       // Code for unequal values
   }
   ```

3. **Custom Objects:**
   When dealing with custom objects, it is crucial to override the `equals()` method and, by extension, the `hashCode()` method. This ensures that instances of the class are properly compared based on their content.
   
```java
public class Person {
    private String name;
    private int age;

    // Constructors, getters, setters, etc.

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Person person = (Person) obj;

        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```
**Usage:**
```java
Person person1 = new Person("John", 25);
Person person2 = new Person("John", 25);

if (person1.equals(person2)) {
    // Code for equal objects
} else {
    // Code for unequal objects
}
```

## Why You Must Avoid Comparing Objects with `==`:
The `==` operator compares object references, not their content. For objects, it checks if the two references point to the same memory location, not if the objects themselves are logically equal. Overriding the `equals()` method allows you to define custom equality rules,
comparing objects based on their attributes rather than their memory addresses.

Using `==` for object comparison can lead to unexpected behavior,
especially when dealing with strings or instances of custom classes.
Always use the equals() method to ensure a meaningful and contextually appropriate comparison of object content.

In this example,
comparing two Integers that have the same value result in false:
```java
Integer a = 1000;
Integer b = 1000;

boolean isEqual = a == b; // it's false 
```