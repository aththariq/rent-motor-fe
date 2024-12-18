import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminPage = () => {
  const [orders, setOrders] = useState([]); // Orders array
  const [error, setError] = useState(null); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch orders from API
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
      setOrders(response.data.data.orders); // Correctly set orders
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

  // Update order status
  const updateStatus = async (id, statusType, value) => {
    setLoading(true);
    try {
      let payload = {};
      const now = new Date().toISOString();

      // Add timestamp if status is updated
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

      const url = `https://api-motoran.faizath.com${endpointMap[statusType]}`;
      console.log("Updating status at URL:", url);
      console.log("Payload:", { [statusType]: value, ...payload });

      await axios.put(
        url,
        { [statusType]: value, ...payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Status berhasil diperbarui.");
      fetchOrders(); // Refetch orders after update
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
      } else {
        console.error("Error Message:", error.message);
      }
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

      {/* Orders Table */}
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

                {/* Payment Status */}
                <td className="border p-2">
                  <select
                    key={`${order._id}-${status.paymentStatus}`}
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

                {/* Taken Status */}
                <td className="border p-2">
                  <select
                    key={`${order._id}-${status.takenStatus}`}
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

                {/* Return Status */}
                <td className="border p-2">
                  <select
                    key={`${order._id}-${status.returnStatus}`}
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
