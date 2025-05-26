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
import { PackageOpen, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const statuses = {
  "Order Received": "bg-blue-100 text-blue-800",
  "In Development": "bg-yellow-100 text-yellow-800",
  "Ready to Dispatch": "bg-purple-100 text-purple-800",
  Dispatched: "bg-green-100 text-green-800",
};

export default function OrderList({ orders, updateOrderStatus }) {
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [localStatuses, setLocalStatuses] = useState({});
  const [localDates, setLocalDates] = useState({});
  const [localTracking, setLocalTracking] = useState({});

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updates = { status: newStatus };

      if (newStatus === "Dispatched") {
        const existingOrder = orders.find((o) => o._id === orderId);
        if (!existingOrder?.trackingInfo) {
          const trackingId = `FEDEX-${Math.random()
            .toString(36)
            .slice(2, 10)
            .toUpperCase()}`;
          updates.trackingInfo = trackingId;
          setLocalTracking((prev) => ({ ...prev, [orderId]: trackingId }));
        }
      }

      await updateOrderStatus(orderId, updates);
      setLocalStatuses((prev) => ({ ...prev, [orderId]: newStatus }));

      toast({
        title: "Status updated!",
        description: `Changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDateChange = async (orderId, selectedDate) => {
    if (!selectedDate) return;
    try {
      await updateOrderStatus(orderId, {
        dispatchDate: selectedDate.toISOString(),
      });

      setLocalDates((prev) => ({ ...prev, [orderId]: selectedDate }));
      toast({
        title: "Date set!",
        description: `Dispatch date updated to ${format(selectedDate, "PPP")}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update date",
        variant: "destructive",
      });
    } finally {
      setEditingOrderId(null);
    }
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
            const dispatchDate =
              localDates[order._id] ||
              (order.dispatchDate ? new Date(order.dispatchDate) : null);
            const tracking = localTracking[order._id] || order.trackingInfo;

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

                <TableCell>
                  {currentStatus === "Dispatched" ? (
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {tracking || "Generating..."}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {currentStatus === "Ready to Dispatch"
                        ? "Will generate when dispatched"
                        : "Not available"}
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  {editingOrderId === order._id ? (
                    <Popover
                      open={true}
                      onOpenChange={(open) =>
                        !open && setEditingOrderId(null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[180px] justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dispatchDate
                            ? format(dispatchDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dispatchDate}
                          onSelect={(selectedDate) =>
                            handleDateChange(order._id, selectedDate)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditingOrderId(order._id);
                      }}
                    >
                      {dispatchDate ? format(dispatchDate, "PPP") : "Set date"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}



