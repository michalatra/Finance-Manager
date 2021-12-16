import React from "react";
import Chart from "./chart";

const ExpensesType = ({
  foodSpending,
  entertainmentSpending,
  clothingSpending,
  feesSpending,
  electronicsSpending,
  otherSpending,
  totalSpent,
}) => {
  totalSpent = totalSpent === 0 ? 1 : totalSpent;
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
        <Chart
          percentages={[
            {
              color: "#fbb13c",
              value: (foodSpending * 100) / totalSpent + "%",
            },
            {
              color: "#bd4f6c",
              value:
                (foodSpending * 100) / totalSpent +
                "% " +
                ((foodSpending + entertainmentSpending) * 100) / totalSpent +
                "%",
            },
            {
              color: "#fe6847",
              value:
                ((foodSpending + entertainmentSpending) * 100) / totalSpent +
                "% " +
                ((foodSpending + entertainmentSpending + clothingSpending) *
                  100) /
                  totalSpent +
                "%",
            },
            {
              color: "#11700c",
              value:
                ((foodSpending + entertainmentSpending + clothingSpending) *
                  100) /
                  totalSpent +
                "% " +
                ((foodSpending +
                  entertainmentSpending +
                  clothingSpending +
                  feesSpending) *
                  100) /
                  totalSpent +
                "%",
            },
            {
              color: "#57b8ff",
              value:
                ((foodSpending +
                  entertainmentSpending +
                  clothingSpending +
                  feesSpending) *
                  100) /
                  totalSpent +
                "% " +
                ((foodSpending +
                  entertainmentSpending +
                  clothingSpending +
                  feesSpending +
                  electronicsSpending) *
                  100) /
                  totalSpent +
                "%",
            },
            {
              color: "#ddedaa",
              value:
                ((foodSpending +
                  entertainmentSpending +
                  clothingSpending +
                  feesSpending +
                  electronicsSpending) *
                  100) /
                  totalSpent +
                "%",
            },
          ]}
        />
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
