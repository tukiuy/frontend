import { getRequestData } from "@/functions/getUrl";
import client from "@/functions/redisClient";
import { TOrder } from "@/types/TOrder";
import { randomUUID } from "crypto";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const HandlePayment = async (paymentRequest: any): Promise<[string, number]> => {
    const mpClient = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESSTOKEN as string, options: { timeout: 5000, idempotencyKey: 'TUKI-TEST' } });
    const payment = new Payment(mpClient);
    const paymentResponse = await payment.create({ body: { ...paymentRequest } });
    return [paymentResponse.status as string, paymentResponse.id as number];
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const [paymentStatus, paymentId] = await HandlePayment(body.formData);
        console.log("Payment status %s", paymentStatus)
        console.log("Payment id %d", paymentId)
        if (paymentStatus === 'approved') {
            const order: TOrder = {
                id: randomUUID(),
                paymentId: paymentId,
                device: body.device,
                user:  body.user,
                items: body.items,
                created: new Date(),
                status: "approved"
            };
            console.log(order)
            const ordersAppend = await client.json.arrappend("orders", "$", order);
            const deviceOrdersAppend = await client.json.arrappend(body.device, "$.orders", order);
            const deleteCart = await client.json.del(body.device, "$.cart");
            console.log("Resultado ordenes: %d, resultado ordenes disp: %d, resultado borrado: %d", ordersAppend, deviceOrdersAppend, deleteCart);
            revalidatePath("/comprar");
            revalidatePath("/carrito");
        }

        fetch(getRequestData("CreatePurchase"), {
            method: "POST",
            body: JSON.stringify({
                sub: body.user,
                idDispositivo: body.device,
                idEvento: process.env.ID_EVENTO,
                articulosComprados: body.items.map((x: any) => {
                    return {
                        idArticulo: x.id,
                        cantidad: x.quantity
                    }
                }),
                idTransaccionMercadoPago: paymentId,
                estadoPago: paymentStatus,
                idComercio: process.env.ID_EVENTO 
            })
        }).catch(err => console.error(err));
        return NextResponse.json({ body: { paymentStatus, paymentId } });

    } catch (err: any) {
        console.log(err)
        return NextResponse.error()
    }
}