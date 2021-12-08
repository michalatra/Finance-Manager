import React from "react";

const ExpensesType = () => {
  return (
    <div className="container expenses-type-container">
      <h4 className="container-header">Statystyki wydatków</h4>
      <div className="expenses-layout">
        <ul>
          <li>
            <span className="fas fa-utensils icon-bg food-icon"></span>
          </li>
          <li>
            <span className="fas fa-film icon-bg entertainment-icon"></span>
          </li>
          <li>
            <span className="fas fa-tshirt icon-bg clothes-icon"></span>
          </li>
        </ul>
        <div className="chart expenses-type-chart">
          <div className="chart-inside"></div>
        </div>
        <ul>
          <li>
            <span className="far fa-lightbulb icon-bg lightbulb-icon"></span>
          </li>
          <li>
            <span className="far fa-keyboard icon-bg electronics-icon"></span>
          </li>
          <li>
            <span className="fas fa-receipt icon-bg others-icon"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExpensesType;
