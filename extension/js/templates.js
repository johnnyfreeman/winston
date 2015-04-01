var Icon = React.createClass({displayName: "Icon",

    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        var classes = React.addons.classSet({
            'fa': true,
            'fa-spin': this.props.spin == true,
            'fa-': true
        });

        return React.createElement("i", {className: classes + this.props.name});
    }
});

var Result = React.createClass({displayName: "Result",

    propTypes: {
        title: React.PropTypes.string,
        icon: React.PropTypes.string,
        description: React.PropTypes.string,
        selected: React.PropTypes.bool,
        action: React.PropTypes.string
    },

    render: function() {

        var classes = React.addons.classSet({
            result: true,
            selected: this.props.selected
        });

        return React.createElement("li", {className: classes}, 
            React.createElement("div", {className: "icon"}, 
                React.createElement(Icon, {name: this.props.icon})
            ), 
            React.createElement("div", {className: "action"}, 
                this.props.action
            ), 
            React.createElement("div", {className: "title truncate"}, 
                this.props.title
            ), 
            React.createElement("div", {className: "description truncate"}, 
                this.props.description
            )
        );
    }
});

var ResultsList = React.createClass({displayName: "ResultsList",

    propTypes: {
        data: React.PropTypes.array,
        selectedIndex: React.PropTypes.number
    },

    render: function() {
        var selectedIndex = this.props.selectedIndex;

        return React.createElement("ul", {className: "resultsList", onClick: this.props.clickHandler}, 
            this.props.data.map(function (result, index) {
                return React.createElement(Result, {key: result.id, icon: result.icon, title: result.title, description: result.description, selected: index==selectedIndex, action: result.action});
            })
        );
    }
});

var SearchBox = React.createClass({displayName: "SearchBox",

    // focus on input field after component mounts
    componentDidMount: function() {
        this.refs.input.getDOMNode().focus();
    },

    // render view
    render: function() {
        return React.createElement("input", {autoFocus: "true", id: "searchBox", onChange: this.props.changeHandler, placeholder: "How may I assist you?", ref: "input"});
    }
});

var App = React.createClass({displayName: "App",

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
        return React.createElement("div", {onKeyDown: this.keyDownHandler, onMouseOver: this.hoverHandler}, 
            React.createElement(Icon, {name: "refresh", spin: this.state.loading}), 
            React.createElement(SearchBox, {changeHandler: this.triggerInputHandlers, loading: this.state.loading, ref: "searchBox"}), 
            React.createElement(ResultsList, {clickHandler: this.runSelected, data: this.state.results, selectedIndex: this.state.selectedIndex, ref: "resultsList"})
        );
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
