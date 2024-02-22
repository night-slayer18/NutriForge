import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",confirmpassword:"",phoneNumber:"",age:""});
  const history = useNavigate();
  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value});
    console.log(credentials);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password !== credentials.confirmpassword){
      alert("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }
    const response = await fetch("http://localhost:8000/api/auth/register",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name:credentials.name,
        email:credentials.email,
        password:credentials.password,
        age:credentials.age
      })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      history("/login");
    }
    else{
      console.log("Invalid credentials");
    }
  };
  
  return (
    <div className="container d-flex justify-content-center mt-md-5 mt-5 mb-5">
      <div className="card p-4 shadow col-md-6">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="col-form-label">Name:</label>
            <input onChange={onChange} name="name" type="text" className="form-control" id="name" placeholder="Enter your name" aria-describedby="name" required minLength={3} maxLength={20}/>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-form-label">Email:</label>
            <input onChange={onChange} name="email" type="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-form-label">Password:</label>
            <input onChange={onChange} name="password" type="password" className="form-control" id="password" placeholder="Enter your password" aria-describedby="password" required minLength={8}/>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="col-form-label">Confirm Password:</label>
            <input onChange={onChange} name="confirmpassword" type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" aria-describedby="confirm password" required minLength={8}/>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="col-form-label">Phone Number:</label>
            <input onChange={onChange} name="phoneNumber" type="tel" className="form-control" id="phoneNumber" placeholder="Enter your phone number" aria-describedby="age" required/>
          </div>
          <div className="form-group">
            <label htmlFor="age" className="col-form-label">Age:</label>
            <input onChange={onChange} name="age" type="number" className="form-control" id="age" placeholder="Enter your age" required />
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
