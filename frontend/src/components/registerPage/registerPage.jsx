import React from "react";
import axios from "axios";

class RegisterPage extends React.Component {
  state = {
    formData: {
      name: "",
      surname: "",
      email: "",
      username: "",
      password: "",
      password2: "",
    },
    formValidation: {
      nameError: {
        state: false,
        message: "Imię nie może być puste",
      },
      surnameError: {
        state: false,
        message: "Nazwisko nie może być puste",
      },
      emailError: {
        state: false,
        message: "Email nie może być pusty",
      },
      usernameError: {
        state: false,
        message: "Nazwa użytkownika nie może być pusta",
      },
      passwordError: {
        state: false,
        message: "Hasło nie może być puste",
      },
      password2Error: {
        state: false,
        message: "Hasło nie może być puste",
      },
    },
  };

  render() {
    const { name, surname, email, username, password, password2 } =
      this.state.formData;
    const {
      nameError,
      surnameError,
      emailError,
      usernameError,
      passwordError,
      password2Error,
    } = this.state.formValidation;

    return (
      <div className="login-grid">
        <div className="container login-container">
          <h3 className="login-header">Zarejestruj się</h3>
          <form action="" className="form-container">
            <label htmlFor="register-name" className="form-label">
              Imię
            </label>
            <input
              value={name}
              onChange={(event) => {
                this.handleChangeFormData("name", event.target.value);
              }}
              type="text"
              name=""
              id="register-name"
            />
            {nameError.state ? (
              <p className="form-error-label">{nameError.message}</p>
            ) : null}
            <label htmlFor="register-surname" className="form-label">
              Nazwisko
            </label>
            <input
              value={surname}
              onChange={(event) => {
                this.handleChangeFormData("surname", event.target.value);
              }}
              type="text"
              name=""
              id="register-surname"
            />
            {surnameError.state ? (
              <p className="form-error-label">{surnameError.message}</p>
            ) : null}
            <label htmlFor="register-email" className="form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => {
                this.handleChangeFormData("email", event.target.value);
              }}
              type="email"
              name=""
              id="register-email"
            />
            {emailError.state ? (
              <p className="form-error-label">{emailError.message}</p>
            ) : null}
            <label htmlFor="register-username" className="form-label">
              Nazwa użytkownika
            </label>
            <input
              value={username}
              onChange={(event) => {
                this.handleChangeFormData("username", event.target.value);
              }}
              type="text"
              name=""
              id="register-username"
            />
            {usernameError.state ? (
              <p className="form-error-label">{usernameError.message}</p>
            ) : null}
            <label htmlFor="register-password" className="form-label">
              Hasło
            </label>
            <input
              value={password}
              onChange={(event) => {
                this.handleChangeFormData("password", event.target.value);
              }}
              type="password"
              name=""
              id="register-password"
            />
            {passwordError.state ? (
              <p className="form-error-label">{passwordError.message}</p>
            ) : null}
            <label htmlFor="register-password-dup" className="form-label">
              Powtórz hasło
            </label>
            <input
              value={password2}
              onChange={(event) => {
                this.handleChangeFormData("password2", event.target.value);
              }}
              type="password"
              name=""
              id="register-password-dup"
            />
            {password2Error.state ? (
              <p className="form-error-label">{password2Error.message}</p>
            ) : null}
            <button
              onClick={(event) => this.handleRegister(event)}
              className="btn submit-btn"
              type="submit"
            >
              Zarejestruj
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleChangeFormData = (propertyName, value) => {
    const { formData } = this.state;
    formData[propertyName] = value;
    this.setState({ formData });
  };

  handleRegister = async (event) => {
    event.preventDefault();
    if (this.validateRegister()) return;
    const { formData } = this.state;

    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/auth/register",
      data: {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      },
    });

    if (response.data.response === "success") {
      this.props.onLogin(response.data.user);
      return this.props.history.push("/panel");
    }

    let { formValidation } = this.state;
    formValidation.emailError =
      response.data.response === "userExists"
        ? { state: true, message: "Konto powiązane z tym adresem już istnieje" }
        : { state: false, message: "" };

    this.setState({ formValidation });
  };

  validateRegister = () => {
    const { name, surname, email, username, password, password2 } =
      this.state.formData;
    let {
      nameError,
      surnameError,
      emailError,
      usernameError,
      passwordError,
      password2Error,
    } = this.state.formValidation;

    nameError =
      name.length >= 3
        ? { state: false, message: "" }
        : { state: true, message: "Imię musi mieć co najmniej 3 znaki" };

    surnameError =
      surname.length >= 3
        ? { state: false, message: "" }
        : { state: true, message: "Nazwisko musi mieć co najmniej 3 znaki" };

    emailError =
      email.length >= 3
        ? { state: false, message: "" }
        : { state: true, message: "Wprowadź poprawny adres email" };

    usernameError =
      username.length >= 3
        ? { state: false, message: "" }
        : {
            state: true,
            message: "Nazwa użytkownika musi mieć co najmniej 3 znaki",
          };

    passwordError =
      password.length >= 8
        ? { state: false, message: "" }
        : {
            state: true,
            message: "Hasło musi mieć co najmniej 8 znaków",
          };

    password2Error =
      password2 === password
        ? { state: false, message: "" }
        : {
            state: true,
            message: "Hasła nie są identyczne",
          };

    this.setState({
      formValidation: {
        nameError,
        surnameError,
        emailError,
        usernameError,
        passwordError,
        password2Error,
      },
    });

    return (
      nameError.state ||
      surnameError.state ||
      emailError.state ||
      usernameError.state ||
      passwordError.state ||
      password2Error.state
    );
  };
}

export default RegisterPage;
