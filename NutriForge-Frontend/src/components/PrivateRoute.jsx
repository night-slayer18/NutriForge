import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

const PrivateRoute = (props) => {
    return (
        localStorage.getItem('token')? props.Component : <Navigate to="/login" />
    )
}

PrivateRoute.propTypes = {
    Component: PropTypes.node.isRequired
}

export default PrivateRoute
