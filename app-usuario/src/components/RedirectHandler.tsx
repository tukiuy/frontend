import getUserData from "@/functions/getUserData";
import DeviceHandler from "./DeviceHandler";

export default async function RedirectionHandler() : Promise<JSX.Element> {
    const [device, user] = await getUserData()
    return <DeviceHandler device={device} />
}