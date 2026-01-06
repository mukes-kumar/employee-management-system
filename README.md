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
  <img width="1766" height="866" alt="image" src="https://github.com/user-attachments/assets/d1f691da-0e80-4ba1-af09-7173800a155f" />
 5. **Dashboard UI**:
    <img width="1888" height="869" alt="image" src="https://github.com/user-attachments/assets/dbe1d1ad-02fc-4088-840e-338a6abc1e25" />
    <img width="1889" height="865" alt="image" src="https://github.com/user-attachments/assets/9b037db1-6565-4d8e-8b34-1ce503b50d42" />
6. **View Report**:
   <img width="1917" height="869" alt="image" src="https://github.com/user-attachments/assets/8ca6a428-f2b9-4ded-8ae8-93b0d1a3e778" />

7. Employee page:
   <img width="1889" height="862" alt="image" src="https://github.com/user-attachments/assets/122addb4-48c4-43bd-9ff0-1c733906a7fd" />
8. Delete Employee:
   <img width="1589" height="705" alt="image" src="https://github.com/user-attachments/assets/d33b89e5-6789-41bf-8238-f1cde5f465c1" />
9. Create Employee :
    <img width="1450" height="804" alt="image" src="https://github.com/user-attachments/assets/4fcd423f-06a0-447a-bdf9-a3938698784d" />
10. Edit Employee:
    <img width="1491" height="683" alt="image" src="https://github.com/user-attachments/assets/a03f5d24-2d01-44f2-a02f-31fb952f94f3" />
11. Mobile View UI:
    <img width="341" height="779" alt="image" src="https://github.com/user-attachments/assets/92b696dd-e389-435d-93e5-45cbf4fcb913" />
12. Mobile view sidebar UI:
    <img width="648" height="785" alt="image" src="https://github.com/user-attachments/assets/ef5ca69f-a052-44c0-811c-2fc84b1270a0" />

## 💡 Assumptions & Design Decisions

- **Mock Authentication**: Used a mock service to handle login/logout for demonstration purposes.
- **Data Persistence**: Local Storage is used to ensure data persists between browser refreshes without a backend.
- **Responsiveness**: Prioritized a "mobile-first" approach for interactive elements like the filter bar and employee forms.
- **Design Aesthetic**: Used a "Glassmorphism" effect for the header and a clean, card-based layout for the dashboard to provide a premium feel.
