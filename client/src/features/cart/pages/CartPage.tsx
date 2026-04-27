import NavBar from '../../common/components/NavBar'
import FooterBar from '../../common/components/FooterBar'
import { ShoppingBag, ShoppingBagIcon } from 'lucide-react'
import { Badge } from '../../../components/ui/badge'
import CartItemCard from '../components/CartItemCard'
import CartSummary from '../components/CartSummary'
import { initialCart } from '../utils/mockData'
import { useCart } from '../hooks/useCart'
import EmptyCard from '../../common/pages/EmptyCard'

const CartPage = () => {
    const { cart, updateQty, remove, subtotal } = useCart(initialCart)
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <NavBar />
                <div className="flex justify-center">
                    <div className="flex-1 max-w-5xl py-10">
                        {/** HEADER */}
                        <div className="flex items-center gap-3 mb-8">
                            <ShoppingBagIcon className="w-6 h-6 text-zinc-500" />
                            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                                Your Cart
                            </h1>
                            <Badge variant="secondary" className="ml-1">
                                {cart.length} items
                            </Badge>
                        </div>
                        {/** items */}
                        {cart.length === 0 ? (
                            <EmptyCard message='Your cart is empty'>
                                <ShoppingBag className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                            </EmptyCard>
                        ) : (
                            <div className="flex flex-row gap-6">
                                <div className="flex-1 space-y-3">
                                    {cart.map(item => (
                                        <CartItemCard key={item.id} item={item} onRemove={remove} onUpdateQty={updateQty} />
                                    ))}
                                </div>
                                <div className="w-72 flex-shrink-0">
                                    <CartSummary subtotal={subtotal} savings={0} shipping={5} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterBar />
        </>
    )
}

export default CartPage
