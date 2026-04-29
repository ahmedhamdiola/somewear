import ProductsGrid from "../product/pages/ProductsGrid"
import FooterBar from "../common/components/FooterBar"
import NavBar from "../common/components/NavBar"

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <ProductsGrid title="Products" />
            <FooterBar />
        </div>
    )
}

export default HomePage
