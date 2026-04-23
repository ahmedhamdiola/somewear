import NavBar from "../components/NavBar"
import CoverPage from "../../../assets/coverPage.jpg"
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"
const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <NavBar />
            <img src={CoverPage} className="w-full opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] absolute"
            />
            <div className="relative w-full flex justify-center top-220">
                <div className="flex flex-col items-center">
                    <h1 className="text-white font-bold">FOR THOSE WHO NEVER FOLLOW THE CROWD!</h1>
                    <Button
                        className="bg-white text-black w-40 mt-3 cursor-pointer"
                        onClick={() => navigate('/home')}
                    >SHOP ALL</Button>
                </div>
            </div>

        </div>
    )
}
export default LandingPage
