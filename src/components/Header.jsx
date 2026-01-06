import React, { useState } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { user } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-6 lg:px-8 fixed top-0 right-0 left-0 z-20 transition-all duration-300">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-gray-100 rounded-xl text-gray-500"
                    aria-label="Toggle Sidebar"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Desktop Search */}
                <div className={`${!isSidebarOpen ? 'ml-4' : 'ml-52'} hidden lg:flex items-center bg-gray-50
                 border border-gray-200 rounded-xl px-3 py-2 w-64 xl:w-96 
                 focus-within:ring-2 focus-within:ring-indigo-500/20 
                 focus-within:border-indigo-500 transition-all`}>
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search anything..."
                        className="bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-600"
                    />
                </div>

                {/* Mobile Search Toggle */}
                <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 lg:hidden"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile Search Bar Expandable */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 lg:hidden z-10 shadow-lg"
                    >
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="search"
                                autoFocus
                                placeholder="Search employees, reports..."
                                className="bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-600"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

                <div className="flex items-center gap-3 pl-1">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-bold text-gray-800 leading-tight">{user?.name || 'Admin'}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user?.role || 'Administrator'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg shadow-indigo-100">
                        {user?.name?.[0] || 'A'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
