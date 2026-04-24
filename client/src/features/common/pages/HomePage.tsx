import ProductsGrid from "../../product/pages/ProductsGrid"
import FooterBar from "../components/FooterBar"
import NavBar from "../components/NavBar"

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <ProductsGrid />

            <FooterBar />
        </div>
    )
}

export default HomePage
