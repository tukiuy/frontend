'use client'

import { OrdersContext } from "@/context/store"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"

export default function OrdersIcon() : JSX.Element {
    const { orders } = useContext(OrdersContext);
    return <div className="ml-2 relative flex flex-row overflow-visible items-center justify-center">
        {orders > 0 ? (
            <span className="absolute -top-1 -right-1 text-sm bg-primary  border-1 
            border-light border-opacity-50 text-light text-opacity-80  rounded-full w-4 flex 
            flex-row items-center justify-center h-4">{orders}</span>
        ) : ''}
        <ShoppingBagIcon className="w-6 h-6 text-light group-hover:text-light" />
    </div>
}