import React, { useState, useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useEmployees } from '../context/EmployeeContext';
import {
    Search, Plus, Filter, MoreVertical, Edit, Trash2, Printer,
    User, Mail, MapPin, Calendar, Smartphone, ChevronDown, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmployeeFormModal from './EmployeeFormModal';
import ConfirmationModal from './ConfirmationModal';

const EmployeeList = () => {
    const { employees, deleteEmployee, updateEmployee } = useEmployees();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Employee-Directory-Report',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [genderFilter, setGenderFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // Filter logic
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGender = genderFilter === 'All' || emp.gender === genderFilter;
            const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
            return matchesSearch && matchesGender && matchesStatus;
        });
    }, [employees, searchQuery, genderFilter, statusFilter]);

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteEmployee(deleteId);
            setDeleteId(null);
        }
    };

    const toggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        updateEmployee(id, { status: newStatus });
    };

    return (
        <div ref={componentRef} className="space-y-6 md:space-y-8 pb-8 printable-content">
            <div className="print-header hidden print:block border-b-2 border-gray-900 pb-4 mb-8">
                <h1 className="text-3xl font-extrabold">Employee Directory Report</h1>
                <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-gray-600">
                    <div>Total Employees: {filteredEmployees.length}</div>
                    <div>Filters: {genderFilter} / {statusFilter}</div>
                </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Employee Directory</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">Manage and track your organization's talent.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </button>
                    <button
                        onClick={() => {
                            setSelectedEmployee(null);
                            setIsFormOpen(true);
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                    />
                </div>
                <div className="grid grid-cols-2 lg:flex lg:items-center gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Gender</span>
                        <select
                            value={genderFilter}
                            onChange={(e) => setGenderFilter(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        >
                            <option value="All">All Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Status</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined / Age</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((emp) => (
                                        <motion.tr
                                            key={emp.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-gray-50/50 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                                                        {emp.image ? (
                                                            <img src={emp.image} alt={emp.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <User className="w-5 h-5 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                                                        <p className="text-xs text-gray-400 font-medium">EMP-{emp.id.slice(-4).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <MapPin className="w-3 h-3 text-indigo-400" />
                                                        {emp.state}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                                        <User className="w-3 h-3 text-indigo-400" />
                                                        {emp.gender}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Calendar className="w-3 h-3 text-indigo-400" />
                                                    {emp.dob}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleStatus(emp.id, emp.status)}
                                                    className={`group relative flex items-center justify-between w-20 h-8 p-1 rounded-full transition-all duration-300 ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${emp.status === 'Active' ? 'translate-x-[48px]' : 'translate-x-0'
                                                        }`}>
                                                        <div className={`w-2 h-2 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'
                                                            }`} />
                                                    </div>
                                                    <span className={`absolute text-[10px] font-extrabold uppercase tracking-widest transition-opacity duration-300 ${emp.status === 'Active' ? 'left-2 opacity-100 text-white' : 'right-2 opacity-0'
                                                        }`}>
                                                        ON
                                                    </span>
                                                    <span className={`absolute text-[10px] font-extrabold uppercase tracking-widest transition-opacity duration-300 ${emp.status === 'Active' ? 'left-2 opacity-0' : 'right-2 opacity-100 text-gray-500'
                                                        }`}>
                                                        OFF
                                                    </span>
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={handlePrint}
                                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                                        title="Print"
                                                    >
                                                        <Printer className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(emp)}
                                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(emp.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-24 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-300">
                                                <Search className="w-16 h-16 mb-4 opacity-10" />
                                                <p className="text-xl font-extrabold text-gray-400 tracking-tight">No employees found</p>
                                                <p className="text-sm font-medium mt-1">Try adjusting your filters or search query</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormOpen && (
                <EmployeeFormModal
                    employee={selectedEmployee}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Employee"
                message="Are you sure you want to delete this employee? This action will permanently remove the record from the directory."
                confirmText="Delete Record"
                type="danger"
            />
        </div>
    );
};

export default EmployeeList;
