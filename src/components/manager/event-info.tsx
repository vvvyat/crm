import { FormatDate, GetManagerById } from "../../utils";
import { EventData, Manager } from "../../consts";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const MoreInfo: React.FC<{
    event: EventData
}> = React.memo(({event}) => {
    return (
        <div className="more-info">
            <img src="../../../img/pin.svg" width={46} height={41}></img>
            <ul>
                <li><b>Срок проведения:</b><br/>{FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</li>
                <li><b>Срок зачисления студентов:</b><br/>{FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</li>
                <li><b>Количество мест:</b> {event.numberSeatsStudent}</li>
            </ul>
        </div>
    )
})

export const EventInfo: React.FC = React.memo(() => {
    const location = useLocation();

    const {data: event, isLoading, error} = useQuery<EventData>({
        queryKey: ['event'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/events/${location.pathname.split('/').slice(-1)[0]}`)
            return res.data
        }
    })

    const {data: managers} = useQuery<Manager[]>({
        queryKey: ['managers'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/users/all-managers')
            return res.data
        }
    })

    const [manager] = useState(event? GetManagerById(managers, 3) : undefined) 
    const [open, setOpen] = useState(false);
    
    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (error) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (event) {
        return (
            <>
                <div className="short-event-info">
                    <div className="event-info-container">
                        <h2 className="title">{event.title}</h2>
                        <p className="discription">{event.descriptionText}</p>
                        <p className="manager"><b>Руководитель:</b> {manager ? `${manager.surname} ${manager.firstName} ${manager.lastName}` : 'Ошибка'}</p>
                        {open && <MoreInfo event={event} />}
                    </div>
                    <aside>
                        <button onClick={() => {setOpen(!open)}} className="show-more-button">Подробнее</button>
                    </aside>
                </div>
            </>
        )
    } else {
        <p className="fetch-warnings">Неизвестная ошибка</p>
    }
})