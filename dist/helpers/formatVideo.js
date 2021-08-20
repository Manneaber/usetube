"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getVideoDate_1 = require("../getVideoDate");
const getDateFromText_1 = require("./getDateFromText");
const findVal_1 = require("./findVal");
async function formatVideo(video, speedDate = false) {
    var _a;
    try {
        if (video.compactVideoRenderer || video.gridVideoRenderer || video.videoRenderer || video.playlistVideoRenderer) {
            if (video.compactVideoRenderer) {
                video = video.compactVideoRenderer;
            }
            else if (video.gridVideoRenderer) {
                video = video.gridVideoRenderer;
            }
            else if (video.playlistVideoRenderer) {
                video = video.playlistVideoRenderer;
            }
            else if (video.videoRenderer) {
                video = video.videoRenderer;
            }
            const id = video.videoId;
            let durationDatas = 0;
            // get title
            if (video.title.simpleText) {
                video.title = video.title.simpleText;
            }
            else if (video.title.runs[0].text) {
                video.title = video.title.runs[0].text;
            }
            else {
                video.title = '';
            }
            // title formating
            video.original_title = video.title;
            if (video.title.split('-').length === 1) {
                video.artist = '';
            }
            else {
                const splited = video.original_title.match(/([^,]*)-(.*)/);
                video.artist = splited[1];
                video.title = splited[2];
            }
            // duration formating
            if (video.lengthText) {
                if (durationDatas === undefined) {
                    findVal_1.default(video.lengthText, 'simpleText');
                }
                else {
                    durationDatas = findVal_1.default(video.lengthText, 'text');
                }
                if (durationDatas) {
                    durationDatas = durationDatas.split(':');
                }
            }
            else if (video.thumbnailOverlays) {
                durationDatas = findVal_1.default(video, 'lengthText');
                if (durationDatas) {
                    durationDatas = durationDatas.split(':');
                }
            }
            let hour = 0;
            let minute = 0;
            let second = 0;
            if (durationDatas) {
                switch (durationDatas.length) {
                    case 3:
                        hour = parseInt(durationDatas[0]) * 60 * 60;
                        minute = parseInt(durationDatas[1]) * 60;
                        second = parseInt(durationDatas[2]);
                        break;
                    case 2:
                        minute = parseInt(durationDatas[0]) * 60;
                        second = parseInt(durationDatas[1]);
                        break;
                    case 1:
                        second = parseInt(durationDatas[0]);
                        break;
                }
            }
            // Date formating
            let publishedAt = new Date(Date.now());
            if (speedDate && video.publishedTimeText) {
                if (video.publishedTimeText.hasOwnProperty('simpleText')) {
                    publishedAt = getDateFromText_1.default(video.publishedTimeText.simpleText);
                }
                else if (video.publishedTimeText.hasOwnProperty('runs')) {
                    publishedAt = getDateFromText_1.default(video.publishedTimeText.runs[0].text);
                }
            }
            else {
                publishedAt = await getVideoDate_1.default(id);
            }
            return {
                id: id,
                original_title: video.original_title.trim(),
                title: video.title.trim(),
                artist: video.artist.trim(),
                duration: hour + minute + second,
                publishedAt: publishedAt,
            };
        }
        else if (video.didYouMeanRenderer || video.showingResultsForRenderer) {
            video = video.didYouMeanRenderer ? video.didYouMeanRenderer : video.showingResultsForRenderer;
            return {
                id: 'didyoumean',
                original_title: '',
                title: ((_a = video.correctedQuery) === null || _a === void 0 ? void 0 : _a.runs[0].text) || '',
                artist: '',
                duration: 0,
                publishedAt: new Date(Date.now()),
                views: 0,
            };
        }
    }
    catch (e) {
        console.log('format video failed');
        // console.log(e)
    }
}
exports.default = formatVideo;
//# sourceMappingURL=formatVideo.js.map