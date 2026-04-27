import ProductCard from '../components/ProductCard'

interface Props {
    title: string | null
    marginLeft?: string
}
const ProductsGrid = ({ title, marginLeft }: Props) => {
    return (
        <div className="min-h-screen opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="flex items-center justify-center">
                <h1 className={`my-10 text-4xl font-normal ${marginLeft}`}>{title}</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 p-5 h-full mx-25">
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
