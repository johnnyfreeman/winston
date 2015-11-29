var React = require('react');
var ReactDOM = require('react-dom');

module.exports =  React.createClass({

    // focus on input field after component mounts
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.input).focus();
    },

    // render view
    render: function() {
        return <input autoFocus="true" id="searchBox" onChange={this.props.changeHandler} placeholder="How may I assist you?" ref="input" />;
    }
});
