var App = React.createClass({

    getInitialState: function() {
        return {
            results: [],
            selectedIndex: 0,
            loading: false
        };
    },

    componentDidMount: function() {
        var app = this;
        var searchInput = this.refs.searchBox.getDOMNode();
        this.inputHandlers = null;

        // enable packages
        var packages = ['Calculator', 'Tabs', 'Bookmarks', 'Pinterest', 'Salesforce', 'YouTube', 'History', 'Google'];

        chrome.storage.local.get(packages, function(options) {
            packages.forEach(function (name) {
                if (options[name] == true) {
                    Winston.Package.enable(name, searchInput);
                }
            });
        });
    },

    render: function() {
        return <div onKeyDown={this.keyDownHandler} onMouseOver={this.hoverHandler}>
            <Icon name="refresh" spin={this.state.loading} />
            <SearchBox changeHandler={this.triggerInputHandlers} loading={this.state.loading} ref="searchBox" />
            <ResultsList clickHandler={this.runSelected} data={this.state.results} selectedIndex={this.state.selectedIndex} ref="resultsList" />
        </div>;
    },

    keyDownHandler: function (e) {
        switch (e.which) {
            case 40:
                e.preventDefault();
                this.selectNext();
                break;
            case 38:
                e.preventDefault();
                this.selectPrevious();
                break;
            case 13:
                e.preventDefault();
                this.runSelected();
                break;
        }
    },

    hoverHandler: function (e) {
        var closest = function (node, className) {
            while (node) {
                if (node.classList.contains('result')) {
                    return node;
                } else {
                    node = node.parentElement;
                }
            }
            return false;
        };
        var result = closest(e.target, 'result');
        if (result) {
            var i = Array.prototype.indexOf.call(result.parentNode.children, result);
            this.setState({ selectedIndex: i });
        }
    },

    selectNext: function () {
        var last = this.state.results.length - 1;
        var i = this.state.selectedIndex;
        if (i < last) {
            // update selected index
            i = i + 1;
            this.setState({ selectedIndex: i });
            // update scroll position of resultsList
            this.refs.resultsList.getDOMNode().childNodes[i].scrollIntoViewIfNeeded(false);
        }
    },

    selectPrevious: function () {
        var i = this.state.selectedIndex;
        if (i > 0) {
            // update selected index
            i = i - 1;
            this.setState({ selectedIndex: i });
            // update scroll position of resultsList
            var resultsNode = this.refs.resultsList.getDOMNode();
            var selectedNode = resultsNode.childNodes[i];
            if (resultsNode.scrollTop > selectedNode.offsetTop)
                resultsNode.scrollTop = selectedNode.offsetTop;
        }
    },

    runSelected: function () {
        var selectedCommand = this.state.results[this.state.selectedIndex];
        return selectedCommand.run();
    },

    triggerInputHandlers: function (e) {
        var app = this;

        // cancel current execution chain
        if (this.inputHandlers !== null) {
            this.inputHandlers.cancel();
        }

        // loading
        app.setState({loading: true});

        // execute all package inputHandlers side by side
        // and build array of the returned promises
        var promises = [];
        var enabledPackages = Winston.Package.enabledPackages;
        var enabledPackageNames = Object.keys(Winston.Package.enabledPackages);
        enabledPackageNames.forEach(function (name, i) {
            promises.push(enabledPackages[name].inputHandler(e));
        });

        // when all promises are fulfilled
        this.inputHandlers = Promise.settle(promises)

        // mark as cancellable
        .cancellable()

        // combine package commands together
        .then(function (results) {
            var commands = [];
            results.forEach(function (result) {
                if (result.isFulfilled()) {
                    commands = commands.concat(result.value());
                }
            });
            return commands;
        })

        // update react state
        .then(function (commands) {
            app.setState({
                results: commands,
                selectedIndex: 0,
                loading: false
            });
        })

        // error handler
        .catch(function (error) {
            if (error.name !== 'CancellationError') {
                console.error(error);
            }
        });
    },

    debounce: function (func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
    		var later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};
    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    }
});
