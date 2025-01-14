import { useParams } from "react-router-dom";
import { FormatDate, FormatName } from "../../utils";
import React from "react";
import { useEventQuery } from "../../fetch/event";
import { useUserInfoByIdQuery } from "../../fetch/user-info-by-id";

export const MyEventInfo: React.FC = React.memo(() => {
    const params = useParams()
    const {data: event, isLoading, isError} = useEventQuery(Number(params.id))
    const {data: manager} = useUserInfoByIdQuery(event ? event.managerId : 0)

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (isError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } else if (event) {
        return (
            <div className="event-info-container">
                <h2 className="title">{event.title}</h2>
                <p className="discription">{event.descriptionText}</p>
                <div className="organization-info">
                    <div>
                        <p className="eventDates"><b>Срок проведения:</b> {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}</p>
                        <p className="manager"><b>Руководитель:</b> {manager ? FormatName(manager) : 'Ошибка'}</p>
                    </div>
                    <div>
                        <p className="enrollmentDates"><b>Срок зачисления студентов:</b> {FormatDate(event.enrollmentStartDate)} - {FormatDate(event.enrollmentEndDate)}</p>
                        <p className="numberSeats"><b>Количество мест:</b> {event.numberSeatsStudent}</p>
                    </div>
                </div>
                <p className="chatUrl"><b>Ссылка на огр.чат:</b> {event.chatUrl}</p>
            </div>
        )
    }
})