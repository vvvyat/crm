import React from "react";
import { NavLink } from "react-router-dom";

export const StudentHeader: React.FC = React.memo(() => {
  return (
    <>
      <header>
        <NavLink to={`/`}>
          <button className="logo">CRM</button>
        </NavLink>
        <div></div>
        <NavLink to={`/authorization`}>
          <div className="admin-login-button">
            <p>
              <b>Войти как администратор</b>
            </p>
            <img src="/../../img/login-icon.svg" width="40" height="40" />
          </div>
        </NavLink>
      </header>
    </>
  );
});