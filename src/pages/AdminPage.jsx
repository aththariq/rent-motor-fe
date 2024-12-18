import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from GET /orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Retrieved Token:", token);
  
      if (!token) {
        console.error("Token not found. Redirecting to login.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
        return;
      }
  
      const url = "https://api-motoran.faizath.com/orders";
      console.log("Fetching orders from:", url);
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("API Response:", response.data);
      setOrders(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Token may be invalid or expired.");
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Error fetching orders:", error);
        setError(error.message);
      }
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status (paymentStatus, takenStatus, returnStatus)
  const updateStatus = async (id, statusType, value) => {
    setLoading(true);
    try {
      let payload = {};
      const now = new Date().toISOString(); // Current date-time

      // Tambahkan tanggal sesuai status
      if (statusType === "paymentStatus" && value === "complete") {
        payload.paymentDate = now;
      }
      if (statusType === "takenStatus" && value === "taken") {
        payload.takenDate = now;
      }
      if (statusType === "returnStatus" && value === "returned") {
        payload.returnDate = now;
      }

      const endpointMap = {
        paymentStatus: `/orders/${id}/paidstatus`,
        takenStatus: `/orders/${id}/takenstatus`,
        returnStatus: `/orders/${id}/returnedstatus`,
      };

      // Update order status
      await axios.put(`https://api-motoran.faizath.com${endpointMap[statusType]}`, {
        [statusType]: value,
        ...payload,
      });

      toast.success("Status berhasil diperbarui.");
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Gagal memperbarui status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Orders</h1>
      {loading && <p className="text-gray-600">Updating status...</p>}

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">No</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Payment Status</th>
            <th className="border p-2">Taken Status</th>
            <th className="border p-2">Return Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{order.phoneNumber}</td>

              {/* Payment Status */}
              <td className="border p-2">
                <select
                  value={order.paymentStatus}
                  onChange={(e) =>
                    updateStatus(order.id, "paymentStatus", e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="uncomplete">Uncomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </td>

              {/* Taken Status */}
              <td className="border p-2">
                <select
                  value={order.takenStatus}
                  onChange={(e) =>
                    updateStatus(order.id, "takenStatus", e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="untaken">Untaken</option>
                  <option value="taken">Taken</option>
                </select>
              </td>

              {/* Return Status */}
              <td className="border p-2">
                <select
                  value={order.returnStatus}
                  onChange={(e) =>
                    updateStatus(order.id, "returnStatus", e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="unreturned">Unreturned</option>
                  <option value="returned">Returned</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
