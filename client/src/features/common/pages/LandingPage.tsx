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

            {/* ── HERO ── */}
            <div className="relative">
                <img
                    src={CoverPage}
                    className="w-full object-cover max-h-[60vh] md:max-h-full opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <h1 className="text-white font-bold text-lg sm:text-2xl md:text-3xl text-center drop-shadow-lg">
                        FOR THOSE WHO NEVER FOLLOW THE CROWD!
                    </h1>
                    <Button
                        className="bg-white text-black w-36 mt-4 cursor-pointer font-semibold"
                        onClick={() => navigate('/products')}
                    >
                        SHOP ALL
                    </Button>
                </div>
            </div>

            <Separator />

            {/* ── FEATURED PRODUCTS ── */}
            <div className="mt-10 px-4 md:px-15">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">FEATURED PRODUCTS</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-7 px-4 md:p-5">
                {error && <p>{error}</p>}
                {loading && <p>{loading}</p>}
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <Separator />

            {/* ── BEST SELLERS ── */}
            <div className="mt-10 px-4 md:px-15">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">BEST SELLER PRODUCTS</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-7 px-4 md:p-5">
                {bestError && <p>{bestError}</p>}
                {bestLoading && <p>{bestLoading}</p>}
                {bestSellerProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* ── BRAND SECTION ── */}
            <div className="bg-black py-12 px-6 mt-10">
                <div className="max-w-3xl mx-auto text-white text-center space-y-4 leading-relaxed text-sm md:text-base">
                    <p>SOMEWEAR.. where fashion meets attitude and creativity knows no bounds!</p>
                    <p>Our brand was established with a vision to bring a unique and edgy twist
                        to the fashion world, inspired by the rebellious spirit of street culture.</p>
                    <p>Thank you for choosing our brand and being part of our community.
                        Together, we can redefine what it means to be a fashion rebel and change
                        the world, one bold and stylish statement at a time.</p>
                </div>
            </div>

            <FooterBar />
        </div>
    )
}

export default LandingPage

