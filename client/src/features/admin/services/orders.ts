export type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string; // 
    address: string; //
  total: number;
  
  status: "pending" | "shipped" | "delivered";
};

let orders: Order[] = [
  {
    id: "1",
    customerName: "Ziad",
    email: "ziad@gmail.com",
    phone: "01012345678",
    date: "2024-06-01",
    address: "Cairo, Nasr City, Street 10", // 🔥
    total: 500,
    status: "pending",
  },
  {
    id: "2",
    customerName: "Ahmed",
    email: "ahmed@gmail.com",
    phone: "01198765432",
    date: "2024-06-02",
    address: "Giza, Haram, Street 5",
    total: 300,
    status: "shipped",
  },
  {
    id: "3",
    customerName: "Ali",
    email: "ali@gmail.com",
    phone: "01255555555",
    date: "2024-06-03",
    address: "Alexandria, Miami, Street 3",
    total: 700,
    status: "delivered",
  },
];

// GET all orders
export const getOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(orders), 300);
  });
};

//  UPDATE status
export const updateOrderStatus = async (
  id: string,
  status: Order["status"]
): Promise<void> => {
  return new Promise((resolve) => {
    orders = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );

    setTimeout(() => resolve(), 200);
  });
};