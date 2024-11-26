import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from "./userContext/UserContext";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { createClient } from "@connect2ic/core";
import { Connect2ICProvider } from "@connect2ic/react";
import "@connect2ic/core/style.css";


const client = createClient({
  providers: [new InternetIdentity()],
  // canisters: {
  //   myCanister
  // }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Connect2ICProvider client={client}>
        <App />
      </Connect2ICProvider>
    </UserProvider>
  </React.StrictMode>,
);
