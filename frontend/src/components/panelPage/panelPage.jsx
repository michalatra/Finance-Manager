import React from "react";
import TimeContainer from "./timeContainer";
import TransactionTable from "./transactionTable";
import ExpensesType from "./expensesType";
import CategorySymmary from "./categorySummary";
import AddExpense from "./addExpense";
import Saldo from "./saldo";
import axios from "axios";

class PanelPage extends React.Component {
  state = {
    expenses: [],
    totalSpent: 0,
    foodSpending: 0,
    entertainmentSpending: 0,
    clothingSpending: 0,
    feesSpending: 0,
    electronicsSpending: 0,
    otherSpending: 0,
  };

  componentDidMount = async () => {
    const { user, history } = this.props;
    if (user.id === "") {
      history.push("/login");
    }
    if (user.id === "") {
      return;
    }
    const response = await axios({
      method: "get",
      url: `http://127.0.0.1:5000/api/expenses?userId=${user.id}`,
    });

    let totalSpent = 0;
    let foodSpending = 0;
    let entertainmentSpending = 0;
    let clothingSpending = 0;
    let feesSpending = 0;
    let electronicsSpending = 0;
    let otherSpending = 0;
    for (let expense of response.data.expenses) {
      totalSpent += expense.value;
      switch (expense.type) {
        case "food":
          foodSpending += expense.value;
          break;
        case "entertainment":
          entertainmentSpending += expense.value;
          break;
        case "clothing":
          clothingSpending += expense.value;
          break;
        case "fees":
          feesSpending += expense.value;
          break;
        case "electronics":
          electronicsSpending += expense.value;
          break;
        case "other":
          otherSpending += expense.value;
          break;
        default:
          otherSpending += expense.value;
          break;
      }
    }

    this.setState({
      expenses: response.data.expenses,
      totalSpent,
      foodSpending,
      entertainmentSpending,
      clothingSpending,
      feesSpending,
      electronicsSpending,
      otherSpending,
    });
  };

  render() {
    const {
      expenses,
      totalSpent,
      foodSpending,
      entertainmentSpending,
      clothingSpending,
      feesSpending,
      electronicsSpending,
      otherSpending,
    } = this.state;
    const { user } = this.props;
    return (
      <main>
        <div className="panel-grid">
          <Saldo totalSpent={totalSpent} totalBudget={user.monthlyBudget} />
          <ExpensesType />
          <CategorySymmary
            foodSpending={foodSpending}
            entertainmentSpending={entertainmentSpending}
            clothingSpending={clothingSpending}
            feesSpending={feesSpending}
            electronicsSpending={electronicsSpending}
            otherSpending={otherSpending}
          />
          <TimeContainer />
          <AddExpense onAddExpense={this.handleAddExpense} />
          <TransactionTable
            expenses={expenses}
            onDeleteExpense={this.handleDeleteExpense}
          />
        </div>
      </main>
    );
  }

