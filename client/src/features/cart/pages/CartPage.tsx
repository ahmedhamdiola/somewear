import NavBar from '../../common/components/navbar/NavBar'
import FooterBar from '../../common/components/FooterBar'
import { ShoppingBag, ShoppingBagIcon } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import CartItemCard from '../components/CartItemCard'
import CartSummary from '../components/CartSummary'
import EmptyCard from '../../common/pages/EmptyCard'
import { useNavigate } from 'react-router-dom'

import { useCart } from '../hooks/useCart'

const CartPage = () => {
    const { cart, loading, error, subtotal, updateQty, remove } = useCart()
    console.log(cart)
    const navigate = useNavigate()
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex justify-center animate-[fadeInUp_0.8s_ease-out_forwards] min-h-screen">
                <div className="flex-1 max-w-5xl py-10">
                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-8">
                        <ShoppingBagIcon className="w-6 h-6 text-zinc-500" />
                        <h1 className="text-2xl font-semibold">
                            Your Cart
                        </h1>
                        <Badge variant="secondary">
                            {cart.length} items
                        </Badge>
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {cart.length === 0 ? (
                        <EmptyCard message="Your cart is empty">
                            <ShoppingBag className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                        </EmptyCard>
                    ) : (
                        <div className="flex flex-row gap-6">
                            <div className="flex-1 space-y-3">
                                {cart.map(item => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        onUpdateQty={updateQty}
                                        onRemove={remove}
                                    />
                                ))}
                            </div>
                            <div className="w-72 flex-shrink-0">
                                <CartSummary
                                    subtotal={subtotal}
                                    savings={0}
                                    shipping={20}
                                    onClick={() => navigate("/checkout")}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FooterBar />
        </div>
    )
}

export default CartPage