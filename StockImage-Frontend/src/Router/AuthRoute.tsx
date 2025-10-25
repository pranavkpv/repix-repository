import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import Register from '../components/Register';
import Login from '../components/Auth/Login';
import { BackAuthProtected } from './protectedRoute';

const AuthRoute : React.FC = () =>{
    return(
        <Routes>
            <Route path="/" element={<BackAuthProtected><LandingPage /></BackAuthProtected>} />
            <Route path='/register' element={<BackAuthProtected><Register/></BackAuthProtected>} />
            <Route path='/login' element={<BackAuthProtected><Login/></BackAuthProtected>} />
        </Routes>
    )
}

export default AuthRoute;