"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const decodeHex_1 = require("./decodeHex");
const findVal_1 = require("./findVal");
async function getData(urlstring) {
    var _a, _b, _c;
    const dataRegex = /var\ ytInitialData\ \=\ \'(.*)\'\;<\/script>/;
    const playerRegex = /var\ ytInitialPlayerResponse\ \=\ (.*)id\=\"player\"/s;
    const dateRegex = /publishDate":"(.*)","ownerChannelName/;
    const apiRegex = /"innertubeApiKey":"(.*?)"/;
    const url = new URL(urlstring);
    let isAjax = false;
    let isDate = false;
    let isSubtitles = false;
    let body;
    if (url.searchParams.get('token')) {
        isAjax = true;
    }
    if (url.searchParams.get('type') === 'date') {
        isDate = true;
    }
    if (url.searchParams.get('type') === 'subtitles') {
        isSubtitles = true;
    }
    let headers;
    if (isAjax || isSubtitles) {
        const data = { context: { client: { clientName: 'WEB', clientVersion: '2.20210401.08.00' } }, continuation: url.searchParams.get('token') };
        body = (await axios_1.default({ method: 'post', url: urlstring, data: data })).data;
        if (isSubtitles) {
            let raw = ((_a = playerRegex.exec(body)) === null || _a === void 0 ? void 0 : _a[0]) || '{}';
            raw = raw.replace(';</script><div id="player"', '').replace('var ytInitialPlayerResponse = ', '');
            raw = JSON.parse(raw);
            let urlSubtitles = findVal_1.default(raw, 'captionTracks');
            urlSubtitles = urlSubtitles[0].baseUrl;
            return await axios_1.default({ method: 'post', url: urlSubtitles + '&fmt=json3', data: data });
        }
        else {
            return { items: findVal_1.default(body, 'continuationItems'), token: findVal_1.default(body, 'token') };
        }
    }
    else {
        headers = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'x-youtube-client-name': 1,
                'x-youtube-client-version': '2.20200911.04.00',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
            }
        };
        body = (await axios_1.default(urlstring, headers)).data;
        if (isDate) {
            const raw = ((_b = dateRegex.exec(body)) === null || _b === void 0 ? void 0 : _b[1]) || '{}';
            return raw;
        }
        else {
            const raw = ((_c = dataRegex.exec(body)) === null || _c === void 0 ? void 0 : _c[1]) || '{}';
            const apikey = apiRegex.exec(body)[1] || '';
            // let fs = require('fs'); fs.writeFile('raw.json', decodeHex(raw), (e)=>{console.log(e)})
            const data = JSON.parse(decodeHex_1.default(raw));
            data.apikey = apikey;
            return data;
        }
    }
}
exports.default = getData;
//# sourceMappingURL=getData.js.map