import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { getOptimizedImage } from '../assets/products';

const Product = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <p>Product not found</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Link to="/collections" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Collections
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-100 rounded-3xl overflow-hidden aspect-[3/4] relative"
                    >
                        <img
                            src={getOptimizedImage(product.image).src}
                            srcSet={getOptimizedImage(product.image).srcSet}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="mb-2">
                            <span className="text-gray-500 uppercase tracking-widest text-sm">{product.category}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center mb-6 space-x-4">
                            <p className="text-3xl font-medium text-black">${product.price.toFixed(2)}</p>
                            <div className="flex items-center text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current text-gray-300" />
                                <span className="text-gray-400 text-sm ml-2">(42 reviews)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {product.description} Crafted with premium materials designed for longevity and timeless appeal. Perfect for the modern individual who values both aesthetics and functionality.
                        </p>

                        {/* Size Selector (Static for now) */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Select Size</h3>
                            <div className="flex space-x-3">
                                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <button
                                onClick={() => addToCart(product, selectedSize)}
                                className="flex-1 bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center active:scale-95 transform duration-100"
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                            <div className="flex items-center text-gray-600 text-sm">
                                <Truck className="w-5 h-5 mr-3 text-black" />
                                <span>Free shipping worldwide</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                                <ShieldCheck className="w-5 h-5 mr-3 text-black" />
                                <span>2 year warranty</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Product;
