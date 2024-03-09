"use client"

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { TItem } from "@/types/items";
import { decreaseItemQuantity, increaseItemQuantity } from "@/actions/CartServerActions";
import { useOptimistic } from "react";

const CartItem = ({ item, device, user }: { item: TItem; device: string; user: string; }): JSX.Element => {
    const [optimisticItem, setOptimisticItem] = useOptimistic<TItem, number>(item, 
    (item: TItem, newQuantity: number) => {
        return { ...item, quantity: newQuantity }
    });
    return (
        <div className='flex flex-col border-1 border-dark border-opacity-10 bg-white rounded-md py-2 px-4 mx-4 mb-4'>
            <span className="w-full mb-2 flex flex-row">
                <h2 className="w-full text-md text-dark py-1">{item.name} </h2>
                <div className="flex flex-row items-center">
                    <form className="flex flex-row items-center" action={async (data:FormData) => {
                        setOptimisticItem(optimisticItem.quantity - 1);
                        await decreaseItemQuantity(data);
                    }}>
                        <input type="hidden" name="device" value={device} />
                        <input type="hidden" name="user" value={user} />
                        <input type="hidden" name="itemId" value={item.id} />
                        <input type="hidden" name="revalidate" value={"carrito"} />
                        <button className='text-dark' type="submit">
                            {optimisticItem.quantity === 1 ? (
                                <TrashIcon className="w-4 h-4" />
                            ) : (
                                <MinusIcon className="w-4 h-4" />
                            )}
                        </button>
                    </form>
                    <form className="flex flex-row items-center" action={async (data:FormData) => {
                        setOptimisticItem(optimisticItem.quantity + 1);
                        await increaseItemQuantity(data);
                    }}>
                        <input type="hidden" name="device" value={device} />
                        <input type="hidden" name="user" value={user} />
                        <input type="hidden" name="itemId" value={item.id} />
                        <input type="hidden" name="revalidate" value={"carrito"} />
                        <span className='text-sm mx-1 text-dark'>{optimisticItem.quantity}</span>
                        <button className='text-dark' type="submit">
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </span>
            <div className="flex flex-row justify-between">
                <span className="text-sm text-slate-600">{item.description}</span>
                <span className="text-sm text-dark">${item.price * optimisticItem.quantity}</span>
            </div>
        </div>
    )
}

export default CartItem;