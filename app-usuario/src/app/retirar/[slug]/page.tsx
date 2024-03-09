
import LinkButton from "@/components/LinkButton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import QRCode from "react-qr-code";

export default function Page({ params }: { params: { slug: string}}) : JSX.Element {
    return <>
        <div className="flex flex-col w-[88vw] mx-auto">
            <h2 className="my-4 text-center">Mostra el QR y tuki</h2>
            <div className="mx-auto p-4 bg-white">
                <QRCode value={params.slug} size={225} />
            </div>
            <p className="text-dark text-opacity-80 mt-4">Acercate al punto de entrega mas cercano y retira tu orden.</p>
        <LinkButton href="/retirar" icon={<ArrowLeftIcon className="w-4" />}>Volver</LinkButton>
        </div>
    </>
}