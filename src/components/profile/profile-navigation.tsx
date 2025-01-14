import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export const ProfileNavigation: React.FC = React.memo(() => {
    return (
        <>
            <nav>
                <NavLink
                    to={`/${sessionStorage.getItem('role')}/edit-profile`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="events-button">Редактировать<br/>профиль</button>
                </NavLink>
                <NavLink
                    to={`/${sessionStorage.getItem('role')}/edit-email`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="create-event-button">Изменить почту</button>
                </NavLink>
                <NavLink
                    to={`/${sessionStorage.getItem('role')}/edit-password`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="create-event-button">Изменить пароль</button>
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
})
