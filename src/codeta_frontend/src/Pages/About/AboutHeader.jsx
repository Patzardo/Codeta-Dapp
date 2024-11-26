import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// const navigation = [
//   { name: "Features", href: "#features" },
//   { name: "How It Works", href: "#how-it-works" },
//   { name: "Testimonials", href: "#testimonials" },
//   { name: "FAQ", href: "#faq" },
// ];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 shadow-2xl scale-105 opacity-95"
          : "bg-transparent opacity-100"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav
        className="container mx-auto flex items-center justify-between py-2 px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="rounded focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <span className="sr-only">Codeta</span>
            <img
              className="h-16 w-auto transform transition-transform duration-300 hover:scale-110"
              src="/images/LandingPage/logob1.png"
              alt="Codeta Logo"
              width={32}
              height={32}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="rounded-lg p-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-300 ease-in-out"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold ${
                isScrolled ? "text-white" : "text-gray-900"
              } hover:text-blue-300 transition-all duration-500 ease-out rounded-lg px-3 py-2 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2`}
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div> */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/market"
            className="text-sm font-semibold text-white hover:text-blue-300 transition-all duration-500 ease-out rounded-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-2xl"
          >
            Launch App{" "}
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </Link>
        </div>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{ height: "100vh", position: "fixed" }}
            />
            <Dialog
              as={motion.div}
              initial={{ x: "100%", scale: 0.95 }}
              animate={{ x: 0, scale: 1 }}
              exit={{ x: "100%", scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-white rounded-l-2xl shadow-2xl px-6 py-6 sm:w-64"
              open={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            >
              <Dialog.Panel>
                <div className="flex items-center justify-between">
                  <Link
                    to="/"
                    className="rounded focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <span className="sr-only">Codeta</span>
                    <img
                      className="h-10 w-auto transform transition-transform duration-300 hover:scale-110"
                      src="/images/LandingPage/CodeSnippet.webp"
                      alt="Codeta Logo"
                      width={32}
                      height={32}
                    />
                  </Link>
                  <button
                    type="button"
                    className="rounded-lg p-3 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-300 ease-in-out"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-8 space-y-4">
                  {navigation.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-4 py-3 text-lg font-medium text-gray-800 hover:bg-blue-100 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <div className="mt-6">
                    <Link
                      to="/market"
                      className="block rounded-lg px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-l transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-2xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Launch App
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
