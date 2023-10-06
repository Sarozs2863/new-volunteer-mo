const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "wustlhstudio"

// let openid = 'o5d-b5fwoXW3oVp7NNoeDMJwsZ2w'  //tian
// let openid = 'o5d-b5ep-B4P5IfUrqXrbroGao9c'  //陈艳

let openid = 'o5d-b5R3LgSUK1CWloN47_vO-UdQ'   //田泽瑞


let token = jwt.sign({ openid }, secretOrPrivateKey, {
    expiresIn: 60 * 60 * 24 * 2  // 2天过期
});

console.log(token)

