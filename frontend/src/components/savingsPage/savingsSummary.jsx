import React from "react";

const SavingsSummary = ({totalSavings}) => {
  return (
    <div className="container savings-stats-container">
      <h4 className="container-header">Podsumowanie oszczędności</h4>
      <p>Suma</p>
      <h3 className="main-savings-value">{totalSavings} zł</h3>
      <p>W tym mieisącu</p>
      <h4>1200 zł</h4>
      <p>W tym tygodniu</p>
      <h4>300 zł</h4>
    </div>
  );
};

export default SavingsSummary;
