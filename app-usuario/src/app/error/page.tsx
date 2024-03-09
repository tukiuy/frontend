import LinkButton from "@/components/LinkButton";
import { HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Page() {
    return (
        <div className="w-[88vw] h-full mx-auto flex flex-col items-center justify-center">
            <h2 className="text-lg mt-4 text-center">Oops, parce que ocurrio un error</h2>
            <Image src="img/carrito-vacio.svg" alt="Ups" width={300} height={300} className="mx-4" />
            <div className="w-[56vw] mx-auto">
                <LinkButton href="/comprar" icon={<HomeIcon className="w-4" />}>Volver al inicio.</LinkButton>
            </div>
        </div>)
}