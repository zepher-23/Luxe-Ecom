import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';


import { getOptimizedImage } from '../assets/products';

const Collection = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ["All", "Apparel", "Outerwear", "Accessories", "Footwear", "Bags"];

    const filteredProducts = filterCategory === "All"
        ? products
        : products.filter(p => p.category === filterCategory);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-6">
                        COLLECTIONS
                    </h1>
                    <p className="max-w-xl mx-auto text-gray-500 text-lg">
                        Explore our complete catalog of premium essentials, curated for the modern aesthete.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${filterCategory === cat
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="group cursor-pointer"
                            >
                                <Link to={`/product/${product._id}`}>
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                                        <img
                                            src={getOptimizedImage(product.image).src}
                                            srcSet={getOptimizedImage(product.image).srcSet}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                            {product.category}
                                        </div>
                                        <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product);
                                                }}
                                                className="flex-1 bg-white/90 backdrop-blur text-black py-4 rounded-xl font-medium hover:bg-black hover:text-white transition-colors flex items-center justify-center z-20"
                                            >
                                                <ShoppingBag className="w-5 h-5 mr-2" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold text-black group-hover:underline decoration-1 underline-offset-4">
                                                {product.name}
                                            </h3>
                                            <span className="text-lg font-medium">${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        No products found in this category.
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Collection;
