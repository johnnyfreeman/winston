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
