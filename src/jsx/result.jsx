var React = require('react'),
    classNames = require('classnames'),
    Icon = require('./icon.jsx');

module.exports =  React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        icon: React.PropTypes.string,
        description: React.PropTypes.string,
        selected: React.PropTypes.bool,
        action: React.PropTypes.string
    },

    render: function() {

        var classes = classNames({
            result: true,
            selected: this.props.selected
        });

        return <li className={classes}>
            <div className="icon">
                <Icon name={this.props.icon} />
            </div>
            <div className="action">
                {this.props.action}
            </div>
            <div className="title truncate">
                {this.props.title}
            </div>
            <div className="description truncate">
                {this.props.description}
            </div>
        </li>;
    }
});
