'use client'

import { CounterContext } from "@/context/store";
import { TItem } from "@/types/items";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react"
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function FormularioMercadoPago({ amount, preference, items, device, user } : { amount: number, preference: string, items: TItem[], device: string, user: string; }): JSX.Element {
    const router = useRouter();
    const { setCount } = useContext(CounterContext);
    initMercadoPago(process.env.mercadoPagoPublicKey as string, {
        locale: 'es-UY'
    });
    const initialization = {
        amount,
        preferenceId: preference
    };
    const onSubmit = async (
        { selectedPaymentMethod, formData }: { selectedPaymentMethod: any; formData: any }
    ) => {
        try {
            const req = await fetch("/api/pagar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formData, items, device, user })
            })
            console.log(req.status)
            if (req.status === 500) router.push("/error");
            else {
                const res = await req.json();
                console.log(res)
                const { paymentStatus, paymentId } = res.body;
                switch (paymentStatus) {
                    case "approved":
                        router.push("/retirar");
                        setCount(0);
                        break;
                    case "rejected":
                        router.push("/pagar/rechazado");
                        break;
                    case "pending":
                        router.push("/pagar/pendiente");
                        break;
                    default:
                        router.push("/error");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const onError = async (error: any) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
    };

    return (<div className="mb-10">
        <Payment
            initialization={initialization}
            customization={{
                paymentMethods: {
                    creditCard: "all",
                    debitCard: "all",
                    mercadoPago: "all"
                }
            }}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
        />
    </div>)

}