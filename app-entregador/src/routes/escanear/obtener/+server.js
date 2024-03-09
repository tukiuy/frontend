import client from '$lib/server/client';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const res = await request.json()
	await client.json.arrappend("entregador:orders", "$", res);
	const orders = await client.json.get("orders");
	// @ts-ignore
	const order = orders.find(x => x.id === res.id)
	return json({...order})
}