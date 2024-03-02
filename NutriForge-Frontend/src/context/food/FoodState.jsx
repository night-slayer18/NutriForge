import PropTypes from 'prop-types';
import FoodContext from "./FoodContext";
import { useState } from 'react';

const FoodState = (props) => {
    const host = "http://localhost:8000";
    const foodInitial = [];
    const trackInitial = [];
    const trackFoodByDateInitial = [];
    const searchFoodInitial = [];
    const [foods, setFoods] = useState(foodInitial);
    const [trackfood, settrackFood] = useState(trackInitial);
    const [trackFoodByDate, settrackFoodByDate] = useState(trackFoodByDateInitial);
    const [searchFood, setSearchFood] = useState(searchFoodInitial);

    const getFoods = async () => {
        try {
            const response = await fetch(`${host}/api/food/getfood`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });
            const json = await response.json();
            setFoods(json.food);
        } catch (error) {
            console.error("Failed to fetch foods:", error);
        }
    };

    const addFood = async (name, calories, protein, carbohydrates, fat, fiber) => {
        try {
            const response = await fetch(`${host}/api/food/addfood`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ name, calories, protein, carbohydrates, fat, fiber })
            });
            const json = await response.json();
            setFoods(foods.concat(json.savedFood));
        } catch (error) {
            console.error("Failed to add food:", error);
        }
    };

    const searchFoodByName = async (name) => {
        try {
            const response = await fetch(`${host}/api/food/searchfood/${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });
            const json = await response.json();
            setSearchFood(json.food);
        } catch (error) {
            console.error("Failed to search food by name:", error);
        }
    };

    const updateFood = async (id, name, calories, protein, carbohydrates, fat, fiber) => {
        try {
            const response = await fetch(`${host}/api/food/updatefood/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ name, calories, protein, carbohydrates, fat, fiber })
            });
            const json = await response.json();
            console.log(json.food);
            let newFoods = JSON.parse(JSON.stringify(foods));
            for (let index = 0; index < newFoods.length; index++) {
                const element = newFoods[index];
                if (element._id === id) {
                    newFoods[index].name = name;
                    newFoods[index].calories = calories;
                    newFoods[index].protein = protein;
                    newFoods[index].carbohydrates = carbohydrates;
                    newFoods[index].fat = fat;
                    newFoods[index].fiber = fiber;
                    break;
                }
            }
            setFoods(newFoods);
        } catch (error) {
            console.error("Failed to update food:", error);
        }
    };

    const deleteFood = async (id) => {
        try {
            const response = await fetch(`${host}/api/food/deletefood/${id}`, {
                method: "DELETE",
            });
            const json = await response.json();
            console.log(json.food);
            console.log("deleted a food item" + id);
            const newFoods = foods.filter((food) => { return food._id !== id });
            setFoods(newFoods);
        } catch (error) {
            console.error("Failed to delete food:", error);
        }
    };

    const trackFood = async (foodID, quantity) => {
        try {
            const response = await fetch(`${host}/api/food/trackfood`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ foodID, quantity })
            });
            const json = await response.json();
            console.log(json);
            settrackFood(trackfood.concat(json.savedTrack));
        } catch (error) {
            console.error("Failed to track food:", error);
        }
    };

    const trackFoodDate = async (date) => {
        try {
            const response = await fetch(`${host}/api/food/gettrack/${localStorage.getItem('USER')}/${date}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });
            const json = await response.json();
            settrackFoodByDate(json.track);
        } catch (error) {
            console.error("Failed to track food by date:", error);
        }
    };

    return (
        <FoodContext.Provider value={{ foods, getFoods, addFood, searchFoodByName, updateFood, deleteFood, trackFood, trackFoodByDate, trackFoodDate, searchFood, setSearchFood }}>
            {props.children}
        </FoodContext.Provider>
    );
};

FoodState.propTypes = {
    children: PropTypes.node.isRequired
};

export default FoodState;
