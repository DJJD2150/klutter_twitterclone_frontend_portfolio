import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { deleteUser } from "../../redux";

class DeleteUser extends React.Component {
  handleDelete = e => {
    e.preventDefault();
    const confirm = window.confirm("Do you want to delete this user?")
    if(confirm){
      this.props.deleteUser(this.props.id);
    }
  };

  render() {
    return (
      <Button className="ui red" onClick={this.handleDelete}>
        Delete User
      </Button>
    );
  }
}

export default connect(null, { deleteUser })(DeleteUser);
