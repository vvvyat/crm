import { FormatDate } from "../utils";
import { EventData } from "../consts";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useEventQuery } from "../fetch/event";

export const MoreInfo: React.FC<{
  event: EventData;
}> = React.memo(({ event }) => {
  return (
    <div className="more-info">
      <img src="../../img/pin.svg" width={46} height={41}></img>
      <ul>
        <li>
          <b>Срок проведения:</b>
          <br />
          {FormatDate(event.eventStartDate)} - {FormatDate(event.eventEndDate)}
        </li>
        <li>
          <b>Срок зачисления студентов:</b>
          <br />
          {FormatDate(event.enrollmentStartDate)} -{" "}
          {FormatDate(event.enrollmentEndDate)}
        </li>
        <li>
          <b>Количество мест:</b> {event.numberSeatsStudent}
        </li>
      </ul>
    </div>
  );
});

export const EventInfo: React.FC = React.memo(() => {
  const params = useParams();
  const [open, setOpen] = useState(false);

  const { data: event, isLoading, isError } = useEventQuery(Number(params.id));

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (isError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (event) {
    return (
      <div className="short-event-info">
        <div className="event-info-container">
          <h2 className="title">{event.title}</h2>
          <p className="discription">{event.description}</p>
          {open && <MoreInfo event={event} />}
        </div>
        <aside>
          <NavLink to={`/event/${params.id}/send`}>
            <button className="send-request-button">Отправить заявку</button>
          </NavLink>
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="show-more-button"
          >
            Подробнее
          </button>
        </aside>
      </div>
    );
  }
});