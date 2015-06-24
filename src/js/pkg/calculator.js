(function (Winston) {
    var Calculator = function () {};

    Calculator.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

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
                        chrome.runtime.getBackgroundPage(function (bgPage) {
                            bgPage.copyToClipboard(result);
                        });
                        window.close();
                    }
                });
            }
        } catch(e) {}

        return commands;
    };

    Winston.Package.register('Calculator', Calculator);
})(Winston);
