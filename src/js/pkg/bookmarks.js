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
                if (node.title.toLowerCase().indexOf(input.toLowerCase()) > -1 && node.url.toLowerCase().indexOf(input.toLowerCase()) > -1) {
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
