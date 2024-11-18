import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import envVariables from "../helper/ApiKey";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token || isAuthenticated) {
            navigate('/');
        } else {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    // const [error, setError] = useState('');
    const loginUser = async (event) => {
        event.preventDefault();
        const id = event.target.username.value;
        const password = event.target.password.value;
        try {
            await axios.post(`${envVariables.API_URL}/api/auth`, { id, password })
                .then((res) => {
                    console.log('User registered:', res.data);
                    setIsAuthenticated(true);
                    localStorage.setItem('auth-token', res.data);
                });

        } catch (error) {
            console.error(error.message);
            // setError(error.message)
        }
    }

    return (

        <div  style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>  
        {/* <div className="min-h-screen w-full flex items-center justify-center bg-gray-100"> */}
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form method='POST' onSubmit={loginUser}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="********"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        {/* </div> */}
        </div>
    );
};

export default LoginPage;
