//authRouter.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { user_signup, user_login,user_profile ,user_logout } = require("../controllers/user_controller");
// const auth = require("../middleware/authmiddleware");
const router = express.Router();
// const {auth} = require("../middleware/authmiddleware")
router.post("/signup", user_signup);
router.post("/login", user_login);
router.get("/dashboard",protected_route,  user_profile);  
router.get("/logout",user_logout) ;
function protected_route(req,res,next){
    console.log("Protected route called");
    try {
        // Verify the JWT using the secret key
        console.log("Cookie is ",req.cookies.auth_token);
        const decoded = jwt.verify(req.cookies.auth_token, process.env.SECRET_KEY);
        console.log("Verfication Done Succesfully")
        return decoded;
      } catch (err) {
        // If the token is invalid or expired, an error will be thrown
        console.error('JWT verification failed:', err.message);
        return null;
      }
    next();
}
module.exports = router;