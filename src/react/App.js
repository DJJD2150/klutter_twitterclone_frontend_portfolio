import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import MessageFeed from "./MessageFeed";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profiles/:username" component={Profile} />
        <Route exact path="/messagefeed" component={MessageFeed} />
        <Route exact path="/signup-form" component={Signup} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
