import { FormatDate } from "../../utils";
import { EventData, EventState } from "../../consts";
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
            case EventState.Preparation:
                setStateBGColor('#d9d9d9')
                break
            case EventState.RegistrationIsOpen:
                setStateBGColor('greenyellow')
                break
            case EventState.NoPlacesLeft:
                setStateBGColor('yellow')
                break
            case EventState.RegistrationIsClosed:
                setStateBGColor('orange')
                break
            case EventState.InProgress:
                setStateBGColor('cornflowerblue')
                break
            case EventState.Completed:
                setStateBGColor('indianred')
                break
            case EventState.Error:
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
