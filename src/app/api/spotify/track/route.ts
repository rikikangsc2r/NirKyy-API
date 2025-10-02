
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

const spotifyTrackDownloader = async (spotifyTrackUrl: string) => {
  // 1. Get track info from spotifysave.com
  const { data: trackInfo } = await axios.post(
    'https://spotifysave.com/track-info',
    { url: spotifyTrackUrl },
    {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 10; RMX2185 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.7339.207 Mobile Safari/537.36',
        Referer: 'https://spotifysave.com/',
      },
    }
  );

  // 2. Get audio stream from spotifysave.com
  const downloadResponse = await axios.post(
    'https://spotifysave.com/download',
    {
      title: trackInfo.title,
      artist: trackInfo.artist,
      url: trackInfo.url,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 10; RMX2185 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.7339.207 Mobile Safari/537.36',
        Referer: 'https://spotifysave.com/',
      },
      responseType: 'stream',
    }
  );

  // 3. Upload to tmpfile.org
  const form = new FormData();
  const filename = `${trackInfo.title} - ${trackInfo.artist}.mp3`;
  form.append('file', downloadResponse.data, {
    filename: filename,
    contentType: 'audio/mpeg',
  });

  const { data: tmpfileResponse } = await axios.post(
    'https://tmpfile.org/api/v1/upload',
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );
  
  const downloadUrl = tmpfileResponse.data.url;

  return {
    title: trackInfo.title,
    artist: trackInfo.artist,
    duration: trackInfo.duration,
    image: trackInfo.image,
    spotifyUrl: trackInfo.url,
    downloadUrl: downloadUrl,
  };
};

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
    return NextResponse.json({ error: 'Failed to download track: ' + String(error) }, { status: 500 });
  }
}
