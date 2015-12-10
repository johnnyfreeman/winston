var React = require('react'),
    ReactDOM = require('react-dom'),
    App = require('../jsx/app.jsx'),
    PackageManager = require('./package-manager.js'),
    Storage = require('./storage.js');

module.exports = function () {
    this.appComponent = React.createElement(App, null);

    // boot up core commands
    PackageManager.register('Core', require('./pkg/core.js'));
    PackageManager.enable('Core');

    // register packages
    PackageManager.register('Bookmarks', require('./pkg/bookmarks.js'));
    PackageManager.register('Calculator', require('./pkg/calculator.js'));
    PackageManager.register('Google', require('./pkg/google.js'));
    PackageManager.register('Links', require('./pkg/links.js'));
    PackageManager.register('Longwait', require('./pkg/longwait.js'));
    PackageManager.register('Pinterest', require('./pkg/pinterest.js'));
    PackageManager.register('Salesforce', require('./pkg/salesforce.js'));
    PackageManager.register('StackOverflow', require('./pkg/stackoverflow.js'));
    PackageManager.register('Tabs', require('./pkg/tabs.js'));
    PackageManager.register('Whine', require('./pkg/whine.js'));
    PackageManager.register('YouTube', require('./pkg/youtube.js'));
    PackageManager.register('History', require('./pkg/history/history.js'));
    PackageManager.register('Twitch', require('./pkg/twitch.js'));
    PackageManager.register('Nylas', require('./pkg/nylas.js'));

    // boot up packages that are enables in settings
    var optionKeys = ['Calculator', 'Links', 'Tabs', 'Bookmarks', 'Pinterest', 'Salesforce', 'YouTube', 'Twitch', 'Nylas', 'History', 'StackOverflow', 'Google'];
    Storage.get(optionKeys).then(function(options) {
        optionKeys.forEach(function (name) {
            if (options[name] == true) {
                PackageManager.enable(name);
            }
        });
    });

    ReactDOM.render(this.appComponent, document.getElementById('container'));
};
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
