import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getOptimizedImage } from '../assets/products';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            // Fetch Orders
            fetch('http://localhost:5000/api/orders/myorders', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setOrders(data))
                .catch((err) => console.error(err));
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black text-black">MY ACCOUNT</h1>
                    <button onClick={() => { logout(); navigate('/'); }} className="text-red-500 font-bold hover:underline">Logout</button>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* User Info */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm h-fit">
                        <h2 className="text-xl font-bold mb-4">Profile</h2>
                        <p className="text-gray-500 mb-1">Name</p>
                        <p className="font-medium mb-4">{user.name}</p>
                        <p className="text-gray-500 mb-1">Email</p>
                        <p className="font-medium">{user.email}</p>
                    </div>

                    {/* Orders */}
                    <div className="lg:col-span-3 space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Order History</h2>
                        {orders.length === 0 ? (
                            <p className="text-gray-500">You haven't placed any orders yet.</p>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id} className="bg-white p-6 rounded-3xl shadow-sm">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 pb-6 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                            <p className="font-mono text-sm">{order._id}</p>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {order.isPaid ? 'Paid' : 'Pending Payment'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img src={getOptimizedImage(item.image).src} srcSet={getOptimizedImage(item.image).srcSet} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.qty} | ${item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                        <p className="text-sm text-gray-400">Total</p>
                                        <p className="text-xl font-bold">${order.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
