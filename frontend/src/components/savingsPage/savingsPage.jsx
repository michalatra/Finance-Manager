import React from "react";
import AddSaving from "./addSaving";
import SavingsSummary from "./savingsSummary";
import SavingsTable from "./savingsTable";

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
          <SavingsTable />
        </div>
      </main>
    );
  }
}

export default SavingsPage;
