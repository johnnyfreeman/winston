var App = React.createClass({

    getInitialState: function() {
        return {
            results: [],
            selectedIndex: 0
        };
    },

    componentDidMount: function() {
    },

    render: function() {
        return <div onKeyDown={this.keyDownHandler}>
            <SearchBox changeHandler={this.triggerInputHandlers} />
            <ResultsList data={this.state.results} selectedIndex={this.state.selectedIndex} />
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
                this.state.results[this.state.selectedIndex].handler();
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

    triggerInputHandlers: function (e) {

        var google = new Google(e);
        var commands = google.inputHandler();

        // update results list
        this.setState({
            results: commands.slice(0, 5),
            selectedIndex: 0
        });
    }
});
