import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';

const router = createBrowserRouter([
    {
        path: '/',  
        element: <Layout></Layout>,
        errorElement: <h1>Page Not Found</h1>,
        children: [
            {
                path: '/',
                element: <Home></Home>,

            } 
        ],


    },
 
 
]);

export default router
