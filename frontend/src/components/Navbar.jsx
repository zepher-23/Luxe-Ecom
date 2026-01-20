import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { getCartCount, setIsCartOpen } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 ${isScrolled ? 'top-4' : 'top-6'
                    }`}
            >
                <div className={`px-6 py-4 rounded-full border ${isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-gray-200 shadow-lg mb-4'
                    : 'bg-white/50 backdrop-blur-sm border-white/20'
                    } transition-all duration-300`}>
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
                            <span className="text-2xl font-black tracking-tighter text-gray-900">
                                LUXE.
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-10">
                            {[
                                { name: 'Collections', path: '/collections' }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-sm uppercase tracking-widest font-medium text-gray-600 hover:text-black transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Icons */}
                        <div className="hidden md:flex items-center space-x-6">
                            <motion.button whileHover={{ scale: 1.1 }} className="text-gray-900">
                                <Search className="w-5 h-5" />
                            </motion.button>
                            <Link to={user ? "/profile" : "/login"}>
                                <motion.button whileHover={{ scale: 1.1 }} className="text-gray-900">
                                    <User className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="text-gray-900 relative"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                                        {getCartCount()}
                                    </span>
                                )}
                            </motion.button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="text-gray-900 focus:outline-none"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Full Screen Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col justify-center items-center"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 text-black"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="flex flex-col space-y-8 text-center">
                            {[
                                { name: 'Collections', path: '/collections' }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-4xl font-light text-black hover:italic transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
