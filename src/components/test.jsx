const handleConfirm = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); // Retrieve email from localStorage

    if (!token || !email) {
      console.error("Token or email not found in localStorage");
      toast.error("Akun Anda tidak valid. Silakan login kembali.");
      return;
    }

    const orderData = {
      email: email, // Use the email retrieved from localStorage
      orderStatus: [
        {
          phoneNumber: customer.phone,
          idCard: customer.uploadedImage?.name || "No Image",
          orderDate: new Date().toISOString(),
          takenDate: customer.startDate?.toISOString(),
          returnDate: customer.endDate?.toISOString(),
          paymentStatus: "uncomplete",
          takenStatus: "untaken",
          returnStatus: "unreturned",
        },
      ],
    };

    console.log("sampe sini")

    const response = await axios.post("https://api-motoran.faizath.com/orders", orderData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include Bearer token
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      toast.success("Order berhasil dibuat.");
      setIsOpen(false);
    } else {
      toast.error(response.data.message || "Gagal membuat order.");
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response?.status === 401) {
      toast.error("Unauthorized: Silakan login kembali.");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } else {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat membuat order."
      );
    }
  } finally {
    setLoading(false);
  }
};
