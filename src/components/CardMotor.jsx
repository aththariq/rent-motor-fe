import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CardMotor = ({ name, type, image, fuel, transmission, capacity, price, available }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState({
    phone: "",
    uploadedImage: null,
    startDate: null,
    endDate: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomer({ ...customer, uploadedImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setCustomer({ ...customer, startDate: start, endDate: end });
  };

  const handleSewaClick = () => setIsOpen(true);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        toast.error("Token tidak ditemukan. Silakan login kembali.");
        return;
      }
  
      const formData = new FormData();
      formData.append("phone", customer.phone);
      formData.append("startDate", customer.startDate);
      formData.append("endDate", customer.endDate);
      formData.append("ktpImage", customer.uploadedImage);
  
      const response = await axios.post("https://api-motoran.faizath.com/", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Use retrieved token here
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Response:", response.data);
      toast.success("Konfirmasi berhasil! Data disimpan.");
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat mengirim data."
      );
    } finally {
      setLoading(false);
    }
  };
  
  const onClose = () => {
    setIsOpen(false);
    setImagePreview(null);
  };

  return (
    <div
      className={`relative max-w-72 bg-white rounded-lg shadow-lg p-4 ${
        available === 0 ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Gray Overlay when unavailable */}
      {available === 0 && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-lg"></div>
      )}

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-500 text-sm">{type}</p>
        </div>

        <img src={image} alt="Car" className="w-full rounded-lg mb-4" />

        <div className="flex justify-around text-gray-500 text-sm mb-4">
          <div>{fuel}</div>
          <div>{transmission}</div>
          <div>{capacity} orang</div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-black font-bold text-lg">
            Rp{price}
            <span className="text-sm text-gray-500">/hari</span>
          </p>
          <button
            onClick={handleSewaClick}
            disabled={available === 0}
            className={`px-4 py-2 rounded-lg text-white ${
              available === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {available === 0 ? "Tidak Tersedia" : "Sewa"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Detail Penyewaan</h2>

            {/* Phone Number */}
            <label className="block text-sm font-medium mb-1 text-gray-600">
              No Telepon/Whatsapp
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Contoh: 08123456789"
              className="border w-full p-2 rounded mb-4"
              value={customer.phone}
              onChange={handleInputChange}
            />

            {/* Date Range Picker */}
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Pilih Tanggal Sewa
            </label>
            <DatePicker
              selected={customer.startDate}
              onChange={handleDateChange}
              startDate={customer.startDate}
              endDate={customer.endDate}
              selectsRange
              inline
              className="w-full"
            />

            {/* Upload Image */}
            <label className="block text-sm font-medium mb-1 text-gray-600 mt-4">
              Upload KTP
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-gray-500 border rounded-lg cursor-pointer p-2 mb-4"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Preview KTP:</p>
                <img
                  src={imagePreview}
                  alt="KTP Preview"
                  className="w-full h-40 object-cover rounded border"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Mengirim..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMotor;
