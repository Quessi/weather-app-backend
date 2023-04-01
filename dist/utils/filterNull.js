"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (originalObject) => {
    const filteredObject = {};
    for (const key in originalObject) {
        if (originalObject[key] !== '') {
            filteredObject[key] = originalObject[key];
        }
    }
    return filteredObject;
};
