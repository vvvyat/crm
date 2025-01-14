import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../fetch/user-info";
import { useNotificationsQuery } from "../fetch/notifications";
import moment from "moment";

export const Header: React.FC<{
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({setUser}) => {
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)
    const {data: userInfo, isError} = useUserInfoQuery()
    const {data: notifications} = useNotificationsQuery()
    const navigate = useNavigate()

    return (
        <>
            <header>
                <NavLink to={`/${sessionStorage.getItem('role')}/events`}>
                    <button className="logo">CRM</button>
                </NavLink>
                <div></div>
                <NavLink to={`/${sessionStorage.getItem('role')}/edit-profile`}>
                    <div className="profile-button">
                        <img src="../../img/profile-icon.svg" width="37" height="37"/>
                        <p><b>{!isError ? `${userInfo?.lastName} ${userInfo?.firstName}`: 'Ошибка'}</b></p>
                    </div>
                </NavLink>
                <img
                    className={sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'manager' ? 'hidden' : ''}
                    onClick={() => {setIsNotificationsModalOpen(!isNotificationsModalOpen)}}
                    src="../../img/notion.svg">        
                </img>
                <img onClick={() => {
                    setUser(false)
                    navigate('/')
                }} src="../../img/logout.svg" height="30.83" width="37"/>
            </header>

            {isNotificationsModalOpen && (
                <div className="notificationsModal">
                    <p className="notifications-header">Уведомления</p>
                    <div className="notifications-container">
                        {notifications ? notifications.map((notification) => {
                            return (
                                <div className="notification">
                                    <p className="notification-text">{notification.messageText}</p>
                                    <p className="notification-date">{moment(notification.sent_at).format('DD.MM.YY')}</p>
                                </div>
                            )
                        }) : <></>}
                    </div>
                </div>
            )}
        </>
    )
})

