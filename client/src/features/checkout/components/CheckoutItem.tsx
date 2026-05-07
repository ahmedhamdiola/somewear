type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
    size: string
}

const CheckoutItem = ({ cartItems }: { cartItems: CartItem[] }) => {
    return (
        <div className="space-y-3">
            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between border p-3 rounded"
                >
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                            Size: {item.size} | Qty: {item.quantity}
                        </p>
                    </div>

                    <p className="font-semibold">
                        ${item.price * item.quantity}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default CheckoutItem