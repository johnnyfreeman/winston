(function (Winston) {
    var Storage = {};

    Storage.set = function (key, value) {
        return new Promise(function (resolve, reject) {
            option = {};
            option[key] = value;
            chrome.storage.local.set(option, resolve);
        });
    };

    Storage.get = function (key) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(key, function (options) {
                resolve(options[key]);
            });
        });
    };


    Storage.getAll = function () {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(null, resolve);
        });
    };

    Storage.remove = function (key) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.remove(key, resolve);
        });
    };

    Storage.removeAll = function (key) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.clear(resolve);
        });
    };

    Winston.Storage = Storage;
})(Winston);
