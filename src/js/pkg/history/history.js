(function (Winston) {
    var storageKey = 'historyItems';

    var History = function () {
        var history = this;
        this.items = [];

        Winston.Storage.get(storageKey).then(function (historyItems) {
            history.items = historyItems;
        });
    };

    History.prototype.optionChangeHandler = function (e) {
        Winston.Storage.set(e.target.name, e.target.checked);

        if (e.target.checked) {
            chrome.history.search({text: ''}, function (newHistoryItems) {
                return Winston.Storage.set(storageKey, newHistoryItems);
            }); // limits to 100
        } else {
            Winston.Storage.set(storageKey, []);
        }
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

    Winston.Package.register('History', History);
})(Winston);
