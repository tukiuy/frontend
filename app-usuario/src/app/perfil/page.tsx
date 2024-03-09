import LinkButton from "@/components/LinkButton";
import Order from "@/components/Order";
import getOrders from "@/functions/getOrders";
import getUserData from "@/functions/getUserData";
import { TOrder } from "@/types/TOrder";
import { Claims, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { XMarkIcon } from "@heroicons/react/24/outline";

const getAuthProvider = (user: Claims): string => {
    const parts = user.sub.split("-");
    const provider = parts[0];
    return provider === "google" ? "Gmail" : "Facebook";
}

export default withPageAuthRequired(
    async function Page(): Promise<JSX.Element> {
        const session = await getSession();
        const user = session?.user as Claims;
        const [device, userId] = await getUserData();
        const orders = await getOrders(device, userId);
        return <>
            <div className="w-full justify-center items-center">
                <h2 className="text-center text-lg my-4">Perfil</h2>
                <div className="flex flex-col border-1 border-dark border-opacity-30 mx-4 px-4 rounded-md">
                    <p className="my-4 p-2 border-1 border-dark h-fit  rounded-md w-full border-opacity-10 text-dark text-sm text-opacity-100">
                        Nombre: <span className="ml-2 opacity-70">{user.given_name}</span>
                    </p>
                    <p className="mb-4 p-2 border-1 border-dark h-fit  rounded-md w-full border-opacity-10 text-dark text-sm text-opacity-100">
                        Apellido: <span className="ml-2 opacity-70">{user.family_name}</span>
                    </p>
                    <p className="mb-4 p-2 border-1 border-dark h-fit  rounded-md w-full border-opacity-10 text-dark text-sm text-opacity-100">
                        Accediste usando: <span className="ml-2 opacity-70">{getAuthProvider(user)}</span>
                    </p>
                    {user.email !== '' && (
                        <p className="p-2 border-1 border-dark h-fit  rounded-md w-full border-opacity-10 text-dark text-sm text-opacity-100">
                            Email: <span className="ml-2 opacity-70">{user.email}</span>
                        </p>
                    )}
                    <LinkButton href="api/auth/logout" icon={<XMarkIcon className="w-4 h-4" />}>Cerrar sesión</LinkButton>
                </div>
                <h2 className="text-center text-lg my-4">Mis ordenes</h2>
                <div className="flex flex-col mx-4">
                    {orders.map((x, i) => (<Order order={x} key={i} className="mb-4" />))}
                </div>
            </div>
        </>;
    },
    { returnTo: "/perfil" }
) 
