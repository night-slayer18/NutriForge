const router = require('express').Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config();

router.post('/register', [
    body("name", "Name is required and should be > 3 characters").notEmpty().isLength({min: 3}),
    body("email", "Email is required").isEmail().notEmpty(),
    body("password", "Password is required and should be > 8 characters").notEmpty().isLength({min: 8}),
    body("age", "Age is required and should be greater than 18").notEmpty().isInt({min: 18})
    ], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array()});
    }
    try {
        let user = await userModel.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({success,errors: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age
        });
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        success = true;
        res.json({success,token});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({message:"Server Error"});
    }
});

router.post('/login', [
        body("email", "Email is required").isEmail().notEmpty(),
        body("password", "Password is required").notEmpty().isLength({min: 8}).exists()
    ], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({success,errors: "User does not exist"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success,errors: "Invalid Credentials"});
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        success = true;
        res.json({success,token});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({message:"Server Error"});
    }
});

router.post('/user',fetchuser, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({message:"Server Error"});
    }
});

router.put('/update',fetchuser,[
    body("name", "Name is required and should be > 3 characters").isLength({min: 3}),
    body("age", "Age is required and should be greater than 18").notEmpty().isInt({min: 18})
], async(req,res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array()});
    }
    try {
        let user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(400).json({success,errors: "User does not exist"});
        }
        if(user.id.toString() !== req.user.id) {
            return res.status(401).json({success,errors: "Not Authorized"});
        }
        user.name = req.body.name;
        user.age = req.body.age;
        const result = await user.save();
        if (!result) {
            return res.status(400).json({success,errors: "Error updating user"});
        }
        success = true;
        res.json({success,message:"User Updated"});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({message:"Server Error"});
    }
})

router.delete('/delete',fetchuser, async(req,res) => {
    let success = false;
    try {
        let user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(400).json({success,errors: "User does not exist"});
        }
        if(user.id.toString() !== req.user.id) {
            return res.status(401).json({success,errors: "Not Authorized"});
        }
        const result = await userModel.findByIdAndDelete(req.user.id);
        if (!result) {
            return res.status(400).json({success,errors: "Error deleting user"});
        }
        success = true;
        res.json({success,message:"User Deleted"});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({message:"Server Error"});
    }
})
module.exports = router;