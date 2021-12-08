import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        SaveIT
      </NavLink>
      <div className="navbar-toggler">
        <span className="fas fa-bars icon"></span>
      </div>
      <ul className="nav-links">
        {user.id !== "" ? (
          <React.Fragment>
            <li>
              <NavLink to="/">Panel</NavLink>
            </li>
            <li>
              <NavLink to="/savings">Oszczędności</NavLink>
            </li>
            <li>
              <NavLink to="/goals">Cele</NavLink>
            </li>
            <li className="nav-sm-settings">
              <NavLink to="/account">Ustawienia</NavLink>
            </li>
            <li onClick={onLogout} className="nav-sm-settings">
              <NavLink to="/login">Wyloguj</NavLink>
            </li>
            <div className="account-toggler">
              <li className="account-link">
                <NavLink to="/">Konto</NavLink>
              </li>
              <div className="container account-menu">
                <h4>
                  {user.name} {user.surname}
                </h4>
                <p>{user.email}</p>
                <ul>
                  <li>
                    <NavLink to="/account">
                      <span className="fas fa-sliders-h icon"></span>
                      <p>Ustawienia</p>
                    </NavLink>
                  </li>
                  <li onClick={onLogout}>
                    <NavLink to="/login">
                      <span className="fas fa-sign-out-alt icon"></span>
                      <p>Wyloguj</p>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <NavLink to="/login">Zaloguj</NavLink>
            </li>
            <li>
              <NavLink to="/register">Zarejestruj</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
