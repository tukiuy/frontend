'use client'

import { CounterContext, OrdersContext } from "@/context/store";
import { useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }): JSX.Element {
    const [count, setCount] = useState(0);
    const [orders, setOrders] = useState(0);
    return (
        <OrdersContext.Provider value={{ orders, setOrders }}>
            <CounterContext.Provider value={{ count, setCount }}>
                {children}
            </CounterContext.Provider>
        </OrdersContext.Provider>)
}