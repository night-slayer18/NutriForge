import { useContext, useState } from "react";
import FoodContext from "../context/food/FoodContext";
import TrackedFood from "./TrackedFood";
import ToastContext from "../context/toast/ToastContext";

const Track = () => {
    const [track, setTrack] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [visible, setVisible] = useState(true)
    const foodcontext = useContext(FoodContext)
    const { searchFoodByName, searchFood, trackFood } = foodcontext
    const toastcontext = useContext(ToastContext)
    const { addTrackSuccess } = toastcontext
    const handleSearch = () => {
        searchFoodByName(track)
        setVisible(true)
        setTrack('')
    }
    const onChange = (e) => {
        setTrack(e.target.value)
    }

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10) || 1);
    }
    return (
        <>
        <div className="container mt-4">
            <h2 className="text-center mb-4">Track Food</h2>
            <div className="input-group">
                <input onChange={onChange} value={track} type="text" className="form-control" placeholder="Search for food..." aria-label="Search for food" aria-describedby="searchButton" />
                <button onClick={handleSearch} className="btn btn-primary" type="button" id="searchButton">Search</button>
            </div>
            <div>
            {visible ? (
                <div>
                    {searchFood.length === 0 ? (
                        <h3 className="text-center mt-4">No food found</h3>
                    ) : (
                        <div className="row mt-5">
                            {searchFood.map((food) => (
                                <div key={food._id} className="col-md-4 mb-4">
                                    <div className="card text-center">
                                        <div className="card-body">
                                            <h5 className="card-title">{food.name}</h5>
                                            <p className="card-text">Calories: {food.calories}</p>
                                            <p className="card-text">Protein: {food.protein}</p>
                                            <p className="card-text">Carbs: {food.carbohydrates}</p>
                                            <p className="card-text">Fat: {food.fat}</p>
                                            <div className="row mt-3">
                                                <div className="col-md-6 mb-2">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Quantity"
                                                        value={quantity}
                                                        onChange={handleQuantityChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <button
                                                        onClick={() => { trackFood(food._id, quantity); addTrackSuccess(); setVisible(false)}}
                                                        className="btn btn-primary"
                                                    >
                                                        Track
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : null}
        </div>
        </div>
        <TrackedFood/>
        </>
    );
}

export default Track;
