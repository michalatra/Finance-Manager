import React from "react";

const SavingsTable = () => {
  return (
    <div className="savings-summary-container">
      <div className="container transaction-table-container">
        <h4 className="container-header">Historia wpłat</h4>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>
                <h4>Wartość</h4>
              </th>
              <th>
                <h4>Data</h4>
              </th>
              <th>
                <h4>Żródło</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>120</p>
              </td>
              <td>
                <p>datetime.now()</p>
              </td>
              <td>
                <p>Budżet miesięczny</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavingsTable;
