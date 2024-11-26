import { useState } from "react";
import { codeta_backend } from "declarations/codeta_backend";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import AdminDashboard from "./Admin/layout/AdminDashboard";
import ProfilePage from "./Pages/MarketMain/ProfilePage";
import ProductDetail from "./Pages/MarketMain/ProductDetail";
import SellerPage from "./Pages/MarketMain/SellerPage";
import Market from "./Pages/MarketMain/Market";
import AboutUs from "./Pages/About/Aboutus";
import AdminLogin from "./Admin/Login/AdminLogin";
import QuantumEncryptionDemo from "./MainEncrpty";
// import FleekUpload from './uploadIpfs';
function App() {
  // const [greeting, setGreeting] = useState('');

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   codeta_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <main>
      {/* <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form> */}
      {/* <FleekUpload/>
      <section id="greeting">{greeting}</section> */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Admin routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/property/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/market" element={<Market />} />
            <Route path="/seller" element={<SellerPage />} />
            {/* <Route path="/aboutus" element={<AboutUs />} /> */}
            <Route path="/encrption" element={<QuantumEncryptionDemo />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}

export default App;
