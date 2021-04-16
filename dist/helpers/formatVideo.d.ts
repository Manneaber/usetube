export default function formatVideo(video: any, speedDate?: boolean): Promise<{
    id: string;
    original_title: any;
    title: any;
    artist: any;
    duration: number;
    publishedAt: Date;
}>;
