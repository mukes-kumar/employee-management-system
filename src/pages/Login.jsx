import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Loader2, Users, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password. Hint: admin@ems.com / admin123');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -120, 0],
                        x: [0, -150, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[440px]"
            >
                <div className="bg-white/[0.02] backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden group">
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>

                    <div className="text-center mb-10 relative">
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                            className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/20 relative"
                        >
                            <Users className="text-white w-10 h-10" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -inset-1 bg-indigo-600/30 rounded-3xl blur-md -z-10"
                            ></motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Employee Management System</h1>
                            <p className="text-indigo-200/60 font-medium tracking-wide text-sm uppercase">Secure Enterprise Portal</p>
                        </motion.div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <label className="block text-xs font-bold text-indigo-200/50 uppercase tracking-widest mb-2 ml-1">Work Email</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-indigo-400 transition-colors w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:bg-white/[0.08] focus:border-indigo-500/50 outline-none transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="block text-xs font-bold text-indigo-200/50 uppercase tracking-widest">Password</label>
                                <span className="text-[10px] font-bold text-indigo-400 cursor-pointer hover:underline uppercase tracking-tighter">Forgot?</span>
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-indigo-400 transition-colors w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:bg-white/[0.08] focus:border-indigo-500/50 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 py-3 px-4 rounded-xl"
                            >
                                <p className="text-red-400 text-[10px] font-bold text-center uppercase tracking-wider">
                                    {error}
                                </p>
                            </motion.div>
                        )}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            whileHover={{ scale: 1.02, backgroundColor: '#4338ca' }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="uppercase tracking-widest text-xs">Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span className="uppercase tracking-widest text-xs">Enter System</span>
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                </>
                            )}
                        </motion.button>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-10 pt-8 border-t border-white/5"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setEmail('admin@ems.com');
                                setPassword('admin123');
                                setTimeout(() => {
                                    const form = document.querySelector('form');
                                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                }, 100);
                            }}
                            className="w-full group/demo relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div className="text-left">
                                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-0.5">Quick Access</p>
                                    <p className="text-sm text-white font-extrabold">Skip to Dashboard</p>
                                </div>
                                <div className="w-10 h-10 bg-indigo-600/20 group-hover/demo:bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300">
                                    <ArrowRight className="text-white w-5 h-5 group-hover/demo:translate-x-1 transition-transform" />
                                </div>
                            </div>
                            {/* Decorative background pulse */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 -translate-x-full group-hover/demo:translate-x-full transition-transform duration-1000"></div>
                        </button>
                    </motion.div>
                </div>

                {/* Bottom decorative line */}
                <div className="mt-8 flex justify-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600/30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600/10"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
