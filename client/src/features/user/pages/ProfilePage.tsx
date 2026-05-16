import { useEffect, useState } from "react";
import FooterBar from "../../common/components/FooterBar"
import NavBar from "../../common/components/navbar/NavBar"
import ProfileSideBar from "../components/sidebar/ProfileSideBar"
import ProfileDashboardPage from "./dashboard/pages/ProfileDashboardPage";
import ProfileOrdersPage from "./order/pages/ProfileOrdersPage";
import ProfileSettingsPage from "./settings/pages/ProfileSettingsPage";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/usersAPI";

const ProfilePage = () => {
    const [page, setPage] = useState("Dashboard");
    const navigate = useNavigate()
    useEffect(() => {
        if (page === "Log Out") {
            navigate("/login");
            logout()
        }
    }, [page, navigate]);
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="flex flex-col md:flex-row flex-1 min-h-screen w-full">
                    <div className="w-full md:w-64 md:sticky md:top-0 md:h-screen z-10 bg-white">
                        <ProfileSideBar selected={page} setSelected={setPage} />
                    </div>
                    <div className="flex justify-center flex-1 p-4 md:p-6 w-full overflow-x-hidden">
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
