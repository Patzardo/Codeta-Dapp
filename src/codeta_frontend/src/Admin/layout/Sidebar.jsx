import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  User,
  ShoppingCart,
  ClipboardList, // Icon for Forms
  Table,         // Icon for Tables
  Phone,
  PieChart       // Importing PieChart for Charts
} from "lucide-react"; // Add the PieChart icon for Charts

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
    { name: "Users", icon: User, route: "users" },
    { name: "Contact", icon: Phone, route: "contact" },
    { name: "Course", icon: ShoppingCart, route: "properties" },
    { name: "Forms", icon: ClipboardList, route: "forms" },
    { name: "Tables", icon: Table, route: "tables" },
    { name: "Charts", icon: PieChart, route: "charts" },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white w-64 h-screen space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition duration-200 ease-in-out z-20`}
    >
      <nav className="space-y-3">
        <div className="flex items-center justify-between px-4">
          <span className="text-2xl font-semibold">Admin Panel</span>
          <button onClick={toggleSidebar} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={`/admin/${item.route}`}
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white`}
            onClick={toggleSidebar}
          >
            <item.icon className="inline-block mr-2 w-6 h-6" /> {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
