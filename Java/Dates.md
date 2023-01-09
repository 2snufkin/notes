# Dates

## working with locale
desc: it's like the | date pipe in Angular
input: Date object and a Locale Object
output: String which is formatted according to the local

```java
    public static String formatDateByLocale(Date date, Locale locale){
		//you can play with SimpleDateFormat values (SHORT, FULL etc...)
        return SimpleDateFormat.getDateInstance(SimpleDateFormat.LONG, locale).format(date);
    }
```
And if the date is in String?
```java
//create a SimpleDateFormat with the pattern of the date
 SimpleDateFormat simpleDateFormat = new SimpleDateFormat(patternOfDate);
 //And the rest is the same
         Date paramDate = simpleDateFormatFrom.parse(dateAsString);
         return DateFormat.getDateInstance(DateFormat.SHORT, new Locale(localeAsString)).format(paramDate);
```    