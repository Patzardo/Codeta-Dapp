// import { useState, useEffect } from "react";
// import { PencilIcon } from "@heroicons/react/24/outline";
// import Footer from "../../Layout/Application/Footer";
// import Header from "../../Layout/Application/Header";
// import Sidebar from "../../Layout/Application/Sidebar";
// import { useConnect, ConnectButton } from "@connect2ic/react";
// import ic from "ic0";

// const Ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

// const Loader = () => (
//   <div className="flex justify-center items-center h-full">
//     <div className="loader"></div>
//   </div>
// );

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileExists, setProfileExists] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const { principal, isConnected } = useConnect({
//     onConnect: () => {
//       // Handle post-connect actions here
//     },
//     onDisconnect: () => {
//       // Handle post-disconnect actions here
//     },
//   });

//   const userProfile = {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     bio: "Blockchain enthusiast and developer. Passionate about building decentralized applications.",
//     principalId: "abcd1234-efgh-5678-ijkl-91011mnopq",
//   };

//   useEffect(() => {
//     async function fetchUserProfile() {
//       if (isConnected) {
//         try {
//           const profile = await Ledger.call("getUserProfileById", principal);
//           console.log("profile : ", profile);
//           if (profile.length == 0) {
//             await Ledger.call("loginUser", principal);
//             const newProfile = await Ledger.call(
//               "getUserProfileById",
//               principal
//             );
//             setUserProfile(newProfile);
//           } else {
//             setUserProfile(profile);
//           }
//         } catch (error) {
//           console.error("Error fetching user profile:", error);
//         }
//       } else {
//         console.log("Not Connected", isConnected, principal);
//       }
//     }
//     // console.log("Not Connected",isConnected,principal)

//     fetchUserProfile();
//   }, [isConnected]);

//   const registerUser = async () => {
//     setIsRegistering(true);
//     setLoading(true); // Start loading while registering
//     try {
//       const response = await Ledger.call("registerUser", principal);
//       console.log("User registered:", response);
//       setProfileExists(true); // Update profile existence on successful registration
//     } catch (error) {
//       console.error("Error registering user:", error);
//     } finally {
//       setIsRegistering(false);
//       setLoading(false); // Stop loading after registration
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 relative">
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         closeSidebar={() => setIsSidebarOpen(false)}
//       />
//       <div className="flex-1 flex flex-col">
//         <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
//         <div className="bg-gray-50">
//           <main className="isolate py-24 sm:py-32">
//             <div className="mx-auto max-w-4xl px-6 lg:px-8">
//               <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
//                 User Profile
//               </h1>
//               <div className="mt-10 bg-white shadow-md rounded-[2em] border border-gray-200 p-8 transition-all duration-300 relative">
//                 {/* Overlay Loader */}
//                 {loading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
//                     <Loader />
//                   </div>
//                 )}
//                 {!principal ? (
//                   <div className="text-center flex flex-col items-center">
//                     <p className="text-lg text-gray-700 mb-4">
//                       Please connect to view your profile.
//                     </p>
//                     <ConnectButton className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-500 transition duration-200" />
//                   </div>
//                 ) : profileExists ? (
//                   <>
//                     <div className="flex justify-between items-center mb-4">
//                       <h2 className="text-2xl font-semibold text-gray-900">
//                         Profile Information
//                       </h2>
//                       <button
//                         className="text-gray-500 hover:text-indigo-600"
//                         onClick={() => setIsEditing(!isEditing)}
//                       >
//                         <PencilIcon className="h-5 w-5" />
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="text-lg font-semibold text-gray-700">
//                         <span>Name: </span>
//                         <span>{userProfile.name}</span>
//                       </div>
//                       <div className="text-lg font-semibold text-gray-700">
//                         <span>Email: </span>
//                         <span>{userProfile.email}</span>
//                       </div>
//                       <div className="text-lg font-semibold text-gray-700">
//                         <span>Principal ID: </span>
//                         <span>{principal}</span>
//                       </div>
//                       <p className="mt-4 text-gray-600">{userProfile.bio}</p>
//                       <p className="mt-4 text-green-600 font-semibold">
//                         Profile Registered
//                       </p>
//                     </div>
//                     {isEditing && (
//                       <div className="mt-6 border-t border-gray-300 pt-4">
//                         <input
//                           type="text"
//                           className="border rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           placeholder="Edit your name"
//                         />
//                         <input
//                           type="email"
//                           className="border rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           placeholder="Edit your email"
//                         />
//                         <textarea
//                           className="border rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           rows="3"
//                           placeholder="Edit your bio"
//                         />
//                         <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition duration-200">
//                           Save Changes
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className="text-center flex flex-col items-center">
//                     <p className="text-lg text-gray-700 mb-4">
//                       No profile found.
//                     </p>
//                     <button
//                       onClick={registerUser}
//                       className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-500 transition duration-200 flex items-center justify-center"
//                     >
//                       {isRegistering ? <Loader /> : "Register Profile"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </main>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
// import Footer from "../../Layout/Application/Footer";
import Footer from "../../Layout/LandingPage/Footer";
import { Principal } from "@dfinity/principal";
import Header from "../../Layout/Application/Header";
import Sidebar from "../../Layout/Application/Sidebar";
import { useConnect, ConnectButton } from "@connect2ic/react";
import ic from "ic0";
const ledger1 = ic("ryjl3-tyaaa-aaaaa-aaaba-cai");
const Ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="loader"></div>
  </div>
);

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [balanceICP, setBalanceICP] = useState(0);
  const { principal, isConnected } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  useEffect(() => {
    async function fetchUserProfile() {
      if (isConnected) {
        try {
          const profile = await Ledger.call("getUserProfileById", principal);
          console.log("Profile:", profile);
          if (profile.length == 0) {
            let store = await Ledger.call("loginUser", principal);
            console.log("store", store);
            const newProfile = await Ledger.call(
              "getUserProfileById",
              principal
            );
            setUserProfile(newProfile);
          } else {
            setUserProfile(profile);
            setProfileExists(true);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUserProfile();

    async function getData() {
      let store3 = 0;
      if (isConnected) {
        store3 = await ledger1.call("icrc1_balance_of", {
          owner: Principal.fromText(principal),
          subaccount: [],
        });
        console.log(store3);
      }
      console.log(store3);

      setBalanceICP(Number(store3) / Number(BigInt(100000000)));
    }
    getData();
  }, [isConnected, principal]);

  const registerUser = async () => {
    setIsRegistering(true);
    setLoading(true);
    try {
      const response = await Ledger.call("registerUser", principal);
      console.log("User registered:", response);
      setProfileExists(true);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsRegistering(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="bg-gray-50">
          <main className="isolate py-24 sm:py-32">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                User Profile
              </h1>
              <div className="mt-10 bg-white shadow-md rounded-[2em] border border-gray-200 p-8 transition-all duration-300 relative">
                {/* Overlay Loader */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <Loader />
                  </div>
                )}
                {!principal ? (
                  <div className="text-center flex flex-col items-center">
                    <p className="text-lg text-gray-700 mb-4">
                      Please connect to view your profile.
                    </p>
                    <ConnectButton className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-500 transition duration-200" />
                  </div>
                ) : profileExists ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Profile Information
                      </h2>
                      <button
                        className="text-gray-500 hover:text-indigo-600"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {isConnected && (
                        <div className="text-lg font-semibold text-gray-700">
                          <span>Your Balance: </span>
                          <span>{balanceICP} ICP</span>
                        </div>
                      )}
                      <div className="text-lg font-semibold text-gray-700">
                        <span>Name: </span>
                        <span>{userProfile?.name || "N/A"}</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-700">
                        <span>Email: </span>
                        <span>{userProfile?.email || "N/A"}</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-700">
                        <span>Principal ID: </span>
                        <span>{principal}</span>
                      </div>
                      <p className="mt-4 text-gray-600">
                        {userProfile?.bio || "No bio available."}
                      </p>
                      <p className="mt-4 text-green-600 font-semibold">
                        Profile Registered
                      </p>
                    </div>

                    {/* Display Contacts */}
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Contacts
                      </h3>
                      {userProfile?.contacts &&
                      userProfile.contacts.length > 0 ? (
                        <ul className="list-disc list-inside mt-3 text-gray-700">
                          {userProfile.contacts.map((contact, index) => (
                            <li key={index}>{contact}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">No contacts available.</p>
                      )}
                    </div>

                    {/* Display Properties */}
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Properties
                      </h3>
                      {userProfile?.properties &&
                      userProfile.properties.length > 0 ? (
                        <ul className="list-disc list-inside mt-3 text-gray-700">
                          {userProfile.properties.map((property, index) => (
                            <li key={index}>{property}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">
                          No properties available.
                        </p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="mt-6 border-t border-gray-300 pt-4">
                        <input
                          type="text"
                          className="border rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Edit your name"
                        />
                        <input
                          type="email"
                          className="border rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Edit your email"
                        />
                        <textarea
                          className="border rounded-md w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows="3"
                          placeholder="Edit your bio"
                        />
                        <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition duration-200">
                          Save Changes
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center flex flex-col items-center">
                    <p className="text-lg text-gray-700 mb-4">
                      No profile found.
                    </p>
                    <button
                      onClick={registerUser}
                      className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-500 transition duration-200 flex items-center justify-center"
                    >
                      {isRegistering ? <Loader /> : "Register Profile"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
