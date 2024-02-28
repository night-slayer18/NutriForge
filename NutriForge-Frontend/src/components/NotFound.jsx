import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ToastContext from "../context/toast/ToastContext";

const NotFound = () => {
    const toastcontext = useContext(ToastContext)
    const {notFound} = toastcontext
    useEffect(() => {
        notFound();
        // eslint-disable-next-line
    }, []);
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="text-center">
          <div className="mb-4">
            <i className="bi bi-search" style={{ fontSize: '2rem' }}></i>
          </div>
          <h1>404 | Page not found</h1>
          <p>The page you are looking for doesn&apos;t exist</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Link className="btn btn-primary btn-lg" role="button" to="/">
              Take me home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotFound;
  