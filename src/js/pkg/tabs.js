(function (Winston) {

    var Tabs = function () {};

    Tabs.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var commands = [];

        var cmds = [
            new TabDuplicateCommand(),
            new TabCloseCommand(),
            new TabReloadCommand(),
            new TabNewCommand(),
            new TabPinCommand()
        ];

        cmds.forEach(function (cmd) {
            var title = cmd.title.toLowerCase();
            if (input.length > 0 && title.indexOf(input.toLowerCase()) == 0) {
                commands.push(cmd);
            }
        });

        return new Promise(function (resolve, reject) {
            if (input.length > 0) {
                chrome.tabs.query({}, function (tabs) {
                    tabs.forEach(function (tab, i) {
                        if (tab.title.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                            commands.push(new TabSearchCommand(tab, i));
                        }
                    });

                    resolve(commands);
                });
            } else {
                resolve(commands);
            }
        });
    };

    var TabSearchCommand = function (tab, i) {
        this.id = 'TABSEARCH' + i;
        this.icon = 'folder-o';
        this.action = 'Switch To Tab'
        this.tab = tab;
        this.title = this.tab.title;
        this.description = this.tab.url;
    };

    TabSearchCommand.prototype.run = function () {
        chrome.tabs.update(this.tab.id, {
            active: true
        });
    };

    var TabDuplicateCommand = function () {
        this.id = 'TABDUPLICATE';
        this.icon = 'folder-o';
        this.action = 'Duplicate Tab'
        this.title = 'Duplicate This Tab';
        this.description = 'Duplicate the current tab';
    };

    TabDuplicateCommand.prototype.run = function () {
        chrome.tabs.query({active:true}, function (tabs) {
            chrome.tabs.duplicate(tabs[0].id);
        });
    };

    var TabCloseCommand = function () {
        this.id = 'TABCLOSE';
        this.icon = 'folder-o';
        this.action = 'Close Tab'
        this.title = 'Close This Tab';
        this.description = 'Close the current tab';
    };

    TabCloseCommand.prototype.run = function () {
        chrome.tabs.query({active:true}, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
    };

    var TabReloadCommand = function () {
        this.id = 'TABRELOAD';
        this.icon = 'folder-o';
        this.action = 'Reload Tab'
        this.title = 'Reload This Tab';
        this.description = 'Reload the current tab';
    };

    TabReloadCommand.prototype.run = function () {
        chrome.tabs.query({active:true}, function (tabs) {
            chrome.tabs.reload(tabs[0].id, function () {
                window.close();
            });
        });
    };

    var TabNewCommand = function () {
        this.id = 'TABNEW';
        this.icon = 'folder-o';
        this.action = 'New Tab'
        this.title = 'New Tab';
        this.description = 'Create new tab';
    };

    TabNewCommand.prototype.run = function () {
        chrome.tabs.create({});
    };

    var TabPinCommand = function () {
        this.id = 'TABPIN';
        this.icon = 'folder-o';
        this.action = 'Pin Tab'
        this.title = 'Pin This Tab';
        this.description = 'Pin the current tab';
    };

    TabPinCommand.prototype.run = function () {
        chrome.tabs.query({active:true}, function (tabs) {
            chrome.tabs.update(tabs[0].id, { pinned: true }, function () {
                window.close();
            });
        });
    };

    Winston.Package.register('Tabs', Tabs);
})(Winston);
