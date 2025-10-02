
import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";
import crypto from "crypto";

const spotifyTrackDownloader = async (spotifyTrackUrl: string) => {
    const client = new axios.create({
        baseURL: 'https://spotisongdownloader.to',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'cookie': `PHPSESSID=${crypto.randomBytes(16).toString('hex')}; _ga=GA1.1.2675401.${Math.floor(Date.now() / 1000)}`,
            'referer': 'https://spotisongdownloader.to',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const { data: meta } = await client.get('/api/composer/spotify/xsingle_track.php', {
        params: { url: spotifyTrackUrl }
    });
    await client.post('/track.php');
    const { data: dl } = await client.post('/api/composer/spotify/ssdw23456ytrfds.php', {
        "url": spotifyTrackUrl,
        "zip_download": "false",
        "quality": "m4a"
    });
    const result = {...dl, ...meta};
    return result;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Missing track URL' }, { status: 400 });
    }

    try {
        const result = await spotifyTrackDownloader(url);
        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Failed to download track: ' + error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to download track: ' + error }, { status: 500 });
    }
}
