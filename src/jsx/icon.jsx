var Icon = React.createClass({

    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        var classes = React.addons.classSet({
            'fa': true,
            'fa-spin': this.props.spin == true,
            'fa-': true
        });

        return <i className={classes + this.props.name}></i>;
    }
});
