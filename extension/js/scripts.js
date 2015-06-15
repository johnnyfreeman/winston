var Winston = function () {
    this.appComponent = React.createElement(App, null);
    this.registeredPackages = {};
    this.bootedPackages = {};

    React.render(this.appComponent, document.getElementById('container'));
};

(function () {
    var Package = function () {

    };

    Package.prototype.inputHandler = function (e) {

    };

    Package.prototype.indexHandler = function () {

    };

    Package.registeredPackages = {};

    Package.register = function (name, constructor) {
        return Package.registeredPackages[name] = constructor;
    };

    Package.instantiate = function (name) {
        return new Package.registeredPackages[name]();
    };

    Package.enabledPackages = {};

    Package.enable = function (name, searchInput) {
        return Package.enabledPackages[name] = Package.instantiate(name);
    };

    Package.disable = function (name, searchInput) {
        var packages = Package.enabledPackages;
        delete packages[name];
    };

    Winston.Package = Package;
})(Winston);

(function (Winston) {
    var Storage = {};

    Storage.set = function (key, value) {
        return new Promise(function (resolve, reject) {
            option = {};
            option[key] = value;
            chrome.storage.local.set(option, resolve);
        });
    };

    Storage.get = function (key) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(key, function (options) {
                resolve(options[key]);
            });
        });
    };


    Storage.getAll = function () {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(null, resolve);
        });
    };

    Storage.remove = function (key) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.remove(key, resolve);
        });
    };

    Storage.removeAll = function (key) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.clear(resolve);
        });
    };

    Winston.Storage = Storage;
})(Winston);

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

(function (Winston) {
    var LongWait = function () {};

    LongWait.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    LongWait.prototype.inputHandler = function (e) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([]);
            }, 1500);
        });
    };

    Winston.Package.register('LongWait', LongWait);
})(Winston);

