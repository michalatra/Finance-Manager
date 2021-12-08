import React from "react";

const CategorySummary = ({
  foodSpending,
  entertainmentSpending,
  clothingSpending,
  feesSpending,
  electronicsSpending,
  otherSpending,
}) => {
  return (
    <div className="container category-summary-container">
      <h4 className="container-header">Posdumowanie wydatków</h4>
      <table className="category-table">
        <tbody>
          <tr>
            <td className="category-icon">
              <span className="fas fa-utensils icon food-icon"></span>
            </td>
            <td>
              <p className="category-name">Posiłki</p>
            </td>
            <td>
              <h4 className="category-value">{foodSpending} zł</h4>
            </td>
          </tr>
          <tr>
            <td className="category-icon">
              <span className="fas fa-film icon entertainment-icon"></span>
            </td>
            <td>
              <p className="category-name">Rozrywka</p>
            </td>
            <td>
              <h4 className="category-value">{entertainmentSpending} zł</h4>
            </td>
          </tr>
          <tr>
            <td className="category-icon">
              <span className="fas fa-tshirt icon clothes-icon"></span>
            </td>
            <td>
              <p className="category-name">Ubrania</p>
            </td>
            <td>
              <h4 className="category-value">{clothingSpending} zł</h4>
            </td>
          </tr>
          <tr>
            <td className="category-icon">
              <span className="far fa-lightbulb icon lightbulb-icon"></span>
            </td>
            <td>
              <p className="category-name">Rachunki</p>
            </td>
            <td>
              <h4 className="category-value">{feesSpending} zł</h4>
            </td>
          </tr>
          <tr>
            <td className="category-icon">
              <span className="far fa-keyboard icon electronics-icon"></span>
            </td>
            <td>
              <p className="category-name">Elektronika</p>
            </td>
            <td>
              <h4 className="category-value">{electronicsSpending} zł</h4>
            </td>
          </tr>
          <tr>
            <td className="category-icon">
              <span className="fas fa-receipt icon others-icon"></span>
            </td>
            <td>
              <p className="category-name">Pozostałe</p>
            </td>
            <td>
              <h4 className="category-value">{otherSpending} zł</h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategorySummary;
