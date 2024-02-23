import { Card, Button } from 'react-bootstrap';
import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/auth/AuthContext';

const Userinfo = () => {
    const [password, setPassword] = useState({ opassword: '', npassword: '' })
    const ref = useRef(null);
    const closeref = useRef(null);
    const context = useContext(AuthContext);
    const { fetchUser } = context;
    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line
    },[])

    const onChange = (e)=>{
        setPassword({...password, [e.target.name]:e.target.value})
    }
    
    const handleClick = ()=>{
        ref.current.click();
    }

    const updatePass = async ()=>{
        if (password.opassword.length < 8 || password.npassword.length < 8 || password.opassword === password.npassword){
            alert('Password must be atleast 8 characters long')
            return
        }
        const response = await fetch('http://localhost:8000/api/auth/updatepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({oldpassword: password.opassword, newpassword: password.npassword})
        })
        const data = await response.json();
        if(data.success){
            closeref.current.click();
            alert('Password Updated Successfully')
            setPassword({opassword: '', npassword: ''})
        }
        else{
            alert(data.errors)
        }
    }

    return (
        <>
            <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="opassword" className="form-label">Old Password</label>
                                    <input onChange={onChange} value={password.opassword} type="password" name='opassword' className="form-control" id="opassword" aria-describedby="Old Password" required minLength={8} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="npassword" className="form-label">New Password</label>
                                    <input onChange={onChange} value={password.npassword} type="password" name='npassword' className="form-control" id="npassword" aria-describedby="New Password" required minLength={8}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={password.opassword.length < 8 && password.opassword.length < 8} onClick={updatePass} type="button" className="btn btn-primary">Update Password</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center my-5 text-center'>
                <Card style={{ width: '25rem', height: '30rem' }}>
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                        <span className="bi bi-person-fill" style={{ fontSize: '5rem' }}></span>
                        <Card.Title className="mb-3 text-center">{localStorage.getItem('name')}</Card.Title>
                        <Card.Text className="mb-3 text-center">
                            <strong>Email:</strong> {localStorage.getItem('email')}
                        </Card.Text>
                        <Button onClick={handleClick} variant="primary">Update Password</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Userinfo
