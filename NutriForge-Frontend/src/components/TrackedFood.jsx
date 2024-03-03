import { useContext, useState } from 'react';
import FoodContext from '../context/food/FoodContext';

const TrackedFood = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const foodcontext = useContext(FoodContext);
    const { trackFoodByDate, trackFoodDate } = foodcontext;

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const formattedDate = formatDate(selectedDate);
        setSelectedDate(formattedDate);
        trackFoodDate(formattedDate);
    };

    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Tracked Food</h1>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="datePicker">Select Date:</label>
                    <input
                        type="date"
                        id="datePicker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="form-control mb-3"
                    />
                    {selectedDate && <p className="mb-3">Selected Date: {selectedDate}</p>}
                </div>
            </div>
            {trackFoodByDate.length === 0 ? (
                <h4 className="text-center mt-4">No Food Tracked for this date</h4>
            ) : (
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Calories</th>
                            <th scope="col">Protein</th>
                            <th scope="col">Carbohydrates</th>
                            <th scope="col">Fat</th>
                            <th scope="col">Fiber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trackFoodByDate.map((food) => (
                            <tr key={food.foodID._id}>
                                <td>{food.foodID.name}</td>
                                <td>{food.foodID.calories}</td>
                                <td>{food.foodID.protein}</td>
                                <td>{food.foodID.carbohydrates}</td>
                                <td>{food.foodID.fat}</td>
                                <td>{food.foodID.fiber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TrackedFood;
