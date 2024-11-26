// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Footer from "../../Layout/LandingPage/Footer";
// import Header from "../../Layout/Application/Header";
// import Sidebar from "../../Layout/Application/Sidebar";
// import ic from "ic0";
// import { useConnect } from "@connect2ic/react";
// import swal from "sweetalert";
// import { Principal } from "@dfinity/principal";
// import { Copy } from "lucide-react";
// import { AuthClient } from "@dfinity/auth-client";
// import { createActor } from "../../../../declarations/Token";
// import Loader from '../../Component/Common/Loader';

// const Ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [buying, setBuying] = useState(false);
//   const [propertyHistory, setPropertyHistory] = useState([]);
//   const [copiedId, setCopiedId] = useState(null);
//   const [identity, setIdentity] = useState(null);
//   const [authClient, setAuthClient] = useState(null);

//   const init = async () => {
//     const client = await AuthClient.create();
//     setAuthClient(client);
//     if (await client.isAuthenticated()) {
//       handleAuthenticated(client);
//     }
//   };

//   const handleAuthenticated = async (client) => {
//     const identity = await client.getIdentity();
//     setIdentity(identity);
//   };

//   const { principal, isConnected } = useConnect({
//     onConnect: () => {},
//     onDisconnect: () => {},
//   });

//   useEffect(() => {
//     async function fetchProperty() {
//       try {
//         const response = await Ledger.call("getPropertyById", id);
//         if (response) {
//           setProperty(response[0]);
//         } else {
//           console.error("Property not found");
//         }
//       } catch (error) {
//         console.error("Failed to fetch property:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProperty();
//     init();

//     const fetchPropertyHistory = async () => {
//       const response = await Ledger.call("getPropertyHistory", id);
//       if (response) {
//         setPropertyHistory(response);
//       } else {
//         console.error("Property history not found");
//       }
//     };

//     fetchPropertyHistory();
//   }, [id]);

//   const handleBuy = async () => {
//     if (!principal) {
//       swal("Info", "Connect your Wallet", "info");
//       return;
//     }
//     const authenticatedCanister = createActor("ryjl3-tyaaa-aaaaa-aaaba-cai", {
//       agentOptions: {
//         identity,
//       },
//     });

//     let result = await authenticatedCanister.icrc1_transfer({
//       to: {
//         owner: Principal.fromText(
//           "xsvih-nzaqn-q3edk-ijqkq-3qymg-qxf4z-pqou7-g5t2r-36ukb-ioiqc-7qe"
//         ),
//         subaccount: [],
//       },
//       fee: [10000n],
//       memo: [],
//       from_subaccount: [],
//       created_at_time: [],
//       amount: BigInt(100000), // Correcting to BigInt for precision
//     });
//     console.log("Transfer result:", result);

//     setBuying(true);
//     try {
//       if (result.Ok) {
//         const response = await Ledger.call("buyProperty", id, principal);
//         if (response) {
//           swal("Success", "Property Bought Successfully!", "success");
//         } else {
//           swal("Error", "Please try again later", "error");
//         }
//       } else {
//         swal("Error", "Transaction failed", "error");
//       }
//     } catch (e) {
//       console.error("Error buying Property:", e);
//       swal("Error", "An error occurred while buying the property", "error");
//     } finally {
//       setBuying(false);
//     }
//   };

