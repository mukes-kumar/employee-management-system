import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        } else {
            // Initial dummy data
            const initialData = [
                { id: '1', name: 'John Doe', gender: 'Male', dob: '1990-01-01', state: 'California', status: 'Active', image: '' },
                { id: '2', name: 'Jane Smith', gender: 'Female', dob: '1992-05-15', state: 'New York', status: 'Inactive', image: '' },
            ];
            setEmployees(initialData);
            localStorage.setItem('employees', JSON.stringify(initialData));
        }
        setLoading(false);
    }, []);

    const addEmployee = (employee) => {
        const newEmployee = { ...employee, id: Date.now().toString() };
        const updatedEmployees = [...employees, newEmployee];
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    const updateEmployee = (id, updatedData) => {
        const updatedEmployees = employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp);
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    const deleteEmployee = (id) => {
        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, loading }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeeContext);
