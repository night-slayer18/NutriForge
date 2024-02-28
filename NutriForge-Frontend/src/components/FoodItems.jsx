import PropTypes from 'prop-types';
import { useContext } from 'react';
import FoodContext from '../context/food/FoodContext';

const FoodItems = (props) => {
    const foodcontext = useContext(FoodContext);
    const { deleteFood } = foodcontext;
    const handleClick = () => {
        deleteFood(props.food._id);
    }
    return (
        <div className="col-md-4">
            <div className="card my-3 mx-3 shadow">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">{props.food.name}</h5>
                    <ul className="list-group list-group-flush text-center ">
                        <li className="list-group-item">Calories: {props.food.calories}</li>
                        <li className="list-group-item">Fat: {props.food.fat}</li>
                        <li className="list-group-item">Proteins: {props.food.protein}</li>
                        <li className="list-group-item">Carbohydrates: {props.food.carbohydrates}</li>
                        <li className="list-group-item">Fiber: {props.food.fiber}</li>
                    </ul>
                    <div className="d-flex justify-content-around">
                        <button onClick={handleClick} className="btn btn-danger">Delete <i className="bi bi-x-octagon"></i></button>
                        <button onClick={()=>{props.foodUpdate(props.food)}} className="btn btn-success">Edit <i className="bi bi-pencil-square"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

FoodItems.propTypes = {
    food: PropTypes.shape({
        _id: PropTypes.string, 
        name: PropTypes.string,
        calories: PropTypes.number,
        fat: PropTypes.number,
        protein: PropTypes.number,
        carbohydrates: PropTypes.number,
        fiber: PropTypes.number,
    }).isRequired,
    foodUpdate: PropTypes.func.isRequired
};


export default FoodItems
