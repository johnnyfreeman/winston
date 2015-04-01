(function (Winston) {
    var Calculator = function () {};

    Calculator.prototype.inputHandler = function (e) {
        var commands = [];
        var input = e.target.value;
        var result;

        try {
            result = math.format(math.eval(input), 2);
            if (result !== 'undefined' && result !== 'function') {
                commands.push({
                    id: 'CALCULATOR1',
                    title: result,
                    description: "Copy '" + result + "' to your clipboard",
                    action: 'Copy To Clipboard',
                    icon: 'calculator',
                    run: function () {
                        document.execCommand('copy');
                    }
                });
            }
        } catch(e) {}

        return commands;
    };

    Winston.Package.register('Calculator', Calculator);
})(Winston);
