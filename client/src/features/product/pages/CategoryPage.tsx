import { useState } from "react"
import { useParams } from "react-router-dom"

import FooterBar from "../../common/components/FooterBar"
import NavBar from "../../common/components/navbar/NavBar"
import ProductsGrid from "./ProductsGrid"
import NotFoundPage from "../../common/pages/NotFoundPage"

import useCategories from "../../common/components/navbar/hooks/useCategories"
import useProducts from "../hooks/useProducts"
import AppPagination from "../../../components/reusableUI/AppPagination"

const ITEMS_PER_PAGE = 10

const CategoryPage = () => {
    const { main, sub } = useParams()

    const { categories } = useCategories()

    // 👇 ALWAYS CALL HOOK FIRST
    const mainCat = main?.toLowerCase().trim() || ""
    const subCat = sub?.toLowerCase().trim() || ""

    const { products, error, loading } = useProducts(mainCat, subCat)

    const [page, setPage] = useState(1)

    // ❗ now safe to do logic AFTER hooks
    if (!main || !sub) return <NotFoundPage />

    const categoryExist = categories.some(
        (cat) =>
            cat.category.toLowerCase().trim() === mainCat &&
            cat.subcategory.toLowerCase().trim() === subCat
    )

    if (!categoryExist) return <NotFoundPage />

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

            <div className="flex-1">
                <ProductsGrid
                    title={sub?.toUpperCase()}
                    products={paginatedProducts}
                />
            </div>

            <AppPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <FooterBar />
        </div>
    )
}

export default CategoryPage