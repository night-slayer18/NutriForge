import { Link,useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NutriForge
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<div className="d-flex">
            <Link className="btn btn-success mx-2 my-2" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-2 my-2" to="/register" role="button">
              Signup
            </Link>
          </div>:<div className="d-flex align-items-center">
            {/* <Link to="/user" className="btn btn-primary rounded-circle mx-2 my-2" style={{ width: '40px', height: '40px' }}>
              <i className="bi bi-person-fill" ></i>
            </Link> */}
            <button onClick={handleLogout} className="btn btn-danger mx-2 my-2">
              Logout
            </button>
            </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
