import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

export const EventNavigation: React.FC = React.memo(() => {
    const params = useParams()

    return (
        <>
            <nav>
                <NavLink
                    to={`/manager/my-event/${params.id}/info`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="info">Описание<br/>мероприятия</button>
                </NavLink>
                <NavLink
                    to={`/manager/my-event/${params.id}/curator-requests`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="curator-requests-nav">Заявки на<br/>кураторство</button>
                </NavLink>
                <NavLink
                    to={`/manager/my-event/${params.id}/student-requests`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="student-requests-nav">Заявки на<br/>мероприятие</button>
                </NavLink>
                <NavLink
                    to={`/manager/my-event/${params.id}/curators`}
                    className={({ isActive }) =>
                        isActive ? "nav-active" : ""
                    }
                >
                    <button className="curators">Список кураторов</button>
                </NavLink>
                <NavLink
                    to={`/manager/my-event/${params.id}/students`}
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
