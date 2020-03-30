import React from "react";
import { Grid } from "./components";
import { userIsAuthenticated } from "./HOCs";
import { ProfileCard, MessageList } from "./components";
import SidebarNav from "./components/SidebarNav"

class Profile extends React.Component {
  render() {
    return (
      <><Grid>
        <Grid.Column width={3}>
        <SidebarNav isAuthenticated={this.props.isAuthenticated} />
        </Grid.Column>
        <Grid.Column width={3}>
        <ProfileCard />
        <MessageList isUserList={true} />
        </Grid.Column>
        
        </Grid>
      </>
    );
  }
}

export default userIsAuthenticated(Profile);
