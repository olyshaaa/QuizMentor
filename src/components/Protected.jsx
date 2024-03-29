 import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from '../firebase/authContext'

const Protected = ({children}) => {
  const {user} = useContext(Context)

  if (!user){
    return <Navigate to='/login' />
  } else{
    return children
  }
}

export default Protected