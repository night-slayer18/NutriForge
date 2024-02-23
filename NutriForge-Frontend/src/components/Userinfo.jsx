import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const Userinfo = () => {

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('http://localhost:8000/api/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const data = await response.json();
            localStorage.setItem('name',data.user.name)
            localStorage.setItem('email',data.user.email)
            localStorage.setItem('USER',data.user._id)
        }
        fetchUser();
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center my-5 text-center'>
            <Card style={{ width: '25rem', height: '30rem' }}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <span className="bi bi-person-fill" style={{ fontSize: '5rem' }}></span>
                    <Card.Title className="mb-3 text-center">{localStorage.getItem('name')}</Card.Title>
                    <Card.Text className="mb-3 text-center">
                        <strong>Email:</strong> {localStorage.getItem('email')}
                    </Card.Text>
                    <Button variant="primary">Update Password</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Userinfo
