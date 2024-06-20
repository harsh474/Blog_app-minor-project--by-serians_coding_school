const User = require("../Modals/userModal");
const Post = require("../Modals/postModal");
const Comment = require("../Modals/commentModal")
const jwt = require("jsonwebtoken");


// function to create the JWT token

const generateToken = (_id, email, password) => {
  return jwt.sign({ _id, email, password }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
};

const user_signup = async (req, res) => {
  console.log("Singing Up");
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    console.log("Generating token now...");
    const token = generateToken(user._id, email, password);
    console.log("Token generated =" + token);
    // res.status(201).json({email,token}) ; // send back email and token
    res.cookie("auth_token", token).status(200).json({ email, token }); // Optionally send back email and token in the response body as well
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const user_login = async (req, res) => {
  console.log("Logging in....");
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // const token  = generateToken(user._id);
    const token = generateToken(user._id, email, password);
    // res.status(201).json({email,token}) ;
    // res.status(201).json({hi:123,krish:1234})
    // res.cookie("token", token).status(210).json({ email, token }); // Optionally send back email and token in the response body as well
    // res.status(200).json({ email, token }); // Optionally send back email and token in the response body as well
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure this is true in production
      // sameSite: 'strict' // Additional security
    });
    //   res.render('home') ;
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const user_profile = async (req, res) => {
  console.log("Checking profile!", req.cookies.auth_token);

  res.status(200).json({ message: "Profile page is working...." });
};
const user_logout = async (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.render("login");
  //   res.send("User logout succesfully")
};
const createpost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content, user: req.user._id });
  const user = await User.findById(req.user._id);

  user.posts.push(post._id);
  console.log("User is ", user);

  // Save the updated user document
  await user.save();
  // res.send("Post created successfully") ;
  // res.render('createpost');
  // res.render('createpost', { user: req.user });  // Pass the user object to the template
  res.redirect("/api/user/createpost"); // Redirect to the createpost page
};
const profile = async (req, res) => {
  const user = await User.findById(req.user._id).populate("posts");
  // .populate("posts");
   console.log("User is ",user);
  res.render("profile", { user:user });
};
const editpost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  res.render("editpost", { post: post });
};
const editpost_post = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await Post.findByIdAndUpdate(id, { title, content });
  res.redirect("/api/user/profile");
};
const allpost = async (req, res) => {
  const posts = await Post.find({});
  res.render("home", { posts: posts });
};
const like = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (post.like.includes(req.user._id)) {
    post.like.pull(req.user._id);
    // return res.send("You have already liked the post") ;
  } else {
    post.like.push(req.user._id);
  }

  await post.save();
  res.redirect("/api/user/allpost");
};

const singlepost = async (req, res) => { 
  const id = req.params.id;
  try {
      const post = await Post.findById(id)
          .populate('author')
          .populate({
              path: 'Comments',
              populate: {
                  path: 'user',
                  select: 'name' // Select only the name field, you can include more fields if needed
              }
          });
      res.render('singlepost', { post: post });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
};

const comment = async(req,res) =>{ 
    const post_id = req.params.id ; 
    const {comment} = req.body ; 
    const user = req.user._id ; 
    const newComment = await Comment.create({content:comment,user}) ;  
    console.log("New Comment is ",newComment) ;
    const post = await Post.findById(post_id) ; 
    post.Comments.push(newComment._id) ; 
    await post.save() ; 
    res.redirect(`/api/user/post/${post_id}`) ;
}

const image_upload = async (req, res) => {
  try {
      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }

      // Assuming the upload middleware has successfully added the file information to req.file
      if (req.file && req.file.filename) {
          user.profilepic = req.file.filename;
          await user.save();
          // return res.status(200).send({ message: "Profile picture updated successfully" });
          res.redirect("/api/user/profile");
      } else { 
            
          return res.status(400).send({ message: "No file uploaded" });
      }
  } catch (error) {
      console.error("Error updating profile picture:", error);
      return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  user_login,
  user_signup,
  user_profile,
  user_logout,
  createpost,
  profile,
  editpost,
  editpost_post,
  allpost,
  like, 
  singlepost,
  comment,
  image_upload
};
