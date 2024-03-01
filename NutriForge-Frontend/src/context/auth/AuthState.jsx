import PropTypes from 'prop-types';
import AuthContext from "./AuthContext"
import { useState } from 'react';

const AuthState = (props) => {
    const [userDetails, setUserDetails] = useState({name: localStorage.getItem('name'), email: localStorage.getItem('email'), id: localStorage.getItem('USER'), token: localStorage.getItem('token')})
    const fetchUser = async () => {
        try {
                const response = await fetch('http://localhost:8000/api/auth/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                localStorage.setItem('name', data.user.name);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('USER', data.user._id);
                setUserDetails({
                    name: localStorage.getItem('name'),
                    email: localStorage.getItem('email'),
                    id: localStorage.getItem('USER'),
                    token: localStorage.getItem('token')
                });
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }
    }
    return (
        <AuthContext.Provider value={{userDetails,setUserDetails,fetchUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthState
