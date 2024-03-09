
import FormularioMercadoPago from '@/components/FormularioMercadoPago';
import LinkButton from '@/components/LinkButton';
import getTotalCartCost from '@/functions/getTotalCartCost';
import getUserData from '@/functions/getUserData';
import client from '@/functions/redisClient';
import Image from 'next/image'
import Link from 'next/link';
import { TItem } from '@/types/items';
import { HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import getCart from '@/functions/getCart';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const getPreferenceId = async (cart: TItem[], device: string, user: string): Promise<string> => {
    const request = {
        back_urls: {
        },
        expires: false,
        items: cart.map(x => {
            return {
                id: x.id,
                title: x.name,
                description: x.description,
                picture_url: x.imageUrl,
                category_id: "others",
                quantity: x.quantity,
                currency_id: "UYU",
                unit_price: x.price
            }
        }),
        metadata: {
            device,
            user
        }
    }
    const options: RequestInit = {
        method: "POST",
        cache: "default",
        next: {
            tags: ["preference"]
        },
        headers: {
            "Authorization": `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }
    const res = await fetch(`${process.env.MERCADOPAGO_API_URL as string}/checkout/preferences`, options);
    const resData = await res.json();
    return resData.id as string;
}
export default withPageAuthRequired(
    async function Page(): Promise<JSX.Element> {
        const [device, user] = await getUserData();
        const cart = await getCart(device, user);
        if (cart.length === 0) return (
            <div className="h-full flex flex-col items-center justify-center px-4">
                <h2 className="text-md text-dark mb-4">No hay nada para pagar todavía.</h2>
                <Image src="img/carrito-vacio.svg" alt="Ups" width={300} height={300} className="mx-4" />
                <p className="text-md text-center text-dark opacity-80 mt-4">Agrega algun articulo al carrito, volve aca y tuki!</p>
                <Link href="/comprar" className="mt-4 text-sm underline text-primary">Ir a comprar</Link>
            </div>
        );
        const preference_id = await getPreferenceId(cart, device, user);
        const cartNotEmpty = cart.length > 0;
        return <>
            <div className="flex flex-col bg-white min-h-full">
    
                <h3 className='ml-4 my-4 font-medium text-lg'>Resumen del pedido</h3>
                <div className='py-2 px-4 mx-4 rounded-md border-1 border-dark border-opacity-10 mb-2 overflow-scroll'>
                    <table className="w-full table-auto text-end ">
                        <thead >
                            <tr>
                                <th className='font-normal text-dark text-sm border-b-1 py-2 text-left'>Articulo</th>
                                <th className='font-normal text-dark text-sm border-b-1 py-2'>Cantidad</th>
                                <th className='font-normal text-dark text-sm border-b-1 py-2'>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item: TItem, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-slate-500 text-sm border-b-1 py-1 text-left'>{item.name}</td>
                                        <td className='text-slate-500 text-sm border-b-1 py-1 '>{item.quantity}</td>
                                        <td className='text-slate-500 text-sm border-b-1 py-1 '>${item.quantity * item.price}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td></td>
                                <td className='font-normal text-sm '>Total</td>
                                <td className='font-normal text-sm '>${getTotalCartCost(cart)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <FormularioMercadoPago user={user} device={device} amount={getTotalCartCost(cart)} preference={preference_id} items={cart} />
                <div data-show={cartNotEmpty} className="fixed bottom-0 w-full flex flex-row justify-around bg-light border-t-1 border-dark border-opacity-30
            transform transition-transform duration-500 data-[show=true]:translate-y-0 data-[show=false]:translate-y-full">
                    <LinkButton href="/comprar" icon={<HomeIcon className="w-4 h-4" />}>Volver al inicio</LinkButton>
                    <LinkButton href="carrito" icon={<ShoppingCartIcon className="w-4 h-4" />}>Ir al carrito</LinkButton>
                </div>
            </div>
        </>;
    }, 
    { returnTo: "/pagar" }
)