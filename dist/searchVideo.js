"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
const formatVideo_1 = require("./helpers/formatVideo");
const findVal_1 = require("./helpers/findVal");
async function searchVideo(terms, token, apikey) {
    try {
        let items = [];
        const videos = [];
        let didyoumean = '';
        // initial videos search
        if (!token) {
            const data = await getData_1.default('https://m.youtube.com/results?videoEmbeddable=true&search_query=' + encodeURI(terms));
            apikey = data.apikey;
            token = findVal_1.default(data, 'token');
            items = findVal_1.default(data, 'itemSectionRenderer').contents;
        }
        // more videos
        else {
            const data = await getData_1.default('https://www.youtube.com/youtubei/v1/search?key=' + apikey + '&token=' + token);
            items = findVal_1.default(data.items, 'contents');
            token = data.token;
        }
        for (let i = 0; i < items.length; i++) {
            const formated = await formatVideo_1.default(items[i], true);
            if (formated) {
                if (formated.id === 'didyoumean') {
                    didyoumean = formated.title;
                }
                else {
                    videos.push(formated);
                }
            }
        }
        return {
            videos: videos,
            didyoumean: didyoumean,
            token: token,
            apikey: apikey,
        };
    }
    catch (e) {
        console.log('search videos error, terms: ' + terms);
        // console.log(e)
    }
}
exports.default = searchVideo;
//# sourceMappingURL=searchVideo.js.map