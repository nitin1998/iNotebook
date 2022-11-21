const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "iamtryingjwttoken";

// Route 1 : create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', [ 
        body('email').isEmail(), 
        body('password').isLength({ min: 5 }), 
        body('name').isLength({ min: 3 }) 
    ], async (req, res) => {

    // if there are errors, return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // check whether the user with the same email exists already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({"status" : "failure", "message" : "Sorry a user already exist with the same email"})
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        // creating user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        });

        const data = {
            user : user.id
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({
            "status" : "success", 
            "message" : "Account Created with email : " + user.email,
            authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


// Route 2 : Authenticate a user using : POST "/api/auth/login". No login required
router.post('/login', [ 
        body('email', 'Enter a valid email').isEmail(), 
        body('password', 'password can not be blank').exists() 
    ], async (req, res) => {

    // if there are errors, return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        // check whether the user with the same email exists already
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({"status" : "failure", "message" : "Please try to login with valid credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({"status" : "failure", "message" : "Please try to login with valid credentials"});
        }

        const data = {
            user : {
                id : user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({
            "status" : "success",
            authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})


// Route 3 : Get logged in user details using : POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})

module.exports = router;