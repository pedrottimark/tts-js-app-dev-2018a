const myfunc = fn => param => obj => fn(obj[param]);

myfunc(console.log)("a")({ a: "test", b: "a" });


console.log(3 + +"3") // 6