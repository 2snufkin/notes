# Collections

##  Map

loop over an hashmap

1. call the entrySet() + forEach()
```java
                mapOfFiles.entrySet().forEach(entry -> {
                    LOGGER.info(entry.getKey() + " " + entry.getValue());
                });
```
