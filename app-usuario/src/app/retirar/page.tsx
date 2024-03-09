import Order from "@/components/Order";
import getOrders from "@/functions/getOrders";
import getUserData from "@/functions/getUserData";

export default async function Page() : Promise< JSX.Element> {
    const [device, user] = await getUserData();
    const orders = await getOrders(device, user);
    return <>
        <main className="flex flex-col w-[88vw] mx-auto mt-4">
            <h2 className="text-lg text-center text-dark my-2">Mis compras</h2>
            {orders.map((x,i) => (<Order key={i} order={x} className="mb-4"/>))}
        </main>
    </>;
}