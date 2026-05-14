export const getStatusStyle = (status: string) => {
    switch (status) {
        case "delivered":
            return "bg-green-100 text-green-700"
        case "pending":
            return "bg-amber-100 text-amber-700"
        case "cancelled":
            return "bg-red-100 text-red-700"
        default:
            return "bg-gray-100 text-gray-700"
    }
}