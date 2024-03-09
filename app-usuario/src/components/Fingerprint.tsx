'use client'

import getFingerprint from '@/functions/getFingerprint';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Fingerprint() : JSX.Element {
    const cookies = useCookies();
    const router = useRouter();
    const deviceCookie = cookies.get('device');
    useEffect(() => {
        const setDevice = async () => {
            const device = await getFingerprint();
            cookies.set('device', device);
            router.push("/comprar");
        }
        if (deviceCookie === undefined || deviceCookie === null) setDevice();
        else router.push("/comprar");
        }, [])
    return <></>
} 