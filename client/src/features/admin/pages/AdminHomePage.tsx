import { useEffect, useState } from "react";
import { ShoppingCart, Package, Users, MapPin, DollarSign, TrendingUp } from "lucide-react";
import ProfileDashboardCard from "../../user/pages/dashboard/components/ProfileDashboardCard";
import { getOrdersCount, getTotalRevenue } from "../services/orders";
import { getUsersCount } from "../services/users";
import axios from "axios";

const API_URL = "http://localhost:3000";
const config = { withCredentials: true };

const getProductsCount = async (): Promise<number> => {
  const res = await axios.get(`${API_URL}/products/productsCount`, config);
  const data = res.data.data as { "COUNT(id)": number };
  return data["COUNT(id)"] ?? 0;
};

const getTopCity = async (): Promise<string> => {
  const res = await axios.get(`${API_URL}/order/topCity`, config);
  const data = res.data.data as { city: string; total_revenue: number };
  return data?.city ?? "—";
};

const getBestSeller = async (): Promise<string> => {
  const res = await axios.get(`${API_URL}/products/best-sellers`);
  const data = res.data.data as { name: string; soldAmount: number }[];
  return data?.[0]?.name ?? "—";
};

const AdminHomePage = () => {
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [topCity, setTopCity] = useState<string>("—");
  const [bestSeller, setBestSeller] = useState<string>("—");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orders, rev, products, users, city, best] = await Promise.all([
          getOrdersCount(),
          getTotalRevenue(),
          getProductsCount(),
          getUsersCount(),
          getTopCity(),
          getBestSeller(),
        ]);
        setOrdersCount(orders);
        setRevenue(rev);
        setProductsCount(products);
        setUsersCount(users);
        setTopCity(city);
        setBestSeller(best);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full max-w-5xl space-y-6 mt-5 mx-auto px-4">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border p-6 animate-pulse bg-gray-100 h-24"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileDashboardCard title="Total Orders" value={ordersCount}>
            <ShoppingCart className="w-6 h-6" />
          </ProfileDashboardCard>

          <ProfileDashboardCard title="Total Revenue" value={`EGP ${revenue.toLocaleString()}`}>
            <DollarSign className="w-6 h-6" />
          </ProfileDashboardCard>

          <ProfileDashboardCard title="Total Products" value={productsCount}>
            <Package className="w-6 h-6" />
          </ProfileDashboardCard>

          <ProfileDashboardCard title="Total Users" value={usersCount}>
            <Users className="w-6 h-6" />
          </ProfileDashboardCard>

          <ProfileDashboardCard title="Top City" value={topCity}>
            <MapPin className="w-6 h-6" />
          </ProfileDashboardCard>

          <ProfileDashboardCard title="Best Seller" value={bestSeller}>
            <TrendingUp className="w-6 h-6" />
          </ProfileDashboardCard>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;
