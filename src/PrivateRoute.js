import React from 'react'
import { useAuthContext } from './contexts/AuthProvider'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
    const { currentUser } = useAuthContext()
    return currentUser ? children : <Navigate to="/login"></Navigate>
}
