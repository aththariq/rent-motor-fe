import React from "react";

const ProductCard = ({
  topPick,
  imageUrl,
  carName,
  carType,
  seats,
  largeBag,
  smallBag,
  transmission,
  mileage,
  location,
  distance,
  price,
  cancellation,
}) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 mb-5 bg-white">
      {topPick && (
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2 inline-block">
          Top Pick
        </span>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        {/* Car Image */}
        <div className="w-full md:w-1/4 flex justify-center items-center">
          <img
            src={imageUrl}
            alt={carName}
            className="rounded-md object-cover h-auto w-full"
          />
        </div>

        {/* Car Details */}
        <div className="flex-1">
          <h2 className="text-xl font-bold">
            {carName} <span className="font-normal text-sm">{carType}</span>
          </h2>

          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <span>{seats} seats</span>
            {largeBag && <span>🧳 {largeBag} Large bag</span>}
            {smallBag && <span>🎒 {smallBag} Small bag</span>}
          </div>

          <div className="flex items-center gap-4 mt-1 text-gray-600">
            <span>⚙️ {transmission}</span>
            <span>⏳ {mileage}</span>
          </div>

          <div className="text-blue-600 mt-2">
            <span className="font-medium">{location}</span>
            <p className="text-sm text-gray-500">{distance} km from centre</p>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-end justify-center">
          <p className="text-lg text-gray-700">
            Price for 3 days:
            <span className="text-2xl font-bold block">Rp {price}</span>
          </p>
          <p className="text-green-600 text-sm">{cancellation}</p>

          <button className="mt-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            View deal
          </button>

          <div className="flex gap-2 mt-3">
            <button className="text-blue-500 text-sm hover:underline">
              Important info
            </button>
            <button className="text-blue-500 text-sm hover:underline">
              Email quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example Usage
const ProductCardList = () => {
  return (
    <div className="bg-gray-100 p-5">
      <ProductCard
        topPick={true}
        imageUrl="https://example.com/toyota-agya.jpg"
        carName="Toyota Agya"
        carType="or similar small car"
        seats={4}
        largeBag={1}
        transmission="Automatic"
        mileage="Unlimited mileage"
        location="Jakarta - Pasar Rebo"
        distance="12.3"
        price="2,154,240"
        cancellation="Free cancellation"
      />

      <ProductCard
        imageUrl="https://example.com/toyota-avanza.jpg"
        carName="Toyota Avanza"
        carType="or similar people carrier"
        seats={5}
        largeBag={1}
        smallBag={1}
        transmission="Automatic"
        mileage="Unlimited mileage"
        location="Jakarta - Pasar Rebo"
        distance="12.3"
        price="3,015,840"
        cancellation="Free cancellation"
      />
    </div>
  );
};

export default ProductCardList;
