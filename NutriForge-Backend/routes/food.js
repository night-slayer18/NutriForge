const foodModel = require('../models/foodModel');
const router = require('express').Router();
const fetchuser = require('../middleware/fetchuser');
const {body, validationResult} = require('express-validator');
const trackModel = require('../models/trackModel')

// Route 1: Get all the food items

router.get('/getfood', async (req, res) => {
    let success = false;
    try {
        const food = await foodModel.find();
        if (!food) {
            return res.status(404).send({message:"No food items found"});
        }
        success = true;
        res.json({success,food});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success,message:"Server Error"});
    }
});

// Route 2: Add a new food item

router.post('/addfood',fetchuser,[
    body('name','Enter a valid name').isLength({min:3}),
    body('calories','Enter a valid number').isNumeric(),
    body('protein','Enter a valid number').isNumeric(),
    body('carbohydrates','Enter a valid number').isNumeric(),
    body('fat','Enter a valid number').isNumeric(),
    body('fiber','Enter a valid number').isNumeric()
], async(req,res) => {
    const error = validationResult(req);
    let success = false;
    if(!error.isEmpty()){
        return res.status(400).json({success,error:error.array()});
    }
    try {
        const {name,calories,protein,carbohydrates,fat,fiber} = req.body;
        const food = new foodModel({
            user:req.user.id,name,calories,protein,carbohydrates,fat,fiber
        });
        const savedFood = await food.save();
        success = true;
        res.json({success,savedFood});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success,message:"Server Error"});
    }
})

// Route 3: Search a food item by name

router.get('/searchfood/:name',fetchuser, async(req,res) => {
    let success = false;
    try{
        const food = await foodModel.find({ name: { $regex: new RegExp(req.params.name, 'i') } });
        if(food.length === 0){
            return res.status(404).send({success,message:"No food items found"});
        }
        success = true;
        res.json({success,food});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success,message:"Server Error"});
    }
})

// Route 4: Update a food item

router.put('/updatefood/:id',fetchuser, async(req,res) => {
    let success = false;
    try {
        const {name,calories,protein,carbohydrates,fat,fiber} = req.body;
        const newFood = {};
        if(name) newFood.name = name;
        if(calories) newFood.calories = calories;
        if(protein) newFood.protein = protein;
        if(carbohydrates) newFood.carbohydrates = carbohydrates;
        if(fat) newFood.fat = fat;
        if(fiber) newFood.fiber = fiber;
        let food = await foodModel.findById(req.params.id);
        if(!food){
            return res.status(404).send({success,message:"Food not found"});
        }
        if(food.user.toString() !== req.user.id){
            return res.status(401).send({success,message:"Not allowed"});
        }
        food = await foodModel.findByIdAndUpdate(req.params.id,{$set:newFood},{new:true});
        success = true;
        res.json({success,food});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success,message:"Server Error"});
    }
});

// Route 5: Track a food item

router.post('/trackfood',fetchuser,async (req,res) => {
    const {foodID,quantity} = req.body;
    let success = false;
    try {
        const food = await foodModel.findById(foodID);
        if(!food){
            return res.status(404).send({success,message:"Food not found"});
        }
        if(food.user.toString() !== req.user.id){
            return res.status(401).send({success,message:"Not allowed"});
        }
        const track = new trackModel({
            userID:req.user.id,foodID,quantity
        });
        const savedTrack = await track.save();
        success = true;
        res.json({success,savedTrack});
    }
    catch (error) {
        console.error(error);
        res.status(500).send({success,message:"Server Error"});
    }
});

// Route 6: Get all the tracked food items

router.get('/gettrack/:id',fetchuser,async(req, res) => {
    let success = false
    try {
        const track = await trackModel.find({userID:req.params.id});
        if (!track) {
            return res.status(404).send({message:"No tracked food items found"});
        }
        success = true;
        res.json({success,track});
    } catch (error) {
        console.error(error);
        res.status(500).send({success,message:"Server Error"});
    }
});
module.exports = router;