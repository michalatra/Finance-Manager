import "./css/normalize.css";
import "./css/styles.css";
import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";

import PanelPage from "./components/panelPage/panelPage";
import SavingsPage from "./components/savingsPage/savingsPage";
import NavBar from "./components/navBar";
import GoalsPage from "./components/goalsPage/goalsPage";
import LoginPage from "./components/loginPage/loginPage";
import RegisterPage from "./components/registerPage/registerPage";
import AccountPage from "./components/accountPage/accountPage";

class App extends React.Component {
  state = {
    user: {
      id: "",
      username: "",
      email: "",
      name: "",
      surname: "",
      budgetModel: "",
      weeklyBudget: "",
      monthlyBudget: "",
      language: "",
      currency: "",
      lastToken: "",
    },
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} onLogout={this.handleLogout} />
        <Switch>
          <Route
            path="/panel"
            component={(props) => <PanelPage user={user} {...props} />}
          />
          <Route
            path="/savings"
            component={(props) => <SavingsPage user={user} {...props} />}
          />
          <Route
            path="/goals"
            component={(props) => <GoalsPage user={user} {...props} />}
          />
          <Route
            path="/account"
            component={(props) => (
              <AccountPage
                user={user}
                onUserUpdate={this.handleUpdateUser}
                {...props}
              />
            )}
          />
          <Route
            path="/login"
            component={(props) => (
              <LoginPage onLogin={this.handleLogin} {...props} />
            )}
          />
          <Route
            path="/register"
            component={(props) => (
              <RegisterPage onLogin={this.handleLogin} {...props} />
            )}
          />
          <Redirect to="/panel" />
        </Switch>
      </React.Fragment>
    );
  }

  handleLogin = (user) => {
    this.setState({ user });
  };

  handleLogout = () => {
    this.setState({
      user: {
        id: "",
        username: "",
        email: "",
        name: "",
        surname: "",
        budgetModel: "",
        weeklyBudget: "",
        monthlyBudget: "",
        language: "",
        currency: "",
        lastToken: "",
      },
    });
  };

  handleUpdateUser = (user) => {
    this.setState({ user });
  };
}

export default App;
