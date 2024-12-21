import { FormatDate, GetEventStatus, GetManagerById } from "../../utils";
import { EventData } from "../../consts";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminEventsQuery } from "../../fetch/admin-events";
import { useAllManagersQuery } from "../../fetch/all-managers";

const EventPreview: React.FC<{
    event: EventData,
    manager: string
}> = React.memo(({event, manager}) => {
    const eventRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/event/${event.id}/info`)} ref={eventRef} id={`${event.id}`} className="event">
            <div className="title-status-container">
                <h2>{event.title}</h2>
                <p className="event-status" style={{backgroundColor: GetEventStatus(event.condition).statusBGColor}}>{GetEventStatus(event.condition).statusMessage}</p>
            </div>
            <p>{event.descriptionText.length > 400 ? `${event.descriptionText.substring(0, 400)}...` : event.descriptionText}</p>
            <p><b>Руководитель:</b> {manager}</p>
            <div className="event-info">
                <p><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                <p><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                <p><b>Количество мест:</b> {event.numberSeatsStudent}</p>
            </div>
        </div>
    )
})

export const EventsList: React.FC = React.memo(() => {
    const {data: events, isLoading, error} = useAdminEventsQuery(4)
    const {data: managers} = useAllManagersQuery()

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (events && events.length === 0) {
        return <p className="fetch-warnings">Мероприятий нет</p>
    } else {
        return (
            <div className="events-container">
                {events?.map(event => {
                    return < EventPreview key={event.id} event={event} manager={GetManagerById(managers, event.managerId)}/>
                })}
            </div>
        )
    }
})
