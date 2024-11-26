import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConnect } from "@connect2ic/react";
import ic from "ic0";
import Loader from "../Common/Loader";
const Ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

export default function MainContent({
  categories,
  properties,
  selectedCategory,
  setSelectedCategory,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);  // New loading state
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const addTag = () => {
    if (searchTerm && !tags.includes(searchTerm)) {
      setTags([...tags, searchTerm]);
      setSearchTerm("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      selectedCategory === "All" ||
      property.name.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearchTerm =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = tags.every((tag) =>
      property.name.toLowerCase().includes(tag.toLowerCase())
    );
    return matchesCategory && matchesSearchTerm && matchesTags;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePropertyClick = (property) => {
    navigate(`/property/${property.id}`);
  };

  const { principal, isConnected } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });

  useEffect(() => {
    async function fetchUserProfile() {
      if (isConnected) {
        try {
          const profile = await Ledger.call("getUserProfileById", principal);
          if (profile.length == 0) {
            await Ledger.call("loginUser", principal);
            const newProfile = await Ledger.call(
              "getUserProfileById",
              principal
            );
            setUserProfile(newProfile);
          } else {
            setUserProfile(profile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    }
    fetchUserProfile();
  }, [isConnected]);

  useEffect(() => {
    // Simulate fetching properties
    setLoading(false);  // Set loading to false once properties are fetched
  }, [properties]);

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-b from-gray-100 to-indigo-50 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto py-12 space-y-8">
        {/* Search and Tags */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
            Search and Categories
          </h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search by program name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              className="w-full md:w-3/5 lg:w-1/3 px-5 py-3 rounded-full bg-white shadow-lg placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-200"
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full shadow"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {tags.length === 0 && (
              <section className="w-full">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                    key={category}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                  >
                      {category}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>

        {/* Properties Grid */}
        {loading ? (
          <Loader />
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">No property available</p>
        ) : (
            <>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="group bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200 cursor-pointer"
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className="relative">
                      <img
                        src={property.image || "/images/placeholder.png"}
                        alt={property.name}
                        className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                        For Sale
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-md font-semibold text-gray-800 mb-1 truncate group-hover:text-indigo-600 transition-colors duration-300">
                        {property.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1 truncate">
                        {property.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">Location: {property.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-md font-bold text-gray-800">
                          {Number(property.price).toFixed(2)} ICP
                        </span>
                        <button className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs hover:bg-indigo-700 transition-all duration-300 shadow-md">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
              {/* Pagination Controls */}
              <div className="mt-8 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200 disabled:bg-gray-200 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-gray-600">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200 disabled:bg-gray-200 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </>
        )}
      </div>
    </main>
  );
}
