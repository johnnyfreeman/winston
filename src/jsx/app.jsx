var App = React.createClass({

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
            new Bookmarks(searchInput),
            new Tabs(searchInput),
            new Calculator(searchInput)
        ];

        Q.longStackSupport = true;
    },

    render: function() {
        return <div onKeyDown={this.keyDownHandler} onMouseOver={this.hoverHandler}>
            <SearchBox changeHandler={this.triggerInputHandlers} ref="searchBox" />
            <ResultsList data={this.state.results} selectedIndex={this.state.selectedIndex} ref="resultsList" />
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

        // trigger input handler for each package
        var app = this;
        var promise = Q([]);

        this.packages.forEach(function (package) {
            // console.log('running: ', package);
            promise = promise.then(function(commands) {
                // console.log('commands', commands);
                return package.inputHandler().then(function (packageCommands) {
                    // console.log('package commands', packageCommands);
                    return packageCommands.concat(commands);
                });
            });
        });

        promise.then(function (commands, two) {
            // console.log('DONE', commands, two);
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
