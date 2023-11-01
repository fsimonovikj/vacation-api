"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLocalStorage = exports.getLocalStorageWithExpiry = exports.setLocalStorageWithExpiry = void 0;
function setLocalStorageWithExpiry(key, value) {
    var now = new Date().toISOString().slice(0, 10);
    var item = {
        value: value,
        expiry: now,
    };
    localStorage.setItem(key, JSON.stringify(item));
}
exports.setLocalStorageWithExpiry = setLocalStorageWithExpiry;
function getLocalStorageWithExpiry(key) {
    var itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    var item = JSON.parse(itemStr);
    var now = new Date().toISOString().slice(0, 10);
    if (now > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}
exports.getLocalStorageWithExpiry = getLocalStorageWithExpiry;
function removeLocalStorage(key) {
    var itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    localStorage.removeItem(key);
    return "Successfully removed ".concat(key, " from storage..");
}
exports.removeLocalStorage = removeLocalStorage;
//# sourceMappingURL=utils.js.map