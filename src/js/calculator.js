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
