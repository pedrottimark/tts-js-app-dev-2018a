// Debug the following code

var company = {
    employees: [
        {
            name: "doug"
        },
        {
            name: "AJ"
        }
    ],
    getName: function(employee){
        return employee.name
    },
    getNames: function(){
        return this.employees.map(this.getName)
    },
    delayedGetNames: function(){
        setTimeout(this.getNames,500)
    }
}

console.log(company.delayedGetNames());