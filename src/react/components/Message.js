import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import ToggleLikeButton from "./ToggleLikeButton";
import DeleteMessageButton from "./DeleteMessageButton";
import { connect } from "../HOCs";
import "./Message.css"

class Message extends Component {
  render() {
    return (
      <Card id= "messagecard">
        <Card.Content header={this.props.username} />
        <Card.Content description={this.props.text} />
        <Card.Content extra>
          <p>Created: {new Date(this.props.createdAt).toDateString()}</p>
          <ToggleLikeButton likes={this.props.likes} id={this.props.id} />
          {this.props.username === this.props.logInUser && <DeleteMessageButton id={this.props.id} />}
        </Card.Content>
      </Card>
    );
  }
}

export default connect(state=>({logInUser: state.auth.login.result.username}))(Message)
