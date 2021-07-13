const express = require('express');
const router = express.Router();

// mongodb user model
const User = require("./../models/User");

// Password handler
const bcrypt = require("bcrypt");

// Signup
router.post("/signup", (req, res) => {
    let { username, password, email, phoneNumber } = req.body;
    console.log(username, password, email, phoneNumber);
    username = username.trim();
    password = password.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim();
  
    if (username == "" || email == "" || password == "" || phoneNumber == "") {
      res.json({
        status: "FAILED",
        message: "Empty input fields!",
      });
    } else if (!/^[a-zA-Z ]*$/.test(username)) {
      res.json({
        status: "FAILED",
        message: "Invalid username entered",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.json({
        status: "FAILED",
        message: "Invalid email entered",
      });
    } else if (!/^\d+$/.test(phoneNumber)) {
      res.json({
        status: "FAILED",
        message: "Invalid phone number entered",
      });
    } else if (password.length < 8) {
      res.json({
        status: "FAILED",
        message: "Password is too short!",
      });
    } else {
      // Checking if user already exists
      User.find({ email })
        .then((result) => {
          if (result.length) {
            // A user already exists
            res.json({
              status: "FAILED",
              message: "User with the provided email already exists",
            });
          } else {
            // Try to create new user
  
            // password handling
            const saltRounds = 10;
            bcrypt
              .hash(password, saltRounds)
              .then((hashedPassword) => {
                const newUser = new User({
                  username,
                  email,
                  password: hashedPassword,
                  phoneNumber,
                });
  
                newUser
                  .save()
                  .then((result) => {
                    res.json({
                      status: "SUCCESS",
                      message: "Signup successful",
                      data: result,
                    });
                  })
                  .catch((err) => {
                    res.json({
                      status: "FAILED",
                      message: "An error occurred while saving user account!",
                    });
                  });
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while hashing password!",
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occurred while checking for existing user!",
          });
        });
    }
  });
  
router.post('/signin', (req, res) => {
    
})

module.exports = router;