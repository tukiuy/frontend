import { TOrder } from "@/types/TOrder"
import { TItem } from "@/types/items"
import LinkButton from "./LinkButton"
import { QrCodeIcon } from "@heroicons/react/24/outline"

export default function Order({ order, className }: { order: TOrder; className?: string }): JSX.Element {
    return <>
        <div className={`${className} flex flex-col w-full py-2 px-4 border-1 border-dark border-opacity-30 rounded-md`}>
            <h3 className="text-sm text-dark text-opacity-60">Orden del {order.created.toString()}</h3>
            <table className="w-full table-auto text-end ">
                <thead >
                    <tr>
                        <th className='font-normal text-dark text-sm border-b-1 py-2 text-left'>Articulo</th>
                        <th className='font-normal text-dark text-sm border-b-1 py-2'>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item: TItem, index: number) => {
                        return (
                            <tr key={index}>
                                <td className='text-slate-500 text-sm border-b-1 py-1 text-left'>{item.name}</td>
                                <td className='text-slate-500 text-sm border-b-1 py-1 '>{item.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {order.status === "approved" ? (
                <LinkButton href={`/retirar/${order.id}`} icon={<QrCodeIcon className="w-4"/>}>Mostrar Qr</LinkButton>
            ) : ""}
        </div>
    </>
}