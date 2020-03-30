import React from "react";
import { userIsAuthenticated } from "./HOCs";
import MessageList from "./components/MessageList";
import CreateMessageForm from "./components/CreateMessageForm";
import SidebarNav from "./components/SidebarNav";
import { Grid, GridColumn } from "semantic-ui-react";

class MessageFeed extends React.Component {
  render() {
    return (
      <>
        <Grid>
          <GridColumn width={3}>
            <SidebarNav isAuthenticated={this.props.isAuthenticated} />
          </GridColumn>
          <GridColumn width={5}>
            <h2>Message Feed</h2>

            <CreateMessageForm />
            <MessageList isUserList={false} />
          </GridColumn>
        </Grid>
      </>
    );
  }
}

export default userIsAuthenticated(MessageFeed);
