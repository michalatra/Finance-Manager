import React from "react";

const TransactionTable = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="transaction-table-container-container">
      <div className="container transaction-table-container">
        <table className="transaction-table">
          <tbody>
            <tr>
              <th>
                <h4>Nazwa</h4>
              </th>
              <th>
                <h4>Typ</h4>
              </th>
              <th>
                <h4>Wartość</h4>
              </th>
              <th className="close-column"></th>
            </tr>
            {expenses.map((transaction) => {
              let icon;

              switch (transaction.type) {
                case "food":
                  icon = "fas fa-utensils icon food-icon transaction-type";
                  break;
                case "entertainment":
                  icon = "fas fa-film icon entertainment-icon transaction-type";
                  break;
                case "clothing":
                  icon = "fas fa-tshirt icon clothes-icon transaction-type";
                  break;
                case "fees":
                  icon =
                    "far fa-lightbulb icon lightbulb-icon transaction-type";
                  break;
                case "electronics":
                  icon =
                    "far fa-keyboard icon electronics-icon transaction-type";
                  break;
                case "other":
                  icon = "fas fa-receipt icon others-icon transaction-type";
                  break;
                default:
                  icon = "fas fa-receipt icon others-icon transaction-type";
                  break;
              }

              return (
                <tr key={transaction.id}>
                  <td>
                    <p className="transaction-name">{transaction.name}</p>
                  </td>
                  <td className="transaction-icon">
                    <span className={icon}></span>
                  </td>
                  <td>
                    <h4 className="transaction-value">
                      {transaction.value} zł
                    </h4>
                  </td>
                  <td className="close-column">
                    <span
                      onClick={() => onDeleteExpense(transaction.id)}
                      className="fas fa-times icon close-icon"
                    ></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
