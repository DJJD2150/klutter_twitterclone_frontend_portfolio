import React from "react";
import { connect } from "react-redux";
import { ProfileUpdateSubmit, DeleteUserButton } from ".";
import { getUser } from "../../redux";
import { domain } from "../../redux/helpers";
import { Button, Card, Image, Modal, Header } from "semantic-ui-react";
import { ProfileBioSubmit } from ".";
import "./ProfileCard.css";

class ProfileCard extends React.Component {
  state = {
    pictureLocation: "",
    username: "",
    displayName: "",
    about: "",
    googleId: "",
    createdAt: "",
    updatedAt: ""
  };

  componentDidMount = () => {
    this.props.getUser().then(val =>
      this.setState({
        pictureLocation: val.payload.user.pictureLocation,
        username: val.payload.user.username,
        displayName: val.payload.user.displayName,
        about: val.payload.user.about,
        googleId: val.payload.user.googleId,
        createdAt: val.payload.user.createdAt,
        updatedAt: val.payload.user.updatedAt
      })
    );
  };

  render() {
    const createDate = new Date(this.state.createdAt);
    const updateDate = new Date(this.state.updatedAt);

    return (
      <div className="wrapper">
        <Card id="card">
          <Card.Content>
            <Card.Header>{this.state.displayName}</Card.Header>
            <Card.Meta>
              <span className="date">@{this.state.username}</span>
            </Card.Meta>
            <Card.Description>{this.state.about}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <p> Joined: {createDate.toDateString()}</p>
            <p> Last Updated: {updateDate.toDateString()} </p>
          </Card.Content>
        </Card>
        <Image
          id="avatar"
          src={domain + this.state.pictureLocation}
          size="medium"
          circular
        />
        <Modal
          trigger={
            <Button className="edit-profile-bio-button">Edit Bio</Button>
          }
        >
          <Modal.Header>Edit Bio</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Update Bio</Header>
              <ProfileBioSubmit />
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Modal
          trigger={
            <Button className="edit-profile-button">Edit Profile</Button>
          }
        >
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src={domain + this.state.pictureLocation}
            />
            <Modal.Description>
              <Header>Choose Profile Picture</Header>
              <ProfileUpdateSubmit />
              <DeleteUserButton />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.user.getUser.result,
    loading: state.user.getUser.loading,
    error: state.user.getUser.error
  }),
  { getUser }
)(ProfileCard);
