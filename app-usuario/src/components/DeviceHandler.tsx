"use client"

import { useRouter } from "next/navigation"

export default function DeviceHandler({ device } : { device: string }) : JSX.Element {
    const router = useRouter();
    if (device === undefined || device === "" || device == null) router.push("/");
    return <></>
}