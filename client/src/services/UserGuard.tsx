import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const UserGuard = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("http://localhost:3000/users/checkLoggedIn", {
                    withCredentials: true,
                });
                setIsLoggedIn(res.data.data?.isLoggedIn === true);
            } catch {
                setIsLoggedIn(false);
            }
        };
        load();
    }, []);

    if (isLoggedIn === null) return null;
    if (!isLoggedIn) return <Navigate to="/login" replace />

    return children
}
export default UserGuard; 