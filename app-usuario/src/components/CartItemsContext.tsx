/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CounterContext, OrdersContext } from "@/context/store"
import { useContext, useEffect } from "react"

export default function CartItemsContext({ amount, orders } : { amount: number; orders: number; }): JSX.Element {
    const { setCount } = useContext(CounterContext);
    const { setOrders } = useContext(OrdersContext);
    useEffect(() => setCount(amount), [])
    useEffect(() => setCount(amount), [amount])
    useEffect(() => setOrders(orders), [])
    useEffect(() => setOrders(orders), [orders])
    return <></>
}  