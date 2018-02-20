function myCallback(err, result){
    if(err){
        console.log("Error: ", err);
    } else {
        console.log(result);
    }
}

function asyncAdd(x, y, callback) {
    callback(null, x + y);
}

asyncAdd(1, 4, myCallback);