# Homework

For this homework assignment we'll take a look at the classnames library, you can find it [here on npm](https://www.npmjs.com/package/classnames).

Your task is to make the `I can('t) drink/drive` be colored red when our person cannot do that activity. So when the text `I can drive` is displayed it should be black while `I can't drive` should be red.  You should do this without using inline styles.  First do this without the classnames library and then do it with the library.  The key function you need to use from the library looks like this:

``` javascript
classnames({
    myClass: myCondition
})
```

Next add some styling to the list items that should apply regardless of the contents, you could for example remove the bullets in front of the items.  This should also be done via a class in the style sheet.  Try doing this both with and without the class names library.