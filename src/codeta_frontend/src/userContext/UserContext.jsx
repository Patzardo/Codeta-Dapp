import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const stringifyWithBigInt = (data) => {
    return JSON.stringify(data, (_, value) => 
      typeof value === "bigint" ? value.toString() : value
    );
  };

  const storeData = (key, data) => {
    const stringifiedData = stringifyWithBigInt(data); // Use the BigInt-friendly function

    try {
      localStorage.setItem(key, stringifiedData);
      console.log("Data :",stringifiedData);
    } catch (e) {
      try {
        sessionStorage.setItem(key, stringifiedData);
        console.log("Data 1",stringifiedData);
      } catch (e) {
        Cookies.set(key, stringifiedData, { expires: 7 }); // Fallback to cookies
        console.log("Data 2",stringifiedData);
      }
    }
  };

  // Utility function to retrieve data and parse BigInts as strings if present
  const parseWithBigInt = (data) => {
    return JSON.parse(data, (_, value) => 
      typeof value === "string" && /^[0-9]+n$/.test(value) ? BigInt(value.slice(0, -1)) : value
    );
  };

  const retrieveData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? parseWithBigInt(data) : null;
    } catch (e) {
      try {
        const data = sessionStorage.getItem(key);
        return data ? parseWithBigInt(data) : null;
      } catch (e) {
        const data = Cookies.get(key);
        return data ? parseWithBigInt(data) : null;
      }
    }
  };

  // Load user and admin data on component mount
  useEffect(() => {
    const storedAdmin = retrieveData("admin");
    if (storedAdmin) setAdmin(storedAdmin);
  }, []);

  // Save user and admin data whenever they change
  useEffect(() => {

    if (admin) {
      storeData("admin", admin);
    } else {
      localStorage.removeItem("admin");
      sessionStorage.removeItem("admin");
      Cookies.remove("admin");
    }
  }, [ admin]);



  return (
    <UserContext.Provider value={{ admin, setAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
