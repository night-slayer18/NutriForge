import { useContext, useEffect } from "react"
import FoodContext from "../context/food/FoodContext"
import FoodItems from "./FoodItems"
const Foods = () => {
    const foodcontext = useContext(FoodContext)
    const {foods,getFoods} = foodcontext

    useEffect(() => {
        if(localStorage.getItem("token")){
            getFoods()
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="row my-3">
          <div className="container mx-2">
          {foods.length===0 && "No foods to display"}
          </div>
          {foods.map((food)=>{
                return (
                    <FoodItems key={food._id} food={food} />
                )
          })}
    </div>
    )
}

export default Foods
