import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useEmployees } from '../context/EmployeeContext';
import StatCard from './StatCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserCheck, UserMinus, BarChart3, TrendingUp, ArrowRight, Printer, X, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
    const { employees } = useEmployees();
    const [showReports, setShowReports] = useState(false);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Workforce-Analytics-Report',
    });

    const stats = [
        {
            label: 'Total Employees',
            value: employees.length,
            icon: Users,
            color: 'bg-indigo-600',
            delay: 0.1
        },
        {
            label: 'Active',
            value: employees.filter(e => e.status === 'Active').length,
            icon: UserCheck,
            color: 'bg-emerald-500',
            delay: 0.2
        },
        {
            label: 'Inactive',
            value: employees.filter(e => e.status === 'Inactive').length,
            icon: UserMinus,
            color: 'bg-rose-500',
            delay: 0.3
        }
    ];

    return (
        <div ref={componentRef} className="space-y-6 md:space-y-8 pb-8 printable-content">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {showReports ? 'Detailed Analytics Report' : 'Dashboard Overview'}
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">
                        {showReports ? 'Comprehensive workforce metrics and insights.' : 'Welcome back! Here\'s what\'s happening with your workforce.'}
                    </p>
                </div>
                <div className="flex gap-3">
                    {showReports && (
                        <button
                            onClick={() => handlePrint()}
                            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-2xl font-extrabold text-sm text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Printer className="w-4 h-4" />
                            Print Report
                        </button>
                    )}
                    <button
                        onClick={() => setShowReports(!showReports)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-extrabold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        {showReports ? (
                            <>
                                <LayoutDashboard className="w-4 h-4" />
                                Back to Dashboard
                            </>
                        ) : (
                            <>
                                <BarChart3 className="w-4 h-4" />
                                View Reports
                            </>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!showReports ? (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 md:space-y-8"
                    >
                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {stats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                            {/* Performance Chart / Area Flow Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="lg:col-span-4 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-8 relative z-10">
                                    <div>
                                        <h4 className="text-xl font-extrabold text-gray-900 tracking-tight">Performance Analysis</h4>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time workforce efficiency</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                        <button className="px-3 py-1.5 text-[10px] font-extrabold text-indigo-600 bg-white rounded-lg shadow-sm uppercase tracking-wider">Flow</button>
                                        <button className="px-3 py-1.5 text-[10px] font-extrabold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider">Grid</button>
                                    </div>
                                </div>

                                <div className="flex-1 min-h-[240px] relative">
                                    {/* SVG Data Visualization */}
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                                            </linearGradient>
                                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#818cf8" />
                                                <stop offset="50%" stopColor="#4f46e5" />
                                                <stop offset="100%" stopColor="#c084fc" />
                                            </linearGradient>
                                        </defs>

                                        {/* Grid Lines */}
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <line key={i} x1="0" y1={40 * i} x2="400" y2={40 * i} stroke="#f1f5f9" strokeWidth="1" />
                                        ))}

                                        {/* Animated Area Path */}
                                        <motion.path
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                            d="M0,160 C50,150 70,80 120,90 C170,100 200,40 250,50 C300,60 350,120 400,100 L400,200 L0,200 Z"
                                            fill="url(#areaGradient)"
                                        />

                                        {/* Animated Line Path */}
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                            d="M0,160 C50,150 70,80 120,90 C170,100 200,40 250,50 C300,60 350,120 400,100"
                                            fill="none"
                                            stroke="url(#lineGradient)"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />

                                        {/* Data Points */}
                                        {[
                                            { x: 120, y: 90 },
                                            { x: 250, y: 50 },
                                            { x: 400, y: 100 }
                                        ].map((point, i) => (
                                            <motion.circle
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1.5 + i * 0.2 }}
                                                cx={point.x}
                                                cy={point.y}
                                                r="6"
                                                fill="#fff"
                                                stroke="#4f46e5"
                                                strokeWidth="3"
                                                className="drop-shadow-lg"
                                            />
                                        ))}
                                    </svg>

                                    {/* Legend Labels */}
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                                            <span key={month} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{month}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Stats */}
                                <div className="absolute top-1/2 right-8 -translate-y-1/2 space-y-4 no-print hidden md:block">
                                    <div className="bg-emerald-50 text-emerald-600 px-3 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
                                        <TrendingUp className="w-3 h-3" />
                                        <span className="text-[10px] font-bold">+12.5%</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Department Distribution Chart Mockup */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
                            >
                                <div className="mb-8">
                                    <h4 className="text-lg font-extrabold text-gray-900">Department Distribution</h4>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Workforce split</p>
                                </div>

                                <div className="flex-1 flex flex-col justify-center space-y-5">
                                    {[
                                        { label: 'Engineering', color: 'bg-indigo-600', width: '45%' },
                                        { label: 'Marketing', color: 'bg-emerald-500', width: '25%' },
                                        { label: 'Design', color: 'bg-amber-500', width: '20%' },
                                        { label: 'HR', color: 'bg-rose-500', width: '10%' }
                                    ].map((dept, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold text-gray-600">
                                                <span>{dept.label}</span>
                                                <span>{dept.width}</span>
                                            </div>
                                            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: dept.width }}
                                                    transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                                                    className={`h-full ${dept.color} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="bg-indigo-900 p-6 md:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group"
                        >
                            <div className="relative z-10 space-y-4">
                                <span className="bg-indigo-500/30 text-indigo-100 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase">New Feature</span>
                                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">Automate your HR <br /> workflows today.</h3>
                                <p className="text-indigo-200 text-sm max-w-[280px] font-medium leading-relaxed">Save up to 10 hours a week on administrative tasks with our AI tools.</p>
                                <button className="bg-white text-indigo-900 px-6 py-3 rounded-2xl font-extrabold text-sm hover:bg-indigo-50 transition-all shadow-xl shadow-black/20">
                                    Explore Automation
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                            <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-purple-500/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reports"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="print-header hidden print:block border-b-2 border-gray-900 pb-4 mb-8 p-10">
                            <h1 className="text-4xl font-extrabold">Workforce Analytics Report</h1>
                            <p className="text-sm text-gray-500 mt-2">Date: {new Date().toLocaleDateString()} | Admin: EMS PRO</p>
                        </div>

                        <div className="p-8 md:p-12 space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <h2 className="text-4xl font-extrabold text-gray-900">{stat.value}</h2>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                                    Performance Overview
                                </h3>
                                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                                                <th className="pb-4">Metric</th>
                                                <th className="pb-4">Current Value</th>
                                                <th className="pb-4">Trend</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm font-bold text-gray-700">
                                            <tr className="border-t border-gray-200">
                                                <td className="py-4">Organization Health</td>
                                                <td className="py-4">94%</td>
                                                <td className="py-4 text-emerald-500">Positive</td>
                                            </tr>
                                            <tr className="border-t border-gray-200">
                                                <td className="py-4">Employee Retention</td>
                                                <td className="py-4">88%</td>
                                                <td className="py-4 text-emerald-500">Improved</td>
                                            </tr>
                                            <tr className="border-t border-gray-200">
                                                <td className="py-4">Avg. Tenure</td>
                                                <td className="py-4">2.4 Years</td>
                                                <td className="py-4 text-indigo-600">Stable</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
