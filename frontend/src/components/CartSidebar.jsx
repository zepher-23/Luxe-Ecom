import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { getOptimizedImage } from '../assets/products';

const CartSidebar = () => {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-black tracking-tight">YOUR BAG ({cartItems.length})</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                    <p className="text-lg">Your bag is empty.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-black underline font-medium"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={`${item._id}-${item.size}`} className="flex gap-4">
                                        <div className="w-24 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={getOptimizedImage(item.image).src}
                                                srcSet={getOptimizedImage(item.image).srcSet}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item._id, item.size)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                                                <p className="text-md font-medium mt-1">${item.price.toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center border border-gray-200 rounded-full">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.size, item.qty - 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.size, item.qty + 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-xl font-bold">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
