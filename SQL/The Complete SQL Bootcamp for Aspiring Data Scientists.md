# The Complete SQL Bootcamp for Aspiring Data Scientists 
## What's inside
1. The fundamentals, covering SQL syntax, data types, and essential querying techniques. 
2. How to write powerful SQL queries to retrieve, filter, and sort data, as well as perform calculations, and leverage aggregate functions.
3. Advanced SQL for data science. Joining tables, using subqueries, and employing window functions are vital skills for complex data retrieval and analysis. 
4. How to combine data from multiple tables, create intricate queries, and extract valuable insights from large datasets.
5. Database management and optimization. You will gain the skills to efficiently manage SQL Server databases, including database design, indexing, and performance tuning. 
This knowledge is crucial for ensuring that your databases run smoothly and deliver optimal performance. By the end of this course, you will have gained the confidence and expertise to utilize SQL for data science tasks, ranging from data exploration and manipulation to advanced analytics and reporting.

## Introduction
Database: Collection of tables and objects such as views, indexes stored procedures and triggers.
DBMS: Database Management System 
1. SQL (Relational) : MySQL, Oracle, MS SQL Server, PostgreSQL...    
2. NoSQL (Non Relational): MongoDB, Cassandra, Redis.. 
SQL: Structured Query Language. QUery language for CRUDing data stored in relation DB
Downloed. Declarative (what you want) not procederal (how it will be done)
### MS SQL Server: has master, model, mddb and tempdb
+ master: stores server-specific configuration information and authorized user details
+ model: a template for creating new databases by providing initial content
+ msdb:  manages SQL Server Agent configurations and job history
+ tempdb: temporary storage of tables, indexes, and result sets during query processing.
New DB: that db file that contains the db object is created and also a log file that records all the modification that happens in the db and the trunsactions that causes them.  

### SQL Syntax
SQL commend start with a verb + direct object. The verb instructs the system to perform an action, and the direct object specifies what. 
",": it's like a plus (+)
Comments: one line comment start with `--`  and multi line with `/* ... */`
Operations: SQL has a standardized syntax for performing various operations on a relational database. Key SQL statements include:
+ SELECT: Retrieves data from one or more tables.
+ INSERT: Adds new rows of data to a table.
+ UPDATE: Modifies existing data in a table.
+ DELETE: Removes rows from a table.
+ CREATE: Builds a new table, view, or other database object.
+ ALTER: Modifies the structure of an existing database object.
+ DROP: Deletes an existing database object.

### Data Types
It's important to note that the syntax and availability of these data types may vary slightly among different database management systems (DBMS) such as MySQL, PostgreSQL, SQL Server, and others. Always refer to the documentation of the specific DBMS you are using for precise information on data types and their usage.
1. **Numeric Types:**`INT` or `INTEGER`: Integer.`SMALLINT`: Small integer.`TINYINT`: Tiny integer. 0 - 255.`BIGINT`: Big integer.
`DECIMAL` or `NUMERIC`: Fixed-point number. `FLOAT`: Floating-point number.`REAL`: Real number.`DOUBLE PRECISION`: Double-precision floating-point number.
2. **Character String Types:** `CHAR(n)`: Fixed-length character string. `VARCHAR(n)`: Variable-length character string. `TEXT`: Variable-length character string (no specified length).
3. **Date and Time Types:** `DATE`: Date (YYYY-MM-DD). `TIME`: Time (HH:MM:SS). `TIMESTAMP`: Date and time combination. `INTERVAL`: A period of time.
4. **Boolean Type:**`BOOLEAN` or `BOOL`: Represents true or false values.
5. **Binary Types:**`BINARY(n)`: Fixed-length binary string.`VARBINARY(n)`: Variable-length binary string.`BLOB`: Binary large object (for large binary data).
6. **Miscellaneous Types:** `ENUM`: Enumeration of values. `SET`: Set of values.`JSON`: JSON data.
7. **Spatial Types (for Geographic Information Systems):**`GEOMETRY`, `POINT`, `LINESTRING`, `POLYGON`, etc.
8. **Specialized Types (Database-specific):**Various databases may have additional specialized data types specific to their features and requirements.


