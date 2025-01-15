import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
    const params = useParams()

    return (
        <>
            <nav>
                <NavLink
                    to={`/curator/my-event/${params.id}/info`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="info">Описание<br/>мероприятия</button>
                </NavLink>
                <NavLink
                    to={`/curator/my-event/${params.id}/students`}
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
