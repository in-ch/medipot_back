"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkElapsedTime = void 0;
function checkElapsedTime(dateString) {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    const elapsedTime = currentDate.getTime() - targetDate.getTime();
    const elapsedMinutes = elapsedTime / 1000 / 60;
    return elapsedMinutes >= 5;
}
exports.checkElapsedTime = checkElapsedTime;
//# sourceMappingURL=checkElapsedTime.js.map