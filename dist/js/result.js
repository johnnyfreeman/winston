var Result = React.createClass({displayName: "Result",

    propTypes: {
        title: React.PropTypes.string,
        description: React.PropTypes.string,
        selected: React.PropTypes.bool
    },

    render: function() {

        var classes = React.addons.classSet({
            result: true,
            selected: this.props.selected
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
