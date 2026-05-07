import { useState } from "react"
import ProductsGrid from "../../product/pages/ProductsGrid"
import FooterBar from "../../common/components/FooterBar"
import NavBar from "../../common/components/navbar/NavBar"
import useProducts from "../../product/hooks/useProducts"
import AppPagination from "../../../components/reusableUI/AppPagination"

const ITEMS_PER_PAGE = 10

const HomePage = () => {
    const { products, error, loading } = useProducts()

    const [page, setPage] = useState(1)

    const totalPages = Math.ceil((products?.length || 0) / ITEMS_PER_PAGE)

    const paginatedProducts = products?.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            {error && <p>{error}</p>}
            {loading && <p>{loading}</p>}
            <ProductsGrid
                products={paginatedProducts}
                title="Products"
            />
            <AppPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
            <FooterBar />
        </div>
    )
}

export default HomePage