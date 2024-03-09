import { Claims, getSession } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";


/**
 * 
 * @returns {[string, string]} [Device, User] If device is not defined it is returned as ""
 */
export default async function getUserData() : Promise<[string, string]> {
    const cookieStore = cookies();
    const device = cookieStore.get('device')?.value as string;
    const session = await getSession();
    const userSid = session?.user?.sid;
    const user = userSid === undefined ? "" : userSid;
    return [device, user];
}