import { Minus, Plus } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import type { CartItem } from '../utils/types'

interface Props {
    item: CartItem
    onUpdateQty: (id: number, delta: number) => void
    onRemove: (id: number) => void

}
const CartItemCard = ({ item, onUpdateQty, onRemove }: Props) => {
    return (
        <Card
            className="overflow-hidden border border-zinc-200 hover:shadow-md transition-colors"
        >
            <CardContent>
                <div className="flex">
                    {/* Product Image */}
                    <div className="w-36 h-36 flex-shrink-0 bg-zinc-100">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                {/* NAME */}
                                <h1 className="text-lg font-semibold text-zinc-900 leading-snug">
                                    {item.name}
                                </h1>
                                {/* SIZE */}
                                <div className="flex gap-3 mt-1.5">
                                    <span className="text-xs text-zinc-500">
                                        Size:{' '}
                                        <span className="text-zinc-700">
                                            {item.size}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                                <p className="text-lg font-bold text-zinc-900 mt-2">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between mt-3">
                            {/* Qty Control */}
                            <div className="flex items-center gap-2 border border-zinc-200 rounded-lg px-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => onUpdateQty(item.id, -1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="w-3 h-3" />
                                </Button>
                                <span className="text-sm font-medium w-5 text-center">
                                    {item.quantity}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => onUpdateQty(item.id, 1)}
                                    disabled={item.quantity == item.stock}
                                >
                                    <Plus className="w-3 h-3" />
                                </Button>
                            </div>
                            {/* Delete Control */}
                            <div className="flex items-center gap-2">
                                <Button onClick={() => onRemove(item.id)}>Remove</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CartItemCard
