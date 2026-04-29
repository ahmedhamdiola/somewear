import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  type Order,
} from "../services/orders";
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



export const OrdersNew = () => {


  const[orders,setOrders] = useState<Order[]>([]);
  useEffect(()=>{
  
  const load = async () => {
    try {
      const data = await getOrders() 
        const active = data.filter(
          (or) => or.status !== "delivered"
        );
      setOrders(active);

    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };
  load();
  
  },[])
 
  const handleNext = async(order:Order)=>{
     let newStatus: Order["status"];

    if (order.status === "pending") newStatus = "shipped";
    else if (order.status === "shipped") newStatus = "delivered";
    else return;
    
     try {
      await updateOrderStatus(order.id, newStatus);

  
      const data = await getOrders();
      const active = data.filter(
        (ord) => ord.status !== "delivered"
      );

      setOrders(active);         

      toast.success("Status updated ");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    }

  }

  return (
    <div>
      <h1 className="text-[24px] mb-5 font-bold  ">new orders</h1>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
    { orders.map((ord)=>(
      <TableRow key={ord.id}>
          <TableCell>{ord.date}</TableCell>
              <TableCell>{ord.customerName}</TableCell>
              <TableCell>{ord.email}</TableCell>
              <TableCell>{ord.phone}</TableCell>
              <TableCell>{ord.address}</TableCell>
              <TableCell>{ord.total} EGP</TableCell>
              <TableCell>{ord.status}</TableCell>
              <TableCell> 
                <Button onClick={()=> handleNext(ord)}>next status</Button>

                </TableCell>
      </TableRow> 
    
    ))} 



      </TableBody>
      </Table>

    </div>
  )
}
export default OrdersNew