# DDL & DML
## DDL: Data Definition Language
DDL:Commends that alter the structure of the DB or table: Create, Drop, Alter, Truncate
AutoGenerated ID: 
```SQL

-- Create a DB
CREATE DATABASE database_name;

-- Change DB Name
ALTER DATABASE current_name MODIFY NAME = new_name;

-- Delete a DB
DROP DATABASE database_name;

-- Create a Table with auto generated ID: the data type should be one of the numeric, the seed is the first id that will generated
CREATE TABLE table_name

(
	column_id_name       data_type    IDENTITY(seed, incrememnt)   NOT NULL,
	column_name          data_type                     NULL/NOT NULL,
	....
)

-- Create a Table: you need the columnds names, data type each column accepts and wheater it can be Null (Optional)
CREATE TABLE table_name
(
	column_name          data_type 						NULL/NOT NULL,
	....
)

-- Alter the type of a certain column
ALTER TABLE table_name ALTER COLUMN column_name data_type;

-- Alter the type of a certain column and make it not null
ALTER TABLE table_name ALTER COLUMN column_name data_type NOT NULL;

-- Alter Table's propreties: add, delete , modify coulumns, change data type of a column, add / drop constrains etc..
ALTER TABLE table_name  ADD col_name data_type,
                        ADD col_name data_type[constraint],
                        ADD col_name data_type DEFAULT 'edfault_value', -- every new record will have this value
                        DROP COLUMN column_name,
                        ADD CONSTRAINT ...(The syntax vary, see section)
                        DROP CONSTRAINT constraint (for mentioning the column the syntax vary)
                        ALTER COLUMN column_name new_data_type

/* Delete a Table: if the table has a dependant objects like vies, triggers, stocked procedures they must be deleted 
before the table is deleted (other you wil lget an error)*/
DROP TABLE table_name;

/* Delete all the records of a table but don't drop it. Can't be used on tables referenced by FK or on tables
 participating in indexed views. Can't be rolled back */
TRUNCATE tablename;

```

## DML: Data Manipulation Language
DML: Manipulation of existing records in the DB. Select, Insert,  Update, Delete
```SQL

-- Insert into a Table: INSERT == INSERT INTO
INSERT table_name VALUES (value_col1, value_col2, ...);
-- Insert into a Table: only to certains columns
INSERT table_name(column_name1,column_name4) VALUES	(value_col1, value_col4);
-- Delete a recored/s from a table. Can be rolled back
DELETE FROM tablename WHERE col_name=col_value
-- Update a record/s 
UPDATE table_name
SET column1=value1, column2=value2, column7=value7
WHERE column_name=col_value
```


## Schema
Logical container that groups database objects, such as tables, views, and procedures, to organize and manage them within a database.
Database can have plusieurs schema and you can have the same tables name in diffrent schemas under the same DB
```SQL
-- Create a schema
CREATE SCHEMA schame_name;
-- Once a schema is created yo ucan create objects within the schema using the schema name as a prefix
-- Create a table under a schema
CREATE schame_name.table_name (...)
-- Transfer DB's objects (like a table) from one schema to another
ALTER SCHEMA target_schema TRANSFER from_schema.table_name;
-- Rename schema: Not Possible
-- Delete Schema: You can delete it only if it's empty and it has no objects attached (no tables etc..)
DROP SCHEMA schema_name
```

# Data Integrity
Data integrity refers to the accuracy, consistency, and reliability of data stored in the database. 
There are two main aspects of data integrity in SQL:

1. **Entity Integrity:**each row in a table is uniquely identified by a primary key
2. **Referential Integrity:** the value of the FK match with the value og the cooresponding PK.
3. **Domain Integrity:**the valid range of values is allowed to be stored in a column (like a drop down)
4. **User Integrity:** set of rules which are specified by the user and are not belong to entity,referential or domain


## Constrians
Constraints are rules and conditions applied to a table column or a set of columns to enforce the integrity of the data stored in the database.
**Naming:** it’s good practice to give your constraints clear, descriptive names even if adding a constraint name isn’t strictly required. While some SQL databases will generate default names for you, they’re not always clear.If you want to name your constrain you use `Constrain constrain_name constrain_type`

1. **NOT NULL Constraint:** Ensures that a column cannot contain NULL values.
2. **Unique Constraint:** Prevents duplicates.Ensures that the values in a column (or a combination of columns) are unique across all rows in the table. A unique column can have only one NULL value.
3. **Primary Key Constraint:** Can be create only once. Ensures that a column (or a combination of columns) uniquely identifies each row in a table. A combination of NOT NULL and UNIQUE constrains.
4. **Foreign Key Constraint:** Establishes a relationship between two tables by ensuring that the values in a column (or a set of columns) in one table correspond to the values in a referenced column (usually the primary key) in another table. If you insert a record with a FK value that references to a value that doesn't exists in the referenced table tou will get an ERROR.
5. **Check Constraint:** Defines a condition that must be true as a condition to wheater or not the data can be inserted to the table. 
6. **Default Constraint:** Specifies a default value for a column. If a value is not provided during an insert operation, the default value is used.


