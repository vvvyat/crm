import { FormatDate } from "../utils";
import { EventData, Manager } from "../consts";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetManagerById } from "../utils";
import { useActiveEventsQuery } from "../fetch/active-events";

const EventPreview: React.FC<{
    event: EventData,
    manager: Manager | undefined
}> = React.memo(({event, manager}) => {
    const eventRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const [stateBGColor] = useState('greenyellow')
    const [stateMessage] = useState('Регистрация открыта')

    useEffect(() => {
        const onEventPreviewClick = () => {
            navigate(`/event/${event.id}`)
        }

        eventRef.current?.addEventListener('click', onEventPreviewClick)
    }, [])

    return (
        <div ref={eventRef} id={`${event.id}`} className="event">
            <div className="title-status-container">
                <h2>{event.title}</h2>
                <p className="event-status" style={{backgroundColor: stateBGColor}}>{stateMessage}</p>
            </div>
            <p>{event.descriptionText.length > 400 ? `${event.descriptionText.substring(0, 400)}...` : event.descriptionText}</p>
            <p><b>Руководитель:</b> {manager ? `${manager.surname} ${manager.firstName} ${manager.lastName}` : 'Ошибка'}</p>
            <div className="event-info">
                <p><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                <p><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                <p><b>Количество мест:</b> {event.numberSeatsStudent}</p>
            </div>
        </div>
    )
})

export const EventsList: React.FC = React.memo(() => {
    const {data: events, isLoading, error} = useActiveEventsQuery()

    const {data: managers} = useQuery<Manager[]>({
        queryKey: ['managers'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/users/all-managers')
            return res.data
        }
    })
    
    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (events && events.length === 0) {
        return <p className="fetch-warnings">Нет активных мероприятий</p>
    } else {
        return (
            <div className="events-container">
                {events?.map(event => {
                  return < EventPreview key={event.id} event={event} manager={GetManagerById(managers, 3)} />
                })}
            </div>
        )
    }
})
