import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminPage = () => {
  const [orders, setOrders] = useState([]); // Orders array
  const [error, setError] = useState(null); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Retrieved Token:", token);

      if (!token) {
        console.error("Token not found. Redirecting to login.");
        window.location.href = "/login"; // Redirect if no token
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
      setOrders(response.data.data.orders); // Correctly access orders array
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("Unauthorized: Token may be invalid or expired.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
        return;
      }
      console.error("Error fetching orders:", err);
      setError(err.message);
    }
  };

  const updateStatus = async (id, statusType, value) => {
    setLoading(true);
    try {
      let payload = {};
      const now = new Date().toISOString(); // Current date-time

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

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Orders</h1>
      {loading && <p className="text-gray-600">Updating status...</p>}

      {error && <div className="text-red-600">Error: {error}</div>}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">No</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Payment Status</th>
            <th className="border p-2">Taken Status</th>
            <th className="border p-2">Return Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) =>
            order.orderStatus.map((status, statusIndex) => (
              <tr key={`${order._id}-${statusIndex}`} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{order.email}</td>
                <td className="border p-2">
                  <select
                    value={status.paymentStatus}
                    onChange={(e) =>
                      updateStatus(order._id, "paymentStatus", e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="uncomplete">Uncomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </td>
                <td className="border p-2">
                  <select
                    value={status.takenStatus}
                    onChange={(e) =>
                      updateStatus(order._id, "takenStatus", e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="untaken">Untaken</option>
                    <option value="taken">Taken</option>
                  </select>
                </td>
                <td className="border p-2">
                  <select
                    value={status.returnStatus}
                    onChange={(e) =>
                      updateStatus(order._id, "returnStatus", e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="unreturned">Unreturned</option>
                    <option value="returned">Returned</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
