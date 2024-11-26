import React, { useState, useEffect } from 'react';
import Header from '../../Layout/Application/Header';
import Sidebar from '../../Layout/Application/Sidebar';
import MainContent from '../../Component/MainContent/MainMarket';
// import Footer from '../../Layout/Application/Footer';
import Footer from '../../Layout/LandingPage/Footer';
const categories = ['All', 'Digital Law', 'Data Protection','Digital Environment', 'Cryptocurrencies', 'Comercial Buildings'];

import ic from "ic0";
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");


export default function Market() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    async function fetchPropertiesForSale() {
      try {
        const response = await ledger.call("getPropertiesForSale");
        setProperties(response); // Set the properties from the backend response
      } catch (error) {
        console.error("Failed to fetch properties for sale:", error);
      }
    }

    fetchPropertiesForSale();
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent
          categories={categories}
          properties={properties}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Footer />
      </div>
    </div>
  );
}
