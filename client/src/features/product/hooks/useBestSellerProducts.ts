import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import type { Product } from "../utils"

const useBestSellerProducts = () => {
    const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([])
    const [bestError, setBestError] = useState('')
    const [bestLoading, setBestLoading] = useState(false)

    useEffect(() => {
        const fetchBestProduct = async () => {
            try {
                setBestLoading(true);
                const res = await axios.get(`http://localhost:3000/products/best-sellers`);
                console.log(res.data.data)
                setBestSellerProducts(res.data.data);
            } catch (err) {
                const error = err as AxiosError
                setBestError(error.message);
            } finally {
                setBestLoading(false);
            }
        };

        fetchBestProduct();

    }, []);
    return { bestSellerProducts, bestError, bestLoading };

}
export default useBestSellerProducts 