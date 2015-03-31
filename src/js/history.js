var History = function (searchInput) {
    var history = this;
    this.searchInput = searchInput;
    this.items = [];

    chrome.history.search({text: ''}, function (historyItems) {
        history.items = historyItems;
    });
};

History.prototype.inputHandler = function () {
    var input = this.searchInput.value;
    var commands = [];

    if (input.length > 0) {
        this.items.forEach(function (item, i) {
            if (item.title.indexOf(input) > -1) {
                commands.push(new HistoryCommand(item, i));
            }
        });
    }

    return commands;
};

var HistoryCommand = function (history, i) {
    this.id = 'HISTORY' + i;
    this.icon = 'history';
    this.title = history.title || history.url;
    this.url = history.url;
    this.description = 'History: ' + this.url;
    this.action = 'Open';
};

HistoryCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.url });
};
