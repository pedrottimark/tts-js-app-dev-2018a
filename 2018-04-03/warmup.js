const myfunc = fn => {
  return param => {
    return obj => fn(obj[param]);
  };
};

const logger = myfunc(console.log);
const aLogger = logger("a");
aLogger({ a: "test", b: "a" });

console.log(3 + +3); // 6
