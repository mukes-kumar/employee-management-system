import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, color, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col justify-between"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 md:p-4 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-[10px] md:text-xs font-bold uppercase tracking-wider">
                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">+12%</span>
                <span className="text-gray-400 ml-2">from last month</span>
            </div>
        </motion.div>
    );
};

export default StatCard;