//   const handleCopy = (propertyId) => {
//     navigator.clipboard.writeText(propertyId);
//     setCopiedId(propertyId);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(Number(timestamp / BigInt(1e6))); // Convert to milliseconds
//     return date.toLocaleString();
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (!property) {
//     return <div className="text-center text-red-500">Property not found</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         closeSidebar={() => setIsSidebarOpen(false)}
//       />
//       <div className="flex-1 flex flex-col">
//         <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//         <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden p-8 m-8 md:m-12 lg:mx-24">
//           <div className="md:w-1/2">
//             <img
//               src={property.image || "/images/placeholder.png"}
//               alt={property.name}
//               className="w-full h-96 object-cover rounded-lg shadow-lg"
//             />
//           </div>
//           <div className="md:w-1/2 md:pl-8 p-6 flex flex-col justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                 {property.name}
//               </h1>
//               <p className="text-2xl font-semibold text-indigo-600 mb-4">
//                 {Number(property.price).toFixed(2)} ICP
//               </p>
//               <p className="text-gray-700 text-lg mb-6">
//                 {property.description}
//               </p>
//               <div className="flex items-center mb-6">
//                 <span className="text-gray-600 text-base font-medium">
//                   Location:
//                 </span>
//                 <span className="text-gray-800 text-lg ml-2">
//                   {property.location}
//                 </span>
//               </div>
//               {property.features && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     Features
//                   </h3>
//                   <ul className="list-disc list-inside space-y-2 text-gray-700">
//                     {property.features.map((feature, index) => (
//                       <li key={index} className="flex items-start">
//                         <svg
//                           className="w-4 h-4 text-blue-600 mr-2"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M10 2a1 1 0 01.707 1.707L6.414 8l3.293 3.293A1 1 0 0110 13a1 1 0 01-.707-1.707L7.414 10 10 7.414A1 1 0 0110 2z" />
//                         </svg>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//             <button
//               onClick={handleBuy}
//               className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center text-lg font-semibold"
//               disabled={buying}
//             >
//               {buying ? (
//                 <svg
//                   className="animate-spin h-5 w-5 mr-3 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                   ></path>
//                 </svg>
//               ) : (
//                 "Buy Now"
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Property History Table */}
//         <div className="mx-8 md:mx-12 lg:mx-24 mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
//           <h2 className="text-2xl font-semibold text-gray-900 px-6 py-4 border-b border-gray-200">
//             Property History
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     Event
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     Details
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     Property ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     Timestamp
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {propertyHistory.length > 0 ? (
//                   propertyHistory.map((history, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {history.event}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {history.details}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center">
//                         {`${history.propertyId.slice(
//                           0,
//                           5
//                         )}...${history.propertyId.slice(-5)}`}
//                         <button
//                           onClick={() => handleCopy(history.propertyId)}
//                           className="ml-2 text-blue-500 hover:text-blue-700 transition-all"
//                         >
//                           {copiedId === history.propertyId ? (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5 text-green-500"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           ) : (
//                             <Copy />
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {formatTimestamp(history.timestamp)}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center py-4 text-gray-500">
//                       No history available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../Layout/LandingPage/Footer";
import Header from "../../Layout/Application/Header";
import Sidebar from "../../Layout/Application/Sidebar";
import ic from "ic0";
import { useConnect } from "@connect2ic/react";
import swal from "sweetalert";
import { Principal } from "@dfinity/principal";
import { ConstructionIcon, Copy } from "lucide-react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../declarations/Token";
import Loader from '../../Component/Common/Loader';
const Ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

const ProductDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [propertyHistory, setPropertyHistory] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  const init = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
    if (await client.isAuthenticated()) {
      handleAuthenticated(client);
    }
  };

  const handleAuthenticated = async (client) => {
    const identity = await client.getIdentity();
    setIdentity(identity);
  };

  const { principal, isConnected } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await Ledger.call("getPropertyById", id);
        if (response) {
          console.log(response);
          setProperty(response[0]);
        } else {
          console.error("Property not found");
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
    init();

    const fetchPropertyHistory = async () => {
      const response = await Ledger.call("getPropertyHistory", id);
      if (response) {
        setPropertyHistory(response);
      } else {
        console.error("Property history not found");
      }
    };

    fetchPropertyHistory();
  }, [id]);

  const handleBuy = async () => {
    setBuying(true);
    if (!principal) {
      swal("Info", "Connect your Wallet", "info");
      return;
    }
    const authenticatedCanister = createActor("ryjl3-tyaaa-aaaaa-aaaba-cai", {
      agentOptions: {
        identity,
      },
    });
    let transferAmount = BigInt(Number(property.price) * 100000);
    let result = await authenticatedCanister.icrc1_transfer({
      to: {
        owner: Principal.fromText(
          "xsvih-nzaqn-q3edk-ijqkq-3qymg-qxf4z-pqou7-g5t2r-36ukb-ioiqc-7qe"
        ),
        subaccount: [],
      },
      fee: [10000n],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      amount: transferAmount, // Correcting to BigInt for precision
    });
    console.log("Transfer result:", result);

    try {
      if (result.Ok) {
        const response = await Ledger.call("buyProperty", principal, id);
        console.log("property response", response);
        if (response) {
          swal("Success", "Property Bought Successfully!", "success");
        } else {
          swal("Error", "Please try again later", "error");
        }
      } else {
        swal("Error", "Transaction failed", "error");
      }
    } catch (e) {
      console.error("Error buying Property:", e);
      swal("Error", "An error occurred while buying the property", "error");
    } finally {
      setBuying(false);
    }
  };

  const handleCopy = (propertyId) => {
    navigator.clipboard.writeText(propertyId);
    setCopiedId(propertyId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp / BigInt(1e6))); // Convert to milliseconds
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="text-center text-gray-500"><Loader /></div>;
  }

  if (!property) {
    return <div className="text-center text-red-500">Property not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden p-8 m-8 md:m-12 lg:mx-24">
          <div className="md:w-1/2">
            <img
              src={property.image || "/images/placeholder.png"}
              alt={property.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {property.name}
              </h1>
              <p className="text-2xl font-semibold text-indigo-600 mb-4">
                ICP {Number(property.price).toFixed(6)}
              </p>
              <p className="text-gray-700 text-lg mb-6">
                {property.description}
              </p>
              <div className="flex items-center mb-6">
                <span className="text-gray-600 text-base font-medium">
                  Location:
                </span>
                <span className="text-gray-800 text-lg ml-2">
                  {property.location}
                </span>
              </div>
              {property.features && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Features
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 2a1 1 0 01.707 1.707L6.414 8l3.293 3.293A1 1 0 0110 13a1 1 0 01-.707-1.707L7.414 10 10 7.414A1 1 0 0110 2z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={handleBuy}
              className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md flex items-center justify-center text-lg font-semibold"
              disabled={buying || !property.forSale}
            >
              {buying ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Buy Now"
              )}
            </button>
          </div>
        </div>

        {/* Property History Table */}
        <div className="mx-8 md:mx-12 lg:mx-24 mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-900 px-6 py-4 border-b border-gray-200">
            Property History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Property ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {propertyHistory.length > 0 ? (
                  propertyHistory.map((history, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {history.event}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {history.details}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center">
                        {`${history.propertyId.slice(
                          0,
                          5
                        )}...${history.propertyId.slice(-5)}`}
                        <button
                          onClick={() => handleCopy(history.propertyId)}
                          className="ml-2 text-blue-500 hover:text-blue-700 transition-all"
                        >
                          {copiedId === history.propertyId ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <Copy />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatTimestamp(history.timestamp)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
