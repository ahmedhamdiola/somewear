import { useEffect, useState } from "react";
import FooterBar from "../../common/components/FooterBar"
import NavBar from "../../common/components/navbar/NavBar"
import ProfileSideBar from "../components/sidebar/ProfileSideBar"
import ProfileDashboardPage from "./dashboard/pages/ProfileDashboardPage";
import ProfileOrdersPage from "./order/pages/ProfileOrdersPage";
import ProfileSettingsPage from "./settings/pages/ProfileSettingsPage";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [page, setPage] = useState("Dashboard");
    const navigate = useNavigate()
    useEffect(() => {
        if (page === "Log Out") {
            navigate("/login");
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }, [page, navigate]);
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="flex flex-1 min-h-screen">
                    <div className="sticky top-0 h-screen">
                        <ProfileSideBar selected={page} setSelected={setPage} />
                    </div>
                    <div className="flex justify-center flex-1 p-6">
                        {page == "Dashboard" ? <ProfileDashboardPage navigateDashboard={setPage} /> :
                            page == "Settings" ? <ProfileSettingsPage /> :
                                page == "My Orders" ? <ProfileOrdersPage /> :
                                    <div className="flex justify-center items-center text-4xl font-bold">
                                        <h1>
                                            Option Not Found
                                        </h1>
                                    </div>
                        }
                    </div>

                </div>
                <FooterBar />
            </div>

        </div>
    )
}

export default ProfilePage
