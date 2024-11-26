// Sidebar.js
'use client';

import React from 'react';

export default function Sidebar({ isSidebarOpen, closeSidebar }) {
  return (
    <aside
      className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out h-[100vh]`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">Codeta</h1>
        <button onClick={closeSidebar} className="p-1 rounded-md text-white hover:bg-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="mt-5 px-4 space-y-2">
        <a href="/" className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Home
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Sell
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Buy
        </a>        
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <a href="#" className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317a1.724 1.724 0 012.573 1.066c.43 1.756-1.122 3.255-2.573 1.066a1.724 1.724 0 010 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573-1.065c-1.756-.426-2.573-1.512-2.573-3.35-.43-1.756 1.122-3.255 2.573-1.066a1.724 1.724 0 01-.67-2.573c-.94-1.543-.816-3.31-2.37-2.37a1.724 1.724 0 00-1.065 2.573c-1.756.426-1.756 2.924 0 3.35a1.724 1.724 0 00.67 1.573 3 3 0 01-1.573-.67z"></path>
          </svg>
          Settings
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-red-400 rounded-lg hover:bg-gray-800">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </a>
      </div>
    </aside>
  );
}
