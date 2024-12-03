import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export const MainNavigation: React.FC = React.memo(() => {
    return (
        <>
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="events-button">Мероприятия</button>
                </NavLink>
                <NavLink
                    to="/create"
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="create-event-button">Создать<br/>мероприятие</button>
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
})
