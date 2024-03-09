import { TItem } from "@/types/items";

const getTotalCartCost = (cart: TItem[]): number => {
    if (cart.length === 0) return 0;
    return cart.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr);
}

export default getTotalCartCost;
