import React from "react";
import { connect } from "react-redux";
import { setProfileBio } from "../../redux";
import { Button, Form } from "semantic-ui-react";

class ProfileBioSubmit extends React.Component {
  state = {
    displayName: "",
    password: "",
    about: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setProfileBio(this.state).then(e => window.location.reload());
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <Form id="update-bio-form" onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Display Name</label>
            <input
              type="text"
              name="displayName"
              accept="text"
              onChange={this.handleChange}
            ></input>
          </Form.Field>
          <Form.Field>
          <label>Password</label>
          <input
            type="text"
            name="password"
            accept="text"
            onChange={this.handleChange}
          ></input>
          </Form.Field>
          <Form.Field>
            <label>About</label>
            <input
              type="text"
              name="about"
              accept="text"
              onChange={this.handleChange}
            ></input>
          </Form.Field>
          <Button type="submit">Save Bio</Button>
        </Form>
      </>
    );
  }
}

export default connect(
  state => ({
    result: state.user.setProfileBio.result,
    loading: state.user.setProfileBio.loading,
    error: state.user.setProfileBio.error
  }),
  { setProfileBio }
)(ProfileBioSubmit);