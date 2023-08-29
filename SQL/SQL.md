# MySQL Basics and Commands

## Path Separators
- Windows: \
- Linux: /

## Connecting to MySQL
- To access MySQL on your machine: `mysql -u {user} -p`
- To access a specific database: `mysql -u {user} -p {db_name}`
- To connect as root (with special privileges): `mysql -u root -p`
- To connect to a different host: `mysql -h {hostname} -u {user} -p`
- To disconnect: `exit`

## Working with Dump Files
- Import a dump file: `mysql -u {user} -p {db_name} < {absolute_address_dump_file.sql}`
- Export a dump file: `mysqldump -u {user} -p {db_name} > {absolute_address_dump_file_to_be_created.sql}`
- Include routines in the dump file: Add `--routines` option

## Requests
- Export query result to a file: `{query} INTO OUTFILE '{filename.csv/txt}' FIELDS ENCLOSED BY '"' TERMINATED BY ';' LINES TERMINATED BY '\r\n';`

## Information Retrieval
- Show users: `SELECT user, host FROM mysql.user;`
- List databases: `SHOW DATABASES;`
- Find tables in a database starting with a name: 
  ```sql
  SELECT * FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_SCHEMA = '{db_name}' AND TABLE_NAME LIKE '{name%}';
  ```
- Display the content of a stored procedure:
  ```sql
  SELECT routine_definition FROM information_schema.routines
  WHERE routine_type='PROCEDURE' AND routine_name='{nameProcedureStocke}';
  ```


## Database Management
- Create a new database: `CREATE DATABASE {db_name};`
- Use a specific database: `USE {db_name};`
- Delete a database (be cautious): `DROP DATABASE {db_name};`

## Table Management
- Create a new table:
  ```sql
  CREATE TABLE {table_name} (
      column1 datatype,
      column2 datatype,
      ...
  );
  ```
- Show columns of a table: `DESCRIBE {table_name};`
- Delete a table: `DROP TABLE {table_name};`

## Data Manipulation
- Insert data into a table:
  ```sql
  INSERT INTO {table_name} (column1, column2, ...)
  VALUES (value1, value2, ...);
  ```
- Update data in a table:
  ```sql
  UPDATE {table_name}
  SET column1 = value1, column2 = value2, ...
  WHERE condition;
  ```
- Delete data from a table:
  ```sql
  DELETE FROM {table_name}
  WHERE condition;
  ```

## Data Retrieval
- Basic SELECT query: `SELECT * FROM {table_name};`
- Select specific columns:
  ```sql
  SELECT column1, column2, ...
  FROM {table_name};
  ```
- Filter with WHERE clause: `SELECT * FROM {table_name} WHERE condition;`
- Sort results: `SELECT * FROM {table_name} ORDER BY column ASC/DESC;`

## Joins
- Inner join: Retrieve data from multiple tables based on a common column:
  ```sql
  SELECT *
  FROM table1
  INNER JOIN table2 ON table1.column = table2.column;
  ```
- Left join: Retrieve all records from the left table and matched records from the right table.

## Indexes
- Create an index on a column:
  ```sql
  CREATE INDEX idx_name ON {table_name} (column);
  ```
- List indexes in a table: `SHOW INDEX FROM {table_name};`
- Drop an index: `DROP INDEX idx_name ON {table_name};`

## User and Privilege Management
- Create a new user: `CREATE USER '{username}'@'{hostname}' IDENTIFIED BY '{password}';`
- Grant privileges to a user: `GRANT {privileges} ON {db_name}.{table_name} TO '{username}'@'{hostname}';`
- Revoke privileges from a user: `REVOKE {privileges} ON {db_name}.{table_name} FROM '{username}'@'{hostname}';`
- Change user password: `ALTER USER '{username}'@'{hostname}' IDENTIFIED BY '{new_password}';`

