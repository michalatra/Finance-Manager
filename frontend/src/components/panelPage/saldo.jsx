import React from "react";
import Chart from "./chart";

const Saldo = ({ totalBudget, totalSpent }) => {
  return (
    <div className="container saldo-container">
      <div className="saldo-section">
        <div className="saldo-header">
          <p className="info-header-text">Twój budżet</p>
          <h2 className="info-header-value">{totalBudget} zł</h2>
        </div>
      </div>
      <div className="saldo-section">
        <div className="saldo-stats">
          <p className="saldo-stats-title">Pozostało</p>
          <h3 className="saldo-stats-value">{totalBudget - totalSpent} zł</h3>
          <p className="saldo-stats-title">Wydano</p>
          <h3 className="saldo-stats-value">{totalSpent} zł</h3>
        </div>
        <Chart
          percentages={[
            {
              color: "#961818",
              value: (totalSpent * 100) / totalBudget + "%",
            },
            {
              color: "#24591e",
              value: (totalSpent * 100) / totalBudget + "%",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Saldo;
