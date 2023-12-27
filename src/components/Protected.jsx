 import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    const token = localStorage.getItem('authenticated')
  return (
    token ? <Outlet /> : <Navigate to="/login" />
  )
}

export default Protected