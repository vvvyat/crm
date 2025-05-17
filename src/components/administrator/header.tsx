import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../../fetch/user-info";

export const Header: React.FC = React.memo(() => {
  const { data: userInfo, isError } = useUserInfoQuery();
  const navigate = useNavigate();

  return (
    <>
      <header>
        <NavLink to={`/admin/events`}>
          <button className="logo">CRM</button>
        </NavLink>
        <div></div>
        <div className="profile-buttons">
          <NavLink to={`/admin/edit-profile`}>
            <div className="profile-button">
              <img src="/../../img/profile-icon.svg" width="40" height="40" />
              <p>
                <b>
                  {!isError
                    ? `${userInfo?.lastName} ${userInfo?.firstName}`
                    : "Ошибка"}
                </b>
              </p>
            </div>
          </NavLink>
          <img
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
            }}
            src="/../../img/logout-icon.svg"
            height="40"
            width="40"
          />
        </div>
      </header>
    </>
  );
});