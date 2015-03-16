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
        selected: React.PropTypes.bool
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

        return React.createElement("ul", {className: "resultsList"}, 
            this.props.data.map(function (result, index) {
                return React.createElement(Result, {key: result.id, icon: result.icon, title: result.title, description: result.description, selected: index==selectedIndex});
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
            new Google(searchInput),
            new Youtube(searchInput),
            new Calculator(searchInput),
            new Bookmarks(searchInput)
        ];

        Q.longStackSupport = true;
    },

    render: function() {
        return React.createElement("div", {onKeyDown: this.keyDownHandler}, 
            React.createElement(SearchBox, {changeHandler: this.triggerInputHandlers, ref: "searchBox"}), 
            React.createElement(ResultsList, {data: this.state.results, selectedIndex: this.state.selectedIndex})
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

    selectNext: function () {
        var last = this.state.results.length - 1;
        var i = this.state.selectedIndex;
        if (i < last) {
            this.setState({ selectedIndex: i + 1 });
        }
    },

    selectPrevious: function () {
        var i = this.state.selectedIndex;
        if (i > 0) {
            this.setState({ selectedIndex: i - 1 });
        }
    },

    runSelected: function () {
        var selectedCommand = this.state.results[this.state.selectedIndex];
        return selectedCommand.run();
    },

    triggerInputHandlers: function (e) {

        // var app = this;
        //
        // var commands = [];
        // commands = new Google(e).inputHandler();
        // commands = new Youtube(e).inputHandler().concat(commands);
        // commands = new Calculator(e).inputHandler().concat(commands);
        // new Bookmarks(e).inputHandler().then(function (bookmarkCommands) {
        //     commands = bookmarkCommands.concat(commands);
        // });

        // trigger input handler for each package
        var app = this;
        var promise = Q([]);

        this.packages.forEach(function (package) {
            console.log('running: ', package);
            promise = promise.then(function(commands) {
                console.log('commands', commands);
                return package.inputHandler().then(function (packageCommands) {
                    console.log('package commands', packageCommands);
                    return packageCommands.concat(commands);
                });
            });
        });

        promise.then(function (commands, two) {
            console.log('DONE', commands, two);
            app.setState({
                results: commands,
                selectedIndex: 0
            });
        })
        .fail(function (error) {
            console.log(error);
        }).done();
    }
});

React.render(React.createElement(App, null), document.body);
