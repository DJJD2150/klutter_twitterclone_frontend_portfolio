import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login } from "../../redux/auth";
import { createUser } from "../../redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Image } from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import logo from "./klutter_logo_small.jpg";
import "./SignupForm.css";

// Ruben Espino helped me install the Google Login advanced feature

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      displayName: "",
      password: ""
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignup = e => {
    e.preventDefault();
    this.props.createUser(this.state);
    if (this.props.error === null) {
      return this.props.history.push("/");
    }
  };
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    const responseGoogle = (response) => {
      console.log(response);
      const googleUserData = {
        username: response.profileObj.givenName,
        displayName: response.profileObj.givenName,
        password: response.profileObj.googleId.slice(6)
      }
      console.log(googleUserData);

      this.props.createUser(googleUserData).then(() =>
      this.props.login({
        username: googleUserData.username,
        password: googleUserData.password
      }))
    }

    return (
      <React.Fragment>
        <div className="signup-form-wrapper">
          <h1>Sign Up for Klutter!</h1>
          <Form id="signup-form" onSubmit={this.handleSignup}>
            <Form.Field>
              <label>Username</label>
              <input
                type="text"
                name="username"
                autoFocus
                placeholder="Username"
                required
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Display Name</label>
              <input
                type="text"
                name="displayName"
                placeholder="Display Name"
                required
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" disabled={loading}>
              Register
            </Button>
            <br/>
            <GoogleLogin
              clientId="486600010303-ip5rjkm67evieepcuc0iug1v4crvf7mj.apps.googleusercontent.com"
              buttonText="Register"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <Link to="/">Return to Login Page</Link>
          </Form>
          {loading && <Spinner name="circle" color="blue" />}
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </div>
        <br />
        <div className="logo-wrapper">
          <Image 
            src={logo} 
            size="small"
            alt=""
            className="ui-small-image" 
            circular
          />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.user.createUser.result,
    loading: state.user.createUser.loading,
    error: state.user.createUser.error
  }),
  { createUser, login }
)(withRouter(SignupForm));
