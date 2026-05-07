import * as Yup from "yup"

export const CheckoutSchema = Yup.object().shape({
    address: Yup.string()
        .min(5, "Address is too short")
        .required("Address is required"),

    city: Yup.string()
        .min(2, "City is too short")
        .required("City is required"),

    phone: Yup.string()
        .matches(/^[0-9+\s()-]+$/, "Invalid phone number")
        .min(8, "Phone number is too short")
        .required("Phone is required"),
})