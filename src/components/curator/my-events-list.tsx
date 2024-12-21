import { FormatDate } from "../../utils";
import { EventData, EventStatus } from "../../consts";
import React, { useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const EventPreview: React.FC<{
    event: EventData
}> = React.memo(({event}) => {
    const eventRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [stateBGColor, setStateBGColor] = useState('#d9d9d9')

    useEffect(() => {
        const onEventPreviewClick = () => {
            navigate('/my-event/id/info')
        }

        eventRef.current?.addEventListener('click', onEventPreviewClick)

        switch (event.condition) {
            case EventStatus.Preparation:
                setStateBGColor('#d9d9d9')
                break
            case EventStatus.RegistrationIsOpen:
                setStateBGColor('greenyellow')
                break
            case EventStatus.NoPlacesLeft:
                setStateBGColor('yellow')
                break
            case EventStatus.RegistrationIsClosed:
                setStateBGColor('orange')
                break
            case EventStatus.InProgress:
                setStateBGColor('cornflowerblue')
                break
            case EventStatus.Completed:
                setStateBGColor('indianred')
                break
            case EventStatus.Error:
                setStateBGColor('darkred')
                break
        }
    }, [])

    return (
        <div ref={eventRef} id={`${event.id}`} className="event">
            <div className="title-status-container">
                <h2>{event.title}</h2>
                <p className="event-status" style={{backgroundColor: stateBGColor}}>{event.condition}</p>
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
