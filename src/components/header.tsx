import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = React.memo(() => {
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)

    return (
        <>
            <header>
                <NavLink to={"/"}>
                    <button className="logo">CRM</button>
                </NavLink>
                <div></div>
                <NavLink to={"/edit-profile"}>
                    <div className="profile-button">
                        <img src="../../img/profile-icon.svg" width="37" height="37"/>
                        <p>Имя пользователя</p>
                    </div>
                </NavLink>
                <img onClick={() => {
                    setIsNotificationsModalOpen(!isNotificationsModalOpen)
                }} src="../../img/notion.svg"></img>
                <img src="../../img/logout.svg" height="30.83" width="37"/>
            </header>

            {isNotificationsModalOpen && (
                <div className="notificationsModal">
                    <p className="notifications-header">Уведомления</p>
                </div>
            )}
        </>
    )
})

