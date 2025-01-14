import { FormatDate, GetEventStatus } from "../../utils";
import { EventData } from "../../consts";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const EventPreview: React.FC<{
    event: EventData
}> = React.memo(({event}) => {
    const eventRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/curator/my-event/${event.id}/info`)} ref={eventRef} id={`${event.id}`} className="event">
            <div className="title-status-container">
                <h2>{event.title}</h2>
                <p className="event-status" style={{backgroundColor: GetEventStatus(event.condition).statusBGColor}}>{GetEventStatus(event.condition).statusMessage}</p>
            </div>
            <p>{event.descriptionText.length > 400 ? `${event.descriptionText.substring(0, 400)}...` : event.descriptionText}</p>
            <p><b>Руководитель:</b> {event.managerId}</p>
            <div className="event-info">
                <p><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                <p><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                <p><b>Количество мест:</b> {event.numberSeatsStudent}</p>
            </div>
        </div>
    )
})

export const MyEventsList: React.FC<{
    events: Array<EventData>;
}> = React.memo(({events}) => {
    return (
        <div className="events-container">
        {events.map(event => {
                return < EventPreview key={event.id} event={event} />
            })}
        </div>
    )
})
