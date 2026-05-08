import { useState, useEffect } from "react"
import { getProductVariantByProductId } from "./productAPI"

export const useVariants = (productId?: string) => {
    const [variants, setVariants] = useState([])

    useEffect(() => {
        if (!productId) return

        const load = async () => {
            const res = await getProductVariantByProductId(productId)
            setVariants(res.data)
        }
        load()
    }, [productId])

    return { variants }
}