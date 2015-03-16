var Result = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        icon: React.PropTypes.string,
        description: React.PropTypes.string,
        selected: React.PropTypes.bool
    },

    render: function() {

        var classes = React.addons.classSet({
            result: true,
            selected: this.props.selected
        });

        return <li className={classes}>
            <div className="icon">
                <Icon name={this.props.icon} />
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
