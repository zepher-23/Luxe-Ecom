import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-24 flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-full max-w-md p-8 bg-gray-50 rounded-3xl">
                    <h2 className="text-3xl font-black text-center mb-8">LOGIN</h2>
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-4 bg-white rounded-xl border-transparent focus:border-black focus:ring-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 bg-white rounded-xl border-transparent focus:border-black focus:ring-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                            Sign In
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-500">
                        Don't have an account? <Link to="/register" className="text-black font-bold">Sign Up</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
