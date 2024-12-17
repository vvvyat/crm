import { FormatDate } from "../../utils";
import { EventData } from "../../consts";
import React from "react";

export const MyEventInfo: React.FC<{
    event: EventData
}> = React.memo(({event}) => {
    
    return (
        <div className="event-info-container">
            <h2 className="title">{event.title}</h2>
            <p className="discription">{event.descriptionText}</p>
            <div className="organization-info">
                <div>
                    <p className="eventDates"><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                    <p className="numberSeats"><b>Количество мест:</b> {event.numberSeatsStudent}</p>
                </div>
                <div>
                    <p className="enrollmentDates"><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                    <p className="chatUrl"><b>Ссылка на огр.чат:</b> {event.chatUrl}</p>
                </div>
            </div>
        </div>
    )
})