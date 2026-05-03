import { useParams } from 'react-router-dom'
import FooterBar from '../../common/components/FooterBar'
import NavBar from '../../common/components/navbar/NavBar'
import ProductsGrid from './ProductsGrid'
import NotFoundPage from '../../common/pages/NotFoundPage'
import useCategories from '../../common/components/navbar/hooks/useCategories'
import useProducts from '../hooks/useProducts'


const CategoryPage = () => {
    const { categories } = useCategories()
    const { main, sub } = useParams()
    if (!main || !sub) return <NotFoundPage />

    const mainCat = main.toLowerCase().trim()
    const subCat = sub.toLowerCase().trim()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { products, error, loading } = useProducts(mainCat, subCat)

    const categoryExist = categories.some(cat =>
        cat.category.toLowerCase().trim() === mainCat &&
        cat.subcategory.toLowerCase().trim() === subCat
    )
    if (!categoryExist) return <NotFoundPage />
    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar />
            {error && <p>{error}</p>}
            {loading && <p>{loading}</p>}
            <div className="flex-1">
                <ProductsGrid
                    title={sub.toUpperCase()}
                    products={products}
                />
            </div>
            <FooterBar />
        </div>
    )
}

export default CategoryPage
