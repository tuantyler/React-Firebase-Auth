import React, {useRef, useState} from 'react'
import { Card, Form, Container, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthProvider'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const rePasswordRef = useRef()
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState()
    const {currentUser, updateEmail, updatePassword} = useAuthContext()
    const navigate = useNavigate()
    return (
    <>
        <Container className='p-5' style={{width: "600px"}}>
            <Card>
                <Card.Body>
                    <h3>Update Profiles</h3>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={async (e) => {
                        e.preventDefault()
                        setLoading(true)
                        const promises = []
                        if (emailRef.current.value !== currentUser.email) {
                            promises.push(updateEmail(emailRef.current.value))
                        }
                        if (passwordRef.current.value && passwordRef.current.value === rePasswordRef.current.value) {
                            promises.push(updatePassword(passwordRef.current.value))  
                        }
                        else {
                            setError("Password Confrimation is wrong")
                            setLoading(false)
                            return
                        }
                        Promise.all(promises).then(() => {
                            navigate("/")
                        }).catch(() => {
                            setError("Failed to update account")
                        })
                        setLoading(false)
                    }}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} defaultValue={currentUser.email}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} placeholder="leave blank to keep the same"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password Confrimation</Form.Label>
                            <Form.Control type='password' ref={rePasswordRef} placeholder="Leave blank to keep the same"></Form.Control>
                        </Form.Group>
                        <Button className="w-100 mt-4" type='submit' disabled={loading}>Update</Button>
                    </Form>
                </Card.Body>   
            </Card>
        </Container> 
    </>
    )
}
