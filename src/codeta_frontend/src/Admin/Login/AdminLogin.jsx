import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import img from '../assets/performance.webp';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContext/UserContext";
// import img from "../assets/images/login/blockmail.jpg";
import { motion } from "framer-motion";

function AdminLogin() {
  const {admin, setAdmin } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IsLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log(admin);
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [admin, navigate]);

  const handleUsernamePasswordLogin = async (e) => {
    e.preventDefault();
    setIsLogin(true);
    try {
      if (username === "admin@property.com" && password === "Admin@pm321") {
        swal({
          title: "Successfully Logged In",
          text: "Welcome Admin",
          icon: "success",
        });
        setAdmin(JSON.stringify({ username }));
        localStorage.setItem("admin", JSON.stringify({ username }));
        navigate("/admin/dashboard"); 
      } else {
        setAlertInfo({
          show: true,
          type: "error",
          message: "Invalid Username OR Password.",
        });
      }
    } catch (error) {
      console.error("Login Failed:", error);
      swal({
        title: "Login Error",
        text: "Invalid username or password.",
        icon: "error",
      });
    }
    setIsLogin(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <img
        className="absolute inset-0 h-full w-full object-cover filter blur-sm"
        src={img}
        alt="login img"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <motion.div
        className="relative z-10 flex flex-col justify-center items-center py-12 px-6 sm:px-8 lg:px-12 bg-white bg-opacity-90 shadow-lg rounded-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
          Admin Login
        </h2>
        <form onSubmit={handleUsernamePasswordLogin} className="w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            {IsLogin ? "Login ...." : "Login with Username"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

export default AdminLogin;
