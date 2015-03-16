var Icon = React.createClass({

    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        return <i className={'fa fa-' + this.props.name}></i>;
    }
});
