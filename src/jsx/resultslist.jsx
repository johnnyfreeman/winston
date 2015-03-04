var ResultsList = React.createClass({

    // getInitialState: function() {
    //     return {
    //         selectedIndex: 0
    //     };
    // },

    render: function() {
        var selectedIndex = this.props.selectedIndex;
        
        var results = this.props.data.map(function (result, index) {
            if (index == selectedIndex) {
                return <Result title={result.title} description={result.description} selected="true" />;
            }
            return <Result title={result.title} description={result.description} selected="false" />;
        });

        return <ul className="resultsList">
            {results}
        </ul>;
    }
});
