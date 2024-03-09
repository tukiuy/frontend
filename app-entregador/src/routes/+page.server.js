import client from "$lib/server/client";
import { redirect } from "@sveltejs/kit";
// import { redirect } from "@sveltejs/kit";


export async function load() {
    const cache = await client.json.get('entregador:users');
    return {
        users: cache
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const user = data.get("user-id");
        const login = {
            user,
            date: new Date()
        }
        const result = await client.json.arrappend('entregador:logins', '$', login);
        console.log(result)
        throw redirect(303, "escanear");
    }
}