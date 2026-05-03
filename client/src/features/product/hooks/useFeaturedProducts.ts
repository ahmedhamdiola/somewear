import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import type { Product } from "../utils"

const useFeaturedProduct = () => {
    const [featuredProducts, setFeaturedProduct] = useState<Product[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchFeatProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3000/products/featured`);
                setFeaturedProduct(res.data.data);
            } catch (err) {
                const error = err as AxiosError
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatProduct();

    }, []);
    return { featuredProducts, error, loading };

}
export default useFeaturedProduct 