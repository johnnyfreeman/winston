var Result = React.createClass({

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

        return <li className={classes}>
            <div className="title">
                {this.props.title}
            </div>
            <div className="description">
                {this.props.description}
            </div>
        </li>;
    }
});
