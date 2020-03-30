import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login } from "../../redux";
import { Button, Form, Image } from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import logo from "./klutter_logo_small.jpg";
import "./LoginForm.css";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
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
        password: response.profileObj.googleId.slice(6)
      }
      console.log(googleUserData);
      this.props.login(googleUserData);
    }
    return (
      <React.Fragment>
        <div className="login-form-wrapper">
          <h2>Post Klouts to your heart's desire.</h2>
          <Form id="login-form" onSubmit={this.handleLogin}>
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
              Login
            </Button>
            <br/>
            <GoogleLogin
              clientId="486600010303-ip5rjkm67evieepcuc0iug1v4crvf7mj.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <Link to="/signup-form">Sign Up for Klutter!</Link>
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
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { login }
)(LoginForm);
