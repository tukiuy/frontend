'use client'

import { addToCart, decreaseItemQuantity, increaseItemQuantity } from "@/actions/CartServerActions";
import { TItem } from "@/types/items";
import { Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useOptimistic } from "react";

export default function ItemActions({ user, device, item }: { user: string; device: string; item: TItem }): JSX.Element {
    const [optimisticItem, setOptimisticItem] = useOptimistic<TItem, TItem>(item,
        (item: TItem, newItem: TItem) => {
            return { ...newItem }
        });
    const added = optimisticItem.quantity !== 0;
    return <>
        <Transition
            show={!added}
            as={Fragment}
            enter='transition-all ease-in-out duration-500'
            enterFrom='opacity-0 -translate-y-5'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in-out duration-300'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-5'
        >
            <form action={async (data: FormData) => {
                setOptimisticItem({ ...item, quantity: 1 });
                await addToCart(data);
            }} className='absolute mx-auto my-auto'>
                <input type="hidden" name="user" value={user} />
                <input type="hidden" name="device" value={device} />
                <input type="hidden" name="item" value={JSON.stringify(item)} />
                <input type="hidden" name="revalidate" value={"/comprar"} />

                <button type="submit" className='group rounded-3xl overflow-hidden relative bg-primary px-6 py-2 shadow-sm'>
                    <span className="absolute w-40 h-40 bg-light mt-8 -ml-6 rounded-full transition-all ease-in duration-100
                group-hover:-mt-16 group-hover:rotate-45 group-hover:-ml-16"></span>
                    <span className="relative flex justify-center items-center text-sm font-normal text-light group-hover:text-primary-dark">
                        Agregar
                    </span>
                </button>
            </form>
        </Transition>
        <Transition
            show={added}
            as={Fragment}
            enter='transition ease-in-out duration-300'
            enterFrom='opacity-0 translate-y-5'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in-out duration-100'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-5'>

            <div className='absolute mx-auto my-auto flex flex-row items-center'>
                <form className="flex flex-row items-center" action={async (data: FormData) => {
                    setOptimisticItem({...item, quantity: optimisticItem.quantity - 1});
                    await decreaseItemQuantity(data);
                }}>
                    <input type="hidden" name="itemId" value={item.id} />
                    <input type="hidden" name="user" value={user} />
                    <input type="hidden" name="revalidate" value={"/comprar"} />
                    <input type="hidden" name="device" value={device} />
                    <button className='w-[5vw] text-primary-dark' type="submit"><MinusIcon /></button>
                </form>
                <p className='px-1 font-medium text-base text-dark'>${optimisticItem.quantity * item.price}</p>
                <form className="flex flex-row items-center" action={async (data: FormData) => {
                    setOptimisticItem({ ...item, quantity: item.quantity + 1 });
                    await increaseItemQuantity(data);
                }}>
                    <input type="hidden" name="itemId" value={item.id} />
                    <input type="hidden" name="user" value={user} />
                    <input type="hidden" name="device" value={device} />
                    <input type="hidden" name="revalidate" value={"/comprar"} />
                    <button className='w-[5vw] text-primary-dark' type="submit"><PlusIcon /></button>
                </form>
            </div>
        </Transition></>
}