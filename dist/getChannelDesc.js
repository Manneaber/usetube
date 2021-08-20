"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./helpers/getData");
async function getChannelDesc(id) {
    var _a, _b;
    try {
        const data = await getData_1.default('https://m.youtube.com/channel/' + id + '/videos');
        const description = ((_b = (_a = data.metadata) === null || _a === void 0 ? void 0 : _a.channelMetadataRenderer) === null || _b === void 0 ? void 0 : _b.description) || '';
        return description;
    }
    catch (e) {
        console.log('channel desc error for ' + id);
        // console.log(e)
    }
}
exports.default = getChannelDesc;
//# sourceMappingURL=getChannelDesc.js.map