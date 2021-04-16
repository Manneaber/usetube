"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanTitle_1 = require("./helpers/cleanTitle");
const getVideoDesc_1 = require("./getVideoDesc");
const getVideoDate_1 = require("./getVideoDate");
const searchVideo_1 = require("./searchVideo");
async function getVideosFromDesc(yt_id) {
    try {
        let videos = [];
        let desc = await getVideoDesc_1.default(yt_id);
        if (desc) {
            loop1: for (let i = 0; i < desc.length; i++) {
                let content = desc[i].text;
                if (content.includes('-') && content.length < 100) {
                    let elt = cleanTitle_1.default(content);
                    let title = elt.split('-')[1].trim();
                    let artist = elt.split('-')[0].trim();
                    let videosSearched = await searchVideo_1.default(title + ' ' + artist);
                    loop2: for (let y = 0; y < videosSearched.videos.length; y++) {
                        let track = videosSearched.videos[y];
                        let original_title_lower = track.original_title.toLowerCase();
                        if (original_title_lower.includes(artist.split(' ')[0].toLowerCase()) && original_title_lower.includes(title.split(' ')[0].toLowerCase())) {
                            track.publishedAt = await getVideoDate_1.default(track.id);
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
    }
    catch (e) {
        console.log('getVideosFromDesc error, maybe captcha to resolve');
        // console.log(e)
    }
}
exports.default = getVideosFromDesc;
//# sourceMappingURL=getVideosFromDesc.js.map