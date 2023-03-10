## Functions
how to create a custom function in Excel VBA:

1. Open a new or existing workbook in Microsoft Excel.
2.    Press ALT + F11 to open the Visual Basic Editor.
3.  In the Visual Basic Editor, go to "Insert" > "Module" to create a new module for your code.
4. In the new module, copy and paste your function:

example:
```
Function GenerateUpdateString(inputString As String) As String
    Dim regexPattern As String
    Dim regexMatch As Object
    Dim x As String
    Dim y As String
    
    ' Define the regular expression pattern
    regexPattern = "was: (\S+) but is now: (\S+)"
    
    ' Match the input string against the pattern
    Set regexMatch = CreateObject("VBScript.RegExp").Execute(inputString)
    
    ' Extract the values of x and y from the match
    x = regexMatch(0).SubMatches(0)
    y = regexMatch(0).SubMatches(1)
    
    ' Generate the update string
    GenerateUpdateString = "update DATABASECHANGELOG set MD5SUM='" & x & "' where MD5SUM='" & y & "';"
End Function
```

5. Save the module by going to "File" > "Save".
6.     Close the Visual Basic Editor by going to "File" > "Close and Return to Microsoft Excel".
7.     Go back to your Excel worksheet and select an empty cell where you want to use the function.
8.     Type "=" and the name of your function, followed by the cell reference of the cell containing the input string.

```
 For example, if the input string is in cell A1, you would type "=GenerateUpdateString(A1)" in the empty cell.
```

9. Press Enter to apply the function. The cell will now display the updated string.
10.  If you want to use the function in other cells, you can simply copy and paste the formula to those cells.

### Errors
#### #VALUE!
If you are getting a #VALUE! error when using the function, it is likely that there is an issue with the input string or the function. 
