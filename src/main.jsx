import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home/Home.jsx'
import CreateBlock from './pages/createBlock/CreateBlock.jsx'
import CardDetail from './pages/CardDetail/CardDetail.jsx'
import Protected from './components/Protected.jsx'
import Community from './pages/Community/Community.jsx'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} >
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route element={<Protected />}>
                <Route path='home' element={<Home />} exact/>
                <Route path='createBlock' element={<CreateBlock />}/>
                <Route path='card/:moduleId' element={<CardDetail />} />
                <Route path='/community' element={<Community />}/>
            </Route>
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
