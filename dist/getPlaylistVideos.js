"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
const findVal_1 = require("./helpers/findVal");
const formatVideo_1 = require("./helpers/formatVideo");
async function getPlaylistVideos(id, speedDate) {
    try {
        const data = await getData_1.default('https://m.youtube.com/playlist?list=' + id);
        const apikey = data.apikey;
        const items = findVal_1.default(data, 'playlistVideoListRenderer').contents;
        let token = findVal_1.default(data, 'token');
        const videos = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i]) {
                const formated = await formatVideo_1.default(items[i], speedDate);
                if (formated) {
                    videos.push(formated);
                }
            }
        }
        while (token) {
            try {
                const nextData = await getData_1.default('https://www.youtube.com/youtubei/v1/browse?key=' + apikey + '&token=' + token);
                const nextVideos = nextData.items;
                token = nextData.token;
                for (let i = 0; i < nextVideos.length; i++) {
                    if (nextVideos[i]) {
                        const formated = await formatVideo_1.default(nextVideos[i], speedDate);
                        if (formated) {
                            videos.push(formated);
                        }
                    }
                }
            }
            catch (e) {
                console.log('getPlaylistVideos failed');
                // console.log(e)
                token = '';
            }
        }
        return videos;
    }
    catch (e) {
        console.log('cannot get playlist ' + id + ', try again');
        return [];
    }
}
exports.default = getPlaylistVideos;
//# sourceMappingURL=getPlaylistVideos.js.map