Create a function `getPropPrinter` that takes in one property and returns a function.

The function that is returned should take an object log out the property that was passed into the first function i.e.

``` javascript
var printName = getPropPrinter("name");
printName({name:"Ted"}); // Logs "Ted" to console
```