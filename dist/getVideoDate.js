"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
async function getVideoDate(id) {
    try {
        let publishText = await getData_1.default('https://m.youtube.com/watch?v=' + id + '&type=date');
        publishText.replace('-', '/');
        publishText += ' ' + Math.floor(Math.random() * 24) + ':' + Math.floor(Math.random() * 60) + ':' + Math.floor(Math.random() * 60);
        return new Date(Date.parse(publishText));
    }
    catch (e) {
        console.log('cannot get date for ' + id + ', try again');
        // console.log(e)
    }
}
exports.default = getVideoDate;
//# sourceMappingURL=getVideoDate.js.map