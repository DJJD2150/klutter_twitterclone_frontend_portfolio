import React from "react";
import { LoginForm, Menu } from "./components";
import { userIsNotAuthenticated } from "./HOCs";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Menu />
        <div className="home-flexbox">
          <section className="login-form-flexbox">
            <LoginForm />
          </section>
          
        </div>
      </React.Fragment>
    );
  }
}

export default userIsNotAuthenticated(Home);
