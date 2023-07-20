"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLink = void 0;
const chars = "0123456789abcdefghiklmnopqrstuvwxyz";
const size = 12;
const generateLink = () => {
    let randomString = '';
    for (var i = 0; i < size; i++) {
        if (i == 3 || i == 8) {
            randomString += '-';
        }
        else {
            var rnum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(rnum, rnum + 1);
        }
    }
    return randomString;
};
exports.generateLink = generateLink;
//# sourceMappingURL=linkgenerator.helper.js.map