(function (Winston) {

    var Bookmarks = function () {
        var package = this;
        this.bookmarkTreeNodes = [];

        var traverse = function (nodes) {
            var title, url, children;

            for(var i = 0; i < nodes.length; i++) {
                title = nodes[i].title || '';
                url = nodes[i].url || '';
                children = nodes[i].children || [];

                if (url.indexOf('javascript:') !== 0 && url.length > 0) {
                    package.bookmarkTreeNodes.push(nodes[i]);
                }

                if(children.length > 0) {
                    traverse(children);
                }
            }
        }

        chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
            traverse(bookmarkTreeNodes);
        });
    };

    Bookmarks.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Bookmarks.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var commands = [];

        if (input.length > 0) {
            // create command
            var cmd = new CreateBookmarkCommand();
            var title = cmd.title.toLowerCase();
            if (title.indexOf(input.toLowerCase()) == 0) {
                commands.push(cmd);
            }

            this.bookmarkTreeNodes.forEach(function (node, i) {
                if (node.title.toLowerCase().indexOf(input.toLowerCase()) > -1 || node.url.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                    commands.push(new BookmarkCommand(node, i));
                }
            });
        }

        return commands;
    };

    var BookmarkCommand = function (bookmark, i) {
        this.id = 'BOOKMARK' + i;
        this.icon = 'star-o';
        this.title = bookmark.title;
        this.url = bookmark.url;
        this.description = this.url;
        this.action = 'Open Bookmark';
    };

    BookmarkCommand.prototype.run = function () {
        chrome.tabs.create({ url: this.url });
    };

    var CreateBookmarkCommand = function () {
        this.icon = 'star-o';
        this.title = 'Bookmark This Page';
        this.description = 'Create a bookmark for the active tab';
        this.action = 'Create Bookmark';
    };

    CreateBookmarkCommand.prototype.run = function () {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            chrome.bookmarks.create({
                title: tabs[0].title,
                url: tabs[0].url
            }, function () {
                // close the extension
                window.close();
            });
        });
    };

    Winston.Package.register('Bookmarks', Bookmarks);
})(Winston);

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

        if (!e.target.checked) {
            Winston.fetchData();
        } else {
            Winston.Storage.set(storageKey, []);
        }
    };

    History.fetchData = function () {
        Winston.Storage.get('history-items-count').then(function (count) {
            chrome.history.search({
                text: '',
                maxResults: parseInt(count)
            }, function (newHistoryItems) {
                return Winston.Storage.set(storageKey, newHistoryItems);
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

    Winston.Package.register('History', History);
})(Winston);

(function (Winston) {

    var Tabs = function () {};

    Tabs.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

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

(function (Winston) {
    var Calculator = function () {};

    Calculator.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Calculator.prototype.inputHandler = function (e) {
        var commands = [];
        var input = e.target.value;
        var result;

        try {
            result = math.format(math.eval(input), 2);
            if (result !== 'undefined' && result !== 'function') {
                commands.push({
                    id: 'CALCULATOR1',
                    title: result,
                    description: "Copy '" + result + "' to your clipboard",
                    action: 'Copy To Clipboard',
                    icon: 'calculator',
                    run: function () {
                        document.execCommand('copy');
                    }
                });
            }
        } catch(e) {}

        return commands;
    };

    Winston.Package.register('Calculator', Calculator);
})(Winston);

(function (Winston) {
    var Youtube = function () {
        // hard keywords are stripped from the query
        this.hardKeywords = ['video', 'youtube'];
        this.softKeywords = ['cover', 'movie', 'music', 'trailer', 'tutorial', 'how'];
    };

    Youtube.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Youtube.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var commands = [];
        var youtube = this;

        if (input.length > 0) {
            this.hardKeywords.concat(this.softKeywords).forEach(function (keyword, keywordIndex) {
                var inputWords = input.trim().split(' ');
                var query = input;

                inputWords.forEach(function (inputWord, inputWordIndex) {
                    var matchesKeyword = keyword.indexOf(inputWord) === 0;

                    // continue to next inputWord if this doesn't match the current keyword
                    if (!matchesKeyword) return;

                    // remove hard keywords
                    if (youtube.hardKeywords.indexOf(keyword) > -1) {
                        query = query.replace(inputWord, '').trim();
                    }

                    // replace soft keywords
                    query = query.replace(inputWord, keyword);

                    if (query.length > 0) {
                        commands.push(new YoutubeSearchCommand(query, keywordIndex.toString() + inputWordIndex.toString()));
                    } else {
                        commands.push(new YoutubeHomeCommand());
                    }
                });
            });
        }

        return commands;
    };

    var YoutubeHomeCommand = function () {
        this.id = 'YOUTUBEHOME';
        this.icon = 'youtube';
        this.action = 'Open Site';
        this.title = 'YouTube.com';
        this.description = 'YouTube: Open YouTube.com';
    };

    YoutubeHomeCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://www.youtube.com/' });
    };

    var YoutubeSearchCommand = function (query, i) {
        this.id = 'YOUTUBE' + i;
        this.query = query;
        this.icon = 'youtube';
        this.action = 'Search YouTube';
        this.title = 'YouTube "' + this.query + '"';
        this.description = 'YouTube: Open YouTube search results';
    };

    YoutubeSearchCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(this.query) });
    };
    Winston.Package.register('YouTube', Youtube);
})(Winston);

(function (Winston) {
    var Pinterest = function () {
        var pinterest = this;

        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            pinterest.url = tabs[0].url;
        });
    };

    Pinterest.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Pinterest.prototype.inputHandler = function (e) {
        var commands = [];
        var input = e.target.value;

        if (input.indexOf('pin') === 0) {
            commands.push({
                url: this.url,
                title: "Pin this page",
                description: this.url,
                action: 'Pin Page',
                icon: 'pinterest',
                run: function () {
                    chrome.tabs.create({
                        url: 'https://www.pinterest.com/pin/create/button/?url=' + this.url
                    });
                }
            });
        }

        return commands;
    };

    Winston.Package.register('Pinterest', Pinterest);
})(Winston);

