import { FormatDate } from "../../utils";
import { Event } from "../../consts";
import React, { useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

const EventPreview: React.FC<{
    event: Event
}> = React.memo(({event}) => {
    const eventRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const onEventPreviewClick = () => {
            navigate('/event/id/info')
        }

        eventRef.current?.addEventListener('click', onEventPreviewClick)
    }, [])

    return (
        <div ref={eventRef} id={`${event.id}`} className="event">
            <h2>{event.title}</h2>
            <p>{event.discriptionText}</p>
            <p><b>Руководитель:</b> {event.managerId}</p>
            <div className="event-info">
                <p><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                <p><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                <p><b>Количество мест:</b> {event.numberSeats}</p>
            </div>
        </div>
    )
})

export const EventsList: React.FC<{
    events: Array<Event>;
}> = React.memo(({events}) => {
    return (
        <div className="events-container">
            {events.map(event => {
                return < EventPreview key={event.id} event={event} />
            })}
        </div>
    )
})
