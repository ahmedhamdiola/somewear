import { Field, ErrorMessage } from "formik"
import { CarIcon, Banknote } from "lucide-react"

const CheckoutForm = () => {
    return (
        <div className="border rounded-lg p-4 space-y-3">

            <h2 className="font-medium">Delivery Information</h2>

            <div>
                <Field
                    name="city"
                    placeholder="City"
                    className="w-full border p-2 rounded"
                />
                <ErrorMessage
                    name="city"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                />
            </div>

            <div>
                <Field
                    name="address"
                    placeholder="Full Address"
                    className="w-full border p-2 rounded"
                />
                <ErrorMessage
                    name="address"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                />
            </div>

            <div>
                <Field
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full border p-2 rounded"
                />
                <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                />
            </div>

            <div className="text-sm text-gray-600 flex gap-2">
                <CarIcon />
                <p>Delivery in <span className="font-semibold">3-5 days</span></p>
            </div>

            <div className="text-sm text-gray-600 flex gap-2">
                <Banknote />
                <p>
                    Payment method:{" "}
                    <span className="font-semibold">
                        Cash on Delivery only
                    </span>
                </p>
            </div>

        </div>
    )
}

export default CheckoutForm