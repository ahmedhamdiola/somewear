import { Card, CardContent } from "../../../../../components/ui/card"
import { Badge } from "../../../../../components/ui/badge"
import { getStatusStyle } from "../utils"

const orders = [
    {
        id: "#1001",
        date: "2026-04-20",
        total: "$120",
        count: 10,
        status: "Delivered",
    },
    {
        id: "#1002",
        date: "2026-04-22",
        total: "$80",
        count: 15,
        status: "Pending",
    },
    {
        id: "#1003",
        date: "2026-04-23",
        total: "$55",
        count: 2,
        status: "Cancelled",
    }
]


const ProfileOrdersPage = () => {
    return (
        <div className="w-full max-w-5xl space-y-6 mt-5 animate-[fadeInUp_0.8s_ease-out_forwards]">

            <div>
                <h1 className="text-2xl font-bold">My Orders</h1>
                <p className="text-muted-foreground">
                    Track and manage your purchases
                </p>
            </div>

            <div className="space-y-4">

                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardContent className="flex items-center justify-between p-6">

                            <div>
                                <p className="font-semibold">{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                    {order.date}
                                </p>
                            </div>

                            <div>
                                <span className="font-bold mr-1">{order.count}</span>
                                <span className="text-muted-foreground">
                                    items
                                </span>
                            </div>

                            <div className="text-sm font-medium">
                                {order.total}
                            </div>

                            <Badge className={`${getStatusStyle(order.status)}`}>
                                {order.status}
                            </Badge>

                        </CardContent>
                    </Card>
                ))}

            </div>
        </div>
    )
}

export default ProfileOrdersPage