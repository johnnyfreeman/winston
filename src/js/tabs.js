var Tabs = function (searchInput) {
    this.searchInput = searchInput;
};

Tabs.prototype.inputHandler = function () {
    var input = this.searchInput.value;

    return Q([]).then(function (commands) {
        var deferred = Q.defer();

        if (input.length > 0) {
            chrome.tabs.query({}, function (tabs) {
                tabs.forEach(function (tab) {
                    if (tab.title.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                        commands.push(new TabSearchCommand(tab));
                    }
                });

                deferred.resolve(commands);
            });
        } else {
            deferred.resolve(commands);
        }


        return deferred.promise;
    });

};

var TabSearchCommand = function (tab) {
    this.icon = 'folder-o';
    this.action = 'Switch'
    this.tab = tab;
    this.title = this.tab.title;
    this.description = 'Tab: ' + this.tab.url;
};

TabSearchCommand.prototype.run = function () {
    chrome.tabs.update(this.tab.id, {
        active: true
    });
};
