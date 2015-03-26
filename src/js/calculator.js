var Calculator = function (searchInput) {
    this.searchInput = searchInput;
};

Calculator.prototype.inputHandler = function () {
    var commands = [];
    var input = this.searchInput.value;

    try {
        var command = {};
        command.result = math.eval(input);
        command.title = command.result.toString();
        command.description = "Calculator: Copy '" + command.title + "' to your clipboard";
        command.action = 'Copy';
        command.icon = 'calculator';
        command.run = function () {
            document.execCommand('copy');
        };

        if (input.length > 0) commands.push(command);
    } catch(e) {}

    return commands;
};
