"use server"
import client from "@/functions/redisClient";
import { TItem } from "@/types/items";
import { UserType } from "@/types/user";
import { revalidatePath } from "next/cache";

const isEmpty = (cart: TItem[]): boolean => {
    return cart === null || cart === undefined || cart.length === 0;
}

const addToCart = async (data: FormData) => {
    const device = data.get('device') as string;
    const item = JSON.parse(data.get('item') as string) as TItem;
    const cache = await client.json.get(device);
    const cart = cache.cart as TItem[];
    const itemInCart = cart.find(x => x.id === item.id);
    if (itemInCart === undefined) {
        item.quantity = 1;
        await client.json.arrappend(device, "$.cart", item);
    }
    else {
        itemInCart.quantity += 1;
        const index = cart.findIndex(x => x.id === itemInCart.id);
        await client.json.arrinsert(device, "$.cart", index, item);
    }

    const revalidate = data.get('revalidate') as string;
    revalidatePath(revalidate);
    return;
}


const increaseItemQuantity = async (data: FormData) => {
    const device = data.get('device') as string;
    const itemId = data.get('itemId') as string;

    const cache = await client.json.get(device);
    const cart = cache.cart as TItem[]
    if (isEmpty(cart)) return;

    const item = cart?.find((x) => x.id.toString() === itemId);
    if (item === undefined) return;

    item.quantity += 1;
    const index = cart.findIndex(x => x.id.toString() === itemId);
    await client.json.arrpop(device, "$.cart", index);
    await client.json.arrinsert(device, "$.cart", index, item);
    const revalidate = data.get('revalidate') as string;
    revalidatePath(revalidate);
    return;
}

const decreaseItemQuantity = async (data: FormData) => {
    const device = data.get('device') as string;
    const itemId = data.get('itemId') as string;

    const cache = await client.json.get(device);
    const cart = cache.cart as TItem[]
    if (isEmpty(cart)) return;

    const item = cart.find(x => x.id.toString() === itemId);
    if (item === undefined) return;
    const index = cart?.findIndex(x => x.id.toString() === itemId);

    if (item.quantity !== 1) {
        item.quantity -= 1;
        await client.json.arrpop(device, "$.cart", index);
        await client.json.arrinsert(device, "$.cart", index, item);
    }
    else {
        await client.json.arrpop(device, "$.cart", index);
    }

    const revalidate = data.get('revalidate') as string;
    revalidatePath(revalidate);
    return;
}

const removeItem = async (data: FormData) => {
    const device = data.get('device') as string;
    const itemId = data.get('itemId') as string;

    const cache = await client.json.get(device);
    const cart = cache.cart as TItem[]
    if (isEmpty(cart)) return;

    const index = cart.findIndex(x => x.id.toString() === itemId);
    await client.json.arrpop(device, "$.cart", index);

    const revalidate = data.get('revalidate') as string;
    revalidatePath(revalidate);
    return;
}

export { addToCart, increaseItemQuantity, decreaseItemQuantity, removeItem }