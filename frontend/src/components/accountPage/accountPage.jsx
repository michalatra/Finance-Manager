import React from "react";
import AccoountDeletion from "./accountDeletion";
import AccountSettings from "./accountSettings";
import AppSettings from "./appSettings";

class AccountPage extends React.Component {
  state = {};

  componentDidMount = () => {
    const { user, history } = this.props;
    if (user.id === "") {
      history.push("/login");
    }
  };

  render() {
    const { user, onUserUpdate } = this.props;
    return (
      <div className="account-grid">
        <h2 className="container-header settings-header">Ustawienia</h2>
        <AppSettings user={user} onUserUpdate={onUserUpdate} />
        <AccountSettings user={user} onUserUpdate={onUserUpdate} />
        <AccoountDeletion user={user} />
      </div>
    );
  }
}

export default AccountPage;
