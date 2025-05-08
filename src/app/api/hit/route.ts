import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';
import { sanitizeHexColor, sanitizeText, sanitizeUrl } from '@/lib/sanitize';
import { createHash } from '@/lib/hash';
import { generateShieldsBadge } from '@/lib/badge';

export const GET = async (req: Request): Promise<NextResponse> => {
    const { searchParams } = new URL(req.url);

    const rawUrl = searchParams.get('url') || 'default';
    const rawCountBg = searchParams.get('count_bg') || '#4CAF50';
    const rawTitleBg = searchParams.get('title_bg') || '#555';
    const rawTitle = searchParams.get('title') || 'hits';
    const rawTitleColor = searchParams.get('title_color') || '#FFFFFF';
    const rawCountColor = searchParams.get('count_color') || '#FFFFFF';
    const borderParam = searchParams.get('border');
    const displayParam = searchParams.get('display');

    const url = sanitizeUrl(rawUrl);
    const countBg = sanitizeHexColor(rawCountBg) || '#4CAF50';
    const titleBg = sanitizeHexColor(rawTitleBg) || '#555';
    const titleColor = sanitizeHexColor(rawTitleColor) || '#FFFFFF';
    const countColor = sanitizeHexColor(rawCountColor) || '#FFFFFF';
    const title = sanitizeText(rawTitle, 20);

    const allowedBorders = ['square', 'round', 'none'] as const;
    type BorderStyle = typeof allowedBorders[number];
    const borderStyle: BorderStyle =
        borderParam && allowedBorders.includes(borderParam as BorderStyle)
            ? (borderParam as BorderStyle)
            : 'round';

    const allowedDisplayModes = ['total', 'daily', 'both'] as const;
    type DisplayMode = typeof allowedDisplayModes[number];
    const displayMode: DisplayMode =
        displayParam && allowedDisplayModes.includes(displayParam as DisplayMode)
            ? (displayParam as DisplayMode)
            : 'both';

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const ua = req.headers.get('user-agent') || 'unknown';
    const referer = req.headers.get('referer') || 'unknown';

    const hash = createHash(`${ip}${ua}${referer}`);
    const dedupKey = `dedup:${hash}:${url}`;
    const counterKey = `hits:${url}`;

    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const todayKey = `hits:${url}:${today}`;

    let totalCount: number;
    let todayCount: number;

    try {
        const alreadyCounted = await redis.get<number>(dedupKey);

        if (!alreadyCounted) {
            totalCount = await redis.incr(counterKey);
            todayCount = await redis.incr(todayKey);
            await redis.expire(todayKey, 3 * 24 * 60 * 60);
            await redis.set(dedupKey, '1', { ex: 3600 });
        } else {
            const totalCurrent = await redis.get<number>(counterKey);
            const todayCurrent = await redis.get<number>(todayKey);
            totalCount = totalCurrent ?? 0;
            todayCount = todayCurrent ?? 0;
        }
    } catch (error) {
        console.error('Redis error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

    // Format message based on display mode
    let message: string;
    switch (displayMode) {
        case 'total':
            message = `${totalCount}`;
            break;
        case 'daily':
            message = `${todayCount}`;
            break;
        case 'both':
        default:
            message = `${todayCount} / ${totalCount}`;
            break;
    }

    const svg = generateShieldsBadge(
        `${title}`,
        message,
        countBg,
        borderStyle,
        titleBg,
        undefined, // Use default idSuffix
        titleColor,
        countColor
    );

    return new NextResponse(svg, {
        status: 200,
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
    });
};
