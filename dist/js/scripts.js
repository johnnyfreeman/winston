var Bookmarks = function (searchInput) {
    this.searchInput = searchInput;
};

Bookmarks.prototype.inputHandler = function () {
    var input = this.searchInput.value;

    return Q([]).then(function (commands) {
        if (input.indexOf('bookmark') > -1) {
            commands.push(new CreateBookmarkCommand());
        }
        return commands;
    }).then(function (commands) {
        var deferred = Q.defer();

        chrome.bookmarks.search(input, function (bookmarks) {

            bookmarks.forEach(function (bookmark) {
                commands.push(new BookmarkCommand(bookmark));
            });

            deferred.resolve(commands);
        });

        return deferred.promise;
    });

};

var BookmarkCommand = function (bookmark) {
    this.icon = 'star-o';
    this.title = bookmark.title;
    this.description = 'Bookmark: ' + bookmark.url;
    this.action = 'Open';
};

BookmarkCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.description });
};

var CreateBookmarkCommand = function () {
    this.icon = 'star-o';
    this.title = 'Bookmark This Page';
    this.description = 'Bookmark: Create a bookmark for the active tab';
    this.action = 'Create';
};

CreateBookmarkCommand.prototype.run = function () {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.bookmarks.create({
            title: tabs[0].title,
            url: tabs[0].url
        });
    });
};

var Tabs = function (searchInput) {
    this.searchInput = searchInput;
};

Tabs.prototype.inputHandler = function () {
    var input = this.searchInput.value;

    return Q([]).then(function (commands) {
        var deferred = Q.defer();

        if (input.length > 0) {
            chrome.tabs.query({title: '*'+input+'*'}, function (tabs) {
                tabs.forEach(function (tab) {
                    commands.push(new TabSearchCommand(tab));
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

var Calculator = function (searchInput) {
    this.searchInput = searchInput;
};

Calculator.prototype.inputHandler = function () {

    var commands = [];
    var deferred = Q.defer();
    var input = this.searchInput.value;

    try {
        var command = {};
        command.result = math.eval(input);
        command.title = command.result;
        command.description = "Calculator: Copy '" + command.title + "' to your clipboard";
        command.action = 'Copy';
        command.icon = 'calculator';
        command.run = function () {
            document.execCommand('copy');
        };

        if (input.length > 0) commands.push(command);
    } catch(e) {}

    deferred.resolve(commands);

    return deferred.promise;
};

var Youtube = function (searchInput) {
    this.searchInput = searchInput;

    // hard keywords are stripped from the query
    this.hardKeywords = ['video', 'youtube'];
    this.softKeywords = ['cover', 'movie', 'music', 'trailer', 'tutorial'];
};

Youtube.prototype.inputHandler = function () {
    var deferred = Q.defer();
    var input = this.searchInput.value;
    var commands = [];

    // determine if input contains any keywords
    var keywordFound = false;
    this.hardKeywords.concat(this.softKeywords).forEach(function (keyword) {
        console.log(keyword, input.indexOf(keyword));
        if (input.indexOf(keyword) > -1) {
            keywordFound = true;
        }
    });

    var query = input;
    if (keywordFound) {
        // stip out hard keywords
        this.hardKeywords.forEach(function (hardKeyword) {
            query = query.replace(hardKeyword, '').trim();
        });

        // add command
        commands.push(new YoutubeSearchCommand(query));
    }

    deferred.resolve(commands);
    return deferred.promise;
};

var YoutubeSearchCommand = function (query) {
    this.id = 'YOUTUBE1';
    this.query = query;
    this.icon = 'youtube';
    this.action = 'Search';
    this.title = 'YouTube "' + this.query + '"';
    this.description = 'YouTube: Open YouTube search results';
};

YoutubeSearchCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.youtube.com/results?search_query=' + this.query });
};

var Google = function (searchInput) {
    this.searchInput = searchInput;
};

Google.prototype.inputHandler = function (searchInput) {
    var deferred = Q.defer();
    var input = this.searchInput.value;

    var commands = [
        new GoogleSearchCommand(input),
        new GoogleLuckyCommand(input)
    ];

    deferred.resolve(input.length > 0 ? commands : []);
    return deferred.promise;

    // fuzzy search commands
    // var f = new Fuse(commands, { keys: ['title'] });
    // var filteredCommands = f.search(input);
};


var GoogleSearchCommand = function (inputString) {
    this.id = 'GOOGLE1';
    this.input = inputString;
    this.icon = 'google';
    this.action = 'Search';
    this.title = 'Google "' + this.input + '"';
    this.description = 'Google: Open Google search results';
};

GoogleSearchCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?q=' + this.input });
};

var GoogleLuckyCommand = function (inputString) {
    this.id = 'GOOGLE2';
    this.input = inputString;
    this.icon = 'google';
    this.action = 'Open';
    this.title = 'I\'m Feeling Lucky';
    this.description = 'Google: Open the first result from Google';
};

GoogleLuckyCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?btnI=I&q=' + this.input });
};
