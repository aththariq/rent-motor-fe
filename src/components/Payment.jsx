// Payment.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Alert,
  Image,
  Spin,
} from "antd";
import { toast } from "sonner";
import { QRCode } from "antd"; // Import Ant Design's QRCode component

const { Title, Text } = Typography;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const orderIdParam = query.get("orderId");
  const tokenParam = query.get("token");
  const orderDataFromState = location.state;

  const [orderData, setOrderData] = useState(orderDataFromState || null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false); // Untuk loading saat fetching order
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi untuk mendeteksi perangkat
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Menganggap width < 768px sebagai mobile
    };

    // Inisialisasi
    handleResize();

    // Menambahkan event listener untuk resize
    window.addEventListener("resize", handleResize);

    // Membersihkan event listener saat komponen di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (orderDataFromState) {
        // Jika data order sudah ada dari state, langsung set
        const { customer, motor } = orderDataFromState;
        const rentalDays = Math.ceil(
          (new Date(customer.endDate) - new Date(customer.startDate)) /
            (1000 * 60 * 60 * 24)
        );
        const total = rentalDays * motor.price;
        setTotalPrice(total);
      } else if (orderIdParam && tokenParam) {
        // Jika diakses via QR code dengan orderId dan token di URL
        setFetching(true);
        try {
          // Ambil order data dari API berdasarkan orderId
          const response = await axios.get(
            `https://api-motoran.faizath.com/orders/${orderIdParam}`,
            {
              headers: {
                Authorization: `Bearer ${tokenParam}`,
              },
            }
          );

          if (response.status === 200) {
            setOrderData(response.data);
            const { customer, motor } = response.data;
            const rentalDays = Math.ceil(
              (new Date(customer.endDate) - new Date(customer.startDate)) /
                (1000 * 60 * 60 * 24)
            );
            const total = rentalDays * motor.price;
            setTotalPrice(total);
          } else {
            toast.error(response.data.message || "Gagal mengambil data order.");
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching order data:", error);
          toast.error(
            error.response?.data?.message ||
              "Terjadi kesalahan saat mengambil data order."
          );
          navigate("/");
        } finally {
          setFetching(false);
        }
      } else {
        // Jika tidak ada data order
        toast.error("Data pesanan tidak ditemukan.");
        navigate("/");
      }
    };

    fetchOrderData();
  }, [orderDataFromState, orderIdParam, tokenParam, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setPaymentError("");
    try {
      // Ambil token dan email dari localStorage
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token || !email) {
        toast.error("Akun Anda tidak valid. Silakan login kembali.");
        navigate("/login");
        return;
      }

      const { phone, startDate, endDate, uploadedImage } = orderData.customer;
      const { motor } = orderData;

      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("startDate", new Date(startDate).toISOString());
      formData.append("endDate", new Date(endDate).toISOString());
      formData.append("ktpImage", uploadedImage);
      formData.append("motorId", motor.id);

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

      if (response.status === 201) {
        setPaymentSuccess(true);
        // Optional: Anda dapat menambahkan navigasi atau reset data di sini
      } else {
        setPaymentError(response.data.message || "Gagal membuat order.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Silakan login kembali.");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
      } else {
        setPaymentError(
          error.response?.data?.message ||
            "Terjadi kesalahan saat membuat order."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!orderData) {
    return null; // Atau tampilkan pesan lain
  }

  const { motor, customer } = orderData;
  const { startDate, endDate } = customer;
  const rentalDays = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );

  // Buat URL pembayaran yang akan di-encode ke QR code
  const qrPaymentUrl = orderIdParam
    ? `${window.location.origin}/payment?orderId=${orderIdParam}&token=${tokenParam}`
    : orderDataFromState
    ? `${window.location.origin}/payment?orderId=${orderDataFromState.orderId}&token=${localStorage.getItem(
        "token"
      )}`
    : "";

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          {/* Alert Sukses */}
          {paymentSuccess && (
            <Alert
              message="Pembayaran Berhasil!"
              description="Terima kasih telah melakukan pembayaran. Pesanan Anda telah berhasil dibuat."
              type="success"
              showIcon
              closable
              onClose={() => setPaymentSuccess(false)}
              style={{ marginBottom: "20px" }}
            />
          )}

          {/* Alert Error */}
          {paymentError && (
            <Alert
              message="Gagal Membuat Order"
              description={paymentError}
              type="error"
              showIcon
              closable
              onClose={() => setPaymentError("")}
              style={{ marginBottom: "20px" }}
            />
          )}

          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Rangkuman Pembayaran
            </Title>

            {/* Detail Motor */}
            <Card
              type="inner"
              title="Detail Motor"
              bordered={false}
              style={{ marginBottom: "20px" }}
            >
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Image
                    src={motor.image}
                    alt={motor.name}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </Col>
                <Col span={16} className="flex flex-col justify-center">
                  <Text strong>Nama:</Text> {motor.name}
                  <br />
                  <Text strong>Jenis:</Text> {motor.type}
                  <br />
                  <Text strong>Bahan Bakar:</Text> {motor.fuel}
                  <br />
                  <Text strong>Transmisi:</Text> {motor.transmission}
                  <br />
                  <Text strong>Kapasitas:</Text> {motor.capacity} orang
                  <br />
                  <Text strong>Harga per hari:</Text> Rp{motor.price}
                </Col>
              </Row>
            </Card>

            {/* Detail Sewa */}
            <Card
              type="inner"
              title="Detail Sewa"
              bordered={false}
              style={{ marginBottom: "20px" }}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Nomor Telepon:</Text>
                  <br />
                  <Text>{customer.phone}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Tanggal Sewa:</Text>
                  <br />
                  <Text>
                    {new Date(startDate).toLocaleDateString()} -{" "}
                    {new Date(endDate).toLocaleDateString()}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>Jumlah Hari:</Text>
                  <br />
                  <Text>{rentalDays} hari</Text>
                </Col>
              </Row>
            </Card>

            {/* Total Harga */}
            <Card
              type="inner"
              title="Total Harga"
              bordered={false}
              style={{ marginBottom: "20px" }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={4}>Rp{totalPrice}</Title>
                </Col>
                <Col>
                  <Text type="secondary">Total</Text>
                </Col>
              </Row>
            </Card>

            {/* Tombol "Bayar Sekarang" hanya di mobile */}
            <div className="block md:hidden">
              <Button
                type="primary"
                size="large"
                onClick={handlePayment}
                loading={loading}
                block
              >
                {loading ? "Memproses..." : "Bayar Sekarang"}
              </Button>
            </div>

            {/* QR Code hanya di desktop */}
            <div className="hidden md:block">
              <Title level={4} style={{ textAlign: "center" }}>
                Scan QR untuk Pembayaran
              </Title>
              <div className="flex justify-center mt-4">
                {qrPaymentUrl ? (
                  <QRCode value={qrPaymentUrl} size={200} />
                ) : (
                  <Spin />
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
