import NavBar from "../components/NavBar"
import CoverPage from "../../../assets/coverPage.jpg"
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"
import { Separator } from "../../../components/ui/separator"
import FooterBar from "../components/FooterBar"
const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <NavBar />
            <img src={CoverPage} className="w-full opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] relative"
            />
            <div className="absolute w-full flex justify-center top-270">
                <div className="flex flex-col items-center">
                    <h1 className="text-white font-bold text-3xl">FOR THOSE WHO NEVER FOLLOW THE CROWD!</h1>
                    <Button
                        className="bg-white text-black w-40 mt-5 cursor-pointer font-semibold"
                        onClick={() => navigate('/home')}
                    >SHOP ALL</Button>
                </div>
            </div>
            <Separator />
            <div className="h-40 flex items-center">
                <h1 className="ml-5 text-4xl font-bold">FEATURED PRODUCTS</h1>
            </div>
            <FooterBar />
        </div>
    )
}
export default LandingPage
