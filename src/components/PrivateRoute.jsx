import { useAuth } from "./contexts/authContext";
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

//Onli available to logged in users
export const LoginRequiredRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    if(!currentUser) {
        return <Navigate to="/login" state={{from: location }} />;
    }

    return children;
}

//Only available to logged out users
export const LogoutRequiredRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    if(currentUser) {
        return <Navigate to="/" state={{from: location }} />;
    }

    return children;
}