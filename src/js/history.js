var History = function (searchInput) {
    this.searchInput = searchInput;
};

History.prototype.inputHandler = function () {
    var input = this.searchInput.value;
    var commands = [];

    return new Promise(function (resolve, reject) {
        if (input.length == 0) {
            resolve(commands);
        } else {
            chrome.history.search({text: input}, function (results) {

                results.forEach(function (result, i) {
                    commands.push(new HistoryCommand(result, i));
                });

                resolve(commands);
            });
        }
    });
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
