import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class LoginPage extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
    },
    formValidation: {
      emailError: { state: false, message: "" },
      passwordError: { state: false, message: "" },
    },
  };

  render() {
    const { email, password } = this.state.formData;
    const { emailError, passwordError } = this.state.formValidation;
    return (
      <main>
        <div className="login-grid">
          <div className="container login-container">
            <h3 className="login-header">Zaloguj się</h3>
            <form action="" className="form-container">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(event) =>
                  this.handleChangeFormData("email", event.target.value)
                }
                type="email"
                name=""
                id="login-email"
              />
              {emailError.state ? (
                <p className="form-error-label">{emailError.message}</p>
              ) : null}
              <label htmlFor="login-password" className="form-label">
                Hasło
              </label>
              <input
                value={password}
                onChange={(event) =>
                  this.handleChangeFormData("password", event.target.value)
                }
                type="password"
                name=""
                id="login-password"
              />
              {passwordError.state ? (
                <p className="form-error-label">{passwordError.message}</p>
              ) : null}
              <button
                onClick={(event) => this.handleLogin(event)}
                className="btn submit-btn"
                type="submit"
              >
                Zaloguj
              </button>
            </form>
            <div className="login-links">
              <Link to="/register">Nie mam konta</Link>
              <a href="/">Nie pamiętam hasła</a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  handleChangeFormData = (propertyName, value) => {
    const { formData } = this.state;
    formData[propertyName] = value;
    this.setState({ formData });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { formData } = this.state;

    if (this.validateLogin()) {
      return;
    }

    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/auth/login",
      data: {
        email: formData.email,
        password: formData.password,
      },
    });

    if (response.data.response === "logged") {
      this.props.onLogin(response.data.user);
      return this.props.history.push("/panel");
    }

    let { emailError, passwordError } = this.state.formValidation;
    emailError =
      response.data.response === "userNotFound"
        ? { state: true, message: "Podany adres email nie istnieje" }
        : { state: false, message: "" };

    passwordError =
      response.data.response === "wrongPassword"
        ? { state: true, message: "Podane hasło jest niepoprawne" }
        : { state: false, message: "" };

    this.setState({ formValidation: { emailError, passwordError } });
  };

  validateLogin = () => {
    const { email, password } = this.state.formData;
    let { emailError, passwordError } = this.state.formValidation;

    emailError =
      email.length >= 3
        ? { state: false, message: "" }
        : { state: true, message: "Email musi mieć co najmniej 3 znaki" };

    passwordError =
      password.length > 0
        ? { state: false, message: "" }
        : { state: true, message: "Hasło nie może być puste" };

    this.setState({ formValidation: { emailError, passwordError } });

    return emailError.state || passwordError.state;
  };
}

export default LoginPage;
