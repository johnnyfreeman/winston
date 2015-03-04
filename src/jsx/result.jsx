var Result = React.createClass({
    render: function() {
        var selected = this.props.selected == "true";

        var classes = React.addons.classSet({
            result: true,
            selected: selected
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
