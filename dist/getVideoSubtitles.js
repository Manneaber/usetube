"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
async function getVideoSubtitles(id) {
    try {
        const data = await getData_1.default('https://m.youtube.com/watch?v=' + id + '&type=subtitles');
        return data.data.events;
    }
    catch (e) {
        console.log('video subtitle error for ' + id);
        // console.log(e)
    }
}
exports.default = getVideoSubtitles;
//# sourceMappingURL=getVideoSubtitles.js.map