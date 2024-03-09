import client from '@/functions/redisClient';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const body = await request.json();
    await client.set("mp", body);
    return NextResponse.json(
        {
            body: request.body,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        },
    );
}