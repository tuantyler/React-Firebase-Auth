import React, {useState , useRef} from 'react'
import { Card, Form, Container, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthProvider'

export default function ForgotPassword() {
    const emailRef = useRef()
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState('')
    const [message , setMessage] = useState('')
    const {resetPassword} = useAuthContext()
    return (
        <>
            <Container className='p-5' style={{width: "600px"}}>
                <Card>
                    <h2 className='text-center mt-4'>Forgot Password</h2>
                    {message && <Alert variant='success'>{message}</Alert>}
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Card.Body>
                        <Form onSubmit={async (e) => {
                            e.preventDefault()
                            try {
                                setMessage("")
                                setError("")
                                setLoading(true)
                                await resetPassword(emailRef.current.value)
                                setMessage("Check ur inbox for furhter instruction")
                            }
                            catch {
                                setError("Failed to reset password")
                            }
                            setLoading(false)
                           
                        }}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef}></Form.Control>
                            </Form.Group>
                            <Button className="w-100 mt-4" type='submit' disabled={loading}>Fprgot</Button>
                        </Form>
   
                    </Card.Body>   
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to="/signup">Sign up</Link>
                </div>
            </Container> 
        </>
    )
}
