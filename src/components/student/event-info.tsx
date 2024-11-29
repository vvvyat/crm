import { FormatDate } from "../../utils";
import { Event } from "../../consts";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNavigation } from "./main-navigation";

export const MoreInfo: React.FC<{
    event: Event
}> = React.memo(({event}) => {
    return (
        <div className="more-info">
            <img src="../img/pin.svg" width={46} height={41}></img>
            <ul>
                <li><b>Срок проведения:</b><br/>{FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</li>
                <li><b>Срок зачисления студентов:</b><br/>{FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</li>
                <li><b>Количество мест:</b> {event.numberSeats}</li>
            </ul>
        </div>
    )
})

export const EventInfo: React.FC<{
    event: Event
}> = React.memo(({event}) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const onCloseButtonClick = () => {
            navigate('/')
        }

        closeButtonRef.current?.addEventListener('click', onCloseButtonClick)
    }, [])

    const [open, setOpen] = useState(false);
    
    return (
        <>
            <header>
                <a className="logo">CRM</a>
                <span></span>
                <div className="profile-button">
                    <img src="../img/profile-icon.svg" width="37" height="37"/>
                    <p>Имя пользователя</p>
                </div>
                <img src="../img/logout.svg" height="30.83" width="37"/>
            </header>
            <main className="short-event-info">
                <MainNavigation />
                <div className="event-info-container">
                    <h2 className="title">{event.title}</h2>
                    <p className="discription">{event.discriptionText}</p>
                    <p className="manager"><b>Руководитель:</b> {event.managerId}</p>
                    {open && <MoreInfo event={event} />}
                    <button ref={closeButtonRef} className="close-button" name="close">Закрыть</button>
                </div>
                <aside>
                    <button className="send-request-button">Поступить</button>
                    <button onClick={() => {setOpen(!open)}} className="show-more-button">Подробнее</button>
                </aside>
            </main>
        </>
    )
})