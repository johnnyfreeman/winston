var React = require('react'),
    ReactDOM = require('react-dom'),
    Icon = require('./icon.jsx'),
    SearchBox = require('./searchbox.jsx'),
    ResultsList = require('./resultslist.jsx'),
    PackageManager = require('../js/package-manager.js'),
    Bluebird = require('bluebird');

Bluebird.config({
    // Enable warnings.
    warnings: true,
    // Enable long stack traces.
    longStackTraces: true,
    // Enable cancellation.
    cancellation: true
});

module.exports = React.createClass({

    getInitialState: function() {
        return {
            results: [],
            selectedIndex: 0,
            loading: false,
            searchQuery: ''
        };
    },

    componentDidMount: function() {
        var app = this;
        this.inputHandlers = null;
    },

    render: function() {
        return <div onKeyDown={this.keyDownHandler} onMouseOver={this.hoverHandler}>
            <Icon name="circle-o-notch" spin={this.state.loading} />
            <SearchBox onChange={this.triggerInputHandlers} loading={this.state.loading} ref="searchBox" query={this.state.searchQuery} />
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
            ReactDOM.findDOMNode(this.refs.resultsList).childNodes[i].scrollIntoViewIfNeeded(false);
        }
    },

    selectPrevious: function () {
        var i = this.state.selectedIndex;
        if (i > 0) {
            // update selected index
            i = i - 1;
            this.setState({ selectedIndex: i });
            // update scroll position of resultsList
            var resultsNode = ReactDOM.findDOMNode(this.refs.resultsList);
            var selectedNode = resultsNode.childNodes[i];
            if (resultsNode.scrollTop > selectedNode.offsetTop)
                resultsNode.scrollTop = selectedNode.offsetTop;
        }
    },

    runSelected: function () {
        var selectedCommand = this.state.results[this.state.selectedIndex];
        this.setState({loading: true});
        var resetState = this.setState.bind(this, this.getInitialState());
        Bluebird.resolve(selectedCommand.run()).then(resetState);
    },

    triggerInputHandlers: function (e) {
        var app = this;

        // cancel current execution chain
        if (this.inputHandlers !== null) {
            this.inputHandlers.cancel();
        }

        // loading
        app.setState({loading: true, searchQuery: e.target.value});

        // execute all package inputHandlers side by side
        // and build array of the returned promises
        var promises = [];
        var enabledPackages = PackageManager.enabledPackages;
        var enabledPackageNames = Object.keys(PackageManager.enabledPackages);
        enabledPackageNames.forEach(function (name, i) {
            // allow Winston to move on to other package 
            // inputHandlers if one fails for some reason
            try {
                promises.push(enabledPackages[name].inputHandler(e));
            } catch (error) {
                app.errorHandler(error, name);
            }
        });

        // when all promises are fulfilled
        this.inputHandlers = Bluebird.all(promises)

        // combine package commands together
        .then(function (results) {
            var commands = [];
            results.forEach(function (result) {
                // normalize each return result as a promise
                var result = Bluebird.resolve(result);
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
        // .catch(this.errorHandler);
    },

    errorHandler: function (error) {
        if (error.name !== 'CancellationError') {
            console.error(error);
        }
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
