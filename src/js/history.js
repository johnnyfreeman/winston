var History = function (searchInput) {
    this.searchInput = searchInput;
};

History.prototype.inputHandler = function () {
    var input = this.searchInput.value;

    return Q([]).then(function (commands) {
        var deferred = Q.defer();

        if (input.length == 0) {
            deferred.resolve(commands);
        } else {
            chrome.history.search({text: input}, function (results) {

                results.forEach(function (result) {
                    commands.push(new HistoryCommand(result));
                });

                deferred.resolve(commands);
            });
        }

        return deferred.promise;
    });

};

var HistoryCommand = function (history) {
    this.icon = 'history';
    this.title = history.title || history.url;
    this.url = history.url;
    this.description = 'History: ' + this.url;
    this.action = 'Open';
};

HistoryCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.url });
};
