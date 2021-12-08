import React from "react";
import AddSaving from "./addSaving";
import SavingsSummary from "./savingsSummary";

class SavingsPage extends React.Component {
  state = {
    savingsList: [],
    monthlySavings: 0,
    weeklySavings: 0,
  };

  componentDidMount() {
    const { user, history } = this.props;
    if (user.id === "") {
      history.push("/login");
    }
  }

  render() {
    const { user } = this.props;
    return (
      <main>
        <div className="savings-grid">
          <h2 className="container-header savings-header">
            Twoje Oszczędności
          </h2>
          <SavingsSummary totalSavings={user.totalSavings} />
          <AddSaving />
          <div className="container savings-summary-container">
            <h4 className="container-header">Historia wpłat</h4>
          </div>
        </div>
      </main>
    );
  }
}

export default SavingsPage;
