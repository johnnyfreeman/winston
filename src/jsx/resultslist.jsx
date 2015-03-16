var ResultsList = React.createClass({

    propTypes: {
        data: React.PropTypes.array,
        selectedIndex: React.PropTypes.number
    },

    render: function() {
        var selectedIndex = this.props.selectedIndex;

        return <ul className="resultsList">
            {this.props.data.map(function (result, index) {
                return <Result key={result.id} icon={result.icon} title={result.title} description={result.description} selected={index==selectedIndex} />;
            })}
        </ul>;
    }
});
