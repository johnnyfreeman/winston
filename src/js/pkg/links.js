(function (Winston) {
    var Links = function () {
        var inst = this;
        this.links = [];
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {getAllLinks: true}, function (response) {
                inst.links = response;
            });
        });
    };

    Links.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Links.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var commands = [];

        if (input.length > 0) {
            this.links.forEach(function (a) {
                if (a.innerText.indexOf(input.toLowerCase()) > -1) {
                    commands.push({
                        id: 'LINKS',
                        icon: 'link',
                        title: a.innerText,
                        url: a.href,
                        description: a.href,
                        action: 'Follow Link',
                        run: function () {
                            chrome.tabs.create({ url: this.url });
                        }
                    });
                }
            });
        }

        return commands;

        // fuzzy search commands
        // var f = new Fuse(commands, { keys: ['title'] });
        // var filteredCommands = f.search(input);
    };

    Winston.Package.register('Links', Links);
})(Winston);
