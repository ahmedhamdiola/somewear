import { useEffect, useState } from "react"
import type { UserInterface } from "../services/interfaces"
import { getAllOrders, getLastOrders, getOrdersCount, getTotalAmount, getUserProfile } from "../services/usersAPI"
import type { AxiosError } from "axios"

export const useUsers = () => {
    const [user, setUser] = useState<UserInterface>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [count, setCount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [lastOrders, setLastOrders] = useState([])
    const [allOrders, setAllOrders] = useState([])
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

    useEffect(() => {
        const fetchLastOrders = async () => {
            setLoading(true)
            try {
                const res = await getLastOrders()
                setLastOrders(res)
            }
            catch (err) {
                const error = err as AxiosError
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchLastOrders()
    }, [])

    useEffect(() => {
        const fetchAllOrders = async () => {
            setLoading(true)
            try {
                const res = await getAllOrders()
                setAllOrders(res)
            }
            catch (err) {
                const error = err as AxiosError
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchAllOrders()
    }, [])

    return { user, loading, error, count, totalAmount, lastOrders, allOrders }
}


