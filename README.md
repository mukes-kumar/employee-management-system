# Employee Management System (EMS PRO)

A modern, responsive, and feature-rich Employee Management System built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Authentication**: Secure mock login system with route protection.
- **Dashboard**: High-level overview of workforce statistics (Total, Active, Inactive).
- **Employee Management**:
  - Full CRUD operations (Add, View, Edit, Delete).
  - Search by name.
  - Combined filtering by Gender and Status.
  - Image upload with instant preview.
  - Form validation for data integrity.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
  - Collapsible Sidebar on Desktop.
  - Off-canvas Sidebar on Mobile.
  - Expandable search on mobile header.
  - Responsive grid layouts and data tables.
- **Print Support**: Dedicated print functionality for the employee directory.
- **User Experience**:
  - Smooth transitions and animations with Framer Motion.
  - Modern, premium aesthetic with a clean color palette.
  - Graceful loading and empty states.

## 🛠 Tech Stack

- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **Storage**: Browser Local Storage for persistent data.

## 📋 Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd employee-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Login Credentials**:
   - **Email**: `admin@ems.com`
   - **Password**: `admin123`

## 💡 Assumptions & Design Decisions

- **Mock Authentication**: Used a mock service to handle login/logout for demonstration purposes.
- **Data Persistence**: Local Storage is used to ensure data persists between browser refreshes without a backend.
- **Responsiveness**: Prioritized a "mobile-first" approach for interactive elements like the filter bar and employee forms.
- **Design Aesthetic**: Used a "Glassmorphism" effect for the header and a clean, card-based layout for the dashboard to provide a premium feel.
