import React, { useEffect, useState } from 'react';

const LoaderOverlay = () => (
  <div className="py-12 text-center text-gray-500">
    <div className="loader border-t-4 border-indigo-600 rounded-full w-8 h-8 animate-spin mx-auto mb-4"></div>
    <p>Loading items...</p>
  </div>
);

const ItemTable = ({ items, onEdit, onDelete, loading }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Set dataFetched to true only after loading completes
      setDataFetched(true);
    }
  }, [loading]);

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800">Your Listed Items</h2>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <LoaderOverlay />
        ) : items.length === 0 && dataFetched ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download Link</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.coverPhoto && (
                      <img src={item.coverPhoto} alt={item.title} className="h-10 w-10 rounded-full object-cover" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.description.substring(0, 50)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href={item.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                    >
                      Download
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 transition duration-150 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ItemTable;
