import React, { useState, useEffect } from "react";
import ic from "ic0"; // Ensure ic0 is correctly imported and used
import swal from "sweetalert"; // Import SweetAlert

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister
export default function ContactPage() {
  const [activeRecords, setActiveRecords] = useState([]); // Active contacts
  const [closedRecords, setClosedRecords] = useState([]); // Closed contatycts
  const [loading, setLoading] = useState(false); // Loader state
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [closedState, setClosedState] = useState({});
  const [expandedRows, setExpandedRows] = useState({}); // State to manage expanded rows
  const [searchTerm, setSearchTerm] = useState(""); // **Search term state added**

  useEffect(() => {
    fetchActiveContacts();
    fetchClosedContacts();
  }, [refetchTrigger]);

  const fetchActiveContacts = async () => {
    setLoading(true);
    try {
      const response = await ledger.call("getActiveContacts");
      // console.log("Active contacts response", response);
      setActiveRecords(response);
    } catch (error) {
      // console.log("Error fetching active contacts:", error);
    }
    setLoading(false);
  };

  const fetchClosedContacts = async () => {
    setLoading(true);
    try {
      const response = await ledger.call("getClosedContacts");
      // console.log("Closed contacts response", response);
      setClosedRecords(response);
    } catch (error) {
      // console.log("Error fetching closed contacts:", error);
    }
    setLoading(false);
  };

  const closeRequest = async (id) => {
    setClosedState((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      const response = await ledger.call("closeContactRequest", id);
      // console.log("Closed Request", response);

      // Use Swal.fire() instead of Swal()
      swal({
        title: "Closed Request Successfully",
        icon: "success",
    });

      setRefetchTrigger(!refetchTrigger); // Trigger refetch to update the list
    } catch (error) {
      // console.log("Error closing request:", error);

      // Use Swal.fire() for error alerts as well
      swal({
        title: "Error closing request",
        text: error.message || "An error occurred",
        icon: "error",
    });
    }
    setClosedState((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };


  const capitalizeStatus = (status) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const badgeStyles = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredActiveData = activeRecords.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClosedData = closedRecords.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Loader = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="relative overflow-x-auto p-4">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <h3 className="text-3xl font-bold text-blue-600">Contact Requests</h3>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {loading && <Loader />}

      {!loading && (
        <>
          <h4 className="text-2xl font-bold mt-6 text-blue-500">Active Contacts</h4>
          <table className="min-w-full text-sm text-left text-gray-500 mt-2 shadow-md rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-blue-200">
              <tr>
                <th className="px-6 py-3">Id</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActiveData.length > 0 ? (
                filteredActiveData.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <th className="px-6 py-4 font-medium text-gray-900">{item.id}</th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${badgeStyles(item.status)}`}>
                          {capitalizeStatus(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button onClick={() => toggleRowExpansion(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Details</button>
                        <button onClick={() => closeRequest(item.id)} className={`bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 ${closedState[item.id] ? "opacity-50 cursor-not-allowed" : ""}`} disabled={closedState[item.id]}>
                          {closedState[item.id] ? "Closing ..." : "Close"}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[item.id] && (
                      <tr className="bg-gray-100">
                        <td colSpan="6" className="px-6 py-4">
                          <strong>Description:</strong> {item.description}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No active contact requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {!loading && (
        <>
          <h4 className="text-2xl font-bold mt-6 text-blue-500">Closed Contacts</h4>
          <table className="min-w-full text-sm text-left text-gray-500 mt-2 shadow-md rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-blue-200">
              <tr>
                <th className="px-6 py-3">Id</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClosedData.length > 0 ? (
                filteredClosedData.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <th className="px-6 py-4 font-medium text-gray-900">{item.id}</th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${badgeStyles(item.status)}`}>
                          {capitalizeStatus(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button onClick={() => toggleRowExpansion(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Details</button>
                      </td>
                    </tr>
                    {expandedRows[item.id] && (
                      <tr className="bg-gray-100">
                        <td colSpan="6" className="px-6 py-4">
                          <strong>Description:</strong> {item.description}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No closed contact requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
