import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import type { Product } from "../utils"

const useProduct = (id: string | undefined) => {
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3000/products/product/${id}`);
                setProduct(res.data.data);
            } catch (err) {
                const error = err as AxiosError
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);
    return { product, error, loading };

}
export default useProduct 