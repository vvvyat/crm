import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
    return (
        <>
            <nav>
                <NavLink
                    to="/event/id/info"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="info">Описание<br/>мероприятия</button>
                </NavLink>
                <NavLink
                    to="/event/id/curators"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="curators">Список кураторов</button>
                </NavLink>
                <NavLink
                    to="/event/id/students"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="students">Список студентов</button>
                </NavLink>
                <NavLink
                    to="/event/id/messages"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="create-messages-button">Сообщения для<br/>рассылки</button>
                </NavLink>
                <NavLink
                    to="/event/id/settings"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="settings">Настройки</button>
                </NavLink>
            </nav>
            <Outlet/>
        </>
    )
})

