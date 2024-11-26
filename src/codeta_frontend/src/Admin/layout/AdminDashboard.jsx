import React, { useState,useEffect  } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MainBody from '../pages/MainBody';
import UsersPage from '../pages/UsersPage';
import ProductsPage from '../pages/ProductsPage';
import Forms from '../pages/Forms';
import Tables from '../pages/Tables';
import Charts from '../pages/Charts';
import ContactPage from '../pages/ContactPage';
import { useUser } from '../../userContext/UserContext';
import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const { admin, setAdmin } = useUser();

  useEffect(() => {
    if (admin) {
      console.log("admin", admin);
    } else {
      navigate("/admin-login");
    }
  }, [admin]);

  const getActiveNavItem = () => {
    if (location.pathname.includes('/admin/users')) return 'Users';
    if (location.pathname.includes('/admin/products')) return 'Products';
    if (location.pathname.includes('/admin/forms')) return 'Forms';
    if (location.pathname.includes('/admin/tables')) return 'Tables';
    if (location.pathname.includes('/admin/charts')) return 'Charts';
    if (location.pathname.includes('/admin/contacts')) return 'ContactPage';
    return 'Dashboard';
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 md:ml-0 ml-0">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} activeNavItem={getActiveNavItem()} />

        {/* Main Body */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 pl-4 pr-4">
          <div className="container mx-auto px-6 py-6">
            <Routes>
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/dashboard" element={<MainBody activeNavItem="Dashboard" />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/properties" element={<ProductsPage />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/charts" element={<Charts/>} />
              <Route path="/contact" element={<ContactPage/>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
