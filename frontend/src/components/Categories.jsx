import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
    {
        id: 1,
        name: "Women",
        sub: "SS/25 Collection",
        image: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        style: "lg:col-span-2 lg:row-span-2"
    },
    {
        id: 2,
        name: "Men",
        sub: "Urban Essence",
        image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        style: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 3,
        name: "Accessories",
        sub: "Finishing Touches",
        image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        style: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 4,
        name: "Footwear",
        sub: "Step Forward",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        style: "lg:col-span-3 lg:row-span-1" // Full width bottom
    }
];

const Categories = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4">CURATED <br /><span className="italic font-serif font-light text-gray-500">EDITIONS</span></h2>
                    </div>
                    <p className="text-gray-500 max-w-xs text-right mt-4 md:mt-0">
                        Explore our meticulously selected categories designed to elevate your everyday aesthetics.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[800px]">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`${category.style}`}
                        >
                            <Link to="/collections" className="block relative group overflow-hidden rounded-3xl cursor-pointer w-full h-full">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-gray-200 text-sm tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{category.sub}</p>
                                            <h3 className="text-white text-3xl font-bold">{category.name}</h3>
                                        </div>
                                        <div className="bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gray-200">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
