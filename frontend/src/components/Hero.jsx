import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative min-h-screen bg-[#f8f8f8] flex items-center overflow-hidden pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Typography Section */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl sm:text-8xl md:text-9xl font-black text-black leading-[0.9] tracking-tighter mb-8"
                        >
                            FUTURE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black italic font-serif">
                                CLASSICS
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl text-gray-600 max-w-md mb-10 font-light"
                        >
                            Redefining luxury through minimalism. We curate essentials that stand the test of time and trend.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex gap-4"
                        >
                            <Link to="/collections" className="group bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 flex items-center">
                                Explore Collection
                                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Section */}
                    <div className="lg:col-span-5 relative h-[600px] w-full hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 z-10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80"
                                alt="Editorial Fashion"
                                className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
                            />
                        </motion.div>

                        {/* Floating Elements/Accents */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.8, type: "spring" }}
                            className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs"
                        >
                            <p className="font-serif text-2xl italic mb-2">"Visionary"</p>
                            <p className="text-gray-500 text-sm">Featured in Vogue, 2025</p>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100/50 -skew-x-12 transform translate-x-32 -z-0" />
        </div>
    );
};

export default Hero;
