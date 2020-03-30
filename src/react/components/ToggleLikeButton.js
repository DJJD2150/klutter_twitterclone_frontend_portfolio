import React, { Component } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { like, deleteLike } from "../../redux";
import { connect } from "react-redux";

class ToggleLikeButton extends Component {
  handleLike = e => {
    e.preventDefault();
    // check if like exists
    for (let i = 0; i < this.props.likes.length; i++) {
      if (this.props.likes[i].username === this.props.username) {
        // delete like
        this.props
          .deleteLike(this.props.likes[i].id)
          .then(e => window.location.reload());
        return;
      }
    }
    // add like
    this.props
      .like({ messageId: this.props.id })
      .then(e => window.location.reload());
  };

  render() {
    return (
      <Button as="div" labelPosition="right" onClick={this.handleLike}>
        <Button icon>
          <Icon name="heart" />
          Like
        </Button>
        <Label as="a" basic pointing="left">
          {this.props.likes.length}
        </Label>
      </Button>
    );
  }
}

export default connect(
  state => ({
    username: state.auth.login.result.username
  }),
  { like, deleteLike }
)(ToggleLikeButton);
