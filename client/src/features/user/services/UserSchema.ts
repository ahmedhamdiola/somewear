import * as Yup from "yup"

export const UserSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must contain numbers only")
        .required("Phone is required"),
    address: Yup.string().required("Address is required"),
})