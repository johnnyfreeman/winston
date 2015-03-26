var Icon = React.createClass({displayName: "Icon",

    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        return React.createElement("i", {className: 'fa fa-' + this.props.name});
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
            selectedIndex: 0
        };
    },

    componentDidMount: function() {

        var searchInput = this.refs.searchBox.getDOMNode();

        // register packages
        this.packages = [
            new Calculator(searchInput),
            new Tabs(searchInput),
            new Bookmarks(searchInput),
            new Salesforce(searchInput),
            new Youtube(searchInput),
            new History(searchInput),
            new Google(searchInput)
        ];

        Q.longStackSupport = true;
    },

    render: function() {
        return React.createElement("div", {onKeyDown: this.keyDownHandler, onMouseOver: this.hoverHandler}, 
            React.createElement(SearchBox, {changeHandler: this.triggerInputHandlers, ref: "searchBox"}), 
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

        // execute all package inputHandlers side by side
        // and build array of the returned promises
        var promises = [];
        this.packages.forEach(function (package) {
            promises.push(Q.when(package.inputHandler()));
        });

        // when all promises are fulfilled
        Q.allSettled(promises)

        // combine package commands together
        .then(function (results) {
            var commands = [];
            results.forEach(function (result) {
                if (result.state === "fulfilled") {
                    commands = commands.concat(result.value);
                }
            });
            return commands;
        })

        // update react state
        .then(function (commands) {
            app.setState({
                results: commands,
                selectedIndex: 0
            });
        })

        // error handler
        .fail(function (error) {
            console.error(error);
        }).done();
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

React.render(React.createElement(App, null), document.body);
