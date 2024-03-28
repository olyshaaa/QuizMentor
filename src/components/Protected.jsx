 import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../firebase/firebase'

const Protected = () => {
  const { currentUser } = auth
  return (
    currentUser ? <Outlet /> : <Navigate to="/login" />
  )
}

export default Protected