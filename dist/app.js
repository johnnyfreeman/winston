var App = React.createClass({displayName: "App",

    getInitialState: function() {
        return {
            results: []
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
        return (
            React.createElement("div", null, 
                React.createElement(SearchBox, {handler: this.searchHandler}), 
                React.createElement(ResultsList, {data: this.state.results})
            )
        );
    },

    searchHandler: function (e) {

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
        this.setState({ results: filteredCommands });
    }
});
