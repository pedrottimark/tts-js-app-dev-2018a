const matt = {
    name: "matt",
    greet() {
        function talk() {
            console.log(`hello ${this.name}`)
        }

        setTimeout(talk, 2000);
    },
    goodbye() {
        const talk = () => {
            console.log(`Goodbye ${this.name}`)
        }

        setTimeout(talk, 2000);
    }
}

matt.greet();
matt.goodbye();