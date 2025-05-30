import { FormatDate } from "../utils";
import { EventData } from "../consts";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveEventsQuery } from "../fetch/active-events";

const EventPreview: React.FC<{
  event: EventData;
}> = React.memo(({ event }) => {
  const eventRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [stateBGColor] = useState("greenyellow");
  const [stateMessage] = useState("Регистрация открыта");

  return (
    <div
      onClick={() =>
        navigate(`/event/${event.id}`)
      }
      ref={eventRef}
      id={`${event.id}`}
      className="event"
    >
      <div className="title-status-container">
        <h2>{event.title}</h2>
        <p className="event-status" style={{ backgroundColor: stateBGColor }}>
          {stateMessage}
        </p>
      </div>
      <p>
        {event.description.length > 400
          ? `${event.description.substring(0, 400)}...`
          : event.description}
      </p>
      <div className="event-info">
        <p>
          <b>Срок проведения:</b> {FormatDate(event.eventStartDate)} -{" "}
          {FormatDate(event.eventEndDate)}
        </p>
        <p>
          <b>Срок зачисления студентов:</b>{" "}
          {FormatDate(event.enrollmentStartDate)} -{" "}
          {FormatDate(event.enrollmentEndDate)}
        </p>
        <p>
          <b>Количество мест:</b> {event.numberSeatsStudent}
        </p>
      </div>
    </div>
  );
});

export const EventsList: React.FC = React.memo(() => {
  const { data: events, isLoading, error } = useActiveEventsQuery();

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (error) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (events && events.length === 0) {
    return <p className="fetch-warnings">Нет активных мероприятий</p>;
  } else if (events) {
    return (
      <div className="events-container">
        {events.map((event) => {
          return <EventPreview key={event.id} event={event} />;
        })}
      </div>
    );
  }
});