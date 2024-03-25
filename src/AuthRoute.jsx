import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from './authentication/Authentication';

export default function AuthRoute() {
    const isAuthenticated = useIsAuthenticated(); 

    if (isAuthenticated) {
        // If not authenticated, redirect to login page or any other page
        return <Navigate to="/" replace />;
        // You can also return a 404 page if needed:
        // return <NotFoundPage />;
    }

    return (
        <>
           {
            !isAuthenticated && <Outlet />
              
           }
        </>
    )
}
