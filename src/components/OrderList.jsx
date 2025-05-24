"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statuses = {
  "Order Received": "bg-blue-100 text-blue-800",
  "In Development": "bg-yellow-100 text-yellow-800",
  "Ready to Dispatch": "bg-purple-100 text-purple-800",
  Dispatched: "bg-green-100 text-green-800",
};

export default function OrderList({ orders, updateOrderStatus }) {
  // Local state to track status changes before confirming
  const [localStatuses, setLocalStatuses] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    // Optimistically update UI immediately
    setLocalStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
    // Call the passed-in function to update backend & refresh data
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tracking Info</TableHead>
          <TableHead>Dispatch Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          // Use locally changed status if exists, else fallback to order.status
          const currentStatus = localStatuses[order._id] || order.status;

          return (
            <TableRow key={order._id}>
              <TableCell>#{order._id.slice(-4)}</TableCell>
              <TableCell>
                <select
                  value={currentStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className={`rounded px-2 py-1 border ${
                    statuses[currentStatus] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {Object.keys(statuses).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>{order.trackingInfo || "Not set"}</TableCell>
              <TableCell>
                {order.dispatchDate
                  ? new Date(order.dispatchDate).toLocaleDateString()
                  : "Pending"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
