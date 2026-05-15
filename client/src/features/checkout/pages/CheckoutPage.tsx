import { useState } from "react"
import NavBar from "../../common/components/navbar/NavBar"
import FooterBar from "../../common/components/FooterBar"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import { Formik, Form } from "formik"
import { CheckoutSchema } from "../services/CheckoutSchema.ts"

import CheckoutForm from "../components/CheckoutForm"
import CheckoutItems from "../components/CheckoutItem"
import CheckoutSummary from "../components/CheckoutSummary"
import { useCart } from "../../cart/hooks/useCart.tsx"
import { checkout } from "../services/checkoutAPI.ts"
import type { CheckoutFormValues } from "../services/interfaces.ts"


const CheckoutPage = () => {

    const { cart } = useCart();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    const savings = 0
    const shipping = subtotal > 0 ? 20 : 0

    const handleOrder = async (values: CheckoutFormValues) => {
        setLoading(true)
        await checkout({
            shippingFees: shipping,
            city: values.city,
            address: values.address,
            phone: values.phone,
        });
        toast.success("Order placed successfully!")

        setTimeout(() => {
            setLoading(false)
            navigate("/")
        }, 3000)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

            <Formik
                initialValues={{ address: "", city: "", phone: "" }}
                validationSchema={CheckoutSchema}
                onSubmit={handleOrder}
            >
                <div className="flex-1 flex justify-center px-4 py-10 animate-[fadeInUp_0.8s_ease-out_forwards]">
                    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* LEFT */}
                        <div className="space-y-4">
                            <h1 className="text-xl font-semibold">
                                Checkout
                            </h1>

                            <Form>
                                <CheckoutForm />
                            </Form>

                            <CheckoutItems cartItems={cart} />
                        </div>

                        {/* RIGHT */}
                        <div>
                            <CheckoutSummary
                                subtotal={subtotal}
                                savings={savings}
                                shipping={shipping}
                                loading={loading}
                            />

                            <p className="text-xs text-gray-500 text-center mt-2">
                                You will pay upon delivery
                            </p>
                        </div>

                    </div>
                </div>
            </Formik>

            <FooterBar />
        </div>
    )
}

export default CheckoutPage