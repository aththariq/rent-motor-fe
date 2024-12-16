import HeroSection from "../components/HeroSection";
import Statistic from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import WhatWeOffer from "../components/WhatWeOffer";
import FaQ from "../components/FaQ";
import Footer from "../components/Footer";
import Signup from "../components/Signup";
import Login from "../components/Login";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Statistic />
      <WhatWeOffer />
      <Testimonials />
      <FaQ />
      <Footer />
      <Signup />
      <Login />
    </div>
  );
};

export default LandingPage;
