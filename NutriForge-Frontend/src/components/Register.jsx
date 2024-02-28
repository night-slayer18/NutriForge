import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastContext from "../context/toast/ToastContext";

const Register = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "", phoneNumber: "", age: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useNavigate();
  const toastcontext = useContext(ToastContext)
  const {registerSuccess,registerFail} = toastcontext

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        age: credentials.age,
      }),
    });
    const json = await response.json();
    if (json.success) {
      history("/login");
      registerSuccess();
    } else {
      console.log("Invalid credentials");
      registerFail();
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-md-5 mt-5 mb-5">
      <div className="card p-4 shadow col-md-6">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="col-form-label">Name:</label>
            <input onChange={onChange} name="name" type="text" className="form-control" id="name" placeholder="Enter your name" aria-describedby="name" required minLength={3} maxLength={20} value={credentials.name}/>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-form-label">Email:</label>
            <input onChange={onChange} name="email" type="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="email" required value={credentials.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-form-label">Password:</label>
            <div className="input-group">
              <input onChange={onChange} name="password" type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Enter your password" aria-describedby="password" required minLength={8} value={credentials.password}/>
              <div className="input-group-append">
                <span className="input-group-text" onClick={toggleShowPassword} style={{ cursor: "pointer" }}><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i></span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="col-form-label">Confirm Password:</label>
            <div className="input-group">
              <input onChange={onChange} name="confirmpassword" type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" placeholder="Confirm your password" aria-describedby="confirm password" required minLength={8} value={credentials.confirmpassword}/>
              <div className="input-group-append">
                <span className="input-group-text" onClick={toggleShowConfirmPassword} style={{ cursor: "pointer" }}><i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i></span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="col-form-label">Phone Number:</label>
            <input onChange={onChange} name="phoneNumber" type="tel" className="form-control" id="phoneNumber" placeholder="Enter your phone number" aria-describedby="age" required value={credentials.phoneNumber}/>
          </div>
          <div className="form-group">
            <label htmlFor="age" className="col-form-label">Age:</label>
            <input onChange={onChange} name="age" type="number" className="form-control" id="age" placeholder="Enter your age" required max={100} min={18} value={credentials.age}/>
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
