import Video from './types/video';
import SearchResult from './types/searchResult';
import cleanTitle from './helpers/cleanTitle';
import getVideoDesc from './getVideoDesc';
import getVideoDate from './getVideoDate';
import searchVideo from './searchVideo';

export default async function getVideosFromDesc(yt_id) {
    try {
        const videos: Video[] = [];
        const desc: any = await getVideoDesc(yt_id);
        if(desc) {
            for(let i = 0; i < desc.length; i++) {
                const content = desc[i].text;
                if(content.includes('-') && content.length < 100) {
                    const elt = cleanTitle(content);
                    const title = elt.split('-')[1].trim();
                    const artist = elt.split('-')[0].trim(); 
                    const videosSearched: SearchResult = await searchVideo(title+' '+artist);
                    loop2:
                    for(let y = 0; y < videosSearched.videos.length; y++) {
                        const track = videosSearched.videos[y];
                        const original_title_lower = track.original_title.toLowerCase();
                        if(original_title_lower.includes(artist.split(' ')[0].toLowerCase()) && original_title_lower.includes(title.split(' ')[0].toLowerCase())) {
                            track.publishedAt = await getVideoDate(track.id);
                            videos.push(track); 
                            break loop2;
                        }
                        else {
                            continue loop2;
                        }
                    }
                }
            }
        }
        return videos;
    } catch(e) {
        console.log('getVideosFromDesc error, maybe captcha to resolve');
    // console.log(e)
    }
}
