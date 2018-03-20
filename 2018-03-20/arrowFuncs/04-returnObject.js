const quarterbackNames = ["Mike", "Sally", "Ben"];

const quarterbacks = quarterbackNames.map(name => ({
    name,
    pos: "QB",
}))

console.log(JSON.stringify(quarterbacks))