import axios from "axios";

export const LoginChecker = async () => {
    try {
        const res = await axios.get(
            "http://localhost:3000/users/checkLoggedIn",
            {
                withCredentials: true,
            }
        );

        return res.data.data?.isLoggedIn === true;
    } catch {
        return false;
    }
};