import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import dropdown from '../../assets/dropdown.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import envVariables from "../../helper/ApiKey";

const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');

    const handleNotificationClick = () => navigate('/notification');
    const handleDropdownClick = () => setIsDropdownOpen(!isDropdownOpen);
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/signin');
    };
    const handleAddAccount = () => navigate('/addaccount');



    return (
        <div style={{ backgroundColor: '#1f3a93', padding: '1rem', boxShadow: '0px 1px 8px  rgba(0, 0, 0, 0.3)',width:"100vw",height:"100%" }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',height:'1.5rem', maxWidth: '100%', margin: '0 auto' }}>
           <div style={{font:"Manrope",color:"white", fontSize:"5vh"}}>ProjectManager.ai</div>
                <ul style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Notification Icon */}
                    <li 
                        onClick={handleNotificationClick}
                        style={{
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            width: '2rem', 
                            height: '2rem', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            cursor: 'pointer', 
                            transition: 'background-color 0.3s'
                        }}
                    >
                        {/* <FaBell style={{ color: '#000000', fontSize: '2.4rem' }} /> */}
                    </li>

                    {/* User Profile with Dropdown */}
                    <li 
                        onClick={handleDropdownClick} 
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' ,height:"5vh"}}
                    >
                       
                        <span style={{ color: '#white', marginRight: '0.5rem', fontSize: '1rem' }}>{username}</span>
                        <img 
                            src={dropdown} 
                            alt="Dropdown" 
                            style={{ width: '0.7rem', height: 'auto' }}
                        />
                        {isDropdownOpen && (
                            <div 
                                style={{
                                    position: 'absolute', 
                                    top: '3.5rem', 
                                    right: '0', 
                                    width: '12rem', 
                                    backgroundColor: '#fff', 
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', 
                                    borderRadius: '0.5rem', 
                                    padding: '0.5rem 0', 
                                    zIndex: 10 
                                }}
                            >
                                <a 
                                    href="#" 
                                    onClick={handleLogout} 
                                    style={{ 
                                        display: 'block', 
                                        padding: '0.7rem 1.5rem', 
                                        color: '#333', 
                                        fontSize: '0.9rem', 
                                        textDecoration: 'none', 
                                        transition: 'background-color 0.3s, color 0.3s' 
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    Logout
                                </a>
                               
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
