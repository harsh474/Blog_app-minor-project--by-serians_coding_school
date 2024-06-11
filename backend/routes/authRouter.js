//authRouter.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { user_signup, user_login,user_profile ,user_logout, createpost,profile,editpost,editpost_post,allpost,like} = require("../controllers/user_controller");
// const auth = require("../middleware/authmiddleware");
const router = express.Router();
const {auth} = require("../middleware/authmiddleware")
router.get("/",(req,res)=>{ 
  res.render("navbar")
})
router.post("/signup", user_signup);
router.post("/login", user_login);
router.get("/dashboard",protected_route,  user_profile);  
router.get("/login",(req,res)=>{
    res.render('login') ;
}) ;  
router.get("/signup",(req,res)=>{ 
    res.render('signup') ;
}) ; 
router.get("/logout",user_logout); 
// rendering create post page
router.get("/createpost",protected_route,(req,res)=>{ 
    // res.render('createpost',{user:req.user}) ; 
   try {
    // console.log("User is ",req.user);
    res.render('createpost',{user:req.user}) ;
   } catch (error) {
     console.log("Error in createpost",error);
   }
}) 
// saving post 
router.post("/createpost",protected_route,createpost) ;
// rendring profile page
router.get("/profile",protected_route, profile) ;
// 
// Edit post
router.get("/editpost/:id",editpost) ;
router.post("/editpost/:id",editpost_post) ;// Protected route middleware

// all post 
router.get("/allpost",allpost) ; 

// likes  routes
router.get("/like/:id",protected_route,like) ;


// Protected route middleware
// This middleware is used to protect routes that require a valid JWT
function protected_route(req,res,next){
    // console.log("Protected route called");
    try {
        // Verify the JWT using the secret key
        if(!req.cookies.auth_token){
          return res.status(401).send("Please login first")
        }
        // console.log("Cookie is ",req.cookies.auth_token);
        const decoded = jwt.verify(req.cookies.auth_token, process.env.SECRET_KEY);
        // console.log("Verfication Done Succesfully")
        // return decoded; 
        req.user = decoded;
        // console.log("User is ",req.user ) ;
        next();
      } catch (err) {
        // If the token is invalid or expired, an error will be thrown
        console.error('JWT verification failed:', err.message);
        return null;
      }
    
} 

module.exports = router;