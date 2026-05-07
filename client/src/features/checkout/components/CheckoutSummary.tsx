import { useFormikContext } from "formik"
import CartSummary from "../../cart/components/CartSummary"

const CheckoutSummary = ({
    subtotal,
    savings,
    shipping,
    loading
}: {
    subtotal: number
    savings: number
    shipping: number
    loading: boolean
}) => {
    const { submitForm, isSubmitting } = useFormikContext()

    return (
        <CartSummary
            subtotal={subtotal}
            savings={savings}
            shipping={shipping}
            btnTitle={loading ? "Processing..." : "PLACE ORDER"}
            onClick={submitForm}
            disabled={loading || isSubmitting}
        />
    )
}

export default CheckoutSummary