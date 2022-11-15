import React, {useState} from 'react'
import { Button, Card, Container, Alert, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthProvider'

export default function Dashboard() {
    const [error, setError] = useState()
    const {currentUser , logout} = useAuthContext()
    const navigate = useNavigate()
    return (
        <>
            <Container className='p-5' style={{width: "600px"}}>
                <Card>
                    <h2 className='text-center mt-4'>Dashboard</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Card.Body>
                        <Form onSubmit={(e) => {
                            e.preventDefault()
                        }}>
                            <strong>Email: </strong> {currentUser.email}
                            <Link to="update-profile" className='btn btn-primary'>Update Profile</Link>
                        </Form>
   
                    </Card.Body>   
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Button onClick={ async () => {
                        await logout()
                        navigate("/login")
                    }}>Logout</Button>
                </div>
            </Container> 
        </>
    )
}
