# Dates

## working with locale
```java
    public static String formatDateByLocale(Date date, Locale locale){
        System.out.println(locale.getDisplayName());
		//you can play with SimpleDateFormat values (SHORT, FULL etc...)
        return SimpleDateFormat.getDateInstance(SimpleDateFormat.LONG, locale).format(date);
    }
```