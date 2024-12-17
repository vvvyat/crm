import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
    return (
        <>
            <nav>
                <NavLink
                    to="/my-event/id/info"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="info">Описание<br/>мероприятия</button>
                </NavLink>
                <NavLink
                    to="/my-event/id/students"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="curator-requests-nav">Список<br/>студентов</button>
                </NavLink>
            </nav>
            <Outlet/>
        </>
    )
})
