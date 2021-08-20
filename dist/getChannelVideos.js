"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
const formatVideo_1 = require("./helpers/formatVideo");
const findVal_1 = require("./helpers/findVal");
async function getChannelVideos(id, published_after) {
    try {
        const data = await getData_1.default('https://m.youtube.com/channel/' + id + '/videos');
        const apikey = data.apikey;
        const channel = findVal_1.default(data, 'itemSectionRenderer').contents;
        let token = findVal_1.default(data, 'token');
        const videos = [];
        for (let i = 0; i < channel.length; i++) {
            const video = await formatVideo_1.default(channel[i], false);
            if (video && video.publishedAt) {
                if ((published_after && video.publishedAt.getTime() > published_after.getTime()) || !published_after) {
                    videos.push(video);
                }
            }
        }
        while (token) {
            try {
                const data = await getData_1.default('https://www.youtube.com/youtubei/v1/browse?key=' + apikey + '&token=' + token);
                const newVideos = data.items;
                token = data.token;
                for (let i = 0; i < newVideos.length; i++) {
                    const video = await formatVideo_1.default(newVideos[i], false);
                    if (video) {
                        if (published_after) {
                            if (video.publishedAt.getTime() > published_after.getTime()) {
                                videos.push(video);
                            }
                            else {
                                token = '';
                            }
                        }
                        else {
                            videos.push(video);
                        }
                    }
                }
            }
            catch (e) {
                console.log('getChannelVideos failed');
                token = '';
            }
        }
        return videos;
    }
    catch (e) {
        console.log('cannot get channel videos for id: ' + id + ', try again');
        // console.log(e)
    }
}
exports.default = getChannelVideos;
//# sourceMappingURL=getChannelVideos.js.map