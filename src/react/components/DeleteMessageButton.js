import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "../HOCs";
import { deleteMessage } from "../../redux";

class DeleteMessageButton extends Component {
    handleDelete = e => {
       const confirm = window.confirm("Do you want to delete this message?");
       if(confirm){
         this.props
            .deleteMessage(this.props.id)
            .then(e => window.location.reload());
       }
    };
    render() {
      return (
        <Button icon onClick={this.handleDelete}>
          <Icon name="trash" />
          Delete
        </Button>
      );
  } 
}

export default connect(
  state => ({
    result: state.messages.deleteMessage.result,
    loading: state.messages.deleteMessage.loading,
    error: state.messages.deleteMessage.error
  }),
  { deleteMessage }
)(DeleteMessageButton);
