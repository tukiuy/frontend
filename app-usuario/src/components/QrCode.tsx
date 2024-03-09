'use client'

import { useState } from "react"
import QRCode from "react-qr-code";

export default function OrderQr({ orderId }: { orderId: string }): JSX.Element {
    const [open, setOpen] = useState(false);
    return <>
        <div className="flex flex-col overflow-hidden">
            <button onClick={() => setOpen(true)} className='group rounded-md flex flex-row items-center justify-center relative bg-white px-8 py-2 my-4 overflow-hidden border-1 border-dark border-opacity-30' >
                <span className="absolute top-0 left-0 w-40 h-40 bg-primary rounded-full transition-all ease-in duration-100 group-hover:-mt-16 scale-0 group-hover:animate-one-pulse group-hover:-ml-16"></span>
                {/* {icon} */}
                <span className="relative ml-2 flex justify-center items-center text-sm text-center font-normal text-dark opacity-80">
                    Mostrar
                </span>
            </button>
            <dialog open={open} className="w-full">
                <QRCode value={orderId} size={200} />
            </dialog>
        </div>
    </>
}