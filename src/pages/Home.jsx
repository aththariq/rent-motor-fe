import React, { useState } from "react";
import CardMotor from "../components/CardMotor";
import SearchBar from "../components/SearchBar";

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
    },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredMotor = motorData.filter(motor =>
    motor.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {filteredMotor.map((motor, index) => (
        <CardMotor key={index} {...motor} />
      ))}
    </div>
  );
};

export default Home;
