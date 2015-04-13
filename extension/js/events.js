var Winston = function () {
    this.appComponent = React.createElement(App, null);
    this.registeredPackages = {};
    this.bootedPackages = {};

    React.render(this.appComponent, document.getElementById('container'));
};

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

(function (Winston) {
    var storageKey = 'historyItems';

    var replaceHistoryItemsInCache = function () {
        chrome.history.search({text: ''}, function (newHistoryItems) {
            // console.log('replacing all cached history...', newHistoryItems);
            return Winston.Storage.set(storageKey, newHistoryItems);
        }); // limits to 100
    };

    // var addHistoryItemToCache = function (historyItem) {
    //     Winston.Storage.get(storageKey).then(function (historyItems) {
    //         if (historyItems === undefined) historyItems = [];
    //         historyItems.push(historyItem);
    //         Winston.Storage.set(storageKey, historyItems);
    //     });
    // };
    //
    // var removeHistoryItemsFromCache = function (removed) {
    //     // removed.allHistory
    //     if (removed.allHistory) {
    //         Winston.Storage.set(storageKey, []);
    //     }
    //     // removed.urls
    //     else {
    //         Winston.Storage.get(storageKey).then(function (historyItems) {
    //             removed.urls.forEach(function (url) {
    //                 var i = historyItems.length
    //                 while (i--) {
    //                     if (historyItems[i].url === url) {
    //                         historyItems.splice(i, 1);
    //                         break;
    //                     }
    //                 }
    //             });
    //             Winston.Storage.set(storageKey, historyItems);
    //         });
    //
    //     }
    // };

    chrome.history.onVisited.addListener(replaceHistoryItemsInCache);
    chrome.history.onVisitRemoved.addListener(replaceHistoryItemsInCache);
})(Winston);
