# Liquibase

## Config
For Liquibase to work, and to be able to run the Liquibase command, you need to edit `tumorotek-webapp/src/main/resources/liquibase/liquibase.properties` file. You need to update:
- url = the URL for the TK database
- username = MySQL username
- password = MySQL password

### Running Commands
When trying to run the update command, you may encounter an error:
```
Could not acquire change log lock. Currently locked by xxx since yyy
```
1. Run this query to see the problem yourself:

```sql
SELECT * FROM DATABASECHANGELOGLOCK WHERE ID = 1;
```

2. Release the lock:

```sql
UPDATE DATABASECHANGELOGLOCK SET LOCKED = 0, LOCKGRANTED = NULL, LOCKEDBY = NULL WHERE ID = 1;
```

## How Liquibase Works:

### Changelog File:
Liquibase uses a changelog file (usually in XML, YAML, or SQL format) to define the database changes. The changelog file contains a set of changesets, each representing a specific database change (e.g., adding a table, modifying a column).

### Changesets:
Changesets are units of change within the changelog file. They are uniquely identified by an ID and an author. Each changeset describes a specific database change using a set of commands.

### Commands:
Liquibase commands define specific database operations, such as creating a table, adding a column, or inserting data. Common commands include `<createTable>`, `<addColumn>`, `<modifyColumn>`, `<sql>`, etc.

### Database Connection:
Liquibase needs information about the database connection to apply changes. Connection details (URL, username, password) are usually specified in a properties file or directly in the changelog file.

### Execution:
Liquibase can be executed from the command line, integrated into build tools (Maven, Gradle), or used programmatically. When Liquibase runs, it checks the database for its change history and applies the pending changes.

### Configuration:

#### Install Liquibase:
Download Liquibase from the official website or use a dependency manager like Maven or Gradle.

#### Database Configuration:
Configure your database connection details in either a properties file (e.g., liquibase.properties) or directly in the changelog file.

#### Changelog File:
Create a changelog file (e.g., changelog.xml) to define your database changes.

#### Introducing a New Table:
Let's say you want to introduce the PARAMETRE_VALEUR_SPECIFIQUE table:

```xml
<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                   http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.10.xsd">

    <changeSet author="your_author_name" id="createTable_PARAMETRE_VALEUR_SPECIFIQUE">
        <createTable tableName="PARAMETRE_VALEUR_SPECIFIQUE">
            <column name="parameterId" type="INT">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <!-- Add other columns as needed -->
        </createTable>
    </changeSet>

</databaseChangeLog>
```

#### Run Liquibase:
Execute Liquibase to apply the changes to the database.
For example, if using the command line, you might run: `liquibase update`.

This is a basic overview of how Liquiba...