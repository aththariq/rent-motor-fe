import { useState } from "react";
import CardMotor from "../components/CardMotor";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import NavbarLogin from "@/components/NavbarLogin";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const motorData = [
    {
      name: "MG ZX Exclusive",
      type: "Hatchback",
      image:
        "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fuel: "70L",
      transmission: "Manual",
      capacity: "4",
      price: 100000,
      available : 1,
    },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredMotor = motorData.filter((motor) =>
    motor.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavbarLogin />

      {/* Konten Utama */}
      <main className="flex-grow">
        <div className="container px-6 pt-10 pb-3 mx-auto text-center">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-semibold text-secondary lg:text-4xl">
              Pilih Motor yang Kamu Butuhkan
            </h1>
            <p className="mt-3 text-gray-400 max-w-sm mx-auto">
              Jelajahi pilihan motor terbaik, praktis, cepat, dan tersedia kapan
              saja untuk kebutuhanmu.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center my-2">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Card Motor */}
        <div className="flex flex-wrap justify-center gap-6 my-10">
          {filteredMotor.map((motor, index) => (
            <CardMotor key={index} {...motor} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
