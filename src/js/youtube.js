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
