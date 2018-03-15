var rp = require("request-promise");

var dateTime = require("./datetime")

// Create a datetime module that encapsulates the
// logic to print the current datetime in our desired format
// using moment.js

var test = "test" == "test";

rp({
    uri: "http://jsonplaceholder.typicode.com/posts/1",
    json: true,
})
.then(function(data) {
    console.log(data)
    dateTime()
    // var time = new Moment()
    // console.log(time.format('h:mm:ss a'))
  })
  .catch(function(err) {
    // Crawling failed...
    console.error(err)
  });

