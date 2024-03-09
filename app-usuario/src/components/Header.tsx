import Link from "next/link";
import CartIcon from "./icons/CartIcon";
import { getSession } from "@auth0/nextjs-auth0";
import IconUser from "./icons/IconUser";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import OrdersIcon from "./icons/OrdersIcon";

export default async function Header({ className }: { className: string }): Promise<JSX.Element> {
    const session = await getSession();
    const user = session?.user;
    const isLogged = session !== undefined && session !== null;
    return <>
        <div className={`${className} bg-primary flex flex-row items-center justify-center w-full py-4 border-b-2 border-primary-dark`}>
            <span className="w-[44vw] flex flex-row">
                <Link href="/comprar">
                    <h1 className="text-light text-lg">MVD PopUp</h1>
                </Link>
            </span>
            <span className="w-[44vw] flex flex-row justify-end">
                <Link className='flex flex-row items-center w-fit mr-2' href={isLogged ? '/perfil' : '/api/auth/login'}>
                    <p className='text-sm text-light mr-2'>
                        {isLogged ? `${user?.given_name}  ` : 'Acceder '}
                    </p>
                    <IconUser className='w-6 h-6 text-light'/>
                </Link>
                <Link href='carrito' className='flex flex-row items-center justify-center overflow-visible'>
                    <CartIcon />
                </Link>
                <Link href="retirar" className="flex flex-row items-center justify-center">
                    <OrdersIcon />
                </Link>
            </span>
        </div>
    </>
}