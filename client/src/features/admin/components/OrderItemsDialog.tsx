import { useEffect, useState } from "react";
import { getOrderItems, type Order, type OrderItem } from "../services/orders";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";

interface Props {
  order: Order | null;
  onClose: () => void;
}

const OrderItemsDialog = ({ order, onClose }: Props) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!order) return;
    const fetchItems = async () => {
      setItems([]);
      setLoading(true);
      try {
        const data = await getOrderItems(order.id);
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load order items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [order]);

  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Items — {order?.customerName}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No items found for this order.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2">#</th>
                <th className="pb-2">Product</th>
                <th className="pb-2">Size</th>
                <th className="pb-2">Qty</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2 font-medium">{item.productName}</td>
                  <td className="py-2">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">{item.size}</span>
                  </td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">{item.price} EGP</td>
                  <td className="py-2 font-semibold">{item.quantity * item.price} EGP</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
};

export default OrderItemsDialog;
