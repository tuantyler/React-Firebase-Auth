import React, {useRef , useState} from 'react'
import { Card, Form, Container, Button, Alert } from 'react-bootstrap'
import { useAuthContext } from './contexts/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const rePasswordRef = useRef()
    const [error , setError] = useState('')
    const [loading , setLoading] = useState(false)
    const {signUp} = useAuthContext()
    const navigate = useNavigate()

    return (
        <>
            <Container className='p-5' style={{width: "600px"}}>
                <Card>
                    <h2 className='text-center mt-4'>Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Card.Body>
                        <Form onSubmit={async (e) => {
                            e.preventDefault()
                            if (passwordRef.current.value !== rePasswordRef.current.value) {
                                return setError("Password do not match")
                            }
                            try {
                                setError("")
                                setLoading(true)
                                await signUp(emailRef.current.value , passwordRef.current.value)
                                navigate('/')
                            } catch {
                                setError("Failed to create an account")
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
                            <Form.Group>
                                <Form.Label>Password Confrim</Form.Label>
                                <Form.Control type='password' ref={rePasswordRef}></Form.Control>
                            </Form.Group>
                            <Button className="w-100 mt-4" type='submit' disabled={loading}>Signup</Button>
                        </Form>
   
                    </Card.Body>   
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </Container> 
        </>
    )
}
