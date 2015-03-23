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
    }).then(function (commands) {

        var cmd = new TabDuplicateCommand();
        var title = cmd.title.toLowerCase();
        if (input.length > 0 && title.indexOf(input.toLowerCase()) == 0) {
            commands.push(cmd);
        }

        return commands;
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

var TabDuplicateCommand = function () {
    this.icon = 'folder-o';
    this.action = 'Duplicate'
    this.title = 'Duplicate This Tab';
    this.description = 'Tab: Duplicate the current tab';
};

TabDuplicateCommand.prototype.run = function () {
    chrome.tabs.query({active:true}, function (tabs) {
        chrome.tabs.duplicate(tabs[0].id);
    });
};
