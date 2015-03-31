var Pinterest = function (searchInput) {
    var pinterest = this;
    this.searchInput = searchInput;

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        pinterest.url = tabs[0].url;
    });
};

Pinterest.prototype.inputHandler = function () {
    var commands = [];
    var deferred = Q.defer();
    var input = this.searchInput.value;

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
