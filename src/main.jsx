import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home/Home.jsx'
import CreateBlock from './pages/createBlock/CreateBlock.jsx'
import CardDetail from './pages/CardDetail/CardDetail.jsx'
import Protected from './components/Protected.jsx'
import Community from './pages/Community/Community.jsx'
import SearchResult from './pages/SearchResult/SearchResult.jsx'
import { Provider } from 'react-redux'
import store from './service/store.js'
import { AuthContext } from './firebase/authContext.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>} >
            <Route index element={<Navigate to='/login' />} />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
                <Route path='home' element={<Protected><Home/></Protected>} exact/>
                <Route path='createBlock' element={<Protected><CreateBlock /></Protected>}/>
                <Route path='card/:moduleId' element={<Protected><CardDetail /></Protected>} />
                <Route path='/community' element={<Protected><Community /></Protected>}/>
                <Route path='/search' element={<Protected><SearchResult /></Protected>}/>
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContext>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </AuthContext>
)
