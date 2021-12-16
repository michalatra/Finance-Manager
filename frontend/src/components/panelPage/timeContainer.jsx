import React from "react";
import Chart from "./chart";

const TimeContainer = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const maxDaysDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const maxDays = maxDaysDate.getDate();
  return (
    <div className="container time-container">
      <div>
        <p className="info-header-text">Dzień miesiąca</p>
        <h3 className="info-header-value">
          {day}/{maxDays}
        </h3>
      </div>
      <Chart
        percentages={[
          {
            color: "#ee4266",
            value: (day * 100) / maxDays + "%",
          },
          {
            color: "#ffd23f",
            value: (day * 100) / maxDays + "%",
          },
        ]}
      />
    </div>
  );
};

export default TimeContainer;
