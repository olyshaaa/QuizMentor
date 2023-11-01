import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Protected from './components/Protected.jsx'
import Home from './pages/Home/Home.jsx'
import CreateBlock from './pages/createBlock/createBlock.jsx'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} >

            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Protected />} >
                <Route path='/' index element={<Home />} />
            </Route>
            <Route path='createBlock' element={<CreateBlock />}/>

        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
