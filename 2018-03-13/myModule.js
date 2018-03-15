var rp = require("request-promise");

var add5 = function(a) {
  return a + 1 + 1 + 1 + 1 + 1;
};

var getPost = function(postId) {
  return rp({
    uri: "http://jsonplaceholder.typicode.com/posts/" + postId,
    json: true,
  })
};

function myCon(){
    return {};
}

// exports.add5 = add5;
// exports.getPost = getPost

// DON'T DO THIS
// exports = {
//     add5,
//     getPost,
// }

// module.exports.add5 = add5;
// module.exports.getPost = getPost

module.exports = myCon

module.exports = {
    add5,
    getPost,
    myFavoriteIceCream: "Mint Chocolate Chip"
}