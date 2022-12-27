# SQL
{name}: is a placeholder
path sperators: windows => 
                linux => /
##  Connect to MySQL
`mysql -u user -p`: you will access mySql on your machine
`mysql  -h localhost -u user -p`: -h allow you to access a diffrent machine
`exit`: disconnect
##  Access a DB
`mysql -u user -p <db_name>`: you will access mySql on your machine

## Working with dump file  

### Import
`mysql -u user -p {db_name}<{absoulte_address_dump_file+sql ext}`

### export
`mysqldump -u user -p {db_name}>{absoulte_address_dump_file_to_be_created+sql ext}`
`--routines`: routine is a function ot a stocked procedure. using this option will include them in the dump file

## Requets
`{request} INTO OUTFILE {filename.csv/txt etc} FIELDS ENCLOSED BY '"' TERMINATED BY ';' LINES TERMINATED BY '\r\n';`: exprot the result off this request to a file

## Info
`SELECT user,host FROM mysql.user;`: show the users
`SHOW DATABASES;`


## Actions

