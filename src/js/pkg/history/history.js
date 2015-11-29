var Storage = require('../../storage.js');
var storageKey = 'historyItems';

var History = function () {
    var history = this;
    this.items = [];

    Storage.get(storageKey).then(function (historyItems) {
        history.items = historyItems[storageKey];
    });
};

History.prototype.optionChangeHandler = function (e) {
    Storage.set(e.target.name, e.target.checked);

    if (!e.target.checked) {
        History.fetchData();
    } else {
        Storage.set(storageKey, []);
    }
};

History.fetchData = function () {
    Storage.get('history-items-count').then(function (options) {
        chrome.history.search({
            text: '',
            maxResults: parseInt(options['history-items-count'])
        }, function (newHistoryItems) {
            return Storage.set(storageKey, newHistoryItems);
        });
    });
};

History.prototype.inputHandler = function (e) {
    var input = e.target.value;
    var commands = [];

    if (input.length > 0) {
        this.items.forEach(function (item, i) {
            if (item.title.toLowerCase().indexOf(input.toLowerCase()) > -1 || item.url.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                commands.push(new HistoryCommand(item, i));
            }
        });

        if ('history'.indexOf(input.toLowerCase()) === 0) {
            commands.push(new AllHistoryCommand());
        }
    }

    return commands;
};

var HistoryCommand = function (history, i) {
    this.id = 'HISTORY' + i;
    this.icon = 'history';
    this.title = history.title || history.url;
    this.url = history.url;
    this.description = this.url;
    this.action = 'Open History';
};

HistoryCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.url });
};

var AllHistoryCommand = function () {
    this.id = 'ALLHISTORY';
    this.icon = 'history';
    this.title = 'Open History';
    this.url = 'chrome://history';
    this.description = 'Open all history in new tab';
    this.action = 'Open History';
};

AllHistoryCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.url });
};

module.exports = History;
