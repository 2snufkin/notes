# Liquibase Checksum Validation Issue

Checksum validation issues in Liquibase can be resolved by updating the checksums in the `DATABASECHANGELOG` table to match the modified changesets. It's crucial to carefully review and document any intentional changes made to the changelog files to maintain consistency in the database schema evolution process.

## Liquibase Checksum Validation Issue and Resolution

### Problem Overview
Liquibase uses checksums to ensure the consistency of changesets in your database schema. When the content of a changeset is modified without updating the corresponding checksum, Liquibase will detect a validation failure during the update process. This validation failure is indicated by an error message similar to the following:
```
liquibase.exception.ValidationFailedException: Validation Failed:
  X change sets check sum
  ...
```

### Causes of the Issue
The checksum validation issue typically arises when changesets are intentionally modified without updating the checksums. This can happen during development or schema evolution when SQL statements within a changeset are added, modified, or removed.

### Resolution Steps
To resolve the checksum validation issue, follow these steps:

1. **Identify Changes:**
   - Open each changelog file mentioned in the error message.
   - Identify the changes made to the SQL statements within each changeset.

2. **Update Checksums:**
   - If you intentionally modified the changesets, update the checksums manually to match the new content.
   - Use the following SQL command to update the checksum in the `DATABASECHANGELOG` table for the affected changeset.
     ```
     UPDATE DATABASECHANGELOG SET MD5SUM='8:NEW_CHECKSUM_VALUE' WHERE MD5SUM='8:OLD_CHECKSUM_VALUE';
     ```
     Replace `NEW_CHECKSUM_VALUE` with the new checksum and `OLD_CHECKSUM_VALUE` with the old checksum for the changeset.

3. **Run SQL Command:**
   - Open your command prompt (CMD) on Windows or terminal on Linux/Mac.
   - Type `mysql -u your_username -p` and press Enter.
   - Once logged in, switch to your database using `USE your_database_name`.
   - Run your UPDATE SQL statement.

---

Caused by: liquibase.exception.DatabaseException: This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and binary logging is enabled (you might want to use... 

**Adjust log_bin_trust_function_creators:** 
You may need to adjust MySQL server setting `log_bin_trust_function_creators`. This setting determines whether non-deterministic functions can execute in a binary logging context.
You can set it dynamically with:
```
SET GLOBAL log_bin_trust_function_creators = 1;
```
Be aware that enabling this setting allows non-deterministic functions creation which may have security implications. Understand these implications before making any change.