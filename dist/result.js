var Result = React.createClass({displayName: "Result",
    render: function() {
        return (
            React.createElement("li", {className: "result"}, 
                React.createElement("div", {class: "result-title"}, 
                    this.props.title
                ), 
                React.createElement("div", {class: "result-description"}, 
                    this.props.description
                )
            )
        );
    }
});
