import React from "react";

const GoalCard = () => {
  return (
    <div className="container goals-card">
      <h3 className="goals-card-header">Macbook Air</h3>
      <p className="goals-card-label">Cel</p>
      <p className="goals-card-value goals-main">4500 PLN</p>
      <p className="goals-card-label">Stan</p>
      <p className="goals-card-value">2500 PLN</p>
      <p className="goals-card-label">Postęp</p>
      <div className="progress-bar">
        <div className="progress-bar-inside"></div>
      </div>
    </div>
  );
};

export default GoalCard;
