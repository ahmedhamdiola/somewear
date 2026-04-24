import ProductCard from '../components/ProductCard'

const ProductsGrid = () => {
    return (
        <div className="min-h-screen opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <h1 className="ml-165 my-10 text-4xl font-normal">PRODUCTS</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 p-5 h-full mx-25">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default ProductsGrid
