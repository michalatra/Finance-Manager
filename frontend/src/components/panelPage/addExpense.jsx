import React from "react";

class AddExpense extends React.Component {
  state = {
    formData: {
      expenseName: "",
      expenseType: "",
      expenseValue: "",
    },
  };

  render() {
    const { expenseName, expenseType, expenseValue } = this.state.formData;

    return (
      <div className="container add-expense-container">
        <h4 className="container-header">Dodaj wydatek</h4>
        <form className="form-container">
          <label htmlFor="expense-name" className="form-label">
            Nazwa
          </label>
          <input
            value={expenseName}
            onChange={(event) =>
              this.handleChangeFormData("expenseName", event.target.value)
            }
            type="text"
            name=""
            id="expense-name"
          />
          <label className="form-label">Typ</label>
          <div className="expense-list">
            <span
              onClick={() => this.handleChangeFormData("expenseType", "food")}
              className={
                expenseType === "food"
                  ? "fas fa-utensils expense-icon food-icon selected"
                  : "fas fa-utensils expense-icon food-icon"
              }
            ></span>
            <span
              onClick={() =>
                this.handleChangeFormData("expenseType", "entertainment")
              }
              className={
                expenseType === "entertainment"
                  ? "fas fa-film expense-icon entertainment-icon selected"
                  : "fas fa-film expense-icon entertainment-icon"
              }
            ></span>
            <span
              onClick={() =>
                this.handleChangeFormData("expenseType", "clothing")
              }
              className={
                expenseType === "clothing"
                  ? "fas fa-tshirt expense-icon clothes-icon selected"
                  : "fas fa-tshirt expense-icon clothes-icon"
              }
            ></span>
            <span
              onClick={() => this.handleChangeFormData("expenseType", "fees")}
              className={
                expenseType === "fees"
                  ? "far fa-lightbulb expense-icon lightbulb-icon selected"
                  : "far fa-lightbulb expense-icon lightbulb-icon"
              }
            ></span>
            <span
              onClick={() =>
                this.handleChangeFormData("expenseType", "electronics")
              }
              className={
                expenseType === "electronics"
                  ? "far fa-keyboard expense-icon electronics-icon selected"
                  : "far fa-keyboard expense-icon electronics-icon"
              }
            ></span>
            <span
              onClick={() => this.handleChangeFormData("expenseType", "other")}
              className={
                expenseType === "other"
                  ? "fas fa-receipt expense-icon others-icon selected"
                  : "fas fa-receipt expense-icon others-icon"
              }
            ></span>
          </div>
          <label htmlFor="expense-value" className="form-label">
            Wartość
          </label>
          <input
            value={expenseValue}
            onChange={(event) =>
              this.handleChangeFormData("expenseValue", event.target.value)
            }
            type="number"
            name=""
            id="expense-value"
          />
          <button
            onClick={(event) => this.handleAddExpense(event)}
            className="btn submit-btn"
            type="submit"
          >
            Dodaj
          </button>
        </form>
      </div>
    );
  }

  handleChangeFormData = (dataName, value) => {
    const { formData } = this.state;
    formData[dataName] = value;
    this.setState({ formData });
  };

  handleAddExpense = (event) => {
    event.preventDefault();
    const { formData } = this.state;
    if (
      formData.expenseName !== "" &&
      formData.expenseType !== "" &&
      formData.expenseValue !== ""
    ) {
      formData.expenseValue = parseInt(formData.expenseValue);
      this.props.onAddExpense(formData);

      this.setState({
        formData: { expenseName: "", expenseType: "", expenseValue: "" },
      });
    }
  };
}

export default AddExpense;
