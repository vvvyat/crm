import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = React.memo(() => {
    const logoRef = useRef<HTMLAnchorElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onLogoClick = () => {
            navigate('/')
        }

        logoRef.current?.addEventListener('click', onLogoClick)
    }, [])

    return (
        <header>
            <a ref={logoRef} className="logo">CRM</a>
            <div></div>
            <div className="profile-button">
                <img src="../../../img/profile-icon.svg" width="37" height="37"/>
                <p>Имя пользователя</p>
            </div>
            <img src="../../../img/notion.svg"></img>
            <img src="../../../img/logout.svg" height="30.83" width="37"/>
        </header>
    )
})

