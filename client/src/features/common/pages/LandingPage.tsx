import NavBar from "../components/navbar/NavBar"
import CoverPage from "../../../assets/coverPage.jpg"
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"
import { Separator } from "../../../components/ui/separator"
import FooterBar from "../components/FooterBar"
import ProductCard from "../../product/components/ProductCard"
import useFeaturedProducts from "../../product/hooks/useFeaturedProducts"
import useBestSellerProducts from "../../product/hooks/useBestSellerProducts"
const LandingPage = () => {
    const navigate = useNavigate()
    const { featuredProducts, error, loading } = useFeaturedProducts()
    const { bestSellerProducts, bestError, bestLoading } = useBestSellerProducts()
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
                        onClick={() => navigate('/products')}
                    >SHOP ALL</Button>
                </div>
            </div>
            <Separator />
            <div className="mt-15 flex items-center">
                <h1 className="ml-15 text-3xl font-bold">FEATURED PRODUCTS</h1>
            </div>
            <div className="grid grid-cols-5 gap-7 p-5 h-full">
                {error && <p>{error}</p>}
                {loading && <p>{loading}</p>}
                {featuredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <Separator />
            <div className="mt-15 flex items-center">
                <h1 className="ml-15 text-3xl font-bold">BEST SELLER PRODUCTS</h1>
            </div>
            <div className="grid grid-cols-5 gap-7 p-5 h-full">
                {bestError && <p>{bestError}</p>}
                {bestLoading && <p>{bestLoading}</p>}
                {bestSellerProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <div className="bg-black py-12 px-6">
                <div className="max-w-3xl mx-auto text-white text-center space-y-4 leading-relaxed">

                    <p>
                        SOMEWEAR.. where fashion meets attitude and creativity knows no bounds!
                    </p>

                    <p>
                        Our brand was established with a vision to bring a unique and edgy twist
                        to the fashion world, inspired by the rebellious spirit of street culture.
                    </p>

                    <p>
                        Thank you for choosing our brand and being part of our community.
                        Together, we can redefine what it means to be a fashion rebel and change
                        the world, one bold and stylish statement at a time.
                    </p>

                </div>
            </div>
            <FooterBar />
        </div>
    )
}
export default LandingPage
