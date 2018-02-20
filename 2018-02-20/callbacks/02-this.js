var Brad = {
    name: "Brad",
    sayName: function(){
        console.log(this.name);
    },
    sayMyNameDelay: function(){
        setTimeout(this.sayName, 1000)
    }
}

Brad.sayName();
Brad.sayMyNameDelay();
