import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [credentials,setCredentials] = useState({email:"",password:""})
  const history = useNavigate()
  const onChange = (e) => {
    setCredentials({...credentials,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const reponse = await fetch("http://localhost:8000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
      })
    const data = await reponse.json()
    if(data.success){
      console.log("Logged in successfully")
      localStorage.setItem("token",data.token)
      history('/')
    }
    else{
      console.log("Error logging in")
    }
  }

  return (
    <div className="container d-flex justify-content-center mt-md-5 mt-5 mb-5">
      <div className="card p-4 shadow col-md-6">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="col-form-label">Email:</label>
            <input onChange={onChange} name="email" type="email" className="form-control" id="email" placeholder="Enter your email" aria-describedby="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-form-label">Password:</label>
            <input onChange={onChange} name="password" type="password" className="form-control" id="password" placeholder="Enter your password" aria-describedby="password" required minLength={8}/>
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
