import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/auth/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { userDetails } = context;
  useEffect(() =>{
    if(!localStorage.getItem("token")){
      navigate("/login");
    }
    // eslint-disable-next-line
  },[])
  return (
    <div>
      {userDetails.name} is logged in
    </div>
  )
}

export default Home
