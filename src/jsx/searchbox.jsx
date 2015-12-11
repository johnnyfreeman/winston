var React = require('react');
var ReactDOM = require('react-dom');

module.exports =  React.createClass({

    propTypes: {
        query: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            searchQuery: ''
        };
    },

    // focus on input field after component mounts
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.input).focus();
    },

    // render view
    render: function() {
        return <input autoFocus="true" id="searchBox" onChange={this.props.onChange} placeholder="How may I assist you?" ref="input" value={this.props.query} />;
    }
});
