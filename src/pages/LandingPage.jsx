import HeroSection from "../components/HeroSection";
import Statistic from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import WhatWeOffer from "../components/WhatWeOffer";
import FaQ from "../components/FaQ";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Statistic />
      <WhatWeOffer />
      <Testimonials />
      <FaQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
