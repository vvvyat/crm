import { FormatDate, FormatName, GetEventStatus } from "../../utils";
import { EventData } from "../../consts";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMyEventsQuery } from "../../fetch/my-events";
import { useUserInfoByIdQuery } from "../../fetch/user-info-by-id";

const EventPreview: React.FC<{
    event: EventData
}> = React.memo(({event}) => {
    const eventRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const {data: manager} = useUserInfoByIdQuery(event.managerId)

    return (
        <div onClick={() => navigate(`/student/my-event/${event.id}`)} ref={eventRef} id={`${event.id}`} className="event">
            <div className="title-status-container">
                <h2>{event.title}</h2>
                <p className="event-status" style={{backgroundColor: GetEventStatus(event.condition).statusBGColor}}>{GetEventStatus(event.condition).statusMessage}</p>
            </div>
            <p>{event.descriptionText.length > 400 ? `${event.descriptionText.substring(0, 400)}...` : event.descriptionText}</p>
            <p><b>Руководитель:</b> {!manager ? 'Ошибка' : FormatName(manager)}</p>
            <div className="event-info">
                <p><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                <p><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                <p><b>Количество мест:</b> {event.numberSeatsStudent}</p>
            </div>
        </div>
    )
})

export const MyEventsList: React.FC = React.memo(() => {
    const {data: events, isLoading, error} = useMyEventsQuery()
        
    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (events && events.length === 0) {
        return <p className="fetch-warnings">Нет мероприятий</p>
    } else {
        return (
            <div className="events-container">
                {events?.map(event => {
                    return < EventPreview key={event.id} event={event} />
                })}
            </div>
        )
    }
})
