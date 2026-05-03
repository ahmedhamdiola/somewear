import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"

const useProducts = (category?: string, subcategory?: string) => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let API_ENDPOINT = ``
                if (category && subcategory)
                    API_ENDPOINT = `?category=${category}&subcategory=${subcategory}`
                const res = await axios.get(`http://localhost:3000/products${API_ENDPOINT}`);
                console.log(res)
                setProducts(res.data.data);
            } catch (err) {
                const error = err as AxiosError
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, [category, subcategory]);
    return { products, error, loading };

}
export default useProducts 