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
    this.icon = 'bookmark';
    this.title = bookmark.title;
    this.description = bookmark.url;
};

BookmarkCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.description });
};

var CreateBookmarkCommand = function () {
    this.icon = 'bookmark';
    this.title = 'Bookmark This Page';
    this.description = 'Create a bookmark for the active tab';
};

CreateBookmarkCommand.prototype.run = function () {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.bookmarks.create({
            title: tabs[0].title,
            url: tabs[0].url
        });
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
        command.description = "Copy '" + command.title + "' to your clipboard";
        command.icon = 'calculator';
        command.run = function () {
            // copy to clipboard
        };

        if (input.length > 0) commands.push(command);
    } catch(e) {}

    deferred.resolve(commands);

    return deferred.promise;
};

var Youtube = function (searchInput) {
    this.searchInput = searchInput;
};

Youtube.prototype.inputHandler = function () {
    var deferred = Q.defer();
    var input = this.searchInput.value;
    var query = input.slice(8);
    var commands = [
        {
            query: query,
            title: "YouTube: Search for '" + query + "'",
            description: "Search YouTube for '" + query + "'",
            icon: 'youtube',
            run: function () {
                chrome.tabs.create({
                    url: 'https://www.youtube.com/results?search_query=' + this.query
                });
            }
        }
    ];
    deferred.resolve(input.indexOf("youtube") > -1 ? commands : []);
    return deferred.promise;
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
    this.title = 'Google "' + this.input + '"';
    this.description = 'Open Google search results';
};

GoogleSearchCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?q=' + this.input });
};

var GoogleLuckyCommand = function (inputString) {
    this.id = 'GOOGLE2';
    this.input = inputString;
    this.icon = 'google';
    this.title = 'I\'m Feeling Lucky';
    this.description = 'Open the first result from Google';
};

GoogleLuckyCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?btnI=I&q=' + this.input });
};
