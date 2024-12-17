import React from "react";
import { BsFillFuelPumpFill, BsPeopleFill } from "react-icons/bs";
import { RiSteering2Fill } from "react-icons/ri";

const CardMotor = ({
  name,
  type,
  image,
  fuel,
  transmission,
  capacity,
  price,
}) => {
  return (
    <div className="max-w-72 bg-white rounded-lg shadow-lg p-4">
      {/* Bagian Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-500 text-sm">{type}</p>
        </div>
      </div>

      {/* Gambar */}
      <img src={image} alt="Car" className="w-full mt-2 mb-4 rounded-lg" />

      {/* Spesifikasi */}
      <div className="flex justify-around text-gray-500 text-sm mb-4">
        <div className="flex items-center gap-1">
          <BsFillFuelPumpFill size={15} />
          <span>{fuel}</span>
        </div>
        <div className="flex items-center gap-1">
          <RiSteering2Fill size={15} />
          <span>{transmission}</span>
        </div>
        <div className="flex items-center gap-1">
          <BsPeopleFill size={15} />
          <span>{capacity}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-black font-bold text-lg">
            Rp{price}
            <span className="text-sm text-gray-500">/hari</span>
          </p>
        </div>
        <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-20 h-10">
          Sewa
        </button>
      </div>
    </div>
  );
};

export default CardMotor;
