import { Package, Banknote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Button } from "../../../../../components/ui/button"
import ProfileDashboardCard from "../components/ProfileDashboardCard"
import { Badge } from "../../../../../components/ui/badge"
import { getStatusStyle } from "../../order/utils"
import { useUsers } from "../../../hooks/useUsers"


const orders = [
    {
        id: "#1001",
        status: "Delivered",
    },
    {
        id: "#1002",
        status: "Pending",
    },
    {
        id: "#1003",
        status: "Cancelled",
    }
]



interface Props {
    navigateDashboard: (option: string) => void
}
const ProfileDashboardPage = ({ navigateDashboard }: Props) => {
    const { user, loading, error, count, totalAmount } = useUsers()
    return (
        <div className="w-full max-w-5xl space-y-6 mt-5 animate-[fadeInUp_0.8s_ease-out_forwards]">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div>
                <h1 className="text-2xl font-bold">Welcome back, {user?.username || "User"}</h1>
                <p className="text-muted-foreground">
                    Here's what's happening with your account
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ProfileDashboardCard title="Orders" value={count || 0}>
                    <Package className="w-6 h-6" />
                </ProfileDashboardCard>
                <ProfileDashboardCard title="Paid amount" value={totalAmount || 0}>
                    <Banknote className="w-6 h-6" />
                </ProfileDashboardCard>

            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Last Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {orders.map((order) => {
                        return (
                            <div className="flex justify-between border-b pb-2">
                                <span>{order.id}</span>
                                <Badge className={getStatusStyle(order.status)}>{order.status}</Badge>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>

            <div className="flex gap-4 ">
                <Button
                    className="mt-4 h-12 text-xl font-bold rounded-xl w-lg cursor-pointer hover:shadow-lg bg-black hover:bg-[#0f0616]"
                    onClick={() => navigateDashboard("My Orders")}
                >VIEW ALL ORDERS</Button>
                <Button className="mt-4 h-12 text-xl font-bold rounded-xl w-lg bg-white text-black border-black cursor-pointer hover:shadow-lg"
                    onClick={() => navigateDashboard("Settings")}
                >EDIT PROFILE</Button>
            </div>

        </div>
    )
}

export default ProfileDashboardPage