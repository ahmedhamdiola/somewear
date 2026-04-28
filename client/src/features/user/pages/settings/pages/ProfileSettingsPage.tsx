import { useFormik } from "formik"
import * as Yup from "yup"

import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Input } from "../../../../../components/ui/input"
import { Button } from "../../../../../components/ui/button"
import { Label } from "../../../../../components/ui/label"

const ProfileSettingsPage = () => {

    const profileFormik = useFormik({
        initialValues: {
            firstName: "Ahmed",
            lastName: "Hamdy",
            email: "ahmed@email.com",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
        }),
        onSubmit: (values) => {
            console.log("PROFILE:", values)
        },
    })

    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required("Current password is required"),
            newPassword: Yup.string()
                .min(6, "Min 6 characters")
                .required("New password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Confirm password is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log("PASSWORD:", values)
            resetForm()
        },
    })

    const f = profileFormik.values.firstName?.[0] || ""
    const l = profileFormik.values.lastName?.[0] || ""
    const initials = (f + l).toUpperCase()
    return (
        <div className="w-full max-w-5xl space-y-6 mt-5 animate-[fadeInUp_0.8s_ease-out_forwards]">

            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your personal information
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
                    {initials}
                </div>
                <div>
                    <p className="font-semibold">
                        {profileFormik.values.firstName} {profileFormik.values.lastName}
                    </p>
                </div>
            </div>

            <form onSubmit={profileFormik.handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label>First Name</Label>
                            <Input
                                name="firstName"
                                value={profileFormik.values.firstName}
                                onChange={profileFormik.handleChange}
                            />
                            {profileFormik.touched.firstName && profileFormik.errors.firstName && (
                                <p className="text-red-500 text-sm">
                                    {profileFormik.errors.firstName}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label>Last Name</Label>
                            <Input
                                name="lastName"
                                value={profileFormik.values.lastName}
                                onChange={profileFormik.handleChange}
                            />
                            {profileFormik.touched.lastName && profileFormik.errors.lastName && (
                                <p className="text-red-500 text-sm">
                                    {profileFormik.errors.lastName}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                value={profileFormik.values.email}
                                onChange={profileFormik.handleChange}
                            />
                            {profileFormik.touched.email && profileFormik.errors.email && (
                                <p className="text-red-500 text-sm">
                                    {profileFormik.errors.email}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Save Profile
                        </Button>
                    </CardContent>
                </Card>
            </form>
            <form onSubmit={passwordFormik.handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label>Current Password</Label>
                            <Input
                                type="password"
                                name="currentPassword"
                                value={passwordFormik.values.currentPassword}
                                onChange={passwordFormik.handleChange}
                            />
                            {passwordFormik.errors.currentPassword && (
                                <p className="text-red-500 text-sm">
                                    {passwordFormik.errors.currentPassword}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                name="newPassword"
                                value={passwordFormik.values.newPassword}
                                onChange={passwordFormik.handleChange}
                            />
                            {passwordFormik.errors.newPassword && (
                                <p className="text-red-500 text-sm">
                                    {passwordFormik.errors.newPassword}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={passwordFormik.values.confirmPassword}
                                onChange={passwordFormik.handleChange}
                            />
                            {passwordFormik.errors.confirmPassword && (
                                <p className="text-red-500 text-sm">
                                    {passwordFormik.errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full">
                            Update Password
                        </Button>

                    </CardContent>
                </Card>
            </form>

        </div>
    )
}

export default ProfileSettingsPage