  handleAddExpense = async (expenseData) => {
    const { user } = this.props;

    let {
      expenses,
      totalSpent,
      foodSpending,
      entertainmentSpending,
      clothingSpending,
      feesSpending,
      electronicsSpending,
      otherSpending,
    } = this.state;

    expenses.push({
      id: null,
      userId: user.id,
      name: expenseData.expenseName,
      value: expenseData.expenseValue,
      type: expenseData.expenseType,
    });

    totalSpent += expenseData.expenseValue;
    switch (expenseData.expenseType) {
      case "food":
        foodSpending += expenseData.expenseValue;
        break;
      case "entertainment":
        entertainmentSpending += expenseData.expenseValue;
        break;
      case "clothing":
        clothingSpending += expenseData.expenseValue;
        break;
      case "fees":
        feesSpending += expenseData.expenseValue;
        break;
      case "electronics":
        electronicsSpending += expenseData.expenseValue;
        break;
      case "other":
        otherSpending += expenseData.expenseValue;
        break;
      default:
        otherSpending += expenseData.expenseValue;
        break;
    }

    this.setState({
      expenses,
      totalSpent,
      foodSpending,
      entertainmentSpending,
      clothingSpending,
      feesSpending,
      electronicsSpending,
      otherSpending,
    });

    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/api/expenses",
      data: {
        userId: user.id,
        expenseName: expenseData.expenseName,
        expenseType: expenseData.expenseType,
        expenseValue: expenseData.expenseValue,
      },
    });

    if (response.data.response === "success") {
      let { expenses } = this.state;
      expenses[expenses.length - 1] = response.data.expense;
      this.setState({ expenses });
    } else {
      expenses.pop();
      totalSpent -= expenseData.expenseValue;

      switch (expenseData.expenseType) {
        case "food":
          foodSpending -= expenseData.expenseValue;
          break;
        case "entertainment":
          entertainmentSpending -= expenseData.expenseValue;
          break;
        case "clothing":
          clothingSpending -= expenseData.expenseValue;
          break;
        case "fees":
          feesSpending -= expenseData.expenseValue;
          break;
        case "electronics":
          electronicsSpending -= expenseData.expenseValue;
          break;
        case "other":
          otherSpending -= expenseData.expenseValue;
          break;
        default:
          otherSpending -= expenseData.expenseValue;
          break;
      }

      this.setState({
        expenses,
        totalSpent,
        foodSpending,
        entertainmentSpending,
        clothingSpending,
        feesSpending,
        electronicsSpending,
        otherSpending,
      });
    }
  };

  handleDeleteExpense = async (expenseId) => {
    const { user } = this.props;

    let {
      expenses,
      totalSpent,
      foodSpending,
      entertainmentSpending,
      clothingSpending,
      feesSpending,
      electronicsSpending,
      otherSpending,
    } = this.state;

    const deletedExpenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId
    );
    const deletedExpense = expenses[deletedExpenseIndex];
    expenses.splice(deletedExpenseIndex, 1);
    totalSpent -= deletedExpense.value;
    switch (deletedExpense.type) {
      case "food":
        foodSpending -= deletedExpense.value;
        break;
      case "entertainment":
        entertainmentSpending -= deletedExpense.value;
        break;
      case "clothing":
        clothingSpending -= deletedExpense.value;
        break;
      case "fees":
        feesSpending -= deletedExpense.value;
        break;
      case "electronics":
        electronicsSpending -= deletedExpense.value;
        break;
      case "other":
        otherSpending -= deletedExpense.value;
        break;
      default:
        otherSpending -= deletedExpense.value;
        break;
    }

    this.setState({
      expenses,
      totalSpent,
      foodSpending,
      entertainmentSpending,
      clothingSpending,
      feesSpending,
      electronicsSpending,
      otherSpending,
    });

    const response = await axios({
      method: "delete",
      url: "http://127.0.0.1:5000/api/expenses",
      data: {
        userId: user.id,
        expenseId: deletedExpense.id,
      },
    });

    if (response.data.response !== "success") {
      expenses.splice(deletedExpenseIndex, 0, deletedExpense);
      totalSpent += deletedExpense.value;
      switch (deletedExpense.type) {
        case "food":
          foodSpending += deletedExpense.value;
          break;
        case "entertainment":
          entertainmentSpending += deletedExpense.value;
          break;
        case "clothing":
          clothingSpending += deletedExpense.value;
          break;
        case "fees":
          feesSpending += deletedExpense.value;
          break;
        case "electronics":
          electronicsSpending += deletedExpense.value;
          break;
        case "other":
          otherSpending += deletedExpense.value;
          break;
        default:
          otherSpending += deletedExpense.value;
          break;
      }

      this.setState({
        expenses,
        totalSpent,
        foodSpending,
        entertainmentSpending,
        clothingSpending,
        feesSpending,
        electronicsSpending,
        otherSpending,
      });
    }
  };
}

export default PanelPage;
