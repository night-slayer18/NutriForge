import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
  useEffect(() =>{
    if(!localStorage.getItem("token")){
      navigate("/login");
    }
    // eslint-disable-next-line
  },[])
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to NutriForge</h1>
        <p className="lead">
          NutriForge is your ultimate nutrition tracking companion. Easily
          monitor your daily food intake, keep track of your nutritional goals,
          and maintain a healthy lifestyle.
        </p>
        <hr className="my-4" />
        <h2>Key Features:</h2>
        <ul className="list-group">
          <li className="list-group-item">Track your daily food consumption</li>
          <li className="list-group-item">View nutritional information for each food item</li>
          <li className="list-group-item">Set and monitor nutritional goals</li>
          <li className="list-group-item">Simple and intuitive user interface</li>
        </ul>
        <hr className="my-4" />
        <h2>Benefits:</h2>
        <ul className="list-group">
          <li className="list-group-item">Enhance your awareness of dietary choices</li>
          <li className="list-group-item">Stay accountable to your nutritional goals</li>
          <li className="list-group-item">Make informed decisions for a healthier lifestyle</li>
          <li className="list-group-item">Easy integration into your daily routine</li>
        </ul>
        <p className="mt-4">
          Ready to start your nutrition journey with NutriForge? Click the button
          below to explore all the amazing features.
        </p>
        <Link to="/foods" className="btn btn-primary btn-lg" role="button">
          Explore NutriForge
        </Link>
      </div>
    </div>
  )
}

export default Home
