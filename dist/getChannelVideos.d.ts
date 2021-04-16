import Video from './types/video';
export default function getChannelVideos(id: string, published_after?: Date): Promise<Video[]>;