(function (Winston) {

    var docs = {
        // visual force
        'apex:actionFunction': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionFunction.htm',
        'apex:actionPoller': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionPoller.htm',
        'apex:actionRegion': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionRegion.htm',
        'apex:actionStatus': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionStatus.htm',
        'apex:actionSupport': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_actionSupport.htm',
        'apex:areaSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_areaSeries.htm',
        'apex:attribute': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_attribute.htm',
        'apex:axis': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_axis.htm',
        'apex:barSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_barSeries.htm',
        'apex:canvasApp': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_canvasApp.htm',
        'apex:chart': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chart.htm',
        'apex:chartLabel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chartLabel.htm',
        'apex:chartTips': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_chartTips.htm',
        'apex:column': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_column.htm',
        'apex:commandButton': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_commandButton.htm',
        'apex:commandLink': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_commandLink.htm',
        'apex:component': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_component.htm',
        'apex:componentBody': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_componentBody.htm',
        'apex:composition': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_composition.htm',
        'apex:dataList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dataList.htm',
        'apex:dataTable': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dataTable.htm',
        'apex:define': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_define.htm',
        'apex:detail': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_detail.htm',
        'apex:dynamicComponent': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_dynamicComponent.htm',
        'apex:emailPublisher': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_emailPublisher.htm',
        'apex:enhancedList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_enhancedList.htm',
        'apex:facet': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_facet.htm',
        'apex:flash': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_flash.htm',
        'apex:form': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_form.htm',
        'apex:gaugeSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_gaugeSeries.htm',
        'apex:iframe': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_iframe.htm',
        'apex:image': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_image.htm',
        'apex:include': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_include.htm',
        'apex:includeScript': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_includeScript.htm',
        'apex:inlineEditSupport': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inlineEditSupport.htm',
        'apex:input': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_input.htm',
        'apex:inputCheckbox': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputCheckbox.htm',
        'apex:inputField': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputField.htm',
        'apex:inputFile': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputFile.htm',
        'apex:inputHidden': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputHidden.htm',
        'apex:inputSecret': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputSecret.htm',
        'apex:inputText': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputText.htm',
        'apex:inputTextarea': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_inputTextarea.htm',
        'apex:insert': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_insert.htm',
        'apex:legend': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_legend.htm',
        'apex:lineSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_lineSeries.htm',
        'apex:listViews': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_listViews.htm',
        'apex:logCallPublisher': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_logCallPublisher.htm',
        'apex:map': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_map.htm',
        'apex:mapMarker': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_mapMarker.htm',
        'apex:message': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_message.htm',
        'apex:messages': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_messages.htm',
        'apex:milestoneTracker': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_milestoneTracker.htm',
        'apex:outputField': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputField.htm',
        'apex:outputLabel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputLabel.htm',
        'apex:outputLink': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputLink.htm',
        'apex:outputPanel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputPanel.htm',
        'apex:outputText': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_outputText.htm',
        'apex:page': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_page.htm',
        'apex:pageBlock': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlock.htm',
        'apex:pageBlockButtons': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockButtons.htm',
        'apex:pageBlockSection': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockSection.htm',
        'apex:pageBlockSectionItem': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockSectionItem.htm',
        'apex:pageBlockTable': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageBlockTable.htm',
        'apex:pageMessage': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageMessage.htm',
        'apex:pageMessages': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pageMessages.htm',
        'apex:panelBar': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelBar.htm',
        'apex:panelBarItem': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelBarItem.htm',
        'apex:panelGrid': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelGrid.htm',
        'apex:panelGroup': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_panelGroup.htm',
        'apex:param': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_param.htm',
        'apex:pieSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_pieSeries.htm',
        'apex:radarSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_radarSeries.htm',
        'apex:relatedList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_relatedList.htm',
        'apex:remoteObjectField': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjectField.htm',
        'apex:remoteObjectModel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjectModel.htm',
        'apex:remoteObjects': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_remoteObjects.htm',
        'apex:repeat': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_repeat.htm',
        'apex:scatterSeries': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_scatterSeries.htm',
        'apex:scontrol': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_scontrol.htm',
        'apex:sectionHeader': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_sectionHeader.htm',
        'apex:selectCheckboxes': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectCheckboxes.htm',
        'apex:selectList': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectList.htm',
        'apex:selectOption': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectOption.htm',
        'apex:selectOptions': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectOptions.htm',
        'apex:selectRadio': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_selectRadio.htm',
        'apex:stylesheet': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_stylesheet.htm',
        'apex:tab': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_tab.htm',
        'apex:tabPanel': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_tabPanel.htm',
        'apex:toolbar': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_toolbar.htm',
        'apex:toolbarGroup': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_toolbarGroup.htm',
        'apex:variable': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_variable.htm',
        'apex:vote': 'http://www.salesforce.com/docs/developer/pages/Content/pages_compref_vote.htm',

        'FeedItem': 'https://www.salesforce.com/developer/docs/api/Content/sforce_api_objects_feeditem.htm',
        'FeedPost': 'https://www.salesforce.com/developer/docs/api/Content/sforce_api_objects_feedpost.htm',

        // system namespace
        'Address Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_Address.htm',
        'Answers Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_answers.htm',
        'ApexPages Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_apexpages.htm',
        'Approval Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_approval.htm',
        'Blob Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_blob.htm',
        'Boolean Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_boolean.htm',
        'BusinessHours Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_businesshours.htm',
        'Cases Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_cases.htm',
        'Comparable Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_comparable.htm',
        'Continuation Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Continuation.htm',
        'Cookie Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_sites_cookie.htm',
        'Crypto Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_crypto.htm',
        'Custom Settings Methods': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_custom_settings.htm',
        'Database Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_database.htm',
        'Date Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_date.htm',
        'Datetime Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_datetime.htm',
        'Decimal Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_decimal.htm',
        'Double Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_double.htm',
        'EncodingUtil Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_encodingUtil.htm',
        'Enum Methods': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_enum.htm',
        'Exception and Built-In Exceptions Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_exception_methods.htm',
        'Http Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_http_http.htm',
        'HttpCalloutMock Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_httpcalloutmock.htm',
        'HttpRequest Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_http_httprequest.htm',
        'HttpResponse Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_restful_http_httpresponse.htm',
        'Id Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_id.htm',
        'Ideas Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_ideas.htm',
        'InstallHandler Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_install_handler.htm',
        'Integer Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_integer.htm',
        'JSON Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Json.htm',
        'JSONGenerator Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_JSONGenerator.htm',
        'JSONParser Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_JsonGenerator.htm',
        'JSONToken Enum': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_JsonParser.htm',
        'Limits Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_limits.htm',
        'List Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_list.htm',
        'Location Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_Location.htm',
        'Long Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_long.htm',
        'Map Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_map.htm',
        'Matcher Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_pattern_and_matcher_matcher_methods.htm',
        'Math Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_math.htm',
        'Messaging Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_email_outbound_messaging.htm',
        'MultiStaticResourceCalloutMock Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_multistaticresourcecalloutmock.htm',
        'Network Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_network.htm',
        'PageReference Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_system_pagereference.htm',
        'Pattern Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_pattern_and_matcher_pattern_methods.htm',
        'Queueable Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Queueable.htm',
        'QueueableContext Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_system_queueablecontext.htm',
        'QuickAction Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_quickaction.htm',
        'RemoteObjectController': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_system_remoteobjectcontroller.htm',
        'ResetPasswordResult Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_ResetPasswordResult.htm',
        'RestContext Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_restcontext.htm',
        'RestRequest Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_restrequest.htm',
        'RestResponse Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_restresponse.htm',
        'Schedulable Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_system_schedulable.htm',
        'SchedulableContext Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_system_schedulablecontext.htm',
        'Schema Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_schema.htm',
        'Search Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_search.htm',
        'SelectOption Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_pages_selectoption.htm',
        'Set Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_set.htm',
        'Site Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_sites.htm',
        'sObject Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_sobject.htm',
        'StaticResourceCalloutMock Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_staticresourcecalloutmock.htm',
        'String Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_string.htm',
        'System Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_system.htm',
        'Test Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_test.htm',
        'Time Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_time.htm',
        'TimeZone Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_timezone.htm',
        'Trigger Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_Trigger.htm',
        'Type Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_type.htm',
        'UninstallHandler Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_uninstall_handler.htm',
        'URL Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_url.htm',
        'UserInfo Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_userinfo.htm',
        'Version Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_methods_system_version.htm',
        'WebServiceCallout Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_class_System_WebServiceCallout.htm',
        'WebServiceMock Interface': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_interface_webservicemock.htm',
        'XmlStreamReader Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_xml_XmlStream_reader.htm',
        'XmlStreamWriter Class': 'https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_classes_xml_XmlStream_writer.htm'
    };


    var Salesforce = function () {
        var sf = this;

        // get sobjects from storage
        this.sobjects = [];
        Winston.Storage.get('sf-sobjects').then(function (sobjects) {
            sf.sobjects = sobjects;
        });

        // get instance url from storage
        this.instanceUrl = '';
        Winston.Storage.get('sf-instance-url').then(function (instanceUrl) {
            sf.instanceUrl = instanceUrl;
        });
    };

    Salesforce.prototype.optionChangeHandler = function (e) {
        // save option value in storage
        Winston.Storage.set(e.target.name, e.target.checked);
    };

    Salesforce.getAccessToken = function (subdomain) {

        var domain = 'https://' + subdomain + '.salesforce.com';
        var clientId = '3MVG9xOCXq4ID1uGbuCfSNW3olnFLJL8Sf2xPkbsYsYqPJrvDAoOE5U_CjIjP3Wv9wsALOpqX9nTPRmcQtPIi';
        var clientSecret = '1271466885282334292';
        var redirectUri = chrome.identity.getRedirectURL('provider_cb');

        chrome.identity.launchWebAuthFlow({
            url: domain + '/services/oauth2/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUri,
            interactive: true
        }, function(redirect_url) {

            // get authorization code
            var authCode;
            var parser = document.createElement('a');
            parser.href = redirect_url;
            parser.search.substr(1).split('&').forEach(function (attribute) {
                var pair = attribute.split('=');
                if (pair[0] === 'code') {
                    authCode = pair[1];
                }
            });

            reqwest({
                url: domain + '/services/oauth2/token',
                method: 'post',
                type: 'json',
                data: {
                code: decodeURIComponent(authCode),
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: redirectUri
                },
                error: function (err) {
                    console.log(err);
                },
                success: function (res) {
                    Promise.settle([
                        Winston.Storage.set('sf-instance-url', res.instance_url),
                        Winston.Storage.set('sf-access-token', res.token_type + ' ' + res.access_token)
                    ]).then(function () {
                        document.getElementById('accessToken').textContent = res.token_type + ' ' + res.access_token;
                        document.getElementById('accessToken').title = res.token_type + ' ' + res.access_token;
                        alert('Success!');
                    });
                }
            });
        });
    };

    Salesforce.fetchData = function (e) {

        // save option value in storage
        Promise.settle([
            Winston.Storage.get('sf-instance-url'),
            Winston.Storage.get('sf-access-token'),
        ]).then(function (promises) {

            var config = {};
            config.instanceUrl = promises[0].value();
            config.accessToken = promises[1].value();

            reqwest({
                url: config.instanceUrl + '/services/data',
                method: 'get',
                type: 'json',
                error: function (err) {
                    console.log(err);
                },
                success: function (versions) {

                    // use latest version
                    var i = versions.length - 1;
                    var url = versions[i].url;

                    reqwest({
                        url: config.instanceUrl + url + '/sobjects',
                        method: 'get',
                        type: 'json',
                        // data: {
                        //     q: 'select Id, DeveloperName, NamespacePrefix From CustomObject'
                        // },
                        headers: {
                            Authorization: config.accessToken
                        },
                        error: function (err) {
                            if (err.status === 401) {
                                chrome.identity.removeCachedAuthToken({
                                    token: config.accessToken
                                }, function () {
                                    Winston.Storage.set('sf-access-token', '');
                                    document.getElementById('accessToken').textContent = '';
                                    document.getElementById('accessToken').title = '';
                                    alert('Unauthorized. Access Token removed from cache.');
                                });
                            } else {
                                console.log(err);
                            }
                        },
                        success: function (response) {
                            reqwest({
                                url: config.instanceUrl + url + '/tooling/query',
                                method: 'get',
                                type: 'json',
                                data: {
                                    q: 'SELECT Id, DeveloperName, NamespacePrefix From CustomObject'
                                },
                                headers: {
                                    Authorization: config.accessToken
                                },
                                success: function (result) {
                                    var customObjects = {};
                                    for (var i = 0; i < result.records.length; i++) {
                                        var key = result.records[i].DeveloperName;
                                        if (result.records[i].NamespacePrefix) {
                                            key = result.records[i].NamespacePrefix + '__' + key;
                                        }
                                        customObjects[key] = result.records[i].Id;
                                    }

                                    for (var i = 0; i < response.sobjects.length; i++) {
                                        var key = response.sobjects[i].name.replace('__c', '');
                                        response.sobjects[i].id = customObjects[key];
                                    }

                                    Winston.Storage.set('sf-sobjects', response.sobjects).then(function () {
                                        alert('Done.');
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    };

    Salesforce.prototype.inputHandler = function (e) {
        var sf = this;
        var input = e.target.value;
        var inputWords = input.trim().split(' ');
        var commands = [];

        // documentation
        Object.keys(docs).forEach(function (key) {
            if (input.length > 0 && key.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                commands.push(new SalesforceDocCommand(key, docs[key]));
            }
        });

        if (inputWords.length > 1 && ['view', 'list', 'new'].indexOf(inputWords[0]) > -1) {
            for (var i = 0; i < this.sobjects.length; i++) {
                var sobject = this.sobjects[i];

                var viewTitle = 'View ' + sobject.label + ' Object';
                var listTitle = 'List ' + sobject.label + ' Records';
                var newTitle = 'New ' + sobject.label + ' Record';

                if (viewTitle.toLowerCase().indexOf(input.toLowerCase()) > -1 && sobject.layoutable && sobject.createable && sobject.deletable) { // && !sobject.custom
                    commands.push({
                        sobject: sobject,
                        icon: 'cloud',
                        action: 'View Object',
                        title: viewTitle,
                        description: 'View ' + sobject.label + ' object properties',
                        run: function () {
                            var url;
                            console.log(this.sobject);
                            if (this.sobject.custom) {
                                url = sf.instanceUrl + '/' + this.sobject.id + '?setupid=CustomObjects';
                            } else {
                                url = sf.instanceUrl + '/ui/setup/Setup?setupid=' + this.sobject.name;
                            }
                            chrome.tabs.create({ url: url });
                        }
                    });
                }

                if (listTitle.toLowerCase().indexOf(input.toLowerCase()) > -1 && sobject.layoutable && sobject.createable && sobject.deletable) {

                    commands.push({
                        sobject: sobject,
                        icon: 'cloud',
                        action: 'List Records',
                        title: listTitle,
                        description: 'List ' + sobject.label + ' records',
                        run: function () {
                            var url = sf.instanceUrl + '/' + this.sobject.keyPrefix;
                            chrome.tabs.create({ url: url });
                        }
                    });
                }

                if (newTitle.toLowerCase().indexOf(input.toLowerCase()) > -1 && sobject.layoutable && sobject.createable && sobject.deletable) {
                    commands.push({
                        sobject: sobject,
                        icon: 'cloud',
                        action: 'New Record',
                        title: newTitle,
                        description: 'New ' + sobject.label + ' record',
                        run: function () {
                            var url = sf.instanceUrl + '/' + this.sobject.keyPrefix + '/e';
                            chrome.tabs.create({ url: url });
                        }
                    });
                }
            }
        }

        return commands;
    };



    var SalesforceDocCommand = function (title, url) {
        this.id = 'SFDOC-' + title.replace(' ', '-');
        this.icon = 'cloud';
        this.action = 'Open Documentation';
        this.title = title;
        this.url = url;
        this.description = 'Open Salesforce documentation';
    };

    SalesforceDocCommand.prototype.run = function () {
        chrome.tabs.create({ url: this.url });
    };

    var SalesforceViewObjectCommand = function (title, url) {
        this.id = 'SFDOC-' + title.replace(' ', '-');
        this.icon = 'cloud';
        this.action = 'Open Documentation';
        this.title = title;
        this.url = url;
        this.description = 'Open Salesforce documentation';
    };

    SalesforceDocCommand.prototype.run = function () {
        chrome.tabs.create({ url: this.url });
    };

    Winston.Package.register('Salesforce', Salesforce);
})(Winston);

(function (Winston) {
    var StackOverflow = function () {
        // hard keywords are stripped from the query
        this.hardKeywords = ['stackoverflow'];
        this.softKeywords = ['issue', 'exception', 'error'];
    };

    StackOverflow.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    StackOverflow.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var commands = [];
        var so = this;

        if (input.length > 0) {
            so.hardKeywords.concat(so.softKeywords).forEach(function (keyword, keywordIndex) {
                var inputWords = input.trim().split(' ');
                var query = input;

                inputWords.forEach(function (inputWord, inputWordIndex) {
                    var matchesKeyword = keyword.indexOf(inputWord) === 0;

                    // continue to next inputWord if this doesn't match the current keyword
                    if (!matchesKeyword) return;

                    // remove hard keywords
                    if (so.hardKeywords.indexOf(keyword) > -1) {
                        query = query.replace(inputWord, '').trim();
                    }

                    // replace soft keywords
                    query = query.replace(inputWord, keyword);

                    if (query.length > 0) {
                        commands.push(new StackOverflowSearchCommand(query, keywordIndex.toString() + inputWordIndex.toString()));
                    } else {
                        commands.push(new StackOverflowHomeCommand());
                    }
                });
            });
        }

        return commands;
    };

    var StackOverflowHomeCommand = function () {
        this.id = 'SOHOME';
        this.icon = 'stack-overflow';
        this.action = 'Open Site';
        this.title = 'StackOverflow.com';
        this.description = 'StackOverflow: Open StackOverflow.com';
    };

    StackOverflowHomeCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://stackoverflow.com/' });
    };

    var StackOverflowSearchCommand = function (query, i) {
        this.id = 'SO' + i;
        this.query = query;
        this.icon = 'stack-overflow';
        this.action = 'Search StackOverflow';
        this.title = 'StackOverflow "' + this.query + '"';
        this.description = 'StackOverflow: Open StackOverflow search results';
    };

    StackOverflowSearchCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://stackoverflow.com/search?q=' + encodeURIComponent(this.query) });
    };

    Winston.Package.register('StackOverflow', StackOverflow);
})(Winston);

(function (Winston) {
    var Google = function () {};

    Google.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Google.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var commands = [];

        if (input.length > 0) {
            commands.push(new GoogleSearchCommand(input));
            commands.push(new GoogleLuckyCommand(input));
        }

        return commands;

        // fuzzy search commands
        // var f = new Fuse(commands, { keys: ['title'] });
        // var filteredCommands = f.search(input);
    };


    var GoogleSearchCommand = function (inputString) {
        this.id = 'GOOGLE1';
        this.input = inputString.trim();
        this.icon = 'google';
        this.action = 'Search Google';
        this.title = 'Google "' + this.input + '"';
        this.description = 'Open Google search results';
    };

    GoogleSearchCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://www.google.com/search?q=' + encodeURIComponent(this.input) });
    };

    var GoogleLuckyCommand = function (inputString) {
        this.id = 'GOOGLE2';
        this.input = inputString.trim();
        this.icon = 'google';
        this.action = 'Get Lucky';
        this.title = 'I\'m Feeling Lucky';
        this.description = 'Open the first result from Google';
    };

    GoogleLuckyCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://www.google.com/search?btnI=I&q=' + encodeURIComponent(this.input) });
    };

    Winston.Package.register('Google', Google);
})(Winston);
