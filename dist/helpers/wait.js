"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wait() {
    const ms = Math.floor(Math.random() * 300);
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
exports.default = wait;
//# sourceMappingURL=wait.js.map