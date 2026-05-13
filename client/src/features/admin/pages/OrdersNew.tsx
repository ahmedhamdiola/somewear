import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, type Order } from "../services/orders";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import OrderItemsDialog from "../components/OrderItemsDialog";

export const OrdersNew = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const loadOrders = async () => {
    try {
      const data = await getOrders();
      const active = data.filter((or) => or.status === "pending");
      setOrders(active);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrders();
        const active = data.filter((or) => or.status === "pending");
        setOrders(active);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load orders");
      }
    };
    load();
  }, []);

  const handleNext = async (order: Order) => {
    try {
      await updateOrderStatus(order.id, "delivered");
      await loadOrders();
      toast.success("Order marked as delivered ");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <h1 className="text-[24px] mb-5 font-bold  ">new orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((ord) => (
            <TableRow key={ord.id}>
              <TableCell>{ord.customerName}</TableCell>
              <TableCell>{ord.email}</TableCell>
              <TableCell>{ord.phone}</TableCell>
              <TableCell>{ord.date}</TableCell>
              <TableCell>{ord.address}</TableCell>
              <TableCell className="font-bold text-green-600">
                {ord.total} EGP
              </TableCell>
              <TableCell>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {ord.status}
                </span>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedOrder(ord)}>
                  view Items
                </Button>
                <Button
                  className="bg-black hover:bg-green-600 text-white"
                  onClick={() => handleNext(ord)}
                >
                  Next Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderItemsDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};
export default OrdersNew;
