import { useEffect, useState } from "react"
import type { UserInterface } from "../services/interfaces"
import { getOrdersCount, getTotalAmount, getUserProfile } from "../services/usersAPI"
import type { AxiosError } from "axios"

export const useUsers = () => {
    const [user, setUser] = useState<UserInterface>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [count, setCount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const res = await getUserProfile()
                setUser(res)
            }
            catch (err) {
                const error = err as AxiosError
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const fetchCount = async () => {
            setLoading(true)
            try {
                const res = await getOrdersCount()
                setCount(res.count)
            }
            catch (err) {
                const error = err as AxiosError
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchCount()
    }, [])
    useEffect(() => {
        const fetchTotalAmount = async () => {
            setLoading(true)
            try {
                const res = await getTotalAmount()
                setTotalAmount(res.total_revenue)
            }
            catch (err) {
                const error = err as AxiosError
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchTotalAmount()
    }, [])


    return { user, loading, error, count, totalAmount }
}


