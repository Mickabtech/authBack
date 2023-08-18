require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");
const cors = require("cors");
const user = require("./model/user");




const app = express();

app.use(express.json());
app.use(cors());


// Register
app.post("/register", async (req, res) => {

    // Our register logic starts here
     try {
      
      const { firstName, lastName, email, password, field, profession, aboutYou } = req.body;

      // Validate user input
      if (!(email && password && firstName && lastName && field && profession && aboutYou)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedUserPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(), // sanitize
        password: encryptedUserPassword,
        field: field,
        profession: profession,
        aboutYou: aboutYou,
        // image: image,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  
    
    // Login
    app.post("/login", async (req, res) => {

        // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;
      
          // Validate user input
          if (!(email && password)) {
            res.status(400).send("All input is required");
          }
          // Validate if user exist in our database
          const user = await User.findOne({ email });
      
          if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            );
          
      
            // save user token
            user.token = token;
      
            // user
            return res.status(200).json(user);
          }
        } catch{
          return res.status(400).send("Invalid Credentials");
        }
        // Our login logic ends here
      });

      app.post("/welcome", auth, (req, res) => {
        res.status(200).send("Welcome to TalentBase 🙌");
      });

    app.get("/api/fetchUsers", async (req, res)=>{

      try {
        const users = await user.find()
        res.json(users);
      } catch (error) {
        res.json(error);
      }

    })
    
module.exports = app;