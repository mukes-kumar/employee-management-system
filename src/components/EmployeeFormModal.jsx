import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, Check, AlertCircle, MapPin, User, Calendar, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmployees } from '../context/EmployeeContext';

const EmployeeFormModal = ({ employee, onClose }) => {
    const { addEmployee, updateEmployee } = useEmployees();
    const [formData, setFormData] = useState({
        name: '',
        gender: 'Male',
        dob: '',
        status: 'Active',
        state: 'California',
        image: null
    });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (employee) {
            setFormData(employee);
            setImagePreview(employee.image);
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
                setFormData(prev => ({ ...prev, image: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (employee) {
            updateEmployee(employee.id, formData);
        } else {
            addEmployee({ ...formData, id: Date.now() });
        }
        onClose();
    };

    const states = [
        'California', 'Texas', 'New York', 'Florida', 'Illinois',
        'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'
    ];

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            {employee ? 'Edit Employee' : 'Add New Employee'}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">Please fill in the details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <form onSubmit={handleSubmit} id="employee-form" className="space-y-8">
                        {/* Profile Image Pick */}
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8">
                            <div className="relative group">
                                <div
                                    className={`w-40 h-40 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${imagePreview ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-gray-200 hover:border-indigo-400 bg-gray-50'
                                        }`}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-400">
                                            <Upload className="w-8 h-8 mb-2" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all transform group-hover:scale-110"
                                >
                                    <Upload className="w-4 h-4" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mt-3">Profile Photo</p>
                            </div>

                            <div className="flex-1 w-full space-y-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full name"
                                            className={`w-full bg-gray-50 border-2 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-gray-900 transition-all outline-none ${errors.name ? 'border-red-100 focus:border-red-500' : 'border-gray-50 focus:border-indigo-600 focus:bg-white'
                                                }`}
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{errors.name}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Gender */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3.5 text-sm font-bold text-gray-900 transition-all outline-none focus:border-indigo-600 focus:bg-white appearance-none"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* DOB */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">DOB</label>
                                        <div className="relative">
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className={`w-full bg-gray-50 border-2 rounded-2xl px-4 py-3.5 text-sm font-bold text-gray-900 transition-all outline-none ${errors.dob ? 'border-red-100 focus:border-red-500' : 'border-gray-50 focus:border-indigo-600 focus:bg-white'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* State */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">State</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-gray-900 transition-all outline-none focus:border-indigo-600 focus:bg-white appearance-none"
                                    >
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                <div className="p-1.5 bg-gray-50 border-2 border-gray-50 rounded-2xl flex gap-1">
                                    {['Active', 'Inactive'].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, status: s }))}
                                            className={`flex-1 py-2 rounded-[14px] text-xs font-extrabold transition-all ${formData.status === s
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 bg-gray-50 flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 font-extrabold rounded-[1.25rem] hover:bg-gray-100 transition-all text-sm shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="employee-form"
                        className="flex-1 py-4 bg-indigo-600 text-white font-extrabold rounded-[1.25rem] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-sm transform active:scale-95"
                    >
                        {employee ? 'Save Changes' : 'Create Employee'}
                    </button>
                </div>
            </motion.div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default EmployeeFormModal;