### Adding when creating a table 

```sql
     CREATE TABLE ExampleTable (
         ID INT PRIMARY KEY,
         -- Check Constraint
         Status VARCHAR(20) CHECK (Status IN ('Active', 'Inactive')),
         -- Default Constraint
         Name VARCHAR(50) DEFAULT 'Unknown',
         -- Unique Constraint
         Email VARCHAR(100) UNIQUE,
         -- NOT NULL Constraint
         Name VARCHAR(50) NOT NULL,
         -- FOREIGN KEY(the name of the dk column in this table) REFERNCES name of the table(the defined name of the column it references in the other table)
         FOREIGN KEY (CustomerIDFK) REFERENCES Customers(CustomerID)
         )
```

## Adding on an existing table 
```sql
-- Primary Key Constraint
ALTER TABLE your_table
ADD CONSTRAINT pk_constraint_name PRIMARY KEY (column_name);
-- Foreign Key Constraint
ALTER TABLE your_table
ADD CONSTRAINT fk_constraint_name
FOREIGN KEY (column_name) REFERENCES referenced_table(referenced_column);
-- Unique Constraint
ALTER TABLE your_table
ADD CONSTRAINT unique_constraint_name UNIQUE (column_name);
-- Check Constraint
ALTER TABLE your_table
ADD CONSTRAINT check_constraint_name CHECK (column_name > value);
-- Default Constraint
ALTER TABLE your_table
ADD CONSTRAINT default_constraint_name
DEFAULT default_value FOR column_name;
-- Not Null Constraint: The syntax for enforcing `NOT NULL` constraint might vary depending on the SQL database system you are using (e.g., `MODIFY COLUMN` in some databases, `ALTER COLUMN SET NOT NULL` in others).
ALTER TABLE your_table
MODIFY COLUMN column_name datatype NOT NULL;
```

# Querying the Database
## Select

**Select:** Used to retrive data frol one or more tables. The basic syntax `SELECT column_x (AS optional), column_y... / * FROM table_name WHERE condition`
**SELECT DISTINCT:** DISTINCT is used only after select. It excludes duplicates rows from the result set. `SELECT DISTINCE col_a, col_d FROM table_name` 
+ Multiple columns: if you use DISTINCT with multiple columns, it considers the uniqueness of the combination of values across those columns. If a specific combination of values appears more than once in the result set, only one instance of that combination will be included in the result.
+ Single column: DISTINCT considers only the uniqueness of values in column1.
**LIMIT:** Limit the number of rows return buy a query from the begining of the result set. `SELECT col_a, col_b FROM tablename LIMIT n` will return only n results.


## WHERE
Used to filter records based on specified conditions for SELECT, UPDATE and DELETE operations.
**Comparison Operators:** perform equality, inequality, and range-based filtering. 
- **Equality:** Filters records where the column value is exactly equal to a specified value.
- **Inequality:** Filters records where the column value is not equal to a specified value.
- **Greater Than:** Filters records where the column value is greater than a specified value.
- **Less Than:** Filters records where the column value is less than a specified value.
- **Greater Than or Equal To:** Filters records where the column value is greater than or equal to a specified value.
- **Less Than or Equal To:** Filters records where the column value is less than or equal to a specified value.

**Range Operators:** 
- `BETWEEN`: filter records within a specified range, inclusive of the range values.
- `NOT BETWEEN`: Test if a value is outside a specific range, inclusive of the range values

**List Operators:** 
- `IN`: allows you to specify multiple values in a list, filtering records that match any value in the list. 
- `NOT IN`: allows you to specify multiple values in a list, filtering records that don't match any value in the list. 

**Wildcard Operators:** Wildcard operators, such as `%` and `_`, are used with the `LIKE` operator for pattern matching. Examples include:
- `%`: represent 0, 1 ore more charecters. Matches any sequence of characters.
- `_`: Matches any single character.
- `[]`: Matches any single character within a specific range.
- `[^]`: Matches any single character that is not in the specified range.

**IS NULL / IS NOT NULL Operators:**
These operators are used to filter records based on whether a column contains `NULL` or non-`NULL` values. 
**!importent:** NULL is not the same as an empty string or a zero value. Null represnet the abstence of a value.

```sql
SELECT *
FROM your_table
WHERE column_name = value1
   OR column_name <> value2
   OR column_name > value3
   OR column_name < value4
   OR column_name >= value5
   OR column_name <= value6
   OR column_name BETWEEN range_start AND range_end
   OR column_name NOT BETWEEN not_between_start AND not_between_end
   -- Instead of writing: column_name = value7 OR column_name = value7 OR column_name = value7), we can use IN
   OR column_name IN (value7, value8, value9)
   OR column_name NOT IN (value10, value11, value12)
   OR column_name LIKE 'pattern%'
   OR column_name IS NULL
   OR column_name IS NOT NULL;


```

