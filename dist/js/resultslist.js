var ResultsList = React.createClass({displayName: "ResultsList",

    propTypes: {
        data: React.PropTypes.array,
        selectedIndex: React.PropTypes.number
    },

    render: function() {
        var selectedIndex = this.props.selectedIndex;

        return React.createElement("ul", {className: "resultsList"}, 
            this.props.data.map(function (result, index) {
                return React.createElement(Result, {key: result.id, title: result.title, description: result.description, selected: index==selectedIndex});
            })
        );
    }
});
