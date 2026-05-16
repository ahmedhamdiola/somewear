import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { Product as ProductType } from "../utils";

interface Props {
  product: ProductType;
}
const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      className="relative mx-auto w-full max-w-sm pt-0 shadow-md cursor-pointer
            select-none hover:shadow-lg transition-shadow duration-300"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img src={product?.imageUrl} alt="Event cover" className="pt-3" />
      <CardHeader>
        <CardTitle>{product?.name}</CardTitle>
        <CardDescription>{product?.description}</CardDescription>
        <div className="flex">
          <CardTitle>Price: ${product?.price}</CardTitle>
        </div>
        <CardContent></CardContent>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
