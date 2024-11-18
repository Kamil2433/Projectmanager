import { Outlet, useNavigate } from 'react-router-dom';
import './App.css'
import { useEffect } from 'react';
import Navbar from './component/Navbar/Navbar';


function App() {

  const navigate = useNavigate();

  
  useEffect(() => {
    // Check for auth token in localStorage
    const token = localStorage.getItem('auth-token');
    console.log("this is token",token)
    if (token) {
    
      navigate('/dashboard');
    } else {
      // setIsAuthenticated(false);
      navigate('/signin');
    }
  }, [])
  
  return (
    <div className="flex flex-col h-screen"  style={{width:"100vw",height:"100vh"}}>
        <Navbar />

<Outlet />


    </div>
  )
}

export default App
