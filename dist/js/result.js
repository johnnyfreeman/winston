var Result = React.createClass({displayName: "Result",
    render: function() {
        var selected = this.props.selected == "true";

        var classes = React.addons.classSet({
            result: true,
            selected: selected
        });

        return React.createElement("li", {className: classes}, 
            React.createElement("div", {className: "title"}, 
                this.props.title
            ), 
            React.createElement("div", {className: "description"}, 
                this.props.description
            )
        );
    }
});
