var SearchBox = React.createClass({

    // focus on input field after component mounts
    componentDidMount: function() {
        this.refs.input.getDOMNode().focus();
    },

    // render view
    render: function() {
        return <input autoFocus="true" id="searchBox" onChange={this.props.changeHandler} placeholder="How may I assist you?" ref="input" />;
    }
});
