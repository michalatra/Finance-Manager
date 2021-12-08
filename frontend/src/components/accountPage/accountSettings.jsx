import React from "react";
import axios from "axios";

class AccountSettings extends React.Component {
  state = {
    formData: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
    },

    fieldStatus: {
      nameDisabled: true,
      surnameDisabled: true,
      usernameDisabled: true,
      emailDisabled: true,
      passwordDisabled: true,
    },
  };

  constructor(props) {
    super();
    const { user } = props;
    this.state.formData = {
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  render() {
    const { name, surname, username, email } = this.state.formData;
    const {
      nameDisabled,
      surnameDisabled,
      usernameDisabled,
      emailDisabled,
      passwordDisabled,
    } = this.state.fieldStatus;

    return (
      <div className="container account-settings-container">
        <h4 className="container-header">Ustawienia konta</h4>
        <form action="" className="form-container">
          <table className="settings-form-table">
            <tbody>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-name">Imię</label>
                </td>
                <td>
                  <input
                    onChange={(event) =>
                      this.handleChangeFormData("name", event.target.value)
                    }
                    value={name}
                    disabled={nameDisabled}
                    id="settings-name"
                    type="text"
                    className="settings-input"
                  />
                </td>
                <td>
                  <span
                    onClick={() => this.handleEditButton("nameDisabled")}
                    className="far fa-edit edit-icon icon"
                  ></span>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-surname">Nazwisko</label>
                </td>
                <td>
                  <input
                    onChange={(event) =>
                      this.handleChangeFormData("surname", event.target.value)
                    }
                    value={surname}
                    disabled={surnameDisabled}
                    id="settings-surname"
                    type="text"
                    className="settings-input"
                  />
                </td>
                <td>
                  <span
                    onClick={() => this.handleEditButton("surnameDisabled")}
                    className="far fa-edit edit-icon icon"
                  ></span>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-username">Nazwa użytkownika</label>
                </td>
                <td>
                  <input
                    onChange={(event) =>
                      this.handleChangeFormData("username", event.target.value)
                    }
                    value={username}
                    disabled={usernameDisabled}
                    id="settings-username"
                    type="text"
                    className="settings-input"
                  />
                </td>
                <td>
                  <span
                    onClick={() => this.handleEditButton("usernameDisabled")}
                    className="far fa-edit edit-icon icon"
                  ></span>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-email">Email</label>
                </td>
                <td>
                  <input
                    onChange={(event) =>
                      this.handleChangeFormData("email", event.target.value)
                    }
                    value={email}
                    disabled={emailDisabled}
                    id="settings-email"
                    type="text"
                    className="settings-input"
                  />
                </td>
                <td>
                  <span
                    onClick={() => this.handleEditButton("emailDisabled")}
                    className="far fa-edit edit-icon icon"
                  ></span>
                </td>
              </tr>
              <tr>
                <td className="settings-form-label">
                  <label htmlFor="settings-password">Hasło</label>
                </td>
                <td>
                  <input
                    onChange={(event) =>
                      this.handleChangeFormData("password", event.target.value)
                    }
                    value=""
                    disabled={passwordDisabled}
                    id="settings-password"
                    type="password"
                    className="settings-input"
                  />
                </td>
                <td>
                  <span
                    onClick={() => this.handleEditButton("passwordDisabled")}
                    className="far fa-edit edit-icon icon"
                  ></span>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={(event) => this.handleSubmitBtn(event)}
            type="submit"
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
    const { name, surname, username, email } = this.state.formData;

    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/api/account",
      data: {
        userId: user.id,
        name: name,
        surname: surname,
        username: username,
        email: email,
      },
    });

    if (response.data.response === "success") {
      user.name = name;
      user.surname = surname;
      user.username = username;
      user.email = email;
      this.props.onUserUpdate(user);
    }
  };
}

export default AccountSettings;
