'use client'

import { CounterContext } from "@/context/store";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function CartIcon(): JSX.Element {
    const { count } = useContext(CounterContext);
    return <div className="relative flex flex-row overflow-visible items-center justify-center">
        {count > 0 ? (
            <span className="absolute -top-1 -right-1 text-sm bg-primary  border-1 border-light border-opacity-50 text-light text-opacity-80  rounded-full w-4 flex flex-row items-center justify-center h-4">{count}</span>
        ) : ''}
        <ShoppingCartIcon className="w-6 h-6 text-light group-hover:text-light" />
    </div>
}