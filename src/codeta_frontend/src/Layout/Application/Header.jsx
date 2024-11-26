"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";

export default function Header({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown

  const { principal } = useConnect({
    onConnect: () => {
      // Handle post-connect actions here
    },
    onDisconnect: () => {
      // Handle post-disconnect actions here
    },
  });

  const handleClickOutside = (event) => {
    // Close the dropdown if clicked outside
    if (
      dropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to="/">
          <div className="flex gap-1">
          <img
              className="h-16 w-auto transform transition-transform duration-300 hover:scale-110"
              src="/images/LandingPage/mainLogo.png"
              alt="Codeta Logo"
              width={32}
              height={32}
            />
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <ConnectButton />
          <ConnectDialog dark={false} />
          {principal && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 ml-4" // Add margin left for spacing
              >
                <UserIcon className="h-6 w-6" aria-hidden="true" />
                <svg
                  className="h-5 w-5 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 top-9 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left rounded-md transition duration-200"
                  >
                    Profile
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
