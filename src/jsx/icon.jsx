var React = require('react');
var classNames = require('classnames');

module.exports =  React.createClass({

    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        var classes = classNames({
            'fa': true,
            'fa-spin': this.props.spin == true,
            'fa-': true
        });

        return <i className={classes + this.props.name}></i>;
    }
});
