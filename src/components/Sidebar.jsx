import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { logout } = useAuth();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/employees', icon: Users, label: 'Employees' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900/60 lg:hidden z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <aside
                className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-64 translate-x-0' : 'w-20 lg:translate-x-0 -translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100 rotate-3">
                            <Users className="text-white w-5 h-5" />
                        </div>
                        {isOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="ml-3 font-extrabold text-xl text-gray-900 whitespace-nowrap tracking-tight"
                            >
                                EMS<span className="text-indigo-600">PRO</span>
                            </motion.span>
                        )}
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto scrollbar-hide">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center px-4 py-3.5 rounded-2xl transition-all group relative
                                    ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'}
                                `}
                            >
                                <item.icon className={`w-5 h-5 shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                                {isOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-bold text-sm whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {!isOpen && (
                                    <div className="absolute left-16 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold invisible group-hover:visible whitespace-nowrap z-50 shadow-xl">
                                        {item.label}
                                    </div>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Bottom Actions */}
                    <div className={`${isOpen ? 'flex' : 'block'} p-4 border-t border-gray-100 space-y-2 `}>
                        <button
                            onClick={logout}
                            className="w-full flex items-center px-4 py-3.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all group relative"
                        >
                            <LogOut className={`w-5 h-5 shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-bold text-sm whitespace-nowrap"
                                >
                                    Log Out
                                </motion.span>
                            )}
                            {!isOpen && (
                                <div className="absolute left-16 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold invisible group-hover:visible whitespace-nowrap z-50 shadow-xl">
                                    Logout
                                </div>
                            )}
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="hidden lg:flex w-full items-center px-4 py-3.5 text-gray-400 hover:bg-gray-50 rounded-2xl transition-all"
                        >
                            {isOpen ? <ChevronLeft className="w-5 h-5 mx-auto" /> : <ChevronRight className="w-5 h-5 mx-auto" />}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
