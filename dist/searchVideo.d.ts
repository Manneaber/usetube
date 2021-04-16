import Video from './types/video';
export default function searchVideo(terms: string, token?: string, apikey?: string): Promise<{
    videos: Video[];
    didyoumean: string;
    token: string;
    apikey: string;
}>;
