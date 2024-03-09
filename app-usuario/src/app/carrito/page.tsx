import CartItem from "@/components/CartItem";
import getTotalCartCost from "@/functions/getTotalCartCost";
import getUserData from "@/functions/getUserData";
import Image from 'next/image'
import Link from "next/link";
import LinkButton from "@/components/LinkButton";
import { CreditCardIcon, HomeIcon } from "@heroicons/react/24/outline";
import ContextComponent from "@/components/CartItemsContext";
import getCart from "@/functions/getCart";
import getOrders from "@/functions/getOrders";

export default async function page(): Promise<JSX.Element> {
    const [device, user] = await getUserData();
    const cart = await getCart(device, user);
    if (cart.length === 0) return (
        <div className="h-full flex flex-col items-center justify-center px-4">
            <h2 className="text-md text-dark mb-4">Carrito vacio.</h2>
            <Image src="img/carrito-vacio.svg" alt="Ups" width={300} height={300} className="mx-4" />
            <p className="text-md text-center text-dark opacity-80 mt-4">Agrega algun articulo al carrito, paga y tuki!</p>
            <Link href="/comprar" className="mt-4 text-sm underline text-primary">Ir a comprar</Link>
        </div>
    );
    const totalItems = cart.map(x => x.quantity).reduce((pre, curr) => pre + curr);
    const orders = await getOrders(device, user);
    return <>
        <ContextComponent amount={totalItems} orders={orders.length} />
        <div className="h-full flex flex-col justify-between">
            <div className="w-full">
                <h2 className="text-lg my-4 leading-8 text-center text-dark">Mi pedido </h2>
            </div>
            <div className="h-full overflow-scroll">
                {cart.map((item, index) => <CartItem device={device} user={user} key={index} item={item} />)}
            </div>
            <div className="flex flex-col items-center max-h-min">
                <div className="w-full px-4 flex flex-row items-center justify-end mb-2">
                    <p className="text-dark text-sm mr-2">Resumen de compra:</p>
                    <span className="text-dark text-sm opacity-80">{totalItems} artículo{totalItems > 1 ? 's' : ''} por un total de ${getTotalCartCost(cart)}</span>
                </div>
                <div className="flex flex-row justify-around items-center w-full bg-light border-t-1 border-dark border-opacity-30">
                    <LinkButton href="/comprar" icon={<HomeIcon className="w-4 h-4" />}>Volver al inicio</LinkButton>
                    <LinkButton href="pagar" icon={<CreditCardIcon className="w-4 h-4" />}>Ir a pagar</LinkButton>
                </div>
            </div>
        </div></>
}