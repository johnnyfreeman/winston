var ResultsList = React.createClass({displayName: "ResultsList",

    // getInitialState: function() {
    //     return {
    //         selectedIndex: 0
    //     };
    // },

    render: function() {
        var selectedIndex = this.props.selectedIndex;
        
        var results = this.props.data.map(function (result, index) {
            if (index == selectedIndex) {
                return React.createElement(Result, {title: result.title, description: result.description, selected: "true"});
            }
            return React.createElement(Result, {title: result.title, description: result.description, selected: "false"});
        });

        return React.createElement("ul", {className: "resultsList"}, 
            results
        );
    }
});
