var SearchBox = React.createClass({displayName: "SearchBox",

    render: function() {
        return (
            React.createElement("input", {placeholder: "How may I assist you?", ref: "input", autoFocus: "true", onChange: this.props.handler})
        );
    }
});
