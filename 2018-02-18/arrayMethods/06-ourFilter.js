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

function filter(fn, array){
    var result = [];

    for(var i = 0; i < array.length; i +=1){
        var item = array[i];
        if(fn(item)){
            result.push(item)
        }
    }

    return result;
}

function isNc (item){
    return item.state === "NC"
}

console.log(filter(isNc, cities) )