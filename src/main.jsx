import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/Signin.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  <BrowserRouter basename="/Projectmanager/"> {/* Replace <repository-name> */}
    <Routes>
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);
