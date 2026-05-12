import { useEffect, useState } from "react"
import { getFeedbackByProduct, createFeedback } from "../services/feedbackAPI"

export interface Feedback {
    id: number
    name: string
    comment: string
    rating: number
}

export const useFeedback = (productId: number) => {
    const [reviews, setReviews] = useState<Feedback[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!productId) return

        const fetchFeedback = async () => {
            setLoading(true)

            const data = await getFeedbackByProduct(productId)
            setReviews(data)

            setLoading(false)
        }

        fetchFeedback()
    }, [productId])

    const addReview = async (data: {
        name: string
        userId: number
        productId: number
        comment: string
        rating: number
    }) => {
        await createFeedback(data)

        // refresh safely
        const updated = await getFeedbackByProduct(productId)
        setReviews(updated)
    }

    return {
        reviews,
        loading,
        addReview
    }
}