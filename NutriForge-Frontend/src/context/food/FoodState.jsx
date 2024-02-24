import PropTypes from 'prop-types';
import FoodContext from "./FoodContext"
import { useState } from 'react';

const FoodState = (props) => {
    const host = "http://localhost:8000";
    const foodInitial = []
    const [foods,setFoods] = useState(foodInitial)

    const getFoods = async () => {
        const reponse = await fetch(`${host}/api/food/getfood`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await reponse.json()
        setFoods(json.food)
    }

    const addFood =  async (name,calories,protein,carbohydrates,fat,fiber) => {
        const reponse = await fetch(`${host}/api/food/addfood`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({name,calories,protein,carbohydrates,fat,fiber})
        })
        const json = await reponse.json()
        setFoods(foods.concat(json.savedFood))
    }

    const searchFoodByName = async (name) => {
        const response = await fetch (`${host}/api/food/searchfood/${name}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json()
        setFoods(json.food)
    }

    const updateFood = async (id,name,calories,protein,carbohydrates,fat,fiber) => {
        const response = await fetch(`${host}/api/food/updatefood/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({name,calories,protein,carbohydrates,fat,fiber})
        })
        const json = await response.json()
        console.log(json)
        let newFoods = JSON.parse(JSON.stringify(foods))
        for (let index = 0; index < newFoods.length; index++) {
            const element = newFoods[index];
            if(element._id === id){
                newFoods[index].name = name
                newFoods[index].calories = calories
                newFoods[index].protein = protein
                newFoods[index].carbohydrates = carbohydrates
                newFoods[index].fat = fat
                newFoods[index].fiber = fiber
                break
            }
        }
        setFoods(newFoods)
    }
    return (
        <FoodContext.Provider value={{foods,getFoods,addFood,searchFoodByName,updateFood}}>
                {props.children}
        </FoodContext.Provider>
    )
}

FoodState.propTypes = {
    children: PropTypes.node.isRequired
};

export default FoodState
