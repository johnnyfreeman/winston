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
