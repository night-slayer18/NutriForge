import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastContext from "../context/toast/ToastContext";

const Login = () => {
  const toastcontext = useContext(ToastContext)
  const {loginSuccess,loginFail} = toastcontext
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();

  const onChange = (e) => setCredentials({ ...credentials, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const data = await response.json();
    if (data.success) { console.log("Logged in successfully"); localStorage.setItem("token", data.token); history("/"); loginSuccess(); }
    else {console.log("Error logging in"); loginFail();}
  };

  return (
    <div className="container d-flex justify-content-center mt-md-5 mt-5 mb-5">
      <div className="card p-4 shadow col-md-6">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="col-form-label">Email:</label>
            <input onChange={onChange} name="email" type="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="email" required value={credentials.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-form-label">Password:</label>
            <div className="input-group">
              <input onChange={onChange} name="password" type={togglePassword ? "text" : "password"} className="form-control" id="password" placeholder="Enter your password" aria-describedby="password" required minLength={8} value={credentials.password}/>
              <div className="input-group-append">
                <span className="input-group-text" onClick={() => setTogglePassword(!togglePassword)} style={{ cursor: "pointer" }}>
                  <i className={`bi ${togglePassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">Log In</button>
          </div>
        </form>
        <div className="text-center mt-3">
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
