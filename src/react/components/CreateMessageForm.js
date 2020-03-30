import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";
import { addMessage } from "../../redux";
import "./CreateMessageForm.css";

class CreateMessageForm extends Component {
  state = {
    text: ""
  };

  handlePost = e => {
    e.preventDefault();
    this.props.addMessage(this.state).then(e => window.location.reload());
    this.setState({ text: "" });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div id="wrapper">
        <form onSubmit={this.handlePost}>
          <Input
            id="message-input"
            type="text"
            name="text"
            placeholder="Add your message"
            onChange={this.handleChange}
          ></Input>
          <Button id="post-button" type="submit">
            Post
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.messages.addMessage.result,
    loading: state.messages.addMessage.loading,
    error: state.messages.addMessage.error
  }),
  { addMessage }
)(CreateMessageForm);
