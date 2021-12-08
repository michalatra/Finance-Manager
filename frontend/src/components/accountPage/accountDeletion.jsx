import React from "react";

const AccoountDeletion = ({ user }) => {
  return (
    <div className="container delete-account-container">
      <h4 className="container-header">Usuwanie konta</h4>
      <p>
        Aby usunąć konto wpisz hasło oraz zatwierdź przyciskiem "Usuń moje kono"
      </p>
      <form action="" className="form-container">
        <table className="settings-form-table">
          <tbody>
            <tr>
              <td className="settings-form-label">
                <label htmlFor="delete-account-password">Hasło</label>
              </td>
              <td>
                <input
                  className="settings-input"
                  type="password"
                  id="delete-account-password"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn submit-btn">Usuń moje konto</button>
      </form>
    </div>
  );
};

export default AccoountDeletion;
