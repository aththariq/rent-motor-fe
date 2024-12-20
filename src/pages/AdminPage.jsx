import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminPage = () => {
  const [orders, setOrders] = useState([]); // Orders array
  const [error, setError] = useState(null); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login"; // Redirect if no token
        return;
      }

      const url = "https://api-motoran.faizath.com/orders";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response Data:", response.data);

      if (response.data && response.data.data && response.data.data.orders) {
        setOrders(response.data.data.orders);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setOrders([]); // Fallback to empty array
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
        return;
      }
      console.error("Error fetching orders:", err);
      setError(err.message);
    }
  };

  // Update status for a specific order
  const updateStatus = async (orderId, statusType, value, statusId) => {
    setLoading(true);
    try {
      const now = new Date().toISOString(); // Current date-time

      // Map endpoint based on status type
      const endpointMap = {
        paymentStatus: `/orders/${orderId}/paidstatus`,
        takenStatus: `/orders/${orderId}/takenstatus`,
        returnStatus: `/orders/${orderId}/returnedstatus`,
      };

      const url = `https://api-motoran.faizath.com${endpointMap[statusType]}`;

      // Prepare payload
      const payload = {
        [statusType]: value,
      };

      // Add timestamp if required
      if (statusType === "paymentStatus" && value === "complete") {
        payload.paymentDate = now;
      } else if (statusType === "takenStatus" && value === "taken") {
        payload.takenDate = now;
      } else if (statusType === "returnStatus" && value === "returned") {
        payload.returnDate = now;
      }

      console.log("Calling endpoint:", url);
      console.log("Payload:", payload);

      // Send PUT request to backend
      // Setelah PUT berhasil
      const response = await axios.put(url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Perbarui state lokal atau fetch ulang data
      fetchOrders();
      toast.success("Status successfully updated.");


      console.log("Update response:", response.data);


      // Update the state locally to reflect the changes
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: order.orderStatus.map((status) =>
                  status._id === statusId
                    ? { ...status, [statusType]: value }
                    : status
                ),
              }
            : order
        )
      );

      toast.success("Status successfully updated.");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
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
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Payment Status</th>
            <th className="border p-2">Taken Status</th>
            <th className="border p-2">Return Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.orderStatus.map((status) => (
              <tr
                key={`${order._id}-${status._id}`} // Use status ID for uniqueness
                className="hover:bg-gray-50"
              >
                <td className="border p-2">{status._id}</td>
                <td className="border p-2">{order.email || "N/A"}</td>
                <td className="border p-2">
                  <select
                    value={status.paymentStatus || "uncomplete"}
                    onChange={(e) =>
                      updateStatus(order._id, "paymentStatus", e.target.value, status._id)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="uncomplete">Uncomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </td>
                <td className="border p-2">
                  <select
                    value={status.takenStatus || "untaken"}
                    onChange={(e) =>
                      updateStatus(order._id, "takenStatus", e.target.value, status._id)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="untaken">Untaken</option>
                    <option value="taken">Taken</option>
                  </select>
                </td>
                <td className="border p-2">
                  <select
                    value={status.returnStatus || "unreturned"}
                    onChange={(e) =>
                      updateStatus(order._id, "returnStatus", e.target.value, status._id)
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
