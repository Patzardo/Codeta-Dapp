import React, { useState, useEffect } from 'react';
import AddItem from '../../Component/SellerPage/AddItem';
import ItemTable from '../../Component/SellerPage/ItemTable';
import EditItem from '../../Component/SellerPage/EditItem';
// import Footer from '../../Layout/Application/Footer';
import Footer from '../../Layout/LandingPage/Footer';
import Header from '../../Layout/Application/Header';
import Sidebar from '../../Layout/Application/Sidebar';
import Loader from '../../Component/Common/Loader';
import { ConnectButton, useConnect } from "@connect2ic/react";
import ic from "ic0";

const Ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

const SellerPage = () => {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const { principal, isConnected } = useConnect({
        onConnect: () => setLoading(false),
        onDisconnect: () => setLoading(false),
    });

    // Fetch all items when the component mounts or when the connection status changes
    useEffect(() => {
        const fetchItems = async () => {
            if (!isConnected || !principal) {
                setLoading(false);
                return;
            }

            try {
                const products = await Ledger.call("getAllProducts");
                setItems(products);
                console.log("Items:", items);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [isConnected, principal]);

    const addItem = (newItem) => {
        setItems(prev => [...prev, newItem]);
        setShowForm(false);
    };

    const deleteItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateItem = (updatedItem) => {
        setItems(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setSelectedItem(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <Loader />
                        ) : !isConnected || !principal ? (
                            <div className="text-center flex flex-col items-center">
                                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    Seller Dashboard
                                </h1>
                                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                    Please connect with Internet Identity to access the dashboard.
                                </p>
                                <div className="mt-8">
                                    <ConnectButton />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-12">
                                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        Seller Dashboard
                                    </h1>
                                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                        Manage your digital products with ease. Add new items, track your listings, and grow your business.
                                    </p>
                                </div>

                                {!showForm && !selectedItem && (
                                    <div className="text-center mb-8">
                                        <button
                                            onClick={() => setShowForm(true)}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Add New Item
                                        </button>
                                    </div>
                                )}

                                {showForm && <AddItem principal={principal} onSubmit={addItem} onCancel={() => setShowForm(false)} />}
                                {selectedItem && <EditItem item={selectedItem} onUpdate={updateItem} onCancel={() => setSelectedItem(null)} />}

                                {!showForm && !selectedItem && (
                                    <ItemTable items={items} onEdit={setSelectedItem} onDelete={deleteItem} loading={loading} />
                                )}
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default SellerPage;
