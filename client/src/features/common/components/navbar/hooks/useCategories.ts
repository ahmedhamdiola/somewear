import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import type { Category } from "../utils"

const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:3000/products/category`);
                setCategories(res.data.data);
            } catch (err) {
                const error = err as AxiosError
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();

    }, []);
    return { categories, error, loading };

}
export default useCategories 