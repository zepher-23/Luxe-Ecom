import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Send, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-24 pb-12 rounded-t-[3rem] -mt-10 relative z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Big Text Header */}
                <div className="mb-24 border-b border-gray-800 pb-12">
                    <h2 className="text-[12vw] leading-none font-black tracking-tighter text-white/20 select-none">
                        LUXE.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-widest">Socials</h4>
                        <div className="flex flex-col space-y-2">
                            {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map((social) => (
                                <a key={social} href="#" className="flex items-center group text-gray-400 hover:text-white transition-colors">
                                    <span className="text-lg">{social}</span>
                                    <ArrowUpRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-widest">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
                            <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-widest">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
                            <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-widest">Newsletter</h4>
                        <p className="text-gray-400">Join our community.</p>
                        <div className="relative border-b border-white/20 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 px-0"
                            />
                            <button className="absolute right-0 top-0 text-white hover:text-gray-300">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-gray-500 text-sm">
                    <p>&copy; 2026 LuxeCart Inc.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
