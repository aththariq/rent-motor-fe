import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Typography, Button, Alert, Image, Spin } from "antd";
import { toast } from "sonner";
import { QRCode } from "antd";

const { Title, Text } = Typography;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const orderIdParam = query.get("orderId");
  const tokenParam = query.get("token");

  const [orderData, setOrderData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [qrUrl, setQrUrl] = useState(null);
  const [motorData, setMotorData] = useState(null); // Add motorData state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!orderIdParam || !tokenParam) {
      const fallbackOrderId = orderIdParam;
      const fallbackToken = tokenParam || localStorage.getItem("token") || null;

      if (!fallbackOrderId || !fallbackToken) {
        toast.error("Parameter orderId atau token tidak ditemukan.");
        navigate("/home");
      }
    }

    // Fetch order data from backend
    if (orderIdParam && tokenParam) {
      // Ensure both orderId and token are present
      axios
        .get(`https://api-motoran.faizath.com/orders/${orderIdParam}`, {
          headers: {
            Authorization: `Bearer ${
              tokenParam || localStorage.getItem("token")
            }`,
          },
        })
        .then((response) => {
          const fetchedOrder = response.data.data.order; // Access nested 'order'
          setOrderData(fetchedOrder);
          setQrUrl(
            `https://motoran.vercel.app/payment?orderId=${orderIdParam}&token=${tokenParam}`
          ); // Added token to QR URL

          if (fetchedOrder.motorId) {
            // Ensure 'motorId' exists in orderData
            // Fetch motor data from /inventories
            axios
              .get("https://api-motoran.faizath.com/inventories", {
                headers: {
                  Authorization: `Bearer ${
                    tokenParam || localStorage.getItem("token")
                  }`,
                },
              })
              .then((motorResponse) => {
                const motors = motorResponse.data.data.inventories;
                const fetchedMotor = motors.find(
                  (motor) => motor._id === fetchedOrder.motorId
                ); // Correct placement of .find()

                if (fetchedMotor) {
                  setMotorData(fetchedMotor);

                  // Hitung total harga
                  const rentalDays = Math.ceil(
                    (new Date(fetchedOrder.returnDate) -
                      new Date(fetchedOrder.takenDate)) /
                      (1000 * 60 * 60 * 24)
                  );
                  const total = rentalDays * fetchedMotor.price; // Use motor.price from fetched data
                  setTotalPrice(total);
                } else {
                  toast.error("Data motor tidak ditemukan.");
                  navigate("/home");
                }
              })
              .catch((motorError) => {
                console.error(motorError);
                toast.error("Gagal mengambil data motor.");
                navigate("/home");
              });
          } else {
            toast.error("Data motorId tidak ditemukan.");
            navigate("/home");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Gagal mengambil data pesanan.");
          navigate("/home");
        });
    }
  }, [orderIdParam, tokenParam, navigate]);

  // Update rendering to use motorData instead of motor
  if (!orderData || !motorData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const { phoneNumber, takenDate, returnDate } = orderData;

  const rentalDays = Math.ceil(
    (new Date(returnDate) - new Date(takenDate)) / (1000 * 60 * 60 * 24)
  );

  const qrPaymentUrl = qrUrl;

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
                {motorData ? (
                  <>
                    <Col span={8}>
                      <Image
                        src={motorData.image}
                        alt={motorData.name}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </Col>
                    <Col span={16} className="flex flex-col justify-center">
                      <Text strong>Nama:</Text> {motorData.name}
                      <br />
                      <Text strong>Jenis:</Text> {motorData.type}
                      <br />
                      <Text strong>Harga per hari:</Text> Rp{motorData.price}
                    </Col>
                  </>
                ) : (
                  <Col span={24}>
                    <Alert
                      message="Data Motor Tidak Ditemukan"
                      description="Detail motor tidak tersedia."
                      type="error"
                      showIcon
                    />
                  </Col>
                )}
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
                  <Text>{phoneNumber}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Tanggal Sewa:</Text>
                  <br />
                  <Text>
                    {new Date(takenDate).toLocaleDateString()} -{" "}
                    {new Date(returnDate).toLocaleDateString()}
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
                onClick={() => (window.location.href = qrPaymentUrl)} // Redirect ke URL pembayaran
                block
              >
                Bayar Sekarang
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
                )}{" "}
              </div>{" "}
            </div>{" "}
            <Button
              type="default"
              size="large"
              onClick={() => navigate("/home")}
              style={{ marginTop: "10px" }}
              block
            >
              {" "}
              Batalkan{" "}
            </Button>{" "}
          </Card>{" "}
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
