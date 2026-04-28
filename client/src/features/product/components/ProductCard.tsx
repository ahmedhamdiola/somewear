import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import Product from "../../../assets/Product.png"

interface Props {
    onClick?: () => void
}
const ProductCard = ({ onClick }: Props) => {
    return (
        <Card
            className="relative mx-auto w-full max-w-sm pt-0 shadow-md cursor-pointer
            select-none hover:shadow-lg transition-shadow duration-300"
            onClick={onClick}
        >
            <img
                src={Product}
                alt="Event cover"
                className="pt-3"
            />
            <CardHeader>
                <CardTitle>Oversized hoodie</CardTitle>
                <CardDescription>
                    A practical talk on component APIs, accessibility, and shipping
                    faster.
                </CardDescription>
                <div className="flex">
                    <CardTitle>Price: $349.99</CardTitle>
                </div>
                <CardContent>
                </CardContent>
            </CardHeader>

        </Card>)
}

export default ProductCard
