import React from "react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = React.memo(() => {
    return (
        <header>
            <NavLink to={"/"}>
                <button className="logo">CRM</button>
            </NavLink>
            <div></div>
            <NavLink to={"/edit-profile"}>
                <div className="profile-button">
                    <img src="../../../img/profile-icon.svg" width="37" height="37"/>
                    <p>Имя пользователя</p>
                </div>
            </NavLink>
            <img src="../../../img/logout.svg" height="30.83" width="37"/>
        </header>
    )
})

