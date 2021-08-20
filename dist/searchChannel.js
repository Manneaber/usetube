"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
const formatYoutubeCount_1 = require("./helpers/formatYoutubeCount");
const findVal_1 = require("./helpers/findVal");
async function searchChannel(terms, token, apikey) {
    var _a, _b, _c, _d;
    try {
        let items = [];
        const channels = [];
        let didyoumean = '';
        if (!token) {
            const data = await getData_1.default('https://m.youtube.com/results?sp=EgIQAg%253D%253D&search_query=' + encodeURI(terms));
            apikey = data.apikey;
            token = findVal_1.default(data, 'token');
            items = findVal_1.default(data, 'itemSectionRenderer').contents;
        }
        else {
            const data = await getData_1.default('https://www.youtube.com/youtubei/v1/search?key=' + apikey + '&token=' + token);
            items = findVal_1.default(data.items, 'contents');
            token = data.token;
        }
        for (let i = 0; i < items.length; i++) {
            if (items[i].compactChannelRenderer || items[i].channelRenderer) {
                const item = (items[i].compactChannelRenderer) ? items[i].compactChannelRenderer : items[i].channelRenderer;
                item.name = (items[i].compactChannelRenderer) ? item.title.runs[0].text : item.title.simpleText;
                const avatar = ((_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.thumbnails[0].url) || '';
                const avatarId = avatar.substring(avatar.lastIndexOf('ytc/') + 4, avatar.lastIndexOf('=s'));
                const nbSubscriber = formatYoutubeCount_1.default(((_b = item.subscriberCountText) === null || _b === void 0 ? void 0 : _b.accessibility.accessibilityData.label) || '0');
                const nbVideo = formatYoutubeCount_1.default(((_d = (_c = item.videoCountText) === null || _c === void 0 ? void 0 : _c.runs[0]) === null || _d === void 0 ? void 0 : _d.text) || '0');
                channels.push({
                    name: item.name,
                    channel_id: item.channelId,
                    nb_videos: nbVideo,
                    nb_subscriber: nbSubscriber,
                    official: (item.ownerBadges ? true : false),
                    channel_avatar_small: 'https://yt3.ggpht.com/ytc/' + avatarId + '=s80',
                    channel_avatar_medium: 'https://yt3.ggpht.com/ytc/' + avatarId + '=s200',
                    channel_avatar_large: 'https://yt3.ggpht.com/ytc/' + avatarId + '=s800',
                });
            }
            else if (items[i].didYouMeanRenderer || items[i].showingResultsForRenderer) {
                let item;
                if (items[i].didYouMeanRenderer) {
                    item = items[i].didYouMeanRenderer;
                }
                else {
                    item = items[i].showingResultsForRenderer;
                }
                didyoumean = item.correctedQuery.runs[0].text;
            }
        }
        return {
            channels: channels,
            didyoumean: didyoumean,
            token: token,
            apikey: apikey,
        };
    }
    catch (e) {
        console.log('search channel error, terms: ' + terms);
        // console.log(e)
    }
}
exports.default = searchChannel;
//# sourceMappingURL=searchChannel.js.map