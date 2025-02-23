const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require("zod");

const emailschema = zod.string().email();
const passwordschema =  zod.string().min(6);






function signJwt(username, password) {
    // Your code here
    const usernameresponse = emailschema.safeParse(username);
    const passwordresponse = passwordschema.safeParse(password);

    if(!usernameresponse.success || !passwordresponse.success){
        return null;
    }

    const signature  = jwt.sign({
        username
    },  jwtPassword);

     return signature;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here
let ans = true;
    try{
        jwt.verify(token,jwtPassword);
    }
    catch(e){
      ans = false;
    }
    return ans;
    
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    // Your code here
   const decoded=  jwt.decode(token);
   if(decoded){
    return true
   }
   else{
    return false;
   }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
