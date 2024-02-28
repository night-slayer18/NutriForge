import PropTypes from 'prop-types';
import ToastContext from "./ToastContext"
import toast from 'react-hot-toast';

const ToastState = (props) => {
    const loginSuccess = () => toast.success('Login Successful');
    const loginFail = () => toast.error('Login Failed');
    const registerSuccess = () => toast.success('Register Successful');
    const registerFail = () => toast.error('Register Failed');
    const logoutSuccess = () => toast.success('Logout Successful');
    const logoutFail = () => toast.error('Logout Failed');
    const addFoodSuccess = () => toast.success('Food Added');
    const addFoodFail = () => toast.error('Food Add Failed');
    const updateFoodSuccess = () => toast.success('Food Updated');
    const updateFoodFail = () => toast.error('Food Update Failed');
    const deleteFoodSuccess = () => toast.success('Food Deleted');
    const deleteFoodFail = () => toast.error('Food Delete Failed');
    const addTrackSuccess = () => toast.success('Track Added');
    const addTrackFail = () => toast.error('Track Add Failed');
    const updatePasswordSuccess = () => toast.success('Password Updated');
    const updatePasswordFail = () => toast.error('Password Update Failed');
    const updateProfileSuccess = () => toast.success('Profile Updated');
    const updateProfileFail = () => toast.error('Profile Update Failed');
    const notFound = () => toast.error('URL Not Found - Redirect to Home');
    return (
        <ToastContext.Provider value={{loginSuccess,loginFail,registerSuccess,registerFail,logoutSuccess,logoutFail,addFoodSuccess,addFoodFail,updateFoodSuccess,updateFoodFail,deleteFoodSuccess,deleteFoodFail,addTrackSuccess,addTrackFail,updatePasswordSuccess,updatePasswordFail,updateProfileSuccess,updateProfileFail,notFound}}>
            {props.children}
        </ToastContext.Provider>
    )
}

ToastState.propTypes = {
    children: PropTypes.node.isRequired
};

export default ToastState
