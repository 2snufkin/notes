# Liquibase

Liquibase is an open-source database-independent library for tracking, managing, and applying database schema changes. It allows you to version control your database schema, making it easier to deploy.

## Introduction

Liquibase is an open-source database schema change management tool that helps manage and track database changes in a consistent and controlled manner. It provides a way to define, manage, and apply changes to a database schema, ensuring that the schema remains synchronized across different environments and teams.

## Problems Liquibase Solves

- **Schema Version Control:** Liquibase allows versioning of database schemas, ensuring that changes are tracked and can be rolled back if necessary. This is especially important in environments where multiple developers or teams are working on the same database.
- **Automated Database Updates:** It automates the process of applying changes to the database, reducing the risk of human error and ensuring that all changes are applied in the correct order.
- **Environment Consistency:** By using Liquibase, you can ensure that the database schema remains consistent across different environments (development, testing, production), reducing issues that arise from schema differences.
- **Rollback Capability:** Liquibase supports rolling back changes, allowing you to revert to a previous state if something goes wrong.
- **Auditing and Compliance:** It provides a detailed history of changes made to the database, which is useful for auditing and compliance purposes.

## How Liquibase Works

Liquibase operates using a concept called a "changelog," which is a file or a set of files that define the changes to be made to the database schema. These files are written in XML, YAML, JSON, or SQL. The main components of Liquibase are:

- **Changelog Files:** These files contain the instructions for modifying the database schema. Each change is defined as a "changeSet," which is a unit of change that includes a unique identifier, author, and the actual change to be applied.
- **DatabaseChangeLog Table:** Liquibase creates and maintains a special table in the database called DATABASECHANGELOG to keep track of which changes have been applied. This table records the unique ID, author, and filename of each changeSet that has been executed.
- **DatabaseChangeLogLock Table:** This table (DATABASECHANGELOGLOCK) is used to ensure that only one instance of Liquibase is modifying the database at a time, preventing conflicts and ensuring consistency.

When Liquibase runs, it performs the following steps:

1. Checks the Lock: It checks the DATABASECHANGELOGLOCK table to ensure no other process is running.
2. Reads the Changelog: It reads the changelog file(s) to determine what changes need to be applied.
3. Applies Changes: It applies the necessary changes to the database.
4. Records Changes: It records each applied changeSet in the DATABASECHANGELOG table.
5. Releases Lock: It releases the lock in the DATABASECHANGELOGLOCK table.

## Tables Created for Changelog

Liquibase creates two tables in the database:

1. `DATABASECHANGELOG`: Records each changeSet applied including metadata fields like unique ID, author, filename executed date etc.
2. `DATABASECHANGELOGLOCK`: Manages access preventing simultaneous modifications by multiple instances.

## Running a Changelog Twice

By design Liquibase avoids reapplying changeSets but when needed (e.g., development environment) there are ways around this issue:
* Using contexts
* Using labels
* Using preconditions