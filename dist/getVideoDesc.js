"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
async function getVideoDesc(id) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const data = await getData_1.default('https://m.youtube.com/watch?v=' + id);
        const description = ((_j = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = data.contents) === null || _a === void 0 ? void 0 : _a.singleColumnWatchNextResults) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c.results) === null || _d === void 0 ? void 0 : _d.contents[1]) === null || _e === void 0 ? void 0 : _e.itemSectionRenderer) === null || _f === void 0 ? void 0 : _f.contents[0]) === null || _g === void 0 ? void 0 : _g.slimVideoMetadataRenderer) === null || _h === void 0 ? void 0 : _h.description) === null || _j === void 0 ? void 0 : _j.runs) || '';
        return description;
    }
    catch (e) {
        console.log('video desc error for ' + id);
        console.log(e);
    }
}
exports.default = getVideoDesc;
//# sourceMappingURL=getVideoDesc.js.map