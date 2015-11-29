var Bluebird = require('bluebird');

module.exports = {

    set: function (key, value) {
        return new Bluebird(function (resolve, reject) {
            var option = {};
            option[key] = value;
            chrome.storage.local.set(option, resolve);
        });
    },

    get: function (key) {
        return new Bluebird(function (resolve, reject) {
            chrome.storage.local.get(key, resolve);
        });
    },

    remove: function (key) {
        return new Bluebird(function (resolve, reject) {
            chrome.storage.local.remove(key, resolve);
        });
    },

    removeAll: function (key) {
        return new Bluebird(function (resolve, reject) {
            chrome.storage.local.clear(resolve);
        });
    }
};