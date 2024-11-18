import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/Signin.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import Dashboard from './pages/Dashboard.jsx';


const router = createBrowserRouter([

  {
    path:'/signin',
    element:<LoginPage/>
  },
  {
    path:'/',
    element:<Dashboard/>
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>   
    {/* <CustomizationProvider> */}
    {/* <TableProvider> */}
      <RouterProvider router={router} />
    {/* </TableProvider> */}
    {/* </CustomizationProvider> */}
    </>
  // </React.StrictMode>
);
