import React from "react";
import GoalCard from "./goalCard";

class GoalsPage extends React.Component {
  state = {};

  componentDidMount() {
    const { user, history } = this.props;
    if (user.id === "") {
      history.push("/loign");
    }
  }

  render() {
    return (
      <main>
        <div className="goals-grid">
          <h2 className="container-header goals-header">Twoje Cele</h2>
          <GoalCard />
          <GoalCard />
          <GoalCard />
          <GoalCard />
        </div>
      </main>
    );
  }
}

export default GoalsPage;
