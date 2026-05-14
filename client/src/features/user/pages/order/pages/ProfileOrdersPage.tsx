import { Card, CardContent } from "../../../../../components/ui/card"
import { Badge } from "../../../../../components/ui/badge"
import { getStatusStyle } from "../utils"
import { useUsers } from "../../../hooks/useUsers"
import type { OrderInterface } from "../../../../common/services/interfaces"
import { cancelOrder } from "../../../services/usersAPI"

const ProfileOrdersPage = () => {
    const { allOrders } = useUsers()
    console.log(allOrders)
    return (
        <div className="w-full max-w-5xl space-y-6 mt-5 animate-[fadeInUp_0.8s_ease-out_forwards]">

            <div>
                <h1 className="text-2xl font-bold">My Orders</h1>
                <p className="text-muted-foreground">
                    Track and manage your purchases
                </p>
            </div>

            <div className="space-y-4">

                {allOrders.map((order: OrderInterface) => (
                    <Card key={order.id}>
                        <CardContent className="flex items-center justify-between p-6">

                            <div>
                                <p className="font-semibold"># {order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                    {order.createdAt}
                                </p>
                            </div>

                            <div>
                                <span className="font-bold mr-1">{order.city}</span>
                                <span className="text-muted-foreground">
                                    {order.address}
                                </span>
                            </div>

                            <div className="text-sm font-medium">
                                {order.TotalPrice + order.ShippingFees} $
                            </div>

                            <Badge className={`${getStatusStyle(order.status)}`}>
                                {order.status}
                            </Badge>
                            {order.status === "pending" && (
                                <button
                                    onClick={() => {
                                        cancelOrder(order.id)
                                        window.location.reload()
                                    }}
                                    className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            )}
                        </CardContent>
                    </Card>
                ))}

            </div>
        </div>
    )
}

export default ProfileOrdersPage