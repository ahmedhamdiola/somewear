import { useEffect, useState } from "react";
import { getOrders, type Order } from "../services/orders";
import { toast } from "react-toastify";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
const OrdersCompleted = () => {
const[orders,setOrders]=useState<Order[]>([]);

useEffect(()=>{
  const load = async()=>{

  
    try {
      const data = await getOrders();
       const completed = data.filter(
    (ord)=> ord.status === "delivered"
   ) 
  
      setOrders(completed);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };
  load();

},[])
 

  return (
    <div>
      <h1 className="text-[24px] mb-6 font-bold">completed orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((ord)=>(
            <TableRow key={ord.id}>
              <TableCell>{ord.date}</TableCell>
              <TableCell>{ord.customerName}</TableCell>
              <TableCell>{ord.email}</TableCell>
              <TableCell>{ord.phone}</TableCell>
              <TableCell>{ord.address}</TableCell>
              <TableCell>{ord.total} EGP</TableCell>
              <TableCell>{ord.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  )
}
export default OrdersCompleted