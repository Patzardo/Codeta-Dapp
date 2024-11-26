import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Using uuid for unique ID generation
import swal from "sweetalert"; // Import SweetAlert 
import ic from "ic0";
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    stock: 50,
    lastUpdated: "2023-10-01",
  },
  {
    id: 2,
    name: "Smartphone",
    category: "Electronics",
    price: 599.99,
    stock: 100,
    lastUpdated: "2023-09-28",
  },
  {
    id: 3,
    name: "Headphones",
    category: "Audio",
    price: 149.99,
    stock: 200,
    lastUpdated: "2023-10-03",
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    stock: 75,
    lastUpdated: "2023-10-02",
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Appliances",
    price: 79.99,
    stock: 30,
    lastUpdated: "2023-09-30",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [AddProductLoading, setAddProductLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProperty, setNewProperty] = useState({
    id: uuidv4(), // Generates a random UUID for the property ID
    name: "",
    description: "",
    location: "",
    price: 0,
    area: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the newProperty (or newProduct) state with the selected file
      setNewProperty((prevState) => ({ ...prevState, image: file }));

      // Set the preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleAddPropertyClick = async () => {
    setAddProductLoading(true);
    try {
      const principalId = "xsvih-nzaqn-q3edk-ijqkq-3qymg-qxf4z-pqou7-g5t2r-36ukb-ioiqc-7qe";

      console.log("Attempting to Add Course with values:", {
        principalId,
        id: newProperty.id,
        name: newProperty.name,
        description: newProperty.description,
        location: newProperty.location,
        price: newProperty.price,
        area: newProperty.area,
      });

      // Convert the image file to base64 if it exists
      let imageBase64 = null;
      if (newProperty.image) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(newProperty.image); // Trigger conversion
        });
      }

      console.log("Image data (base64):", imageBase64);

      // Call the backend function with newProperty details and image data
      const response = await ledger.call(
        "addProperty",
        principalId,
        newProperty.id,
        newProperty.name,
        newProperty.description,
        newProperty.location,
        BigInt(newProperty.price),
        newProperty.area,
        imageBase64 // Send the image as base64 data
      );

      console.log("Property added:", response);

      // Show success alert
      swal("Success", "Property added successfully!", "success");

      // Close the modal after adding the property
      setIsAddProductModalOpen(false);
    } catch (error) {
      console.error("Failed to Add Course:", error);
      swal("Error", "Failed to Add Course. Please try again.", "error");
    } finally {
      setAddProductLoading(false);
    }
  };


  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    document.title = "Product Management Dashboard";

    const fetchProperties = async () => {

      try {
        const response = await ledger.call("getPropertiesForSale");
        console.log("Properties:", response);
        if (response.length > 0) {
          setProperties(response);
        }
      } catch (e) {
        console.log("Error Fetching Properties:", e);
      }
    }

    fetchProperties();
  }, []);

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const currentProducts = sortedProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        ...newProduct,
        id: products.length + 1,
        lastUpdated: new Date().toISOString().split("T")[0],
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      },
    ]);
    setNewProduct({ name: "", category: "", price: "", stock: "" });
    setIsAddProductModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProperty = (product) => {
    setEditingProduct(product);
    setIsEditProductModalOpen(true);
  };

  const handleSaveEditedProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id
          ? {
            ...editingProduct,
            lastUpdated: new Date().toISOString().split("T")[0],
            price: parseFloat(editingProduct.price),
            stock: parseInt(editingProduct.stock),
          }
          : product
      )
    );
    setIsEditProductModalOpen(false);
    setEditingProduct(null);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getProductStats = () => {
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (sum, product) => sum + product.price * product.stock,
      0
    );
    const lowStockProducts = products.filter(
      (product) => product.stock < 10
    ).length;
    return { totalProducts, totalValue, lowStockProducts };
  };

  const stats = getProductStats();


  const handleCancel = () => {
    // Reset all fields to initial values
    setNewProperty({
      name: "",
      description: "",
      location: "",
      price: "",
      area: "",
      image: null,
    });
    setImagePreview(null); // Clear image preview
    setIsAddProductModalOpen(false); // Close modal
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-10">
          Property Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            className="rounded-lg shadow bg-green-100 p-9 flex items-center"
            style={{ boxShadow: "rgb(38, 57, 77) 0px 17px 20px -10px" }}
          >
            <Package className="text-green-500 mr-4" size={32} />
            <div>
              <p className="text-2xl font-semibold">{stats.totalProducts}</p>
              <p className="text-gray-600">Total Properties</p>
            </div>
          </div>
          <div
            className="rounded-lg shadow bg-yellow-100 p-9 flex items-center"
            style={{ boxShadow: "rgb(38, 57, 77) 0px 17px 20px -10px" }}
          >
            <DollarSign className="text-yellow-500 mr-4" size={32} />
            <div>
              <p className="text-2xl font-semibold">
                ${stats.totalValue.toFixed(2)}
              </p>
              <p className="text-gray-600">Total Value</p>
            </div>
          </div>
          <div
            className="rounded-lg shadow bg-red-100 p-9 flex items-center"
            style={{ boxShadow: "rgb(38, 57, 77) 0px 17px 20px -10px" }}
          >
            <ShoppingCart className="text-red-500 mr-4" size={32} />
            <div>
              <p className="text-2xl font-semibold">{stats.lowStockProducts}</p>
              <p className="text-gray-600">Low Stock Products</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="mb-6 flex justify-between items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search property..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-300"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              <PlusCircle size={20} className="mr-2" />
              Add Course
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Image", "Name", "ID", "Owner ID", "Price", "Area", "Location", "Last Updated", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort(header.toLowerCase())}
                    >
                      {header}
                      {sortConfig.key === header.toLowerCase() && (
                        <span>{sortConfig.direction === "ascending" ? " ↑" : " ↓"}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    {/* Property Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.image ? (
                        <img src={property.image} alt="Property" className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    {/* Course Name */}
                    <td className="px-6 py-4 whitespace-nowrap">{property.name}</td>
                    {/* Truncated ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.id.slice(0, 6) + "..."}
                    </td>
                    {/* Truncated Owner ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.ownerId.slice(0, 6) + "..."}
                    </td>
                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap">${Number(property.price).toFixed(2)}</td>
                    {/* Area */}
                    <td className="px-6 py-4 whitespace-nowrap">{property.area}</td>
                    {/* Location */}
                    <td className="px-6 py-4 whitespace-nowrap">{property.location}</td>
                    {/* Last Updated */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(Number(property.createdAt) / 1e6).toLocaleDateString()}
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * productsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * productsPerPage,
                    sortedProducts.length
                  )}
                </span>{" "}
                of <span className="font-medium">{sortedProducts.length}</span>{" "}
                results
              </p>
            </div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === number + 1
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {isAddProductModalOpen && (
        // <div
        //   className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        //   id="add-product-modal"
        // >
        //   <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        //     <div className="mt-3 text-center">
        //       <h3 className="text-lg leading-6 font-medium text-gray-900">
        //         Add New Product
        //       </h3>
        //       <div className="mt-2 px-7 py-3">
        //         <input
        //           type="text"
        //           className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
        //           placeholder="Name"
        //           value={newProduct.name}
        //           onChange={(e) =>
        //             setNewProduct({ ...newProduct, name: e.target.value })
        //           }
        //         />
        //         <input
        //           type="text"
        //           className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
        //           placeholder="Category"
        //           value={newProduct.category}
        //           onChange={(e) =>
        //             setNewProduct({ ...newProduct, category: e.target.value })
        //           }
        //         />
        //         <input
        //           type="number"
        //           className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
        //           placeholder="Price"
        //           value={newProduct.price}
        //           onChange={(e) =>
        //             setNewProduct({ ...newProduct, price: e.target.value })
        //           }
        //         />
        //         <input
        //           type="number"
        //           className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
        //           placeholder="Stock"
        //           value={newProduct.stock}
        //           onChange={(e) =>
        //             setNewProduct({ ...newProduct, stock: e.target.value })
        //           }
        //         />
        //       </div>
        //       <div className="items-center px-4 py-3">
        //         <button
        //           id="ok-btn"
        //           className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        //           onClick={handleAddProduct}
        //         >
        //           Add Product
        //         </button>
        //       </div>
        //       <div className="items-center px-4 py-3">
        //         <button
        //           id="cancel-btn"
        //           className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        //           onClick={() => setIsAddProductModalOpen(false)}
        //         >
        //           Cancel
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="add-property-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            {/* Close Icon */}
            <button
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Property</h3>
              <div className="mt-2 px-7 py-3">
                {/* Input fields */}
                <input
                  type="text"
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Course Name"
                  value={newProperty.name}
                  onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                />
                <textarea
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Description"
                  value={newProperty.description}
                  onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                />
                <input
                  type="text"
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Location"
                  value={newProperty.location}
                  onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                />
                <div className="mb-3 relative">
                  <input
                    type="number"
                    className="px-3 py-2 border border-gray-300 rounded-md w-full pr-10"
                    placeholder="Price"
                    value={newProperty.price}
                    onChange={(e) => setNewProperty({ ...newProperty, price: Number(e.target.value) })}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 font-semibold">ICP</span>
                </div>

                <input
                  type="text"
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Area (e.g., sq ft)"
                  value={newProperty.area}
                  onChange={(e) => setNewProperty({ ...newProperty, area: e.target.value })}
                />

                {/* Image Upload Section */}
                <label className="flex items-center justify-center mb-3 w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer overflow-hidden">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Property Preview" className="w-full h-full object-cover rounded-md max-h-48" />
                  ) : (
                    <span className="text-gray-400">Click to upload an image</span>
                  )}
                </label>
              </div>

              {/* Loading Spinner */}
              {AddProductLoading && (
                <div className="flex justify-center my-3">
                  <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                </div>
              )}

              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleAddPropertyClick}
                  disabled={AddProductLoading}
                >
                  {AddProductLoading ? "Adding..." : "Add Course"}
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditProductModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="edit-product-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Product
              </h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Category"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Price"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="mb-3 px-3 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Stock"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: e.target.value,
                    })
                  }
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="save-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleSaveEditedProduct}
                >
                  Save Changes
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-edit-btn"
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
