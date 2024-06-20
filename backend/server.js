const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); 
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// CORS middleware setup
app.use(cors({ origin: 'http://localhost:4000', credentials: true }));

// app.use((req, res, nex t) => {
//     console.log("Request is made");
//     console.log("Host name - " + req.hostname);
//     console.log("Path - " + req.path);
//     console.log("Method - " + req.method);
//     next();
// }); 
// Set the view engine to EJS
app.set('view engine', 'ejs');
// app.engine('ejs', ejs.renderFile); 
// Set the views directory
app.set('views', path.resolve('./view'));

// Routes setup
const authRouter = require('../backend/routes/authRouter')
app.use("/api/user", authRouter);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB database connection established");
        app.listen(port, () => console.log(`Listening on port: ${port}!`));
    })
    .catch((err) => {
        console.log("Error connecting with the MongoDB database: " + err);
    });
