var Bookmarks = function (searchInput) {
    this.searchInput = searchInput;
};

Bookmarks.prototype.inputHandler = function () {
    var deferred = Q.defer();
    var input = this.searchInput.value;

    chrome.bookmarks.search(input, function (bookmarks) {
        var commands = [];

        bookmarks.forEach(function (bookmark) {
            commands.push(new BookmarkCommand(bookmark));
        });

        deferred.resolve(commands);
    });

    return deferred.promise;
};

var BookmarkCommand = function (bookmark) {
    this.icon = 'bookmark';
    this.title = bookmark.title;
    this.description = bookmark.url;
};

BookmarkCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.description });
};
