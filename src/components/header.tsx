import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../fetch/user-info";
import { useNotificationsQuery } from "../fetch/notifications";
import { Badge, ConfigProvider } from 'antd';
import moment from "moment";

export const Header: React.FC<{
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({setUser}) => {
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [lastSeen, setLastSeen] = useState(0)
    const {data: userInfo, isError} = useUserInfoQuery()
    const {data: notifications, isFetching} = useNotificationsQuery()
    const navigate = useNavigate()

    useEffect(() => {
        if (notifications && lastSeen < notifications.length - 1)
            setIsNew(true)
    }, [isFetching, lastSeen, notifications])

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
                <div className={sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'manager' ? 'hidden' : ''}>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBorderBg: undefined
                            },
                            components: {
                                Badge: {
                                    dotSize: 10,
                                },
                            },
                        }}
                    >
                        <Badge dot style={isNew? {} : {display: 'none'}}>
                            <img src="../../img/notion.svg" onClick={() => {
                                setIsNotificationsModalOpen(!isNotificationsModalOpen)
                                setIsNew(false)
                                if (notifications && lastSeen != notifications.length - 1) {
                                    setLastSeen(notifications.length - 1)
                                }
                            }}></img>
                        </Badge>
                    </ConfigProvider>
                </div>
                <img onClick={() => {
                    setUser(false)
                    navigate('/')
                }} src="../../img/logout.svg" height="30.83" width="37"/>
            </header>

            {isNotificationsModalOpen && (
                <div className="notificationsModal">
                    <p className="notifications-header">Уведомления</p>
                    <div className="notifications-container">
                        {notifications ? notifications.reverse().map((notification) => {
                            return (
                                <div key={notification.notificationId} className="notification">
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

