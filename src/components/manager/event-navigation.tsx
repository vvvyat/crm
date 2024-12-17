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
                    to="/my-event/id/curator-requests"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="curator-requests-nav">Заявки на<br/>кураторство</button>
                </NavLink>
                <NavLink
                    to="/my-event/id/student-requests"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="student-requests-nav">Заявки на<br/>мероприятие</button>
                </NavLink>
                <NavLink
                    to="/my-event/id/curators"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="curators">Список кураторов</button>
                </NavLink>
                <NavLink
                    to="/my-event/id/students"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="students">Список студентов</button>
                </NavLink>
            </nav>
            <Outlet/>
        </>
    )
})