---

# Sort, Aggregate, Group, and Filter the Data
Sorting, aggregating, grouping, and filtering are essential operations for manipulating and extracting meaningful information from datasets. They are most of the time used with the `SELECT` operator.

**ORDER BY:**  used to sort the result set based on one or more columns in ascending or descending order. The default is ascending
**Aggregate Functions:** excute a function on all of data across multiple rows and return one value. 
If you select more than one column you may use the `GROUP BY` clause
- `COUNT`: returns the number of rows in a table `COUNT(*)` or the number of non-null/ not empty values in a column.
- `SUM`: returns the sum of numeric values in a column.
- `AVG`: returns the average of numeric values in a column.
- `MIN`: returns the minimum value in a column.Can be use also on strings, dates...
- `MAX`: returns the maximum value in a column. Can be use also on strings, dates...  

**GROUP BY**: group rows that have the same values in specified columns. It is often used in conjunction with aggregate functions:
The general rule is that the SELECT clause can contain either:

+ Columns that are part of the GROUP BY clause.
+ Aggregate functions applied to columns that are not part of the GROUP BY clause.

**Having:** filter the results of GROUP BY query besed on  a specified consition. Used after GROUP BY. WHERE works with SELECT, HAVING work with GROUP BY. GROUP BY is excuted afther the WHERE clause so we can't uses it to filter.


```sql
-- Sorting
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;

-- Aggregate Functions
SELECT aggregate_function(column2)
FROM table_name;

-- Group By (including another column that is not in the GROUP BY clause nor is a argument of the aggregate_function will trhow an error)
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1;

-- HAVING
SELECT column1, column2, aggregate_function(column3)
FROM table
GROUP BY column1, column2
HAVING aggregate_function(column3) condition;

```

---
# Functions

## String Functions
**`CONCAT()`:** Concatenates two or more strings together.
**`SUBSTRING()`:** Extracts a portion of a string.
**`LENGTH()` / `LEN()`:** Returns the length of a string.


## Date Functions
**`YEAR()`:** Extracts the year from a date.
**`MONTH()`:** Extracts the month from a date.
**`DATEDIFF()`:** Calculates the difference between two dates.

## Mathematical Functions
**`ABS()`:** Returns the absolute value of a number.
**`ROUND()`:** Rounds a numeric value to a specified number of decimal places.



## Data Conversion Functions
**`CAST()`:** Converts one data type to another.
**`CONVERT()`:** Converts one data type to another (database-specific).



## `COALESCE` and `ISNULL`
**`COALESCE()`:** Returns the first non-null expression among its arguments.
**`ISNULL()`:** Returns the specified value if the expression is null; otherwise, it returns the expression.


## String Aggregation Function
**`GROUP_CONCAT()` (Database-specific):** Concatenates values from multiple rows into a single string within a group.


```sql
-- String Functions
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;

SELECT SUBSTRING(title, 1, 3) AS short_title
FROM books;

SELECT LENGTH(product_name) AS name_length
FROM products;

-- Date Functions
SELECT YEAR(order_date) AS order_year
FROM orders;

SELECT MONTH(transaction_date) AS transaction_month
FROM transactions;

SELECT DATEDIFF(end_date, start_date) AS date_difference
FROM projects;

-- Mathematical Functions
SELECT ABS(sales_amount) AS absolute_sales
FROM sales;

SELECT ROUND(price, 2) AS rounded_price
FROM products;

-- Data Conversion Functions
SELECT CAST(quantity AS VARCHAR) AS quantity_str
FROM inventory;

-- Convert() is database-specific; this example uses SQL Server syntax
SELECT CONVERT(date_column, DATETIME) AS datetime_column
FROM events;

-- COALESCE and ISNULL
SELECT COALESCE(discounted_price, regular_price) AS final_price
FROM products;

SELECT ISNULL(product_name, 'Not Available') AS product_status
FROM products;

-- String Aggregation Function (Example assumes MySQL syntax; might vary for other databases)
SELECT category, GROUP_CONCAT(product_name) AS products_list
FROM products
GROUP BY category;

```

This reference provides examples and explanations for various SQL functions that can be used to manipulate and analyze data within a database. Users are encouraged to refer to the specific documentation of their database management system for detailed information on available functions and syntax.







## String Functions
## Date Functions
## Mathematical Functions
## Data Conversion Functions
## COALESCE and ISNULL
## String Aggregation Function