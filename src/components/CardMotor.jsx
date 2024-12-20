import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { BsFillFuelPumpFill, BsPeopleFill } from "react-icons/bs";
import { RiSteering2Fill } from "react-icons/ri";
import { Alert } from "antd"; // Add this import
import { useNavigate } from "react-router-dom";
import { DatePicker, Input, Upload, Space } from "antd"; // Updated imports
import { InboxOutlined } from "@ant-design/icons"; // New import for Upload
import moment from "moment";

const { RangePicker } = DatePicker;

const CardMotor = ({
  _id,
  name,
  type,
  image,
  fuel,
  transmission,
  capacity,
  price,
  available,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState({
    phone: "",
    uploadedImage: null,
    startDate: null,
    endDate: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    description: "",
  }); // Add alert state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleImageUpload = (info) => {
    const { file } = info;
    const uploadedFile = file.originFileObj || file; // Antisipasi kasus tanpa originFileObj
    if (uploadedFile) {
      console.log("Uploaded File:", uploadedFile);
      setCustomer({ ...customer, uploadedImage: uploadedFile });
      setImagePreview(URL.createObjectURL(uploadedFile));
    } else {
      console.error("File upload failed or is not accessible");
    }
  };

  const handleDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      setCustomer({
        ...customer,
        startDate: start.toDate(),
        endDate: end.toDate(),
      });
    }
  };

  const handleSewaClick = () => {
    console.log("Modal opened");
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setAlert({ type: "", message: "", description: "" }); // Reset alert
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token || !email) {
        setAlert({
          type: "error",
          message: "Akun Anda tidak valid",
          description: "Silakan login kembali.",
        });
        navigate("/login"); // Redirect to login
        return;
      }

      const { phone, startDate, endDate, uploadedImage } = customer;

      if (typeof phone !== "string" || phone.trim() === "") {
        throw new Error("Nomor telepon harus diisi dengan benar.");
      }
      if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error("Tanggal sewa harus dipilih dengan benar.");
      }
      if (!uploadedImage || !(uploadedImage instanceof Blob)) {
        throw new Error("Gambar KTP harus diunggah.");
      }

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("startDate", formattedStartDate);
      formData.append("endDate", formattedEndDate);
      formData.append("ktpImage", uploadedImage);
      formData.append("motorId", _id); 

      console.log("Sending data:", Array.from(formData.entries()));

      const response = await axios.post(
        "https://api-motoran.faizath.com/orders",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Full Response Data:", response.data);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      // Validasi respons sukses berdasarkan status HTTP dan pesan respons
      if (
        (response.status === 200 || response.status === 201) &&
        response.data.status === "success"
      ) {
        console.log("API Response:", response.data);
        setAlert({
          type: "success",
          message: "Order berhasil dibuat.",
          description:
            response.data.message || "Pesanan Anda telah berhasil dibuat.",
        });
        setIsOpen(false);

        const order = response.data.data.order; // Get the order object
        const orderId = order._id; 
        const token = localStorage.getItem("token");

        if (orderId && token) {
          navigate(`/payment?orderId=${orderId}&token=${token}`, { 
            state: { order, motor: { _id, name, type, image, fuel, transmission, capacity, price, available } } 
          }); // Pass both order and motor data via state
        } else {
          setAlert({
            type: "error",
            message: "Gagal mendapatkan informasi order.",
            description: "Silakan coba lagi atau hubungi support.",
          });
          console.log("orderid: ", orderId);
          console.log("token: ", token);
        }
      } else {
        setAlert({
          type: "error",
          message: "Gagal Membuat Order",
          description: response.data.message || "Terjadi kesalahan.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        setAlert({
          type: "error",
          message: "Unauthorized: Invalid Authentication.",
          description: "Silakan login kembali.",
        });
        navigate("/login"); // Redirect to login on 401
      } else {
        setAlert({
          type: "error",
          message: "Terjadi Kesalahan",
          description:
            error.response?.data?.message ||
            "Terjadi kesalahan saat membuat order.",
        });
      }
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
      className={`relative w-80 bg-white rounded-lg shadow-lg p-4 ${
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

        <img
          src={image}
          alt="Car"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

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
            <span>{capacity} orang</span>
          </div>
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

      {/* Display Alert */}
      {alert.message && (
        <Alert
          message={alert.message}
          description={alert.description}
          type={alert.type}
          showIcon
          closable
          onClose={() => setAlert({ type: "", message: "", description: "" })}
          style={{ marginBottom: "20px" }}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Detail Penyewaan
            </h2>

            {/* Phone Number */}
            <label className="block text-sm font-medium mb-1 text-gray-600">
              No Telepon/Whatsapp <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              name="phone"
              placeholder="Contoh: 08123456789"
              className="mb-4"
              value={customer.phone}
              onChange={handleInputChange}
            />

            {/* Date Range Picker */}
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Pilih Tanggal Sewa <span className="text-red-500">*</span>
            </label>
            <Space direction="vertical" size={12}>
              <RangePicker
                value={[
                  customer.startDate ? moment(customer.startDate) : null,
                  customer.endDate ? moment(customer.endDate) : null,
                ]}
                onChange={handleDateChange}
              />
            </Space>

            {/* Upload Image */}
            <label className="block text-sm font-medium mb-1 text-gray-600 mt-4">
              Upload KTP <span className="text-red-500">*</span>
            </label>
            <Upload.Dragger
              name="ktpImage"
              multiple={false}
              onChange={handleImageUpload}
              beforeUpload={() => false} 
              className="mb-4"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single upload. Strictly prohibited from uploading
                company data or other banned files.
              </p>
            </Upload.Dragger>

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
