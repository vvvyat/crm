import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const MainNavigation: React.FC = React.memo(() => {
  return (
    <>
      <nav>
        <NavLink
          to="/admin/events"
          className={({ isActive }) => (isActive ? "nav-active" : "")}
        >
          <button className="events-button">Мероприятия</button>
        </NavLink>
        <NavLink
          to="/admin/create-event"
          className={({ isActive }) => (isActive ? "nav-active" : "")}
        >
          <button className="create-event-button">
            Создать
            <br />
            мероприятие
          </button>
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
});
