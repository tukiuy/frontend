import { TItem } from "./items"

export type TStatus = "approved" | "delivered";

export type TOrder = {
    id: string,
    paymentId: number,
    user: string | undefined;
    device: string;
    items: TItem[],
    created: Date,
    status: TStatus;
}