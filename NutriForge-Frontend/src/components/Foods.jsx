import { useContext, useEffect, useRef, useState } from "react"
import FoodContext from "../context/food/FoodContext"
import FoodItems from "./FoodItems"
const Foods = () => {
    const foodcontext = useContext(FoodContext)
    const { foods, getFoods,updateFood } = foodcontext
    const [foodDetails, setFoodDetails] = useState({id: '', name: '', protein: '', fat: '', carbohydrates: '', calories: '',fiber: ''})
    const ref = useRef()
    const refClose = useRef()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getFoods()
        }
        // eslint-disable-next-line
    }, [])

    const foodUpdate = (currentFood) => {
        ref.current.click()
        setFoodDetails({id: currentFood._id, name: currentFood.name, protein: currentFood.protein, fat: currentFood.fat, carbohydrates: currentFood.carbohydrates, calories: currentFood.calories,fiber: currentFood.fiber})
    }
    const onChange = (e) => {
        setFoodDetails({ ...foodDetails, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        updateFood(foodDetails.id, foodDetails.name, foodDetails.calories, foodDetails.protein, foodDetails.carbohydrates, foodDetails.fat, foodDetails.fiber)
        refClose.current.click()
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary" hidden data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Foods</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name='name' className="form-control" id="name" aria-describedby="name" onChange={onChange} value={foodDetails.name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="calories" className="form-label">Calories</label>
                                    <input type="number" name='calories' className="form-control" id="calories" aria-describedby="calories" onChange={onChange} value={foodDetails.calories} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fat" className="form-label">Fat</label>
                                    <input type="number" name='fat' className="form-control" id="fat" aria-describedby="fat" onChange={onChange} value={foodDetails.fat} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="protein" className="form-label">Protein</label>
                                    <input type="number" name='protein' className="form-control" id="protein" aria-describedby="protein" onChange={onChange} value={foodDetails.protein} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="carbohydrates" className="form-label">Carbohydrates</label>
                                    <input type="number" name='carbohydrates' className="form-control" id="carbohydrates" aria-describedby="carbohydrates" onChange={onChange} value={foodDetails.carbohydrates} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fiber" className="form-label">Fiber</label>
                                    <input type="number" name='fiber' className="form-control" id="fiber" aria-describedby="fiber" onChange={onChange} value={foodDetails.fiber} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Food</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className="container mx-2">
                    {foods.length === 0 && "No foods to display"}
                </div>
                {foods.map((food) => {
                    return (
                        <FoodItems key={food._id} food={food} foodUpdate={foodUpdate} />
                    )
                })}
            </div>
        </>
    )
}

export default Foods
