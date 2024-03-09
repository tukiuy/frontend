import { TItem } from "@/types/items";
import client from "./redisClient";

const getCart = async (device: string, user:string) : Promise<TItem[]> => {
    const cache = await client.json.get(device);
    const keys = Object.keys(cache);
    if (cache === null || !keys.includes("cart"))
      return [] as TItem[]; 
    return cache.cart;
  }

  export default getCart;