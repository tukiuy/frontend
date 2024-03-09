import { TOrder } from "@/types/TOrder";

export default async function getOrders(device: string, user: string): Promise<TOrder[]> {
    try {
        const url = new URL(
            `/v1/Compras/${process.env.ID_EVENTO}/${device}`, 
            process.env.URL_API_COMPRAS);
        const req = new Request(url, {
            headers: {
                "XApiKey": process.env.API_KEY_COMPRAS as string,
                "Content-Type": "application/json"
            },
            cache: "default",
            next: { revalidate: 3600 }
            }
        );
        const response = await fetch(req);
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        return [] as TOrder[];
    }
}