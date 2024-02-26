import PropTypes from 'prop-types';
import FoodContext from "./FoodContext"
import { useState } from 'react';

const FoodState = (props) => {
    const host = "http://localhost:8000";
    const foodInitial = []
    const trackInitial = []
    const trackFoodByDateInitial = []
    const [foods,setFoods] = useState(foodInitial)
    const [trackfood,settrackFood] = useState(trackInitial)
    const [trackFoodByDate,settrackFoodByDate] = useState(trackFoodByDateInitial)


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

    const deleteFood = async (id) => {
        const response = await fetch(`${host}/api/food/deletefood/${id}`,{
            method: "DELETE",
        })
        const json = await response.json()
        console.log(json.food)
        console.log("deleted a food item" + id)
        const newFoods = foods.filter((food) => {return food._id !== id})
        setFoods(newFoods)
    }

    const trackFood = async(foodID,quantity) => {
        const response = await fetch(`${host}/api/food/trackfood`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({foodID,quantity})
        })
        const json = await response.json()
        console.log(json)
        settrackFood(trackfood.concat(json.savedTrack))
    }

    const trackFoodDate = async(foodID,date) => {
        const response = await fetch(`${host}/api/food/gettrack/${foodID}/${date}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        const json = await response.json()
        settrackFoodByDate(json.track)
    }

    return (
        <FoodContext.Provider value={{foods,getFoods,addFood,searchFoodByName,updateFood,deleteFood,trackFood,trackFoodByDate,trackFoodDate}}>
                {props.children}
        </FoodContext.Provider>
    )
}

FoodState.propTypes = {
    children: PropTypes.node.isRequired
};

export default FoodState
