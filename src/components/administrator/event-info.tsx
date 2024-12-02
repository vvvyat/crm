import { FormatDate } from "../../utils";
import { Event } from "../../consts";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    
    return (
        <div className="event-info-container">
            <h2 className="title">{event.title}</h2>
            <p className="discription">{event.discriptionText}</p>
            <div className="organization-info">
                <div>
                    <p className="eventDates"><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                    <p className="manager"><b>Руководитель:</b> {event.managerId}</p>
                    <p className="numberSeats"><b>Количество мест:</b> {event.numberSeats}</p>
                </div>
                <div>
                    <p className="enrollmentDates"><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                    <p className="chatUrl"><b>Ссылка на огр.чат:</b> {event.chatUrl}</p>
                </div>
            </div>
            <button ref={closeButtonRef} className="close-button" name="close">Закрыть</button>
        </div>
    )
})