import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
  const params = useParams();

  return (
    <>
      <nav>
        <NavLink
          to={`/admin/event/${params.id}/info`}
          className={({ isActive }) => (isActive ? "nav-active" : "")}
        >
          <button className="info">
            Описание
            <br />
            мероприятия
          </button>
        </NavLink>
        <NavLink
          to={`/admin/event/${params.id}/crm`}
          className={({ isActive }) => (isActive ? "nav-active" : "")}
        >
          <button className="crm">CRM</button>
        </NavLink>
        <NavLink
          to={`/admin/event/${params.id}/settings`}
          className={({ isActive }) => (isActive ? "nav-active" : "")}
        >
          <button className="settings">Настройки</button>
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
});
