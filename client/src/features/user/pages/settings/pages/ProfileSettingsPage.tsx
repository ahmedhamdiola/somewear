// ProfileSettingsPage.tsx

import { useFormik } from "formik"

import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Input } from "../../../../../components/ui/input"
import { Button } from "../../../../../components/ui/button"
import { Label } from "../../../../../components/ui/label"
import { UserSchema } from "../../../services/UserSchema"
import { toast } from "react-toastify"
import { useUsers } from "../../../hooks/useUsers"
import { updateUserProfile } from "../../../services/usersAPI"

const ProfileSettingsPage = () => {
    const { user } = useUsers()
    console.log(user)

    const profileFormik = useFormik({
        enableReinitialize: true,

        initialValues: {
            username: user?.username || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
        },
        validationSchema: UserSchema,
        onSubmit: (values) => {
            const userData = values
            updateUserProfile(userData)
            toast.success("Profile updated successfully!")
            console.log("PROFILE:", values)
        },
    })

    const renderError = (field: keyof typeof profileFormik.values) =>
        profileFormik.touched[field] &&
        profileFormik.errors[field] && (
            <p className="text-red-500 text-sm">
                {profileFormik.errors[field]}
            </p>
        )

    const initials = profileFormik.values.username
        .split(" ")
        .map((name) => name[0] || "")
        .slice(0, 2)
        .join("")
        .toUpperCase()
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
                <p className="font-semibold">
                    {profileFormik.values.username}
                </p>
            </div>
            <form onSubmit={profileFormik.handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label>Username</Label>
                            <Input
                                name="username"
                                value={profileFormik.values.username}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                            />
                            {renderError("username")}
                        </div>
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={profileFormik.values.email}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                            />
                            {renderError("email")}
                        </div>
                        <div className="space-y-1">
                            <Label>Phone</Label>
                            <Input
                                type="tel"
                                name="phone"
                                value={profileFormik.values.phone}
                                onChange={(e) => {
                                    const onlyNumbers = e.target.value.replace(/\D/g, "")
                                    profileFormik.setFieldValue("phone", onlyNumbers)
                                }}
                                onBlur={profileFormik.handleBlur}
                            />
                            {renderError("phone")}
                        </div>
                        <div className="space-y-1">
                            <Label>Address</Label>
                            <Input
                                name="address"
                                value={profileFormik.values.address}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                            />
                            {renderError("address")}
                        </div>
                        <Button type="submit" className="w-full">
                            Save Profile
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default ProfileSettingsPage