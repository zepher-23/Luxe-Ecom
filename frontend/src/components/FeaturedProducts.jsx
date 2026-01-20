import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { getOptimizedImage } from '../assets/products';

const FeaturedProducts = () => {
    const { addToCart } = useCart();
    const scrollRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                const data = await res.json();
                // Take first 5 for featured
                setProducts(data.slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching featured products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return null; // Or a skeleton

    return (
        <section className="py-24 bg-[#f8f8f8] overflow-hidden pb-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex justify-between items-end">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black">
                        LATEST <br className="hidden md:block" /> ARRIVALS
                    </h2>
                    <div className="hidden md:flex space-x-2">
                        <button className="p-4 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors">
                            <span className="sr-only">Previous</span>
                            &larr;
                        </button>
                        <button className="p-4 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors">
                            <span className="sr-only">Next</span>
                            &rarr;
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-full overflow-x-auto pb-12 hide-scrollbar ps-4 sm:ps-6 lg:ps-8">
                <div className="flex space-x-8 min-w-max">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative w-[300px] md:w-[400px] flex-shrink-0 cursor-pointer"
                        >
                            <Link to={`/product/${product._id}`}>
                                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200 relative mb-6">
                                    <img
                                        src={getOptimizedImage(product.image).src}
                                        srcSet={getOptimizedImage(product.image).srcSet}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Interactive Overlay */}
                                    <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex space-x-2">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product);
                                            }}
                                            className="flex-1 bg-white/90 backdrop-blur text-black py-4 rounded-xl font-medium hover:bg-black hover:text-white transition-colors flex items-center justify-center z-20"
                                        >
                                            <ShoppingBag className="w-5 h-5 mr-2" />
                                            Add
                                        </button>
                                        <button className="aspect-square bg-white/90 backdrop-blur text-black rounded-xl hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">{product.category}</p>
                                        <h3 className="text-xl font-bold text-black group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                                    </div>
                                    <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
