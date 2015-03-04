var ResultsList = React.createClass({displayName: "ResultsList",
    render: function() {
        var resultNodes = this.props.data.map(function (result) {
            return (
                React.createElement(Result, {title: result.title, description: result.description})
            );
        });
        return (
            React.createElement("ul", {class: "resultsList"}, 
                resultNodes
            )
        );
    }
});
