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
import { PackageOpen } from 'lucide-react';

const statuses = {
  "Order Received": "bg-blue-100 text-blue-800",
  "In Development": "bg-yellow-100 text-yellow-800",
  "Ready to Dispatch": "bg-purple-100 text-purple-800",
  Dispatched: "bg-green-100 text-green-800",
};

export default function OrderList({ orders, updateOrderStatus }) {
  const [localStatuses, setLocalStatuses] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    setLocalStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
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
      <TableBody>  {/*//adding TableBody here incase no lead is won*/}
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center h-24">
              <PackageOpen className="mx-auto h-10 w-10 mb-2 opacity-50" />
              <p>No orders yet</p>
              <p className="text-sm text-muted-foreground">
                Convert a "Won" lead to see orders here
              </p>
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => {
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
          })
        )}
      </TableBody>
    </Table>
  );
}
