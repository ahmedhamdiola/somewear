import NavBar from '../components/NavBar'
import { useSearchParams } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import ProductsGrid from '../../product/pages/ProductsGrid';
import NotFoundPage from './NotFoundPage';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const value = searchParams.get("q");
    if (value == "" || value == null) {
        return <NotFoundPage />
    }

    return (
        <div>
            <NavBar />
            <ProductsGrid title={`Search results for ${value} : `} />
            <FooterBar />
        </div>
    )
}

export default SearchPage
