import React from "react";

const Chart = ({ percentages }) => {
  let insideText = "";
  for (const percentage of percentages) {
    insideText += percentage.color + " " + percentage.value + ", ";
  }
  insideText = insideText.slice(0, -2);
  console.log(insideText);
  const chartStyle = {
    backgroundImage: "conic-gradient(" + insideText + ")",
  };
  console.log(chartStyle);
  return (
    <div className="chart" style={chartStyle}>
      <div className="chart-inside"></div>
    </div>
  );
};

export default Chart;
