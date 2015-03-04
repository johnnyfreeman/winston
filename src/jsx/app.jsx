var App = React.createClass({

    getInitialState: function() {
        return {
            results: [],
            selectedIndex: 0
        };
    },

    componentDidMount: function() {
        // $.ajax({
        //     url: this.props.url,
        //     dataType: 'json',
        //     success: function(data) {
        //         this.setState({data: data});
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
    },

    render: function() {
        return <div onKeyDown={this.keyDownHandler}>
            <SearchBox changeHandler={this.inputChangeHandler} />
            <ResultsList data={this.state.results} selectedIndex={this.state.selectedIndex} />
        </div>;
    },

    keyDownHandler: function (e) {
        if (e.which === 40) {
            this.selectNext();
        } else if (e.which === 38) {
            this.selectPrevious();
        }
    },

    selectNext: function () {
        this.setState({ selectedIndex: this.state.selectedIndex + 1 });
    },

    selectPrevious: function () {
        this.setState({ selectedIndex: this.state.selectedIndex - 1 });
    },

    inputChangeHandler: function (e) {

        // get list of commands
        var commands = [
            { title: "one", description: "description of one" },
            { title: "two", description: "description of two" },
            { title: "three", description: "description of three" },
            { title: "four", description: "description of four" },
            { title: "five", description: "description of five" },
            { title: "six", description: "description of six" },
            { title: "seven", description: "description of seven" },
            { title: "eight", description: "description of eight" },
            { title: "nine", description: "description of nine" },
            { title: "ten", description: "description of ten" }
        ];

        // fuzzy search commands
        var f = new Fuse(commands, { keys: ['title'] });
        var filteredCommands = f.search(e.target.value);

        // update results list
        this.setState({ results: filteredCommands.slice(0, 5) });
    }
});
