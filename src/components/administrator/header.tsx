import React from "react";

export const Header: React.FC = React.memo(() => {
    return (
        <header>
            <a className="logo">CRM</a>
            <form className="search-form">
                <label className="search-lable">Поиск</label>
                <input className="search" type="text" name="search"/>
            </form>
            <div className="profile-button">
                <img src="img/profile-icon.svg" width="37" height="37"/>
                <p>Имя пользователя</p>
            </div>
            <img src="img/logout.svg" height="30.83" width="37"/>
        </header>
    )
})

