import { useState } from 'react';
import Header from '../../Layout/LandingPage/Header';
import Footer from '../../Layout/LandingPage/Footer';
import MainPage from '../../Component/LandingPage/MainPage';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MainPage />
      <Footer />
    </div>
  );
}
