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

'use strict';

// A gotcha of sorts with chrome extensions involving clipboard actions is that
// only the content scripts can interact with the page that a user loads. This
// means that we can't put our calls to actually paste into the page in the
// background file, because the background scripts are not able to paste into
// the dom of the page. However, only background pages are able to access the
// system clipboard. Therefore we have to do a little trickery to move between
// the two. We're going to define the functions here to actually read from the
// clipboard into a textarea we've defined in our background html, and then
// we'll get that pasted data from the background page and do the actual
// insertion in our content script. The idea of this comes from:
// http://stackoverflow.com/questions/7144702/the-proper-use-of-execcommandpaste-in-a-chrome-extension
/**
 * Retrieve the current content of the system clipboard.
 */
function getContentFromClipboard() {
    var result = '';
    var sandbox = document.getElementById('sandbox');
    sandbox.value = '';
    sandbox.select();
    if (document.execCommand('paste')) {
        result = sandbox.value;
    }
    sandbox.value = '';
    return result;
}

function copyToClipboard(text) {
    var sandbox = document.getElementById('sandbox');
    sandbox.value = text;
    sandbox.select();
    if (document.execCommand('copy')) {
        result = sandbox.value;
    }
    sandbox.value = '';
    return result;
}

/**
 * Send the value that should be pasted to the content script.
 */
function sendPasteToContentScript(toBePasted) {
    // We first need to find the active tab and window and then send the data
    // along. This is based on:
    // https://developer.chrome.com/extensions/messaging
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: toBePasted});
    });
}
