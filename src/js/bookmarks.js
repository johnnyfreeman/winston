var Bookmarks = function (searchInput) {
    this.searchInput = searchInput;
};

Bookmarks.prototype.inputHandler = function () {
    var input = this.searchInput.value;
    var commands = [];

    // create command
    var cmd = new CreateBookmarkCommand();
    var title = cmd.title.toLowerCase();
    if (input.length > 0 && title.indexOf(input.toLowerCase()) == 0) {
        commands.push(cmd);
    }

    return new Promise(function (resolve, reject) {
        chrome.bookmarks.search(input, function (bookmarks) {
            bookmarks.forEach(function (bookmark, i) {
                commands.push(new BookmarkCommand(bookmark, i));
            });

            resolve(commands);
        });
    });
};

var BookmarkCommand = function (bookmark, i) {
    this.id = 'BOOKMARK' + i;
    this.icon = 'star-o';
    this.title = bookmark.title;
    this.url = bookmark.url;
    this.description = 'Bookmark: ' + this.url;
    this.action = 'Open';
};

BookmarkCommand.prototype.run = function () {
    chrome.tabs.create({ url: this.url });
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
        }, function () {
            // close the extension
            window.close();
        });
    });
};
