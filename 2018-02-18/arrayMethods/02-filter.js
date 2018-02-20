const cities = [
    {
        name: "Charlotte",
        state: "NC",
        population: 792000
    },
    {
        name: "Raleigh",
        state: "NC",
        population: 431000
    },
    {
        name: "Wilmington",
        state: "NC",
        population: 112000
    },
    {
        name: "New York City",
        state: "NY",
        population: 8406000
    },   
    {
        name: "Rochester",
        state: "NY",
        population: 210000
    },
]

console.log(cities.filter(function(item){
    return item.state === "NC"
}))