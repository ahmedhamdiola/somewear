import { useParams } from 'react-router-dom'
import FooterBar from '../../common/components/FooterBar'
import NavBar from '../../common/components/NavBar'
import ProductsGrid from './ProductsGrid'
import NotFoundPage from '../../common/pages/NotFoundPage'


const list = ["Jackets", "Hoodies", "Pants", "T-shirts", "Shorts", "Swimwear"];

const CategoryPage = () => {
    const { category } = useParams()
    let categoryExist = false;
    categoryExist = list.some(cat => {
        if (category == cat.toLowerCase()) {
            return true;
        }
    }
    )
    if (category == null || category == undefined || !categoryExist) {
        return <NotFoundPage />
    }
    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar />
            <div className="flex-1">
                <ProductsGrid title={category.toUpperCase()} />
            </div>
            <FooterBar />
        </div>
    )
}

export default CategoryPage
