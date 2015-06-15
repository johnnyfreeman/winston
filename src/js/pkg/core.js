(function (Winston) {
    var Core = function () {};

    Core.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Core.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var inputWords = input.trim().split(' ');
        var commands = [];

        if (input.length > 0) {
            // help command
            if ('help'.indexOf(input) === 0) {
                commands.push({
                    id: 'COREHELP',
                    icon: 'question',
                    title: 'Help',
                    description: 'Open help file for Winston',
                    action: 'Get Help',
                    run: function () {
                        chrome.tabs.create({ url: 'https://github.com/johnnyfreeman/winston/blob/master/README.md#usage' });
                    }
                });
            }

            // settings command
            if ('settings'.indexOf(input) === 0) {
                commands.push({
                    id: 'COREOPTIONS',
                    icon: 'cogs',
                    title: 'Settings',
                    description: 'Open Winston settings',
                    action: 'Open Settings',
                    run: function () {
                        var extId = chrome.runtime.id;
                        chrome.tabs.create({ url: 'chrome://extensions?options=' + extId });
                    }
                });
            }

            // enable package command
            if (inputWords.length === 1 && 'enable'.indexOf(inputWords[0].toLowerCase()) === 0) {
                Object.keys(Winston.Package.registeredPackages).forEach(function (name) {
                    if (typeof Winston.Package.enabledPackages[name] === 'undefined') {
                        commands.push(new EnablePackage(name));
                    }
                });
            } else if (inputWords.length > 1 && 'enable'.indexOf(inputWords[0].toLowerCase()) === 0) {
                Object.keys(Winston.Package.registeredPackages).forEach(function (name) {
                    if (name.toLowerCase().indexOf(inputWords[1].toLowerCase()) > -1 && typeof Winston.Package.enabledPackages[name] === 'undefined') {
                        commands.push(new EnablePackage(name));
                    }
                });
            }


            // disable package command
            if (inputWords.length === 1 && 'disable'.indexOf(inputWords[0].toLowerCase()) === 0) {
                Object.keys(Winston.Package.registeredPackages).forEach(function (name) {
                    if (typeof Winston.Package.enabledPackages[name] !== 'undefined') {
                        commands.push(new DisablePackage(name));
                    }
                });
            } else if (inputWords.length > 1 && 'disable'.indexOf(inputWords[0].toLowerCase()) === 0) {
                Object.keys(Winston.Package.registeredPackages).forEach(function (name) {
                    if (name.toLowerCase().indexOf(inputWords[1].toLowerCase()) > -1 && typeof Winston.Package.enabledPackages[name] !== 'undefined') {
                        commands.push(new DisablePackage(name));
                    }
                });
            }

            // for debugging purposes
            if ('debug'.indexOf(inputWords[0]) === 0) {
                if ('popup'.indexOf(inputWords[1]) > -1) {
                    commands.push({
                        id: 'COREDEBUGPOPUP',
                        icon: 'bug',
                        title: 'Debug popup.html',
                        description: 'Open ./popup.html in it\'s own tab for debugging',
                        action: 'Debug Popup',
                        run: function () {
                            var extId = chrome.runtime.id;
                            chrome.tabs.create({ url: 'chrome-extension://' + extId + '/popup.html' });
                        }
                    });
                }
                if ('options'.indexOf(inputWords[1]) > -1) {
                    commands.push({
                        id: 'COREDEBUGOPTIONS',
                        icon: 'bug',
                        title: 'Debug options.html',
                        description: 'Open ./options.html in it\'s own tab for debugging',
                        action: 'Debug Options',
                        run: function () {
                            var extId = chrome.runtime.id;
                            chrome.tabs.create({ url: 'chrome-extension://' + extId + '/options.html' });
                        }
                    });
                }
            }
        }

        return commands;
    };

    var EnablePackage = function (packageName) {
        this.packageName = packageName;
        this.id = 'COREENABLE-' + packageName;
        this.icon = 'toggle-on';
        this.title = 'Enable ' + packageName;
        this.description = 'Turn on ' + packageName + ' package';
        this.action = 'Enable Package';
    };

    EnablePackage.prototype.run = function () {
        Winston.Package.enable(this.packageName);
    };

    var DisablePackage = function (packageName) {
        this.packageName = packageName;
        this.id = 'COREENABLE-' + packageName;
        this.icon = 'toggle-off';
        this.title = 'Disable ' + packageName;
        this.description = 'Turn on ' + packageName + ' package';
        this.action = 'Disable Package';
    };

    DisablePackage.prototype.run = function () {
        Winston.Package.disable(this.packageName);
    };

    Winston.Package.register('Core', Core);
    Winston.Package.enable('Core');
})(Winston);
