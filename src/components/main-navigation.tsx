import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export const MainNavigation: React.FC = React.memo(() => {
    return (
        <>
            <nav>
                <NavLink
                    to={`/${sessionStorage.getItem('role')}/events`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="events-button">Мероприятия</button>
                </NavLink>
                <NavLink
                    to={`/${sessionStorage.getItem('role')}/my-events`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="my-events-button">Мои<br/>мероприятия</button>
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
})
