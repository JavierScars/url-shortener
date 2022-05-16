import { BrowserRouter, Routes } from "react-router-dom";
import { Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login/Login';
import React, { FC, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Redirect } from '../pages/redirect/Redirect';

interface ProtectedRouteProps {
    Component: FC,
    condition: Boolean,
    redirectPath: string
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({ Component, condition, redirectPath, ...rest }) => {
    return condition ? <Component {...rest} /> : <Navigate to={redirectPath} />
}

export const Router: React.FC = () => {
    const { user } = useContext(UserContext);
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<ProtectedRoute Component={Login} condition={!user} redirectPath='/' />} />
            <Route path='/profile' element={<ProtectedRoute Component={Login} condition={!!user} redirectPath='/login' />} />
            <Route path='/:hash' element={<Redirect />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
}
