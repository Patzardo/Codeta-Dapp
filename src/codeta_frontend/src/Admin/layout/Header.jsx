import React,{ useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Bell, Edit2, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import image from "../assets/user.png";
import { useUser } from '../../userContext/UserContext';
import Cookies from "js-cookie";

export default function Header({ toggleSidebar, activeNavItem }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const { admin, setAdmin  } = useUser();

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    setAdmin(null);  
    localStorage.removeItem("admin");
    sessionStorage.removeItem("admin");
    Cookies.remove("admin");

    console.log("Admin logged out");
  
    navigate("/");
   
  };
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const toggleProfile = () => setShowProfile(!showProfile);

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition duration-300">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold ml-4">{activeNavItem}</h2>
      </div>
      <div className="flex items-center">
        <div className="relative" ref={notificationRef}>
          <button onClick={toggleNotifications} className="flex mx-4 text-white focus:outline-none hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition duration-300">
            <Bell className="w-6 h-6" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">New message from John Doe</div>
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your order has been shipped</div>
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meeting reminder: Team sync at 3 PM</div>
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={profileRef}>
          <button onClick={toggleProfile} className="relative z-10 block h-10 w-10 rounded-full overflow-hidden border-2 border-white focus:outline-none focus:border-white hover:border-opacity-70 transition duration-300">
            <img className="h-full w-full object-cover" src={image} alt="Profile" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                <p className="text-sm text-gray-500">jane@example.com</p>
              </div>
              <div className="border-t border-gray-100">
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
                <button 
              onClick={() => handleLogout()}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  activeNavItem: PropTypes.string.isRequired,
};