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
