import Video from './video';
export default interface SearchResult {
    videos: Video[];
    didyoumean: string;
    token: string;
    apikey: string;
}
