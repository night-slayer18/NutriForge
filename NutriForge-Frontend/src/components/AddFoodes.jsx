import { useContext, useState } from "react"
import FoodContext from "../context/food/FoodContext"

const AddFoodes = () => {
    const [foodData, setfoodData] = useState({name: '',carbohydrates: '',protein: '',fat: '',fiber: '',calories: ''})
    const foodcontext = useContext(FoodContext)
    const {addFood} = foodcontext
    const handleChange = (e) => {
        setfoodData({...foodData,[e.target.name]: e.target.value})
        console.log(foodData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addFood(foodData.name,foodData.carbohydrates,foodData.protein,foodData.fat,foodData.fiber,foodData.calories)
        setfoodData({name: '',carbohydrates: '',protein: '',fat: '',fiber: '',calories: ''})
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">Add Food to Database</h2>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={foodData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="carbohydrates" className="form-label">Carbohydrates:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="carbohydrates"
                                name="carbohydrates"
                                value={foodData.carbohydrates}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="protein" className="form-label">Protein:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="protein"
                                name="protein"
                                value={foodData.protein}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fat" className="form-label">Fat:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fat"
                                name="fat"
                                value={foodData.fat}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fiber" className="form-label">Fiber:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fiber"
                                name="fiber"
                                value={foodData.fiber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="calories" className="form-label">Calories:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="calories"
                                name="calories"
                                value={foodData.calories}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary">Add Food</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFoodes
