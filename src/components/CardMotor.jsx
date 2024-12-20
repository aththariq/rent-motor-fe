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
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

const { RangePicker } = DatePicker;

const CardMotor = ({
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

  const handleImageUpload = async (info) => {
    const { file } = info;
    const uploadedFile = file.originFileObj || file;
  
    if (uploadedFile) {
      try {
        // Compression options
        const options = {
          maxSizeMB: 1, // Compress to 1MB
          maxWidthOrHeight: 1024, // Resize image to max 1024px
          useWebWorker: true,
        };
  
        const compressedFile = await imageCompression(uploadedFile, options);
  
        console.log("Original file size:", uploadedFile.size / 1024 / 1024, "MB");
        console.log("Compressed file size:", compressedFile.size / 1024 / 1024, "MB");
  
        setCustomer({ ...customer, uploadedImage: compressedFile });
        setImagePreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Image compression failed:", error);
        toast.error("Gagal mengompresi gambar. Silakan coba file lain.");
      }
    } else {
      toast.error("File upload failed or is not accessible");
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
    setAlert({ type: "", message: "", description: "" });
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing. Please log in again.");
      }
  
      const { phone, startDate, endDate, uploadedImage } = customer;
  
      // Validate input fields
      if (!phone || phone.trim() === "") {
        throw new Error("Nomor telepon harus diisi dengan benar.");
      }
      if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error("Tanggal sewa harus dipilih dengan benar.");
      }
      if (!uploadedImage) {
        throw new Error("Gambar KTP harus diunggah.");
      }
  
      // Prepare FormData
      const formData = new FormData();
      formData.append("email", localStorage.getItem("email"));
      formData.append("orderStatus[0][phoneNumber]", phone);
      formData.append("orderStatus[0][idCard]", uploadedImage);
      formData.append("orderStatus[0][orderDate]", new Date().toISOString());
      formData.append("orderStatus[0][takenDate]", startDate.toISOString());
      formData.append("orderStatus[0][returnDate]", endDate.toISOString());
      formData.append("orderStatus[0][paymentStatus]", "uncomplete");
      formData.append("orderStatus[0][takenStatus]", "untaken");
      formData.append("orderStatus[0][returnStatus]", "unreturned");
  
      console.log("FormData entries:", Array.from(formData.entries()));
  
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
  
      if (response.status === 200 || response.status === 201) {
        setAlert({
          type: "success",
          message: "Order berhasil dibuat.",
          description: "Pesanan Anda telah berhasil dibuat.",
        });
        setIsOpen(false);
  
        const orderId = response.data?.data?.orderId;
        if (orderId) {
          navigate(`/payment?orderId=${orderId}&token=${token}`);
        } else {
          throw new Error("Gagal mendapatkan informasi order.");
        }
      } else {
        throw new Error(response.data.message || "Gagal Membuat Order.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
  
      if (error.response) {
        const status = error.response.status;
  
        if (status === 401) {
          toast.error("Unauthorized: Please log in again.");
          navigate("/login");
        } else if (status === 500) {
          toast.error("Server error: Please try again later.");
        } else {
          toast.error(error.response?.data?.message || "Terjadi kesalahan.");
        }
      } else {
        toast.error("Network error: Please check your connection.");
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
              action="https://api-motoran.faizath.com/orders"
              onChange={handleImageUpload}
              beforeUpload={() => false} // Prevent automatic upload
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
