const matt = {
  first: "Matt",
  last: "Stegall",
  sayName() {
    setTimeout(function() {
      console.log(this.first, this.last);
    }, 0);
  },
};

matt.sayName();
