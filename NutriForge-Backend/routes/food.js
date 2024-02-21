const foodModel = require('../models/foodModel');
const router = require('express').Router();
const fetchuser = require('../middleware/fetchuser');
const {body, validationResult} = require('express-validator');

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
module.exports = router;