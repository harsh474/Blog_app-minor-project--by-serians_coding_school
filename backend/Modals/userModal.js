const mongoose = require("mongoose") ; 
const Schema = mongoose.Schema ; 
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema ({ 

    name:{ 
        type:String,
        require:true, 
    },
    email:{ 
        type:String,
        require:true, 
        unique : true,
        
    }, 
    password: { 
        type:String , 
        required:true,
    }, 
    posts :[{ 
      type: Schema.Types.ObjectId,
      ref:"post"
    }]
}); 
/** --- userModal.js. --- **/
// do not use arrow functions as we need to use "this" keyword inside
userSchema.statics.signup = async function (name,email, password) {
    //Step 1. Validation
    if (!name||!email || !password) {
      throw Error("One or more fields are empty");  //we will handle these errors in frontend
    }
    //here we use validator package to easily check the email & password
    if (!validator.isEmail(email)) {
      throw Error("Please enter a valid email address");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough");
    }
    
    //Step 2. Email exists or not?
    const exist = await this.findOne({ email });
    //we have the database instace, so we can use "this" and 
    //perform any database related operations (findOne, deleteMany etc.,) 
  
    if (exist) {
      throw Error("Email address already exists");
    }
  
    //Step 3. Create salt 
    const salt = await bcrypt.genSalt(10);
  
    //Step 4. Create hash of password + salt and finally insert it in DB
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({name , email, password: hash }); // here we are storing user in database
    
    return user;
  };  


  ///
  /** --- userModal.js. --- **/  
userSchema.statics.login = async function(email, password) {
    //Step 1. Validate the credentials
    if(!email || !password){
        throw Error("One or more fields are empty")
    }
    
    //Step 2. Find the email in the DB
    const user = await this.findOne({email})

    if(!user){
        throw Error('Looks like the email address is not registered')
    }
    
    //Step 3. Match the passwords
    const match = await bcrypt.compare(password, user.password)

    if(!match) throw Error('Incorrect Password')
    
    //Step 4. Return the user if password is correct    
    return user;
}


module.exports = mongoose.model("user",userSchema)