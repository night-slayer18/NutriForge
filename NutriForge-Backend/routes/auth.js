const router = require('express').Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
require('dotenv').config();

router.post('/register', [
    body("name", "Name is required").notEmpty().isLength({min: 3}),
    body("email", "Email is required").isEmail().notEmpty(),
    body("password", "Password is required").notEmpty().isLength({min: 8}),
    body("age", "Age is required").notEmpty().isInt({min: 18})
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

module.exports = router;