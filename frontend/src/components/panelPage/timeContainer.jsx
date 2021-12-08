import React from "react";

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
      <div className="chart time-chart">
        <div className="chart-inside"></div>
      </div>
    </div>
  );
};

export default TimeContainer;
