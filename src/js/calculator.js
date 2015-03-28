var Calculator = function (searchInput) {
    this.searchInput = searchInput;
};

Calculator.prototype.inputHandler = function () {
    var commands = [];
    var input = this.searchInput.value;
    var result;

    try {
        result = math.format(math.eval(input), 2);
        if (result !== 'undefined' && result !== 'function') {
            commands.push({
                id: 'CALCULATOR1',
                title: result,
                description: "Calculator: Copy '" + result + "' to your clipboard",
                action: 'Copy',
                icon: 'calculator',
                run: function () {
                    document.execCommand('copy');
                }
            });
        }
    } catch(e) {}

    return commands;
};
