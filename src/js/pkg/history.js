(function (Winston) {
    var History = function () {
        var history = this;
        this.items = [];

        chrome.history.search({text: ''}, function (historyItems) {
            history.items = historyItems;
        });
    };

    History.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    History.prototype.inputHandler = function (e) {
        var input = e.target.value;
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
        this.description = this.url;
        this.action = 'Open History';
    };

    HistoryCommand.prototype.run = function () {
        chrome.tabs.create({ url: this.url });
    };

    Winston.Package.register('History', History);
})(Winston);
