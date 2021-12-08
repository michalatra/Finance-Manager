import React from "react";
import weekIcon from "../../images/week-icon.svg";
import monthIcon from "../../images/month-icon.svg";
import plnIcon from "../../images/poland-zloty-currency-symbol.svg";
import usdIcon from "../../images/dollar-currency-symbol.svg";
import euroIcon from "../../images/euro-currency-symbol.svg";
import gbpIcon from "../../images/pound-symbol-variant.svg";
import polishIcon from "../../images/poland-flag.svg";
import englishIcon from "../../images/united-kingdom-flag.svg";

import axios from "axios";

class AppSettings extends React.Component {
  state = {
    formData: {
      budgetModel: "",
      weeklyBudget: "",
      monthlyBudget: "",
      currency: "",
      language: "",
    },
    fieldStatus: {
      weeklyBudgetDisabled: true,
      monthlyBudgetDisabled: true,
    },
  };

  constructor(props) {
    super();
    const { user } = props;
    this.state.formData = {
      budgetModel: user.budgetModel,
      weeklyBudget: user.weeklyBudget,
      monthlyBudget: user.monthlyBudget,
      currency: user.currency,
      language: user.language,
    };
  }

  render() {
    const { budgetModel, weeklyBudget, monthlyBudget, currency, language } =
      this.state.formData;
    const { weeklyBudgetDisabled, monthlyBudgetDisabled } =
      this.state.fieldStatus;
    return (
      <div className="container app-settings-container">
        <h4 className="container-header">Ustawienia aplikacji</h4>
        <form action="" className="form-container">
          <table className="settings-form-table">
            <tbody>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-budget-model">Model budżetu</label>
                </td>
                <td colSpan="2">
                  <div className="settings-form-list">
                    <img
                      onClick={() =>
                        this.handleChangeFormData("budgetModel", "weekly")
                      }
                      className={
                        budgetModel === "weekly"
                          ? "language-icon selected"
                          : "language-icon"
                      }
                      src={weekIcon}
                      alt="Weekly Budget"
                    />
                    <img
                      onClick={() =>
                        this.handleChangeFormData("budgetModel", "monthly")
                      }
                      className={
                        budgetModel === "monthly"
                          ? "language-icon selected"
                          : "language-icon"
                      }
                      src={monthIcon}
                      alt="Monthly Budget"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-weekly-budget">
                    Budżet tygodniowy
                  </label>
                </td>
                <td>
                  <input
                    onChange={(event) =>
                      this.handleChangeFormData(
                        "weeklyBudget",
                        event.target.value
                      )
                    }
                    value={weeklyBudget}
                    disabled={weeklyBudgetDisabled}
                    id="settings-weekly-budget"
                    type="text"
                    className="settings-input"
                  />
                </td>
                <td>
                  <span
                    onClick={() =>
                      this.handleEditButton("weeklyBudgetDisabled")
                    }
                    className="far fa-edit edit-icon icon"
                  ></span>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-monthly-budget">
                    Budżet miesięczny
                  </label>
                </td>
                <td>
                  <input
                    onChange={(event) =>
                      this.handleChangeFormData(
                        "monthlyBudget",
                        event.target.value
                      )
                    }
                    value={monthlyBudget}
                    disabled={monthlyBudgetDisabled}
                    id="settings-monthly-budget"
                    type="text"
                    className="settings-input"
                  />
                </td>
                <td>
                  <span
                    onClick={() =>
                      this.handleEditButton("monthlyBudgetDisabled")
                    }
                    className="far fa-edit edit-icon icon"
                  ></span>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-currency">Waluta</label>
                </td>
                <td colSpan="2">
                  <div className="settings-form-list">
                    <img
                      onClick={() =>
                        this.handleChangeFormData("currency", "PLN")
                      }
                      className={
                        currency === "PLN"
                          ? "currency-icon selected"
                          : "currency-icon"
                      }
                      src={plnIcon}
                      alt="PLN"
                    />
                    <img
                      onClick={() =>
                        this.handleChangeFormData("currency", "USD")
                      }
                      className={
                        currency === "USD"
                          ? "currency-icon selected"
                          : "currency-icon"
                      }
                      src={usdIcon}
                      alt="USD"
                    />
                    <img
                      onClick={() =>
                        this.handleChangeFormData("currency", "EURO")
                      }
                      className={
                        currency === "EURO"
                          ? "currency-icon selected"
                          : "currency-icon"
                      }
                      src={euroIcon}
                      alt="EURO"
                    />
                    <img
                      onClick={() =>
                        this.handleChangeFormData("currency", "GBP")
                      }
                      className={
                        currency === "GBP"
                          ? "currency-icon selected"
                          : "currency-icon"
                      }
                      src={gbpIcon}
                      alt="GBP"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-language">Język</label>
                </td>
                <td colSpan="2">
                  <div className="settings-form-list">
                    <img
                      onClick={() =>
                        this.handleChangeFormData("language", "polish")
                      }
                      className={
                        language === "polish"
                          ? "language-icon selected"
                          : "language-icon"
                      }
                      src={polishIcon}
                      alt="Język Polski"
                    />
                    <img
                      onClick={() =>
                        this.handleChangeFormData("language", "english")
                      }
                      className={
                        language === "english"
                          ? "language-icon selected"
                          : "language-icon"
                      }
                      src={englishIcon}
                      alt="English language"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={(event) => this.handleSubmitBtn(event)}
            className="btn submit-btn"
          >
            Zapisz
          </button>
        </form>
      </div>
    );
  }

  handleChangeFormData = (propertyName, value) => {
    let { formData } = this.state;
    formData[propertyName] = value;
    this.setState({ formData });
  };

  handleEditButton = (propertyName) => {
    let { fieldStatus } = this.state;
    fieldStatus[propertyName] = !fieldStatus[propertyName];
    this.setState({ fieldStatus });
  };

  handleSubmitBtn = async (event) => {
    event.preventDefault();
    let { user } = this.props;
    const { budgetModel, weeklyBudget, monthlyBudget, currency, language } =
      this.state.formData;

    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/api/settings",
      data: {
        userId: user.id,
        budgetModel: budgetModel,
        weeklyBudget: weeklyBudget,
        monthlyBudget: monthlyBudget,
        currency: currency,
        language: language,
      },
    });

    if (response.data.response === "success") {
      user.budgetModel = budgetModel;
      user.weeklyBudget = weeklyBudget;
      user.monthlyBudget = monthlyBudget;
      user.currency = currency;
      user.language = language;
      this.props.onUserUpdate(user);
    }
  };
}

export default AppSettings;
