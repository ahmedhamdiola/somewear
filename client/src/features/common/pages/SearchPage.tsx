import NavBar from '../components/navbar/NavBar'
import { useSearchParams } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import ProductsGrid from '../../product/pages/ProductsGrid';
import NotFoundPage from './NotFoundPage';
import useProducts from '../../product/hooks/useProducts';
import type { Product } from '../../product/utils';
import EmptyCard from './EmptyCard';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/16/solid';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const param = searchParams.get("q");
    const value = param?.trim()
    const { products, error, loading } = useProducts()
    if (value == "" || value == null) return <NotFoundPage />
    const refinedProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(value!.toLowerCase())
    );

    return (
        <div className='flex flex-col'>
            <NavBar />
            {error && <p>{error}</p>}
            {loading && <p>{loading}</p>}
            {refinedProducts.length ? <ProductsGrid
                title={`Search results for ${value} : `}
                products={refinedProducts} />
                : <div className="min-h-screen">
                    <EmptyCard message={`We couldn't find anything for ${value}`}>
                        <MagnifyingGlassCircleIcon className='w-12 h-12 mx-auto text-zinc-300 mb-4' />
                    </EmptyCard>
                </div>
            }
            <FooterBar />
        </div>
    )
}

export default SearchPage
