const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const { findOne } = require("../models/Notes");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = 'heavysecurity';

//  Route 1: Create a User '/api/auth/createuser'
router.post('/createuser', [
    body('name', 'Enter Valid Name').isLength({ min: 5 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Enter Valid Password').isLength({ min: 8 }),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success, errors: errors.array() });
        
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Already exist" });
        }
        const salt = await bcrypt.genSaltSync(10);
        const secsalt = await bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secsalt,
            email: req.body.email,
        })
        const data = {
            id: user.id,
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        //console.log(authtoken);
        success=true;
        res.json({ success,authtoken });


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
    }
});

//  Route 2: User Login '/api/auth/login'
router.post('/login', [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password cannot be Blanked').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const data = {
            id: user.id,
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        //console.log(authtoken);
        success=true;
        res.json({ success,authtoken });


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal error Occured")
    }
});

//Route 3: Fetching User Data api/auth/userdata
router.post('/userdata', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error("Error in /userdata:", error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router
