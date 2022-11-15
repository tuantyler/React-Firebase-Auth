import React, {useRef , useState} from 'react'
import { Card, Form, Container, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthProvider'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error , setError] = useState('')
    const [loading , setLoading] = useState(false)
    const {login} = useAuthContext()
    const navigate = useNavigate()


    return (
        <>
            <Container className='p-5' style={{width: "600px"}}>
                <Card>
                    <h2 className='text-center mt-4'>Login</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Card.Body>
                        <Form onSubmit={async (e) => {
                            e.preventDefault()
                            try {
                                setError("")
                                setLoading(true)
                                await login(emailRef.current.value , passwordRef.current.value)
                                navigate('/')
                            } catch {
                                setError("Failed to login")
                            }
                            setLoading(false)
                        }}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef}></Form.Control>
                            </Form.Group>
                            <Button className="w-100 mt-4" type='submit' disabled={loading}>Login</Button>
                        </Form>
   
                    </Card.Body>   
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to="/signup">Sign up</Link>
                </div>
                <div className='w-100 text-center mt-3'>
                    <Link to="/forgot-password">Forgot password?</Link>
                </div>
            </Container> 
        </>
    )
}
