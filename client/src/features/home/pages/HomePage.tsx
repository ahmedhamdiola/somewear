import ProductsGrid from "../../product/pages/ProductsGrid"
import FooterBar from "../../common/components/FooterBar"
import NavBar from "../../common/components/navbar/NavBar"
import useProducts from "../../product/hooks/useProducts"

const HomePage = () => {
    const { products, error, loading } = useProducts()

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            {error && <p>{error}</p>}
            {loading && <p>{loading}</p>}
            <ProductsGrid
                products={products}
                title="Products" />
            <FooterBar />
        </div>
    )
}

export default HomePage
