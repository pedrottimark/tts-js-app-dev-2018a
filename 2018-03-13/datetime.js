var Moment = require("moment");

function dateTime() {
  var time = new Moment();
  console.log(time.format("h:mm:ss a"));
}

module.exports = dateTime;
